import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
    },
  });

  return { mutate, isPending, isError, error };
}
