export type Match = {
  matchId: string;
  matchStatus: string;
  league?:String;
  matchTime?: string;
  homeName: string;
  homeImg?: string;
  homeUrl?: string;
  homeScore?: string;
  awayName: string;
  awayImg?: string;
  awayUrl?: string;
  awayScore?: string;
};

export type LeagueMatches = {
  leagueId: string;
  leagueName: string;
  leagueImg?: string;
  matches: Match[];
};
