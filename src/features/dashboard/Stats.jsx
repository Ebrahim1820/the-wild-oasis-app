import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
function Stats({ bookings, confirmedStays, numDays, cabinCounts }) {
  // 1. calc number of bookings
  const numBookings = bookings.length;

  // 2. calc total sales
  // we have an accumulator that start from 0 and in each iteration
  // add totalPrice
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. total checkings
  const numCheckings = confirmedStays.length;

  // Occupancy rate
  // num checked in nights / all available nights
  // (num days * num cabins)
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCounts);

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />

      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />

      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numCheckings}
      />

      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
