export interface User {
  user_id: string;
  username: string;
  pp_rank: string;
  pp_country_rank: string;
  bws_rank: number;
  country: string;
  level: string;
  pp_raw: string;
  accuracy: string;
  avatar_url: string;
  badge_count: string;
  tournament_badge_count: number;
}

export interface Player extends User {
  about: string;
}

export interface Captain extends Player {
  order: number;
  username_clean: string;
}

export interface Team {
  captain: Captain;
  players: Player[];
}

export interface PickedPlayer {
  player: Player;
  originalIndex: number;
}
