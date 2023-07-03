import { LeagueLink } from "../league/league";

export type ClubDetails = {
  name: String;
  country?: String;
  foundationYear?: Number;
  manager?: String;
  stadium?: String;
  participatingLeagues: LeagueLink[]; //the leagues that the club participate in
};
