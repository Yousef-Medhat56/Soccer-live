export type MatchStats = {
  matchId: string;
  possession: {
    home: number;
    away: number;
  };
  goals: {
    home: number;
    away: number;
  };
  shots: {
    home: number;
    away: number;
  };
  targetShots: {
    home: number;
    away: number;
  };
  offside: {
    home: number;
    away: number;
  };
  yellowCards: {
    home: number;
    away: number;
  };
  redCards: {
    home: number;
    away: number;
  };
  saves: {
    home: number;
    away: number;
  };
  fouls: {
    home: number;
    away: number;
  };
};
