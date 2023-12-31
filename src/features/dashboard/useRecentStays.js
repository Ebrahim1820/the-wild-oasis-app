import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

// to calc static chart of dashboard
function useRecentStays() {
  const [searchParms] = useSearchParams();

  // check if there is no search params by default set to 7
  const numDays = !searchParms.get("last")
    ? 7
    : Number(searchParms.get("last"));

  // calc the last dates
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  return { isLoading, stays, confirmedStays, numDays };
}

export default useRecentStays;
