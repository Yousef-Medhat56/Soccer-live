import { Match } from "@/types/matches/match";
import * as cheerio from "cheerio";

export const getMatches = (
  $: cheerio.CheerioAPI,
  element: cheerio.Cheerio<cheerio.Element>
): Match[] => {
  //matches array
  const matchesArr: Match[] = [];

  //loop through matches
  element
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
        matchId: $(this).find("a.stat").attr("href")!.split("/")[3],
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

      matchesArr.push(match);
    });
  return matchesArr;
};
