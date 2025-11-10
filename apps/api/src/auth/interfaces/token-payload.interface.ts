export interface TokenPayload {
  sub: string;
  username: string;
  iat?: number;
  exp?: number;
}
