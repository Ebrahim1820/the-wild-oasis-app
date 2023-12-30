import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as LoginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => LoginApi({ email, password }),

    onSuccess: (user) => {
      // It allow us to set manually data to react query cache
      // So we will take the newly logged in user
      // and manually add them to the React Query cache.
      queryClient.setQueryData(["user"], user.user);
      // 'replace' will erease the place that we were erlier
      // otherwise back button will not work
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}

export default useLogin;
