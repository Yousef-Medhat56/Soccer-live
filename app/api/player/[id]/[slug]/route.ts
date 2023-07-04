import { PlayerDetails } from "@/types/player/player";
import { removePartfromStr } from "@/utils/string-manipulator";
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
  const url = `https://www.btolat.com/player/${id}/${slug}`;

  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the player details exists
  if ($(".info li").length) {
    //player details object
    const playerDetails: PlayerDetails = {
      name: "",
      position: "",
      club: {},
    };

    //player name
    playerDetails.name = $(".info strong").text();
    //player position
    playerDetails.position = $(".info .pos").text();
    //player image
    playerDetails.img = $(".playerImage img").attr("src");

    //loop through player details
    $(".info li").each(function () {
      const key = $(this).clone().children().remove().end().text();

      //player club
      if (key === "الفريق") {
        //club name
        playerDetails.club.name = $(this).find("span").text();
        //club image
        playerDetails.club.url = removePartfromStr(
          $(this).find("a").attr("href")!,
          "/team/"
        );
      }
      //player nationality
      else if (key === " الجنسيه :  ")
        playerDetails.nationality = $(this).find("span").text();
      // player age
      else if (key === "السن :  ")
        playerDetails.age = +$(this).find("span").text().split(" ")[0];
      // player height
      else if (key === "الطول :  ")
        playerDetails.height = +$(this).find("span").text().split(" ")[0];
      // player weight
      else if (key === "الوزن :  ")
        playerDetails.weight = +$(this).find("span").text().split(" ")[0];
    });

    return new Response(JSON.stringify({ data: { playerDetails } }));
  } else {
    return new Response(
      JSON.stringify({
        data: {
          club: `${id}/${slug}`,
          message: `Player data is not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
