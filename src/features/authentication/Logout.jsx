import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";

const StyledButton = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;
`;

function Logout() {
  const { logout, isLogout } = useLogout();

  return (
    <StyledButton>
      <ButtonIcon disabled={isLogout} onClick={logout}>
        {!isLogout ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
      </ButtonIcon>
    </StyledButton>
  );
}

export default Logout;
