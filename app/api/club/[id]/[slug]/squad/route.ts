import { PlayerInSquad } from "@/types/club/player";
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
  let response = await fetch(url, { next: { revalidate: 60 } });

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the squad table exists
  if ($(".leagueTable tbody tr").length) {
    //players array
    const squad: PlayerInSquad[] = [];
    const isNationalTeam =
      $(".leagueTable thead th").eq(2).text().trim() == "الفريق";
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
          // player nationality or club
          else if (index == 2) {
            isNationalTeam
              ? (player.club = $(this).text().trim())
              : (player.nationality = $(this).text().trim());
          }
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

    return new Response(JSON.stringify({ data: { squad, isNationalTeam } }));
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
