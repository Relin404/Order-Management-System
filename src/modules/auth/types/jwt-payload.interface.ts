export interface JwtPayload {
  sub: number;
  email: string;
  expiration?: number;
  issuedAt?: number;
}
