import { PlayerInLineup, TeamLineup } from "@/types/matches/lineup";
import * as cheerio from "cheerio";

//players positions by number of formation lines
const positionsByFormLines = {
  3: ["df", "cm", "fw"], //ex: 4-3-3
  4: ["df", "cdm", "cam", "fw"], //ex: 4-2-3-1
  5: ["df", "cdm", "cm", "cam", "fw"], //ex: 4-1-2-1-2
};

type Player = {
  Name: string;
  Number: number;
  formation_pos: number;
};

//sort players by their position number ascendingly
export const sortPlayersByPos = (playersList: Player[]) => {
  playersList.sort((a, b) => a.formation_pos - b.formation_pos);
  return playersList;
};

export const createTeamFormation = (
  teamForm: string, //team formation, example: 4-3-3
  playersList: Player[]
) => {
  const orderedPlayersList = sortPlayersByPos(playersList);

  //split the team formation and convert it to numbers
  const teamFormArr = teamForm.split("-").map(Number);

  //@ts-ignore
  const teamFormLines = positionsByFormLines[teamFormArr.length];

  //goalkeeper data
  const goalkeeper: PlayerInLineup = {
    name: orderedPlayersList[0].Name,
    number: orderedPlayersList[0].Number,
    // positionNumber: orderedPlayersList[0].formation_pos,
  };

  const team: TeamLineup = {
    formation: teamForm,
    mainPlayers: {
      gk: goalkeeper,
      df: [],
      cdm: [],
      cm: [],
      cam: [],
      fw: [],
    },
  };

  let playerIndex = 1;
  teamFormArr.forEach((x, index) => {
    for (let i = 0; i < x; i++) {
      const newPlayer = {
        name: orderedPlayersList[playerIndex].Name,
        number: orderedPlayersList[playerIndex].Number,
        // positionNumber: orderedPlayersList[playerIndex].formation_pos,
      };
      //@ts-ignore
      team.mainPlayers[teamFormLines[index]].push(newPlayer);
      playerIndex++;
    }
  });

  return team;
};

export const getSubsitutes = async (matchId: string, isHomeTeam: boolean) => {
  const url = `https://www.btolat.com/matches/lineup/${matchId}`;
  const response = await fetch(url);
  const data = await response.text();

  //load data to cheerio
  const $ = cheerio.load(data);

  const teamClass = isHomeTeam ? ".teamHome" : ".teamAway";

  const substitutesArr: PlayerInLineup[] = [];
  const substitutesHTML = $(`${teamClass} .playersAdditional .player`);

  substitutesHTML.each(function () {
    const newPlayer: PlayerInLineup = {
      name: $(this).find(".playerName").text(),
      number: +$(this).find(".playerNumber").text(),
    };
    substitutesArr.push(newPlayer);
  });

  return substitutesArr;
};
