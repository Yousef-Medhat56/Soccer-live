export type PlayerInLineup = {
  name: string;
  shirtNumber: number;
  positionNumber?: number;
};

export type TeamLineup = {
  formation: string;
  substitutes?: PlayerInLineup[];
  mainPlayers: {
    GK: PlayerInLineup; //goalkeeper
    D: PlayerInLineup[]; //defenders
    M?: PlayerInLineup[]; //midfielders
    DM?: PlayerInLineup[]; //defensive midfielders
    AM?: PlayerInLineup[]; //attacking midfielders
    F: PlayerInLineup[]; //forward
  };
};
