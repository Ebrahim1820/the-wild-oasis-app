import { Outlet } from "react-router-dom";
import Headers from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

function AppLayout() {
  return (
    // To display child routes inside layout
    // we can use Outlet
    <StyledAppLayout>
      <Headers />
      <Sidebar />

      {/* To have all the pages with the same styles
      we wrap Outlet with main  */}
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
