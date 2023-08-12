import { TopScorer } from "@/types/league/top-scorer";
import TopScorersTable from "../../tables/top-scorers-table";
import { PlayerInSquad } from "@/types/club/player";
import SquadTable from "../../tables/squad-table";

export default async function ClubSquad({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/club/${id}/${slug}/squad`
  );

  const {
    data: { squad, isNationalTeam },
  }: { data: { squad: PlayerInSquad[]; isNationalTeam: boolean } } =
    await response.json();

  return (
    <>
      {squad ? (
        <SquadTable squad={squad} isNationalTeam={isNationalTeam} />
      ) : (
        <h2 className="text-label pt-4 md:pt-6 text-center">
          جدول اللاعبين غير متاح
        </h2>
      )}
    </>
  );
}
