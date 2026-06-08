"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePassword } from "../actions/update-password";

const AccountPasswordForm = () => {
    const [actionState, action] = useActionState(
        updatePassword,
        EMPTY_ACTION_STATE,
    );

    return (
        <Form action={action} actionState={actionState}>
            <div className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-4">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                    />
                    <FieldError
                        actionState={actionState}
                        name="currentPassword"
                    />
                </div>

                <div className="flex flex-col gap-y-4">
                    <Label htmlFor="password">New Password</Label>
                    <Input id="password" name="password" type="password" />
                    <FieldError actionState={actionState} name="password" />
                </div>

                <div className="flex flex-col gap-y-4">
                    <Label htmlFor="confirmPassword">
                        Confirm New Password
                    </Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                    />
                    <FieldError
                        actionState={actionState}
                        name="confirmPassword"
                    />
                </div>
            </div>

            <div className="mt-4 flex flex-col">
                <SubmitButton label="Update Password" />
            </div>
        </Form>
    );
};

export { AccountPasswordForm };
