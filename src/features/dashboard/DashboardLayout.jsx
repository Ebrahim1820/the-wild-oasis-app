import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoadingBooking, bookings } = useRecentBookings();
  const {
    isLoading: isLoadingStays,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  // we call this to calc number of cabins for statistics
  const { cabins, isLoading: isCabinsLoading } = useCabins();

  if (isLoadingBooking || isLoadingStays || isCabinsLoading) return <Spinner />;

  console.log(bookings);
  console.log(stays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCounts={cabins.length}
      />
      <div> Todays activity </div>
      <div> Chart stay durations </div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
