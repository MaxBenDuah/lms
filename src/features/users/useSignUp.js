import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../../services/apiAuth";

export function useSignUp() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      alert("Account succesfully created.");
    },
  });

  return { mutate, isPending, isError, error };
}
