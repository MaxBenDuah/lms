import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotification } from "../../services/apiEmployees";
import { useSearchParams } from "react-router-dom";

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("employee_id"));

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", id] });
    },
  });

  return { mutate, isPending, isError, error };
}
