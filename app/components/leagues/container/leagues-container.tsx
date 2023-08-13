"use client";
import { LeagueLink } from "@/types/league/league";
import LeaguesList, { LeagueListLoading } from "../leagues-list";
import useSWR from "swr";

//swr fetcher
const fetcher = (url: URL, init?: RequestInit) =>
  fetch(url).then((r) => r.json());

export default function LeaguesContainer() {
  const URL = process.env.NEXT_PUBLIC_URL + `/api/leagues`;
  const { data } = useSWR(URL, fetcher);

  let popularLeagues: LeagueLink[] = [];
  let allLeagues: LeagueLink[] = [];

  if (data) {
    popularLeagues = data.data.leagues.popular;
    allLeagues = data.data.leagues.all;
  }
  return (
    <div>
      {data ? (
        <>
          <LeaguesList title="أشهر الدوريات" leaguesArr={popularLeagues} />
          <div className="mt-3">
            <LeaguesList title="كل الدوريات" leaguesArr={allLeagues} />
          </div>
        </>
      ) : (
        <LeaguesContainerLoading />
      )}
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
