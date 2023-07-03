export type TeamInMatch = {
  name: string;
  url?: string;
  img?: string;
  goals?: string;
};

export type Match = {
  id: string;
  status: string;
  league?:String;
  time?: string;
  home: TeamInMatch;
  away: TeamInMatch;
};

export type LeagueMatches = {
  leagueId: string;
  leagueName: string;
  leagueImg?: string;
  matches: Match[];
};
