import { GroupStandings } from "../league/standings";

export type TeamInMatch = {
  name: string;
  teamlUrl: string;
  teamImg: string;
  teamGoals: number;
};

export type Match = {
  date: string;
  league: string;
  homeTeam: TeamInMatch;
  awayTeam: TeamInMatch;
};

export type F2FHistory = {
  total: number;
  homeWins: number;
  draw: number;
  awayWins: number;
};

export type MatchHistoryDetails = {
  //face to face history
  f2fHistory: F2FHistory;
  f2fResults?: Match[]; //face to face results
  f2fBigWins?: Match[]; //face to face big wins
  homeLastMatches?: Match[];
  awayLastMatches?: Match[];
  standings?: GroupStandings[];
};
