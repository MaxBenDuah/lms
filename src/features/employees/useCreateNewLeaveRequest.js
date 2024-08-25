import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLeaveRequest } from "../../services/apiEmployees";

export function useCreateNewLeaveRequest() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createLeaveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaveRequest"] });
    },
  });

  return { mutate, isPending, isError, error };
}
