import { PlayerTransfers, Transfer } from "@/types/player/transfers";
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
  const url = `https://www.btolat.com/player/transfers/${id}/${slug}`;

  //fetch data
  let response = await fetch(url);

  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  //check if the player transfers exists
  if ($(".playerTransfer").length) {
    // create PlayerTransfers object
    const playerTransfers: PlayerTransfers = {
      playerName: removePartfromStr($(".leagueTitle h1").text(), "إنتقالات "),
      playerImg: $(".leagueTitle img").attr("src"),
      trasnfers: [],
    };

    //loop through transfers
    $(".playerTransfer").each(function () {
      const transfer: Transfer = {
        from: {
          name: $(this).find(".transfer a").eq(0).text().trim(),
          url: removePartfromStr(
            $(this).find(".transfer a").eq(0).attr("href")!,
            "/team/"
          ),
          img: $(this).find(".transfer img").eq(0).attr("src"),
        },
        to: {
          name: $(this).find(".transfer a").eq(1).text().trim(),
          url: removePartfromStr(
            $(this).find(".transfer a").eq(1).attr("href")!,
            "/team/"
          ),
          img: $(this).find(".transfer img").eq(1).attr("src"),
        },
        date: $(this).find(".transferInfo li span").eq(0).text(),
        price: $(this).find(".transferInfo li span").eq(1).text(),
        type: $(this).find(".transferInfo li span").eq(2).text(),
      };

      //check if the transfer price is invalid
      if (transfer.price == "N/A" || transfer.price == "ــ")
        transfer.price = undefined;

      playerTransfers.trasnfers.push(transfer);
    });

    return new Response(JSON.stringify({ data: { playerTransfers } }));
  } else {
    return new Response(
      JSON.stringify({
        data: {
          club: `${id}/${slug}`,
          message: `Player transfers is not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
