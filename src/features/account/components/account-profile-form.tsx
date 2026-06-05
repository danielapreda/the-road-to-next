"use client";

import { User } from "@prisma/client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "../actions/update-profile";

type AccountProfileFormProps = {
    user: User;
};

const AccountProfileForm = ({ user }: AccountProfileFormProps) => {
    const [actionState, action] = useActionState(
        updateProfile,
        EMPTY_ACTION_STATE,
    );

    return (
        <Form action={action} actionState={actionState}>
            <div className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-4">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        defaultValue={
                            (actionState.payload?.get("username") as string) ??
                            user.username
                        }
                    />
                    <FieldError actionState={actionState} name="username" />
                </div>

                <div className="flex flex-col gap-y-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={user.email}
                        disabled
                    />
                </div>
            </div>

            <div className="mt-4 flex flex-col">
                <SubmitButton label="Update" />
            </div>
        </Form>
    );
};

export { AccountProfileForm };
