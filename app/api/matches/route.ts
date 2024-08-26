import * as cheerio from "cheerio";
import { LeagueMatches } from "@/types/matches/match";
import { getMatches } from "./utils";
export async function GET(req: Request) {
  //get "date" value from query string
  const date = new URL(req.url as string).searchParams.get("date");

  const url = date
    ? `https://www.btolat.com/matches?d=${date}`
    : "https://www.btolat.com/matches";

  //fetch data
  let response = await fetch(url, { next: { revalidate: 60 } });

  //if the response is not successful, refetch the main url
  if (response.status !== 200) {
    response = await fetch(
      "https://www.btolat.com/matches",
      { next: { revalidate: 60 } }
    );
  }

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  const allMatches: LeagueMatches[] = [];
  const leagues: { id: string; name: string }[] = [];

  //loop through leagues
  $(".matchtableX").each(function () {
    const leagueId = $(this).attr("data-leg-name")!;
    const leagueName = $(this).find(".col h2").text()!;
    leagues.push({ id: leagueId, name: leagueName });

    const leagueSlugArr = $(this)
      .find(".newsLinks a")
      .eq(0)
      .attr("href")!
      .split("/");
    const leagueSlug = leagueSlugArr[leagueSlugArr.length - 1];

    const leagueImg = $(this).find(".col-2 img").attr("src");

    //get all matches in the league
    const matchesInLeague = getMatches($, $(this).find("ul"));

    allMatches.push({
      leagueId,
      leagueSlug,
      leagueName,
      leagueImg,
      matches: matchesInLeague,
    });
  });

  return new Response(JSON.stringify({ data: { leagues, allMatches } }));
}
