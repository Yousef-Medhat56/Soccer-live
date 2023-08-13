import { TopScorer } from "@/types/league/top-scorer";
import TopScorersTable from "../../tables/top-scorers-table";

export default async function LeagueTopScorersComp({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/leagues/${id}/${slug}/top-scorers`,
    { next: { revalidate: 60 } }
  );

  const {
    data: { topScorers },
  }: { data: { topScorers: TopScorer[] } } = await response.json();

  return (
    <>
      {topScorers ? (
        <TopScorersTable players={topScorers} />
      ) : (
        <h2 className="text-label pt-4 md:pt-6 text-center">
          جدول الهدافين غير متاح
        </h2>
      )}
    </>
  );
}
