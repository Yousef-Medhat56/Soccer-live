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

  //get "round" value from query string
  const round = new URL(req.url as string).searchParams.get("round");

  let url = round
    ? `https://www.btolat.com/league/fixtures/${id}/${slug}?week=${round}`
    : `https://www.btolat.com/league/fixtures/${id}/${slug}`;

  //fetch data
  let response = await fetch(url,{ next: { revalidate: 60 } });

  let data = await response.text();

  //load data to cheerio
  let $ = cheerio.load(data);

  //if the round value is invalid, refetch the page without the round query string
  if (round && !$(".matchtableX").length && $("select").length) {
    url = `https://www.btolat.com/league/fixtures/${id}/${slug}`;
    response = await fetch(url,{ next: { revalidate: 60 } });
    data = await response.text();
    $ = cheerio.load(data);
  }

  //check if the fixtures table exists
  if ($(".matchtableX").length) {
    //rounds array
    const roundsArr: OptionTag[] = [];

    //the selected round
    let selectedRound: String = "";

    //loop through rounds
    $("option").each(function () {
      const roundName = $(this).text().trim();
      const roundQueryStr = $(this).attr("value")!.split("=")[1];

      //check if the round is selected
      if ($(this).attr("selected")) selectedRound = roundQueryStr;

      roundsArr.push({ name: roundName, queryStr: roundQueryStr });
    });

    return new Response(
      JSON.stringify({
        data: {
          rounds: roundsArr,
          selectedRound: {
            roundQueryStr: selectedRound,
          },
        },
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        data: {
          league: `${id}/${slug}`,
          message: `League rounds are not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
