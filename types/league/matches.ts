import { Match } from "../matches/match";

export type MatchesInDay = {
  date: String;
  matches:Match[]
};

export type Round = {
  name:String;
  queryStr:String;
}