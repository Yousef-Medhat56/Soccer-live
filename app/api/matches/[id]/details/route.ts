import {
  F2FHistory,
  MatchHistoryDetails,
} from "@/types/matches/history-details";
import * as cheerio from "cheerio";
import { getOldMatchesArr } from "./utils";
import { getStandings } from "@/app/api/leagues/[id]/[slug]/standings/utils";
import { GroupStandings } from "@/types/league/standings";
import { Match } from "@/types/matches/match";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  const url = `https://www.btolat.com/matches/details/${id}`;
  //fetch data
  let response = await fetch(url,{ next: { revalidate: 60 } });

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the details page loaded correctly
  if ($(".quickView").length) {
    // F2F History

    const f2fHistoryDiv = $(".historyChart div");
    const f2fHistoryArr: number[] = [];

    //Home name
    const homeName = $(".teamA .teamNameX").text().trim();
    //Away name
    const awayName = $(".teamB .teamNameX").text().trim();

    let totalF2F = 0; //total times the 2 teams faced each other
    f2fHistoryDiv.each(function () {
      const num = +$(this).find("p span").text();
      totalF2F += num;
      f2fHistoryArr.push(num);
    });

    const f2fHistory: F2FHistory = {
      total: totalF2F,
      homeWins: f2fHistoryArr[0],
      draw: f2fHistoryArr[1],
      awayWins: f2fHistoryArr[2],
    };

    // F2F Results
    let f2fResultsArr: Match[] = [];

    //Big wins
    let bigWinsArr: Match[] = [];

    //check if the 2 teams have faced each other before
    if (totalF2F > 0) {
      const f2fResultsDiv = $(".card").eq(1);
      //F2F results array
      f2fResultsArr = getOldMatchesArr($, f2fResultsDiv);

      //  Get face 2 face big wins
      $(".tabTitle").each(function () {
        //find big wins section in the page
        if ($(this).find("span").text() == "أكبر فوز") {
          const bigWinsDiv = $(this).parent().find(".card");
          // big wins array
          bigWinsArr = getOldMatchesArr($, bigWinsDiv);
        }
      });
    }

    //standings array
    let standings: GroupStandings[] = [];

    //check if the standings table exists
    if ($(".leagueTable").length) {
      standings = getStandings($, $(".leagueTable"));
    }

    const sectionsLength = $(".card").length;

    //home last matches
    const homeLastMatchesDiv = $(".card").eq(sectionsLength - 2);
    const homeLastMatchesArr = getOldMatchesArr($, homeLastMatchesDiv);

    //away last matches
    const awayLastMatchesDiv = $(".card").eq(sectionsLength - 1);
    const awayLastMatchesArr = getOldMatchesArr($, awayLastMatchesDiv);

    // create MatchHistoryDetails object
    const matchHistoryDetails: MatchHistoryDetails = {
      f2fHistory,
      f2fResults: f2fResultsArr,
      f2fBigWins: bigWinsArr,
      homeLastMatches: homeLastMatchesArr,
      awayLastMatches: awayLastMatchesArr,
      standings,
    };

    return new Response(
      JSON.stringify({
        data: {
          homeName,
          awayName,
          ...matchHistoryDetails,
        },
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        data: {
          matchId: id,
          message: `Match details are not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
