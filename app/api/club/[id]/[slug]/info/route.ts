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
    //club details object
    const clubDetails: ClubDetails = {
      name: "",
      participatingLeagues: [],
    };

    //club name
    clubDetails.name = $(".details h2").text();

    //loop through club details
    $(".details h3").each(function () {
      const key = $(this).clone().children().remove().end().text();

      //club country
      if (key === "البلد ") clubDetails.country = $(this).find("span").text();
      //club foundation year
      else if (key === "تاريخ التأسيس ")
        clubDetails.foundationYear = +$(this).find("span").text();
      //club manager
      else if (key === "المدير الفني ")
        clubDetails.manager = $(this).find("span").text();
      //club stadium
      else if (key === "الملعب ")
        clubDetails.stadium = $(this).find("span").text();
    });

    //loop through the leagues that the club participate in
    $("h3 a").each(function () {
      const league: LeagueLink = {
        name: $(this).text(),
        url: removePartfromStr($(this).attr("href")!, "/league/"),
      };
      clubDetails.participatingLeagues.push(league);
    });

    return new Response(JSON.stringify({ data: { clubDetails } }));
  } else {
    return new Response(
      JSON.stringify({
        data: {
          club: `${id}/${slug}`,
          message: `Club data is not available.`,
        },
      }),
      { status: 404 }
    );
  }
}