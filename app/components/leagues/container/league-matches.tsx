"use client";
import { MatchesInDay } from "@/types/league/matches";
import MatchCard, { MatchCardLoading } from "../../matches/match-card";
import useSWR from "swr";

//swr fetcher
const fetcher = (url: URL, init?: RequestInit) =>
  fetch(url).then((r) => r.json());

export default function LeagueMatchesComp({
  id,
  slug,
  roundId,
}: {
  id: string;
  slug: string;
  roundId?: string;
}) {
  const URL = `${
    process.env.NEXT_PUBLIC_URL
  }/api/leagues/${id}/${slug}/matches${roundId ? "?round=" + roundId : ""}`;

  //Fetch matches data
  const { data } = useSWR(URL, fetcher, {
    refreshInterval: 60,
  });

  const selectedRound: { roundQueryStr: string; days: MatchesInDay[] } =
    data && data.data.selectedRound;

  return (
    <div className="mt-[-12px]">
      {data && selectedRound ? (
        selectedRound.days.map((day, index) => (
          <div key={index} >
            <h1 className="text-center text-label font-bold pt-8 text-sm md:text-base">
              {day.date}
            </h1>
            <div>
              {day.matches.map((match, index) => (
                <MatchCard key={index} match={match} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <LeagueMatchesLoading />
      )}
    </div>
  );
}

export const LeagueMatchesLoading = () => {
  return (
    <div>
      {[...Array(4)].map((key) => (
        <div key={key}>
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-6 w-40 rounded bg-gray-200 mt-8"></div>
          </div>
          {[...Array(3)].map((key) => (
            <MatchCardLoading key={key} />
          ))}
        </div>
      ))}
    </div>
  );
};
