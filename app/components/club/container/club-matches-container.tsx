import { OptionTag } from "@/types/league/matches";
import { Match } from "@/types/matches/match";
import Chip, { ChipLoading } from "../../chip/chip";
import MatchesFilterWrapper from "../matches/matches-filter-wrapper";
import MatchCard, { MatchCardLoading } from "../../matches/match-card";
import { SelectRoundLoading } from "../../leagues/filter/select-round-wrapper";

export default async function ClubMatchesContainer({
  id,
  slug,
  previous,
  league,
}: {
  id: string;
  slug: string;
  previous: string;
  league?: string;
}) {
  const isPrevious = previous == "true";
  const URL = isPrevious
    ? `${process.env.NEXT_PUBLIC_URL}/api/club/${id}/${slug}/matches?previous=true`
    : `${process.env.NEXT_PUBLIC_URL}/api/club/${id}/${slug}/matches`;

  const response = await fetch(URL,{ next: { revalidate: 60 } });
  const {
    data: { tournaments, selectedTournament },
  }: {
    data: {
      tournaments: OptionTag[];
      selectedTournament: { matches: Match[] };
    };
  } = await response.json();

  return (
    <>
      <div>
        <MatchesFilterWrapper
          tournaments={tournaments}
          selectedTournament={selectedTournament}
          isPrevious={isPrevious}
        />
        {selectedTournament ? (
          <div>
            {selectedTournament.matches.map((match: Match) => (
              <>
                {(league == match.league || league == "all" || !league) && (
                  <MatchCard
                    key={match.id}
                    match={match}
                    showDate
                    showLeague
                    showHour={!isPrevious}
                  />
                )}
              </>
            ))}
          </div>
        ) : (
          <h2 className="text-label text-center pt-2">
            {isPrevious
              ? "المباريات السابقة غير متاحة"
              : "لا يوجد مباريات قادمة"}
          </h2>
        )}
      </div>{" "}
    </>
  );
}

export const ClubMatchesContainerLoading = () => {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-center pb-2">
        <div className="flex items-center h-full">
          {/* CHIPS LOADING START  */}
          <ChipLoading />
          <ChipLoading />
          {/* CHIPS LOADING END  */}
        </div>

        <div className="flex justify-end animate-pulse">
          <div className="w-28 h-7 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div>
        {[...Array(8)].map((key) => (
          <MatchCardLoading key={key} />
        ))}
      </div>
    </div>
  );
};
