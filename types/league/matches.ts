import { Match } from "../matches/match";

export type MatchesInDay = {
  date: String;
  matches: Match[];
};

export type OptionTag = {
  name: String;
  queryStr: String;
};
