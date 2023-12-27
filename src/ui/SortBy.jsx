/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useSearchParams } from "react-router-dom";
import Select from "../ui/Select";

function SortBy({ sortOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  function handleChangeSort(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      value={sortBy}
      options={sortOptions}
      type="white"
      onChange={handleChangeSort}
    />
  );
}

export default SortBy;
