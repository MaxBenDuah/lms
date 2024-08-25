import { useQuery } from "@tanstack/react-query";
import { getLeaveRequest } from "../../services/apiEmployees";

export function useGetLeaveRequest(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["leaveRequest", id],
    queryFn: () => getLeaveRequest(id),
    enabled: !!id,
  });

  return { data, isLoading, isError, error };
}
