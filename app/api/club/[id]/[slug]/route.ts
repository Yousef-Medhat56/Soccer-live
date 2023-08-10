import { ClubDetails } from "@/types/club/club";
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
  const url = `https://www.btolat.com/team/${id}/${slug}`;
  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the response is successful
  if (response.status === 200) {
    //club name
    const clubName = $(".details h2").text();

    //club logo
    const clubImg = $(".leagueTitle img").attr("src");

    return new Response(
      JSON.stringify({ data: { club: { name: clubName, img: clubImg } } })
    );
  } else {
    return new Response(
      JSON.stringify({
        data: {
          club: `${id}/${slug}`,
          message: `Club ddoesn't exist`,
        },
      }),
      { status: 404 }
    );
  }
}
