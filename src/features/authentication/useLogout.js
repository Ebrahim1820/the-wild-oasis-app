import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading: isLogout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // After logout we want to clear the cache to
      // delete all the queries
      queryClient.removeQueries();
      // 'replace' will erease the place that we were erlier
      navigate("/Login", { replace: true });
    },
    onError: () => toast.error("There is an error while logout!"),
  });

  return { logout, isLogout };
}

export default useLogout;
