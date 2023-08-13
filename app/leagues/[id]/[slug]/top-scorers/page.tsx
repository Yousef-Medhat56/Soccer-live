import LeagueTopScorersComp from "@/app/components/leagues/container/league-topscorers";
import TableLoading from "@/app/components/tables/table-loading";
import { Suspense } from "react";

export default function LeagueTopScorersPage({
  params,
}: {
  params: { id: string; slug: string };
}) {
  return (
    <div>
      <Suspense fallback={<TableLoading rows={16} columns={2} />}>
        {/* @ts-expect-error Server Component */}
        <LeagueTopScorersComp id={params.id} slug={params.slug} />
      </Suspense>
    </div>
  );
}
