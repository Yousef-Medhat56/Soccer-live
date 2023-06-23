import { MatchEvent } from "@/types/event";
import { MatchHistoryDetails } from "@/types/history-details";
import * as cheerio from "cheerio";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  const url = `https://www.btolat.com/matches/details/${id}`;
  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the details page loaded correctly
  if ($(".quickView").length) {
    const f2fHistoryDiv = $(".historyChart div");
    const f2fHistoryArr: number[] = [];

    f2fHistoryDiv.each(function () {
      f2fHistoryArr.push(+$(this).find("p span").text());
    });

    return new Response(JSON.stringify({ data: f2fHistoryArr }));
  } else {
    return new Response(
      JSON.stringify({
        data: {
          matchId: id,
          message: `Match details are not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
