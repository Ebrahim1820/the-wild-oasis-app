import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

// to calc static chart of dashboard
function useRecentBookings() {
  const [searchParms] = useSearchParams();

  // check if there is no search params by default set to 7
  const numDays = !searchParms.get("last")
    ? 7
    : Number(searchParms.get("last"));

  // calc the last dates
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });
  return { isLoading, bookings, numDays };
}

export default useRecentBookings;
