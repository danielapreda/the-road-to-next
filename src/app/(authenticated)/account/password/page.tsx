import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { AccountPasswordForm } from "@/features/account/components/account-password-form";
import { AccountTabs } from "../_navigation/tabs";

const PasswordPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading
                title="Password"
                description="Keep your account secure"
                tabs={<AccountTabs />}
            />
            <CardCompact
                title="Edit Password"
                description="Update your password"
                className="w-full max-w-[420px] self-center"
                content={<AccountPasswordForm />}
            />
        </div>
    );
};

export default PasswordPage;
