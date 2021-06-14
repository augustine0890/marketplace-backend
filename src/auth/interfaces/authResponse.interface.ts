export interface AuthResponse {
  id: number;
  email: string;
  expires_in: string;
  access_token: string;
  // refresh_token: string;
  token_type: string;
}
