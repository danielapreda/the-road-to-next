import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { AccountProfileForm } from "@/features/account/components/account-profile-form";
import { AccountTabs } from "@/features/account/components/account-tabs";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

const ProfilePage = async () => {
    const { user } = await getAuthOrRedirect();

    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading
                title="Profile"
                description="All your profile information"
                tabs={<AccountTabs />}
            />

            <CardCompact
                title="Edit Profile"
                description="Update your username"
                className="w-full max-w-[420px] self-center"
                content={<AccountProfileForm user={user} />}
            />
        </div>
    );
};

export default ProfilePage;
