import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLeaveRequest } from "../../services/apiEmployees";

export function useUpdateLeaveRequest() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateLeaveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaveRequest"] });
    },
  });

  return { mutate, isPending, isError, error };
}
