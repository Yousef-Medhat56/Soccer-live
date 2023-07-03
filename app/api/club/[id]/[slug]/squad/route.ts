import { ClubDetails } from "@/types/club/club";
import { PlayerInSquad } from "@/types/club/player";
import { LeagueLink } from "@/types/league/league";
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
  const url = `https://www.btolat.com/team/squad/${id}/${slug}`;
  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the squad table exists
  if ($(".leagueTable tbody tr").length) {
    //players array
    const squad: PlayerInSquad[] = [];
    $(".leagueTable tbody tr").each(function () {
      //player object
      const player: PlayerInSquad = {
        name: "",
      };
      $(this)
        .children()
        .each(function (index) {
          //player name, url, image
          if (index == 0) {
            player.name = $(this).find("a").text().trim();
            player.url = removePartfromStr(
              $(this).find("a").attr("href")!,
              "/player/"
            );
            player.img = $(this).find("img").attr("src");
          }
          // player position
          else if (index == 1) player.position = $(this).text().trim();
          // player nationality
          else if (index == 2) player.nationality = $(this).text().trim();
          // player birth date
          else if (index == 3) {
            //date regex pattern
            const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
            player.birthDate = new Date(
              $(this).text().trim().replace(pattern, "$3-$2-$1")
            );
          }
        });
      squad.push(player);
    });

    return new Response(JSON.stringify({ data: { squad } }));
  } else {
    return new Response(
      JSON.stringify({
        data: {
          club: `${id}/${slug}`,
          message: `Club squad is not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
