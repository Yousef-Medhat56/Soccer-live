export type PlayerDetails = {
  name: string;
  position: string;
  club: {
    name?: string;
    url?: string;
  };
  img?: string;
  nationality?: string;
  age?: number;
  height?: number;
  weight?: number;
};
