import Button from "../ui/Button";
import Modal from "../ui/Modal";
import styled from "styled-components";

import CreateCabinForm from "../features/cabins/CreateCabinForm";

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <StyledButton>
            <Button>Add new cabin</Button>
          </StyledButton>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
