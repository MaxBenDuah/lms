import { useMutation } from "@tanstack/react-query";
import { markNotificationAsRead } from "../../services/apiEmployees";

export function useMarkNotificationAsRead() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: markNotificationAsRead,
  });

  return { mutate, isPending, isError, error };
}
