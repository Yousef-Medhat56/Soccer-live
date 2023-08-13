export type MatchEvent = {
  eventType: string;
  isTitle?: boolean;
  atHomeTeam?: boolean; //determine event happened for the home or away team
  eventTime?: string;
  playerName?: string;
  substituteName?: string;
};
