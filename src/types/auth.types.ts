export const ROUTE_RULES = {
  REQUIRE_AUTH: "require-authenticated",
  REQUIRE_GUEST: "require-not-authenticated",
  REQUIRE_OWNER: "require-owner",
} as const;

export type RouteRule = (typeof ROUTE_RULES)[keyof typeof ROUTE_RULES];

export interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading?: boolean;
}
