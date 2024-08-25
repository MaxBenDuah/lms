import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../../services/apiEmployees";

// This should be .js not jsx so check and fix later
export function useGetCurrentUser(userProfile) {
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["currentUser", userProfile],
    queryFn: () => fetchCurrentUser(userProfile),
    enabled: !!userProfile,
  });

  // console.log(profile);

  return { profile, isLoading, isError, error };
}
