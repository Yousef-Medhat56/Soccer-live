import { getMatches } from "@/app/api/matches/utils";
import { matchesInDay } from "@/types/league/matches";
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

  //get "round" value from query string
  const round = new URL(req.url as string).searchParams.get("round");

  const url = round
    ? `https://www.btolat.com/league/fixtures/${id}/${slug}?week=${round}`
    : `https://www.btolat.com/league/fixtures/${id}/${slug}`;

  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the fixtures table exists
  if ($(".leagueTables").length) {
    //array of matches in the round
    const roundMatches: matchesInDay[] = [];

    //loop through days
    $("div.matchDate").each(function (index) {
      const date = $(this).find("h4").text();

      //get all matches of the day
      const matchesArr = getMatches($, $(this).parent().find("ul").eq(index));

      roundMatches.push({
        date,
        matches: matchesArr,
      });
    });

    return new Response(JSON.stringify({ data: { roundMatches } }));
  } else {
    return new Response(
      JSON.stringify({
        data: {
          league: `${id}/${slug}`,
          message: `League matches are not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
