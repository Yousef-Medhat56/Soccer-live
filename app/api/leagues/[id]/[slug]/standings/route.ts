import * as cheerio from "cheerio";
import { getStandings } from "./utils";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: number; slug: string };
  }
) {
  const { id, slug } = params;
  const url = `https://www.btolat.com/league/standings/${id}/${slug}`;
  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the league table exists
  if ($(".leagueTable").length) {
    const leagueStandings = getStandings($,$(".leagueTable"));
    return new Response(JSON.stringify({ data: { groups: leagueStandings } }));
  } else {
    return new Response(
      JSON.stringify({
        data: {
          league: `${id}/${slug}`,
          message: `League standings are not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
