import { LeagueLink } from "@/types/league/league";
import LeagueCard, { LeagueCardLoading } from "./league-card";
export default function LeaguesList({
  title,
  leaguesArr,
}: {
  title: string;
  leaguesArr: LeagueLink[];
}) {
  return (
    <div>
      <h2 className="font-bold pt-3 pb-2 mb-3 text-lg md:text-xl border-b-[3px] border-primary w-fit">
        {title}
      </h2>
      <div className="bg-white grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 auto-rows-max">
        {leaguesArr.map((league, index) => (
          <LeagueCard key={index} league={league} />
        ))}
      </div>
    </div>
  );
}

export const LeagueListLoading = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-24 bg-gray-200 mt-3 mb-5"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {[...Array(10)].map((key) => (
          <LeagueCardLoading key={key} />
        ))}
      </div>
    </div>
  );
};
