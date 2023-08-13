import { OptionTag } from "@/types/league/matches";
import Chip from "../../chip/chip";
import SelectClubMatchesLeague from "./league-filter";
import { Match } from "@/types/matches/match";
import FilterMatchesButton from "./filter-button";

export default function MatchesFilterWrapper({
  tournaments,
  selectedTournament,
  isPrevious,
}: {
  tournaments: OptionTag[];
  selectedTournament: { matches: Match[] };
  isPrevious: boolean;
}) {
  return (
    <div className="flex justify-between items-center pb-2">
      <div>
        <FilterMatchesButton isPrevious>
          <Chip text="السابقة" className="ml-2" filled={isPrevious} />
        </FilterMatchesButton>
        <FilterMatchesButton isPrevious={false}>
          <Chip text="القادمة" filled={!isPrevious} />
        </FilterMatchesButton>
      </div>

      <SelectClubMatchesLeague leagues={tournaments} />
    </div>
  );
}
