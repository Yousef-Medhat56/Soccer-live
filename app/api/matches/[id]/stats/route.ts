import { MatchStats } from "@/types/matches/stats";
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
  const url = `https://www.btolat.com/matches/statistics/${id}`;
  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the match statistics is available
  if ($("canvas").data()) {
    //get array of statistics
    const matchData = $("canvas").data()["teamx"] as {
      teamXCA: number;
      teamXCB: number;
    }[];

    //create stats objects
    const stats: MatchStats = {
      matchId: id,
      possession: {
        home: +$("canvas").attr("teamas")!,
        away: 100 - +$("canvas").attr("teamas")!,
      },
      goals: {
        home: matchData[0].teamXCA,
        away: matchData[0].teamXCB,
      },
      yellowCards: {
        home: matchData[1].teamXCA,
        away: matchData[1].teamXCB,
      },
      redCards: {
        home: matchData[2].teamXCA,
        away: matchData[2].teamXCB,
      },
      shots: {
        home: matchData[3].teamXCA,
        away: matchData[3].teamXCB,
      },
      targetShots: {
        home: matchData[4].teamXCA,
        away: matchData[4].teamXCB,
      },
      offside: {
        home: matchData[5].teamXCA,
        away: matchData[5].teamXCB,
      },
      saves: {
        home: matchData[6].teamXCA,
        away: matchData[6].teamXCB,
      },
      fouls: {
        home: matchData[7].teamXCA,
        away: matchData[7].teamXCB,
      },
    };

    return new Response(JSON.stringify({ data: stats }));
  } else {
    return new Response(
      JSON.stringify({
        data: {
          matchId: id,
          message: `Match statistics are not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
