import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_RULES, type RouteRule } from "../types/auth.types";
import { useAuth } from "@/features/auth/hooks/use-auth";
import PageLoader from "@/components/PageLoader";

interface Props {
  rules: RouteRule[];
  fallbackUrl?: string;
}

const ProtectedRoute = ({ rules, fallbackUrl = "/" }: Props) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <PageLoader />;

  if (rules.includes(ROUTE_RULES.REQUIRE_GUEST) && isAuthenticated)
    return <Navigate to={fallbackUrl} replace />;

  if (rules.includes(ROUTE_RULES.REQUIRE_AUTH) && !isAuthenticated)
    return <Navigate to={fallbackUrl} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
