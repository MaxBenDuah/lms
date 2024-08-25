import { useQuery } from "@tanstack/react-query";
import { getCurrentUserSession } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserSession,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
