import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
//import { useNavigate } from "react-router-dom";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const { mutate: deleteBooking, isLoading: isBookingDeleting } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success(`The booking has successfully deleted`);
      queryClient.invalidateQueries({ queryKey: "bookings" });
      // navigate("/");
    },
    onError: () => toast.error("here was an error. while deleting..!"),
  });
  return { deleteBooking, isBookingDeleting };
}

export default useDeleteBooking;
