import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const { checkout, isCheckingOut } = useCheckout();

  const { deleteBooking, isBookingDeleting } = useDeleteBooking();

  const { id, status } = booking;

  if (isLoading) return <Spinner />;

  // To handle error when these is no booking with specific id
  if (!booking.status) return <Empty resourceName="booking with this ID" />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* back button */}
      <ButtonGroup>
        {/* check in */}
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check In</Button>
        )}

        {/* check out  */}
        {status === "checked-in" && (
          <Button
            // icon={<HiArrowUpOnSquare color="red" />}
            onClick={() => checkout(id)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        {/* // DELETE Button */}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isBookingDeleting}
              onConfirm={() =>
                // We want back to booking list after deleting
                deleteBooking(id, { onSettled: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </Modal>

        {/* Back Button */}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
