import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
  // To read booking Id from URl as Param
  // we can use useParams()
  const { bookingId } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  const booking = data ?? {};
  return { booking, error, isLoading };
}

export default useBooking;
