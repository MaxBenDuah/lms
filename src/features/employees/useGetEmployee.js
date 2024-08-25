import { useQuery } from "@tanstack/react-query";
import { getEmployee } from "../../services/apiEmployees";
// import { getEmployees } from "../../services/apiEmployees";
// import { useSearchParams } from "react-router-dom";

export function useGetEmployee(user) {
  // const [searchParams] = useSearchParams();
  // const id = Number(searchParams.get("id"));

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["employee", user],
    queryFn: () => getEmployee(user),
    enabled: !!user,
  });

  return { data, isLoading, isError, error };

  // const {
  //   data: employee,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["employees", id],
  //   queryFn: () => getEmployees(id),
  // });

  // return { employee, isLoading, isError, error };
}
