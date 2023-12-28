import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // if we want to send filter based on total price we
  // can use method and add method on apiBooking
  // to pass multipale filter we can use list of filter objects
  // { field: "totalPrice", value: 5000, method: "gte" };

  // SORT

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // by adding filter to the list when we select different filter, the data will refetch from server
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Perform null or undefined check for data
  const bookings = data?.data; // Assuming data is an object with a data property
  const count = data?.count;

  return { bookings, isLoading, error, count };
}
