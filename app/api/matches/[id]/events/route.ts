import { MatchEvent } from "@/types/event";
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
  const url = `https://www.btolat.com/matches/events/${id}`;
  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //events timeline
  const timeline = $(".timeline ul"); 

  //check if the match events are available
  if (timeline.children().length) {
    const matchEvents: MatchEvent[] = [];
    
    timeline.children().each(function () {
      if (!$(this).hasClass("titleTL")) {
        matchEvents.push({
          atHomeTeam: $(this).hasClass("rightTL"),
          eventTime: $(this).find("time").text().split(" ")[0]!,
          eventImg: $(this).find("img").attr("src"),
          playerName: $(this).find("b").text(),
          substituteName: $(this).find("span").text() || undefined,
        });
      }
    });

    return new Response(JSON.stringify({ data: matchEvents }));
  } else {
    return new Response(
      JSON.stringify({
        data: {
          matchId: id,
          message: `Match events are not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
