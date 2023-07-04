import { getMatches } from "@/app/api/matches/utils";
import { OptionTag } from "@/types/league/matches";
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

  //get "previous" value from query string
  const showPrevMatches = new URL(req.url as string).searchParams.get(
    "previous"
  );
  //get "league" value from query string
  const leagueId = new URL(req.url as string).searchParams.get("league");

  let url =
    showPrevMatches == "true"
      ? new URL(`https://www.btolat.com/team/matchesended/${id}/${slug}`)
      : new URL(`https://www.btolat.com/team/matches/${id}/${slug}`);

  leagueId && url.searchParams.set("leagueid", leagueId);

  //fetch data
  let response = await fetch(url);

  let data = await response.text();

  //load data to cheerio
  let $ = cheerio.load(data);

  //   if the league id value is invalid, refetch the page without the league id query string
  if (leagueId && !$(".matchtableX li").length && $("select").length) {
    url.searchParams.delete("leagueid"); //remove the league id query string
    response = await fetch(url);
    data = await response.text();
    $ = cheerio.load(data);
  }

  //check if the fixtures table exists
  if ($(".matchtableX li").length) {
    //tournaments array
    const tournamentsArr: OptionTag[] = [];
    //the selected tournament
    let selectedTournament = "";

    //loop through tournaments
    $("option").each(function (index) {
      if (index > 0) {
        const tournamentName = $(this).text().trim();
        const tournamentQueryStr = $(this).attr("value")!.split("=")[1];

        //check if the round is selected
        if ($(this).attr("selected")) selectedTournament = tournamentQueryStr;

        tournamentsArr.push({
          name: tournamentName,
          queryStr: tournamentQueryStr,
        });
      }
    });

    //get league names
    const matchesArr = getMatches($, $(".matchDate ul"));
    $(".matchDate li:even").each(function (index) {
      const leagueName = $(this).text().trim();
      matchesArr[index].league = leagueName;
    });

    return new Response(
      JSON.stringify({
        data: {
          tournaments: tournamentsArr,
          selectedTournament: {
            tournamentQueryStr: selectedTournament,
            matches: matchesArr,
          },
        },
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        data: {
          club: `${id}/${slug}`,
          message: `Club matches are not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
