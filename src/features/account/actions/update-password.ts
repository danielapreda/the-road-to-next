"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { hashPassword, verifyPasswordHash } from "@/auth/password";
import {
    ActionState,
    fromErrorToActionState,
    toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { accountPasswordPath } from "@/paths";

const updatePasswordSchema = z
    .object({
        currentPassword: z.string().min(6).max(191),
        password: z.string().min(6).max(191),
        confirmPassword: z.string().min(6).max(191),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["confirmPassword"],
            });
        }
    });

export const updatePassword = async (
    _actionState: ActionState,
    formData: FormData,
) => {
    const { user } = await getAuthOrRedirect();

    try {
        const { currentPassword, password } = updatePasswordSchema.parse(
            Object.fromEntries(formData),
        );

        const validPassword = await verifyPasswordHash(
            user.passwordHash,
            currentPassword,
        );

        if (!validPassword) {
            return toActionState(
                "ERROR",
                "Current password is incorrect",
                formData,
            );
        }

        const passwordHash = await hashPassword(password);

        await prisma.user.update({
            where: { id: user.id },
            data: { passwordHash },
        });
    } catch (error) {
        return fromErrorToActionState(error, formData);
    }

    revalidatePath(accountPasswordPath());

    return toActionState("SUCCESS", "Password updated", formData);
};
