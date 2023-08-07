import { LeagueLink } from "@/types/league/league";
import LeaguesList, { LeagueListLoading } from "../leagues-list";

export default async function LeaguesContainer() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/leagues`);
  const { data } = await response.json();
  const popularLeagues: LeagueLink[] = data.leagues.popular;
  const allLeagues: LeagueLink[] = data.leagues.all;
  return (
    <div>
      <LeaguesList title="أشهر الدوريات" leaguesArr={popularLeagues} />
      <div className="mt-3">
        <LeaguesList title="كل الدوريات" leaguesArr={allLeagues} />
      </div>
    </div>
  );
}

export const LeaguesContainerLoading = () => {
  return (
    <div>
      <LeagueListLoading />
      <div className="mt-6">
        <LeagueListLoading />
      </div>
    </div>
  );
};
