import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { singUp } from "../../services/apiAuth";

function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: singUp,

    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },

    onError: () => toast.error("There is an error to create user"),
  });

  return { signup, isLoading };
}

export default useSignup;
