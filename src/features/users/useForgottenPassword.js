import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/apiAuth";

export function useForgottenPassword() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: forgotPassword,
  });

  return { mutate, isPending, isError, error };
}
