import * as cheerio from "cheerio";
import { Match, LeagueMatches } from "@/types/match";
export async function GET(req: Request) {
  //get "date" value from query string
  const date = new URL(req.url as string).searchParams.get("date");

  const url = date
    ? `https://www.btolat.com/matches/PartialMatchesPage?d=${date}`
    : "https://www.btolat.com/matches/PartialMatchesPage";

  //fetch data
  let response = await fetch(url);

  //if the response is not successful, refetch the main url
  if (response.status !== 200) {
    response = await fetch("https://www.btolat.com/matches/PartialMatchesPage");
  }

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  const allMatches: LeagueMatches[] = [];

  $(".matchtableX").each(function () {
    const leagueId = $(this).attr("data-leg-name")!;
    const leagueName = $(this).find(".col h2").text()!;
    const leagueImg = $(this).find(".col-2 img").attr("src");

    const matchesInLeague: Match[] = [];
    $(this)
      .find("ul")
      .children()
      .each(function () {
        //Match status
        let matchStatus: string;
        switch ($(this).find(".status").text()) {
          case "لم تبدأ":
            matchStatus = "not started";
            break;
          case "مباشر":
            matchStatus = "live";
            break;
          case "انتهت":
            matchStatus = "finished";
        }

        // Home team
        const homeTeamElm = $(this).find(".team1");

        //Away team
        const awayTeamElm = $(this).find(".team2");

        //create match object
        const match: Match = {
          matchId: $(this).attr("id")!,
          matchStatus: matchStatus!,
          matchTime: $(this).find(".matchDate span").text() || undefined,
          homeName: homeTeamElm.find(".teamName").text(),
          homeImg: homeTeamElm.find("img").attr("src"),
          homeUrl: homeTeamElm.attr("href"),
          homeScore: $(this).find(".team1G").text() || undefined,
          awayName: awayTeamElm.find(".teamName").text(),
          awayImg: awayTeamElm.find("img").attr("src"),
          awayUrl: awayTeamElm.attr("href"),
          awayScore: $(this).find(".team2G").text() || undefined,
        };

        matchesInLeague.push(match);
      });

    allMatches.push({
      leagueId,
      leagueName,
      leagueImg,
      matches: matchesInLeague,
    });
  });

  return new Response(JSON.stringify({ data: { allMatches } }));
}
