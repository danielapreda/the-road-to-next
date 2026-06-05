"use server";

import { redirect } from "next/navigation";
import { deleteSessionCookie, getAuth } from "@/auth/cookie";
import { invalidateSession } from "@/auth/session";
import { signInPath } from "@/paths";

export const signOut = async () => {
    const { session } = await getAuth();

    if (!session) {
        redirect(signInPath());
    }

    await invalidateSession(session.id);
    await deleteSessionCookie();

    redirect(signInPath());
};
