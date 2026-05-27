import Link from "next/link";
import { Heading } from "@/components/heading";
import { ticketsPath } from "@/paths";
import { Suspense } from "react";

const HomePage = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Home" description="Your home place to start" />

            <Suspense>
                <div className="flex-1 flex flex-col items-center">
                    <Link href={ticketsPath()} className="text-sm underline">
                        Go to Tickets
                    </Link>
                </div>
            </Suspense>
        </div>
    );
};

export default HomePage;
