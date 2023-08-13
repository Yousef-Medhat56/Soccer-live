import ClubSquad from "@/app/components/club/container/club-squad";
import TableLoading from "@/app/components/tables/table-loading";
import { Suspense } from "react";

export default function ClubSquadPage({
  params,
}: {
  params: { id: string; slug: string };
}) {
  return (
    <div>
      <Suspense fallback={<TableLoading rows={16} columns={3} />}>
        {/* @ts-expect-error Server Component */}
        <ClubSquad id={params.id} slug={params.slug} />
      </Suspense>
    </div>
  );
}
