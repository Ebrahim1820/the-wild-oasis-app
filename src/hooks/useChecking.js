import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // to update checkin status and status of isPaid on database
  // we use this hook
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (
      { bookingId, breakfast } //hasBreakfast, extrasPrice, totalPrice
    ) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,

        // OR this way
        // hasBreakfast: hasBreakfast,
        // extrasPrice: extrasPrice,
        // totalPrice: totalPrice,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id}successfully checked in `);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },

    onError: () => toast.error("There was an error. while checking in..! "),
  });

  return { checkin, isCheckingIn };
}
