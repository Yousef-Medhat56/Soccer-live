import { GroupStandings, TeamInStandings } from "@/types/league/standings";
import * as cheerio from "cheerio";

export const getStandings = ($: cheerio.CheerioAPI): GroupStandings[] => {
  const leagueStandings: GroupStandings[] = [];
  $(".leagueTable").each(function () {
    const groupTitle = $(this).find(".groupTitle").text();
    const teamStandings: TeamInStandings[] = []; 
    
    $(this)
      .find("tbody tr")
      .each(function () {
        const team: TeamInStandings = {
          order: 0,
          teamData: {
            name: "",
            url: "",
            img: "",
          },
          matchesPlayed: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalsDiff: 0,
          points: 0,
        };

        const teamObjKeys = Object.keys(team);
        $(this)
          .children()
          .each(function (index) {
            if (index == 1) {
              team["teamData"].name = $(this).find("a").text().trim(); //team name
              team["teamData"].url = $(this).find("a").attr("href")!; //team url
              team["teamData"].img = $(this).find("img").attr("src")!; //team image
            }

            //@ts-ignore
            else team[teamObjKeys[index]] = +$(this).text();
          });
        teamStandings.push(team);
      });
    leagueStandings.push({ groupName: groupTitle, standings: teamStandings });
  });
  return leagueStandings;
};