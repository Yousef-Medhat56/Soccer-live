import { PlayerInLineup } from "@/types/matches/lineup";

export default function SubstitutesList({
  substitutes,
}: {
  substitutes: PlayerInLineup[] | undefined;
}) {
  return (
    <div className="text-label">
      {substitutes?.map((player) => (
        <h4 key={player.number} className="pb-1">
          <span>{player.number}</span>
          {player.name}
        </h4>
      ))}
    </div>
  );
}

export const SubstitutesListLoading = () => {
  return (
    <div className="flex justify-around lg:justify-evenly  mt-8 w-full">
      <div>
        {[...Array(12)].map((key) => (
          <div key={key} className="h-3 w-24 bg-gray-200 mb-2"></div>
        ))}
      </div>
      <div>
        {[...Array(12)].map((key) => (
          <div key={key} className="h-3 w-24 bg-gray-200 mb-2"></div>
        ))}
      </div>
    </div>
  );
};
