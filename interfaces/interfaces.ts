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
  badgeCount: string;
  tournamentBadgeCount: number;
  about?: string;
}
