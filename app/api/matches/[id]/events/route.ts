import { MatchEvent } from "@/types/matches/event";
import { removePartfromStr } from "@/utils/string-manipulator";
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
  let response = await fetch(url, { next: { revalidate: 60 } });

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
          eventType: removePartfromStr(
            $(this).find("img").attr("src")!,
            "https://static.btolat.com/images/"
          ).split(".")[0],
          playerName: $(this).find("b").text(),
          substituteName: $(this).find("span").text() || undefined,
        });
      } else {
        matchEvents.push({
          eventType: $(this).text(),
          isTitle: true,
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
