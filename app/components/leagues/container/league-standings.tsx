import StandingsTable from "@/app/components/tables/standings-table";
import { GroupStandings } from "@/types/league/standings";

export default async function LeagueStandingsComp({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/leagues/${id}/${slug}/standings`,
    { next: { revalidate: 60 } }
  );

  const {
    data: { groups },
  }: { data: { groups: GroupStandings[] } } = await response.json();

  return (
    <>
      {groups ? (
        groups.map((group, index) => (
          <StandingsTable key={index} group={group} />
        ))
      ) : (
        <h2 className="text-label pt-4 md:pt-6 text-center">لا يوجد ترتيب</h2>
      )}
    </>
  );
}
