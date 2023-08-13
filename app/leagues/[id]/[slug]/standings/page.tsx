import LeagueStandingsComp from "@/app/components/leagues/container/league-standings";
import TableLoading from "@/app/components/tables/table-loading";
import { Suspense } from "react";

export default function LeagueStandingsPage({
  params,
}: {
  params: { id: string; slug: string };
}) {
  return (
    <div>
      <Suspense fallback={<TableLoading rows={16} columns={8} />}>
        {/* @ts-expect-error Server Component */}
        <LeagueStandingsComp id={params.id} slug={params.slug} />
      </Suspense>
    </div>
  );
}
