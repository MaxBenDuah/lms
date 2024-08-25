import { useQuery } from "@tanstack/react-query";
import { getHolidays } from "../../services/apiHolidays";
import { useSearchParams } from "react-router-dom";

export function useGetHolidays() {
  const [searchParams] = useSearchParams();

  const country = searchParams.get("country");
  const year = searchParams.get("year");
  const holidayObj = { country, year };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["holidays", holidayObj],
    queryFn: () => getHolidays(holidayObj),
  });

  return { data, isLoading, isError, error };
}
