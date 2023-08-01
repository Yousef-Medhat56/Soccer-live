"use client";
import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import format from "date-fns/format";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useState } from "react";
import { isValid, parse } from "date-fns";
import SelectLeague from "../filter/select-league";
import MatchesDayPicker from "../filter/day-picker";
import DaysSlider from "../filter/days-slider";
import MatchCard, { MatchCardLoading } from "../match-card";
import { LeagueMatches, Match } from "@/types/matches/match";

//swr fetcher
const fetcher = (url: URL, init?: RequestInit) =>
  fetch(url).then((r) => r.json());

export default function DayMatchesConatainer() {
  const searchParams = useSearchParams();

  let matchDate = searchParams.get("date");

  //check if the date value in search params is valid
  const parsed = parse(matchDate!, "y-MM-dd", new Date());
  matchDate = isValid(parsed) ? matchDate : format(new Date(), "y-MM-dd");

  //URL
  const URL = matchDate
    ? process.env.NEXT_PUBLIC_URL + `/api/matches?date=${matchDate}`
    : process.env.NEXT_PUBLIC_URL + "/api/matches";

  //Fetch matches data
  const { data: matches } = useSWR(URL, fetcher, {
    refreshInterval: 60,
  });

  const [selectedDay, setSelectedDay] = useState<Date>(
    matchDate ? new Date(matchDate) : new Date()
  );

  let leagueFilter = searchParams.get("league");
  leagueFilter = leagueFilter ? leagueFilter : "all";

  //validate the league id given in the search params
  const isLeagueIdValid = (
    leaguesArr: { id: string; name: string }[],
    givenId: string
  ) => {
    if (givenId == "all") return true;
    return leaguesArr.some((el) => el.id === givenId);
  };

  return (
    <>
      {/* SECTION HEADER START  */}
      <div>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text:xl md:text-2xl">جميع المباريات</h1>
          <div className="flex items-center justify-end">
            <SelectLeague
              leagues={matches && matches.data.leagues}
              filter={leagueFilter}
            />
            <MatchesDayPicker
              date={matchDate}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          </div>
        </div>

        {/* DAYS SLIDER START  */}
        <DaysSlider date={matchDate} setSelectedDay={setSelectedDay} />
        {/* DAYS SLIDER END  */}
      </div>

      {/* SECTION HEADER END  */}
      {matches ? (
        matches.data.allMatches.length ? (
          matches.data.allMatches.map((league: LeagueMatches) => {
            if (
              leagueFilter == "all" ||
              leagueFilter == league.leagueId ||
              !isLeagueIdValid(matches.data.leagues, leagueFilter!)
            )
              return (
                <div key={league.leagueId} className="py-4">
                  {/* HEADING START  */}
                  <div className="flex justify-between items-center mb-3">
                    <Link
                      href={`/leagues/${league.leagueId}/${league.leagueSlug}`}
                    >
                      <h2 className="py-2 font-bold text:lg md:text-xl border-b-[3px] border-primary">
                        {league.leagueName}
                      </h2>
                    </Link>
                    <span className="flex text-primary font-bold text-sm md:text-base p-2 pl-1 rounded-md hover:bg-gray-100">
                      <Link
                        href={`/leagues/${league.leagueId}/${league.leagueSlug}`}
                      >
                        المزيد
                      </Link>
                      <ChevronLeftIcon className="text-primary w-6" />
                    </span>
                  </div>
                  {/* HEADING END  */}

                  {/* MATCHES CARDS START  */}
                  <div>
                    {league.matches.map((match: Match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                  {/* MATCHES CARDS END  */}
                </div>
              );
          })
        ) : (
          <h2 className="text-center text-lg text-label pt-6">
            لا يوجد مباريات
          </h2>
        )
      ) : (
        <MatchesCardsLoading />
      )}
    </>
  );
}

const MatchesCardsLoading = () => {
  return (
    <div className="py-4 animate-pulse">
      {[1, 2, 3, 4].map((key) => (
        <div key={key} className="py-4">
          <div className="flex justify-between items-center mb-3">
            <div className={`w-24 h-6 bg-gray-200`}></div>
            <div className={`w-14 h-6 bg-gray-200`}></div>
          </div>
          {[1, 2, 3].map((key) => (
            <MatchCardLoading key={key} />
          ))}
        </div>
      ))}
    </div>
  );
};
