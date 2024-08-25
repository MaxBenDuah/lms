import { useQuery } from "@tanstack/react-query";
import { fetchLeaveRequestById } from "../../services/apiEmployees";
import { useSearchParams } from "react-router-dom";

export function useFetchLeaveRequestById() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("editId");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["leaveRequest", editId],
    queryFn: () => fetchLeaveRequestById(editId),
  });

  return { data, isLoading, isError, error };
}
