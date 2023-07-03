import { PlayerInLineup, TeamLineup } from "@/types/matches/lineup";
import * as cheerio from "cheerio";

//players positions by number of formation lines
const positionsByFormLines = {
  3: ["D", "M", "F"], //ex: 4-3-3
  4: ["D", "DM", "AM", "F"], //ex: 4-2-3-1
  5: ["D", "DM", "M", "AM", "F"], //ex: 4-1-2-1-2
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
    shirtNumber: orderedPlayersList[0].Number,
    positionNumber: orderedPlayersList[0].formation_pos,
  };

  const team: TeamLineup = {
    formation: teamForm,
    mainPlayers: {
      GK: goalkeeper,
      D: [],
      DM: [],
      M: [],
      AM: [],
      F: [],
    },
  };

  let playerIndex = 1;
  teamFormArr.forEach((x, index) => {
    for (let i = 0; i < x; i++) {
      const newPlayer = {
        name: orderedPlayersList[playerIndex].Name,
        shirtNumber: orderedPlayersList[playerIndex].Number,
        positionNumber: orderedPlayersList[playerIndex].formation_pos,
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
      shirtNumber: +$(this).find(".playerNumber").text(),
    };
    substitutesArr.push(newPlayer);
  });

  return substitutesArr;
};
