export type PlayerInLineup = {
  name: string;
  number: number;
  // positionNumber?: number;
};

export type TeamLineup = {
  formation: string;
  substitutes?: PlayerInLineup[];
  mainPlayers: {
    gk: PlayerInLineup; //goalkeeper
    df: PlayerInLineup[]; //defenders
    cm?: PlayerInLineup[]; //midfielders
    cdm?: PlayerInLineup[]; //defensive midfielders
    cam?: PlayerInLineup[]; //attacking midfielders
    fw: PlayerInLineup[]; //forward
  };
};
