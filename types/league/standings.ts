export type TeamInStandings = {
  order: Number;
  teamData: {
    name: String;
    url: String;
    img: String;
  };
  matchesPlayed: Number;
  wins: Number;
  draws: Number;
  losses: Number;
  goalsFor: Number;
  goalsAgainst: Number;
  goalsDiff: Number;
  points: Number;
};

export type GroupStandings = {
  groupName?:String,
  standings:TeamInStandings[]
}


