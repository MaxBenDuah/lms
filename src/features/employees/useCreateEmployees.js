import { useMutation } from "@tanstack/react-query";
import { createEmployee } from "../../services/apiEmployees";

export function useCreateEmployees() {
  // const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createEmployee,
    // checking the code again invalidating queries when creating employees is not needed
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["employees"] });
    // },
  });

  return { mutate, isPending, isError, error };
}
