import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLeaveRequestByManager } from "../../services/apiEmployees";
import { useSearchParams } from "react-router-dom";

export function useUpdateLeaveRequestByManager() {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("updateId"));
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateLeaveRequestByManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allLeaveRequest"] });
      queryClient.invalidateQueries({ queryKey: ["leaveRequest", id] });
    },
  });

  return { mutate, isPending, isError, error };
}
