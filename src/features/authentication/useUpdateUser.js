import { useMutation } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateingUser, isUpdating } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      // update data manually in the cache,
      // for instance after changing avatar image change it without
      // reloading the page
      queryClient.setQueryData(["user"], user.user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateingUser, isUpdating };
}

export default useUpdateUser;
