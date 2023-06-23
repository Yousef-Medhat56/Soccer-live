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
    // F2F History

    const f2fHistoryDiv = $(".historyChart div");
    const f2fHistoryArr: number[] = [];

    f2fHistoryDiv.each(function () {
      f2fHistoryArr.push(+$(this).find("p span").text());
    });

    // F2F Results

    const f2fResultsDiv = $(".card").eq(1);
    const arr = [];
    f2fResultsDiv.find(".TeamVsTeam").each(function () {
      // get the match date as a string
      const matchDateStr = $(this)
        .find(".dateAndPlace p")
        .contents()
        .eq(0)
        .text()
        .trim();
      //the regex pattern of the date format
      const matchDatePattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      //convert the string to a date object
      const matchDate = new Date(
        matchDateStr.replace(matchDatePattern, "$3-$2-$1")
      );

      // league
      const league = $(this).find(".dateAndPlace p span").text().trim();
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
