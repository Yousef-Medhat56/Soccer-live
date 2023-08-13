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
  const url = `https://www.btolat.com/league/standings/${id}/${slug}`;
  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the league table exists
  if ($(".leagueTitle").length) {
    const leagueName = $(".leagueTitle img").attr("alt")!;
    return new Response(JSON.stringify({ data: { leagueName } }));
  } else {
    return new Response(
      JSON.stringify({
        data: {
          league: `${id}/${slug}`,
          message: `League doesn't exist`,
        },
      }),
      { status: 404 }
    );
  }
}
