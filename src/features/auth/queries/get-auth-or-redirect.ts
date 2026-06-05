import { redirect } from "next/navigation";
import { getAuth } from "@/auth/cookie";
import { signInPath } from "@/paths";

export const getAuthOrRedirect = async () => {
    const auth = await getAuth();

    if (!auth.user) {
        redirect(signInPath());
    }

    return auth;
};
