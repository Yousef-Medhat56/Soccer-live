import { LeagueLink } from "@/types/league/league";
import * as cheerio from "cheerio";
import { getLeagues } from "./utils";

export async function GET(req: Request) {
  const url = `https://www.btolat.com/leagues`;
  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the response is successful
  if (response.status === 200) {
    const popularLeagues = getLeagues($, $(".mostLeagues").eq(0));
    const allLeagues = getLeagues($, $(".mostLeagues").eq(1));

    return new Response(
      JSON.stringify({
        data: { leagues: { popular: popularLeagues, all: allLeagues } },
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        data: {
          message: `Leagues are not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
