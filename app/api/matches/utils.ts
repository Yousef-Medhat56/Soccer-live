import { Match } from "@/types/matches/match";
import * as cheerio from "cheerio";

export const getMatches = (
  $: cheerio.CheerioAPI,
  element: cheerio.Cheerio<cheerio.Element>
): Match[] => {
  //matches array
  const matchesArr: Match[] = [];

  //loop through matches
  element.find(".fullMatchBox").each(function () {
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
      id: $(this).find("a.stat").attr("href")!.split("/")[3],
      status: matchStatus!,
      time: $(this).find(".matchDate span").text() || undefined,
      home: {
        name: homeTeamElm.find(".teamName").text(),
        img: homeTeamElm.find("img").attr("src"),
        url: homeTeamElm.attr("href"),
        goals: $(this).find(".team1G").text() || undefined,
      },
      away: {
        name: awayTeamElm.find(".teamName").text(),
        img: awayTeamElm.find("img").attr("src"),
        url: awayTeamElm.attr("href"),
        goals: $(this).find(".team2G").text() || undefined,
      },
    };

    matchesArr.push(match);
  });
  return matchesArr;
};
