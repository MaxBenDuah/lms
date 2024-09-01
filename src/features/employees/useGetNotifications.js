import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/apiEmployees";
import { useSearchParams } from "react-router-dom";

export function useGetNotifications() {
  const [searchParams] = useSearchParams();

  const employee_id = Number(searchParams.get("employee_id"));

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notifications", employee_id],
    queryFn: () => getNotifications(employee_id),
    refetchInterval: 10000,
  });

  return { data, isLoading, isError, error };
}
