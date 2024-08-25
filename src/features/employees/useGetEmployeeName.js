import { useQuery } from "@tanstack/react-query";
import { getEmployeeToRenderOnManagerDashboardById } from "../../services/apiEmployees";

export function useGetEmployeeName(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["employeeName", id],
    queryFn: () => getEmployeeToRenderOnManagerDashboardById(id),
    enabled: !!id,
  });

  return { data, isLoading, isError, error };
}
