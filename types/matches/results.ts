import { TeamInMatch } from "./match";

export interface TeamResults extends TeamInMatch {
  scorers?: {
    name: string;
    time: string;
  }[];
}

export type MatchResults = {
  home: TeamResults;
  away: TeamResults;
  league: {
    url: string;
    name: string;
  };
  status: string;
  info: { matchDate?: string; matchTime?: string; stadium?: string };
};
