import { MatchResults } from "@/types/matches/results";
import { removePartfromStr } from "@/utils/string-manipulator";
import * as cheerio from "cheerio";
import { getMatchInfo, getTeamResults } from "./utils";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  const url = `https://www.btolat.com/matches/events/${id}`;
  //fetch data
  let response = await fetch(url, { cache: "no-cache" });

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the match results is available
  if ($(".matchCenterTable").length) {
    const matchResultsDiv = $(".matchCenterTable");
    //home results
    const homeResults = getTeamResults($, matchResultsDiv, "teamA");
    //away results
    const awayResults = getTeamResults($, matchResultsDiv, "teamB");

    //match date, time, stadium
    const info = getMatchInfo($, $(".lastNewsMatchCenter"));

    //league
    const league = {
      name: matchResultsDiv.find(".text-center a").text(),
      url: removePartfromStr(
        matchResultsDiv.find(".text-center a").attr("href")!,
        "/league/"
      ),
    };

    //match status
    const matchStatus = matchResultsDiv.find(".matchStatusAr").text();

    const matchResult: MatchResults = {
      home: homeResults,
      away: awayResults,
      league,
      status: matchStatus,
      info,
    };
    return new Response(
      JSON.stringify({
        data: matchResult,
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        data: {
          matchId: id,
          message: `Match results are not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
