import { TopScorer } from "@/types/league/top-scorer";
import { removePartfromStr } from "@/utils/string-manipulator";
import * as cheerio from "cheerio";

export const getTopScorers = ($: cheerio.CheerioAPI): TopScorer[] => {
  const topScorersArr: TopScorer[] = [];
  $(".topScores tr").each(function (row_index) {
    if (row_index > 0) {
      //create TopScorer object
      const topScorer: TopScorer = {
        playerData: {
          name: "",
        },
        clubData: {
          name: "",
        },
        goalsNum: 0,
      };

      $(this)
        .children()
        .each(function (col_index) {
          // scrape player data
          if (col_index == 1) {
            topScorer.playerData.name = $(this).find("b").text();
            topScorer.playerData.url = removePartfromStr(
              $(this).find("a").attr("href")!,
              "/player/"
            );
            topScorer.playerData.img = $(this).find("img").attr("src");
          }
          //scrape club data
          else if (col_index == 2) {
            topScorer.clubData.name = $(this).find("b").text();
            topScorer.clubData.url = removePartfromStr(
              $(this).find("a").attr("href")!,
              "/team/"
            );
            topScorer.clubData.img = $(this).find("img").attr("src");
          }
          //scrape goals number
          else if (col_index == 3) {
            topScorer.goalsNum = +$(this).find("div span").text();
          }
        });
      topScorersArr.push(topScorer);
    }
  });
  return topScorersArr;
};

//sort top scorers by their goals number
export const sortTopScorers = (a: TopScorer, b: TopScorer) => {
  if (a.goalsNum > b.goalsNum) {
    return -1;
  }
  if (a.goalsNum < b.goalsNum) {
    return 1;
  }
  return 0;
};
