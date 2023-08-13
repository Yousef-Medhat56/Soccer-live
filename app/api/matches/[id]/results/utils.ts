import { TeamResults } from "@/types/matches/results";
import { removePartfromStr } from "@/utils/string-manipulator";
import * as cheerio from "cheerio";

const getGoalsScorers = (
  $: cheerio.CheerioAPI,
  teamElm: cheerio.Cheerio<cheerio.Element>
) => {
  const scorers: { name: string; time: string }[] = [];

  teamElm
    .find(".goals")
    .children()
    .each(function () {
      scorers.push({
        name: $(this).find(".goalPlayer").text(), //scorer name
        time: $(this).find(".goalTime").text(), //goal time
      });
    });

  return scorers;
};

export const getTeamResults = (
  $: cheerio.CheerioAPI,
  element: cheerio.Cheerio<cheerio.Element>,
  teamClassName: string
) => {
  const teamElm = element.find(`.${teamClassName}`);

  const teamResults: TeamResults = {
    name: teamElm.find(".teamNameX").text(),
    url: removePartfromStr(teamElm.find("a").attr("href")!, "/team/"),
    img: teamElm.find("img").attr("src")!,
    goals: element.find(`.${teamClassName}Score`).text().trim(),
    scorers: getGoalsScorers($, teamElm),
  };
  return teamResults;
};

export const getMatchInfo = (
  $: cheerio.CheerioAPI,
  element: cheerio.Cheerio<cheerio.Element>
) => {
  let matchDate: string | undefined;
  let matchTime: string | undefined;
  let stadium: string | undefined;

  element.find(".lam").each(function () {
    const key = removePartfromStr(
      $(this).find("img").attr("src")!,
      "/assets/images/"
    ).replace(".png", "");

    if (key == "event") matchDate = $(this).find("span").text(); //match date
    else if (key == "stopwatch")
      matchTime = $(this).find("span").text(); //match time
    else if (key == "field") stadium = $(this).find("span").text(); //stadium
  });
  return { matchDate, matchTime, stadium };
};
