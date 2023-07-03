import { LeagueLink } from "@/types/league/league";
import { removePartfromStr } from "@/utils/string-manipulator";
import * as cheerio from "cheerio";

export const getLeagues = (
  $: cheerio.CheerioAPI,
  element: cheerio.Cheerio<cheerio.Element>
): LeagueLink[] => {
  
    //leagues array
  const leaguesArr: LeagueLink[] = [];

  //loop through leagues
  element.find(".leagueBox").each(function () {
    const league: LeagueLink = {
      name: $(this).find("h3").text(),
      img: $(this).find("img").attr("src"),
      url: removePartfromStr($(this).attr("href")!,"/league/"),
    };
    leaguesArr.push(league);
  });

  return leaguesArr;
};
