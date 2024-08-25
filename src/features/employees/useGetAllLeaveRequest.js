import { useQuery } from "@tanstack/react-query";
import { getAllLeaveRequest } from "../../services/apiEmployees";

export function useGetAllLeaveRequest() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allLeaveRequest"],
    queryFn: getAllLeaveRequest,
  });

  return { data, isLoading, isError, error };
}
