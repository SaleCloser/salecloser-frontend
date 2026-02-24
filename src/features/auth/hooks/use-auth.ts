import { AuthContext } from "@/features/auth/providers/AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth must be wrapped into AuthProvider component");

  return context;
};
