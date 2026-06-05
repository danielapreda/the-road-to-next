import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getAuth } from "@/auth/cookie";
import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { signInPath } from "@/paths";

const TicketsPage = async () => {
    const { user } = await getAuth();

    if (!user) {
        redirect(signInPath());
    }

    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading
                title="Tickets"
                description="All your tickets at one place"
            />

            <CardCompact
                title="Create Ticket"
                description="A new ticket will be created"
                className="w-full max-w-[420px] self-center"
                content={<TicketUpsertForm />}
            />

            <Suspense fallback={<Spinner />}>
                <TicketList />
            </Suspense>
        </div>
    );
};

export default TicketsPage;
