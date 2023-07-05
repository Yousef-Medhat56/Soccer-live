import * as cheerio from "cheerio";
import { Match, TeamInMatch } from "@/types/matches/match";
import { removePartfromStr } from "@/utils/string-manipulator";

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
      url: removePartfromStr(homeTeamDiv.find("a").attr("href")!, "/team/"),
      img: homeTeamDiv.find("img").attr("src")!,
      goals: homeTeamDiv.find("span").text(),
    };

    //away team
    const awayTeamDiv = $(this).find(".teamB");
    const awayTeam: TeamInMatch = {
      name: awayTeamDiv.find("a").text(),
      url: removePartfromStr(awayTeamDiv.find("a").attr("href")!, "/team/"),
      img: awayTeamDiv.find("img").attr("src")!,
      goals: awayTeamDiv.find("span").text(),
    };

    const match: Match = {
      id: "",
      status: "finished",
      league,
      time: matchDate,
      home: homeTeam,
      away: awayTeam,
    };
    oldMatchesArr.push(match);
  });

  return oldMatchesArr;
};
