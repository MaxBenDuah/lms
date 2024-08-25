import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLeaveRequest } from "../../services/apiEmployees";

export function useDeleteLeaveRequest() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteLeaveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaveRequest"] });
    },
  });

  return { mutate, isPending, isError, error };
}
