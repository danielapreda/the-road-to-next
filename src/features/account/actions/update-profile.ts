"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
    ActionState,
    fromErrorToActionState,
    toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { accountProfilePath } from "@/paths";

const updateProfileSchema = z.object({
    username: z
        .string()
        .min(1)
        .max(191)
        .refine(
            (value) => !value.includes(" "),
            "Username cannot contain spaces",
        ),
});

export const updateProfile = async (
    _actionState: ActionState,
    formData: FormData,
) => {
    const { user } = await getAuthOrRedirect();

    try {
        const { username } = updateProfileSchema.parse(
            Object.fromEntries(formData),
        );

        await prisma.user.update({
            where: { id: user.id },
            data: { username },
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return toActionState(
                "ERROR",
                "Username is already in use",
                formData,
            );
        }

        return fromErrorToActionState(error, formData);
    }

    revalidatePath(accountProfilePath());

    return toActionState("SUCCESS", "Profile updated", formData);
};
