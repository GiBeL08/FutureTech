export const DEFAULT_BLOG_SLUG =
  'the-rise-of-artificial-intelligence-in-healthcare';

export interface JwtPayload {
  userId: string;
  role: string;
}

export interface AuthUser {
  userId: string;
  role: string;
}
