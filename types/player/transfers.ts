type Club = {
  name: string;
  img?: string;
  url: string;
};

export type Transfer = {
  from: Club;
  to: Club;
  date: string;
  type: string;
  price?: string;
};

export type PlayerTransfers = {
  playerName: string;
  playerImg?: string;
  trasnfers: Transfer[];
};
