import { TeamLineup } from "@/types/matches/lineup";
import SubstitutesList, { SubstitutesListLoading } from "./lineup/substitutes";
import Pitch from "./lineup/pitch";

export default async function MatchLineupComp({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/matches/${id}/lineups`,
    { next: { revalidate: 60 } }
  );
  const { home, away }: { home: TeamLineup; away: TeamLineup } =
    await response.json();

  //@ts-ignore
  const noLineUp = home ? false : true;

  return (
    <div className="pt-6 md:pt-8 flex flex-col items-center">
      {noLineUp ? (
        <h3 className="text-label">تشكيل المباراة غير متوفر</h3>
      ) : (
        <div>
          {/* Pitch  */}
          <Pitch home={home} away={away} />

          {/* Substitutes Start  */}
          <div className="mt-5">
            <h3 className="text-right font-bold mb-1 mr-5 md:mr-20 lg:mr-0">
              البدلاء
            </h3>
            <div className="flex justify-around lg:justify-between">
              <SubstitutesList substitutes={home.substitutes} />
              <SubstitutesList substitutes={away.substitutes} />
            </div>
          </div>
          {/* Substitutes End  */}
        </div>
      )}
    </div>
  );
}

export const MatchLineupLoading = () => {
  return (
    <div className="pt-8 md:pt-10 flex flex-col items-center animate-pulse">
      <div className="bg-gray-200 w-[300px] md:w-[350px] h-[515px] md:h-[600px]"></div>
      <SubstitutesListLoading />
    </div>
  );
};
