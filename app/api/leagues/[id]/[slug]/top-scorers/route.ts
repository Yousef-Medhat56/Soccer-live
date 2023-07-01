import * as cheerio from "cheerio";
import { getTopScorers, sortTopScorers } from "./utils";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: number; slug: string };
  }
) {
  const { id, slug } = params;
  const url = `https://www.btolat.com/league/topscores/${id}/${slug}`;
  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the top scorers table exists
  if ($(".topScores").length) {
    //top scorers array
    const topScorersArr = getTopScorers($);
    topScorersArr.sort(sortTopScorers) //sort top scorers by their goals
    return new Response(
      JSON.stringify({ data: { topScorers: topScorersArr } })
    );
  } else {
    return new Response(
      JSON.stringify({
        data: {
          league: `${id}/${slug}`,
          message: `League top scorers are not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
