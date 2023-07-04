import { PlayerDetails } from "@/types/player/player";
import {
  LeagueStats,
  PlayerStats,
  SeasonStats,
  TeamStats,
} from "@/types/player/stats";
import { removePartfromStr } from "@/utils/string-manipulator";
import * as cheerio from "cheerio";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: number; slug: string };
  }
) {
  const { id, slug } = params;
  const url = `https://www.btolat.com/player/statics/${id}/${slug}`;

  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the player stats exists
  if ($("table.leagueTable").length) {
    //create PlayerStats object
    const playerStats: PlayerStats = {
      playerName: removePartfromStr($(".leagueTitle h1").text(), "إحصائيات "),
      playerImg: $(".leagueTitle img").attr("src"),
      teams: [],
    };

    //loop through the teams that the player joined
    $("table.leagueTable").each(function () {
      //create YTeamStats object
      const teamStats: TeamStats = {
        teamName: $(this).find("caption").text().trim(),
        leagues: [],
      };

      //loop through the leagues that the team joined
      $(this)
        .find("table")
        .each(function () {
          //create LeagueStats object
          const leagueStats: LeagueStats = {
            leagueName: $(this).find("thead th span").text(),
            leagueImg: $(this).find(".icon-team img").attr("src"),
            seasons: [],
          };

          //loop through the seasons of the league
          $(this)
            .find("tbody tr")
            .each(function () {
              //create SeasonStats object
              const seasonStats: SeasonStats = {
                seasonName: $(this).find("td").eq(0).text(),
                stats: {
                  appearances: +$(this).find("td").eq(1).text(),
                  minutesPlayed: +$(this).find("td").eq(2).text(),
                  cards: {
                    yellow: +$(this).find("td").eq(3).text(),
                    red: +$(this).find("td").eq(4).text(),
                    yellowThenRed: +$(this).find("td").eq(5).text(),
                  },
                  goals: +$(this).find("td").eq(6).text(),
                },
              };
              leagueStats.seasons.push(seasonStats);
            });
          teamStats.leagues.push(leagueStats);
        });
      playerStats.teams.push(teamStats);
    });
    
    return new Response(JSON.stringify({ data: { playerStats } }));
  } else {
    return new Response(
      JSON.stringify({
        data: {
          club: `${id}/${slug}`,
          message: `Player statistics is not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
