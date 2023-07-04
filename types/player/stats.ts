export type SeasonStats = {
  seasonName: string;
  stats: {
    appearances: number;
    minutesPlayed: number;
    cards: {
      yellow: number;
      red: number;
      yellowThenRed: number;
    };
    goals: number;
  };
};

export type LeagueStats = {
  leagueName: string;
  leagueImg?: string;
  seasons: SeasonStats[];
};

export type TeamStats = {
  teamName: string;
  leagues: LeagueStats[];
};

export type PlayerStats = {
  playerName: string;
  playerImg?: string;
  teams: TeamStats[];
};
