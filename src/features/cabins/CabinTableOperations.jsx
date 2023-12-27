import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

//
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        filterOptions={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;