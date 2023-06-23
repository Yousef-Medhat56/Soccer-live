type TeamInMatch = {
  name: string;
  teamlUrl: string;
  teamImg: string;
  teamGoals: number;
};

type Match = {
  date: Date;
  league: string;
  homeTeam: TeamInMatch;
  awayTeam: TeamInMatch;
};

export type MatchHistoryDetails = {
  //face to face history
  f2fHistory: {
    homeWins: number;
    draw: number;
    awayWins: number;
  };
  f2fResults?: Match[]; //face to face results
  f2fBigWins?: Match[]; //face to face big wins
  homeLastMatches?: Match[];
  awayLastMatches?: Match[];
};
