import * as cheerio from "cheerio";
import { Match, TeamInMatch } from "@/types/history-details";

// get array of old matches details
export const getOldMatchesArr = (
  $: cheerio.CheerioAPI,
  element: cheerio.Cheerio<cheerio.Element>
): Match[] => {
  const oldMatchesArr: Match[] = [];
  element.find(".TeamVsTeam").each(function () {
    // get the match date
    const matchDate = $(this)
      .find(".dateAndPlace p")
      .contents()
      .eq(0)
      .text()
      .trim();

    // league
    const league = $(this).find(".dateAndPlace p span").text().trim();

    //home team
    const homeTeamDiv = $(this).find(".teamA");
    const homeTeam: TeamInMatch = {
      name: homeTeamDiv.find("a").text(),
      teamlUrl: homeTeamDiv.find("a").attr("href")!,
      teamImg: homeTeamDiv.find("img").attr("src")!,
      teamGoals: +homeTeamDiv.find("span").text(),
    };

    //away team
    const awayTeamDiv = $(this).find(".teamB");
    const awayTeam: TeamInMatch = {
      name: awayTeamDiv.find("a").text(),
      teamlUrl: awayTeamDiv.find("a").attr("href")!,
      teamImg: awayTeamDiv.find("img").attr("src")!,
      teamGoals: +awayTeamDiv.find("span").text(),
    };

    const match: Match = {
      league,
      date: matchDate,
      homeTeam,
      awayTeam,
    };
    oldMatchesArr.push(match);
  });

  return oldMatchesArr;
};
