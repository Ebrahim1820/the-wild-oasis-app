/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

import Spinner from "../ui/Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // we only allow to call this function in side effect
  // or in callback function at the top level of the component
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, user, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect
  // to the /Login page
  useEffect(
    function () {
      // Redirect to login page if user not authenticated
      // or during loading not authenticated
      if (!isAuthenticated && !isLoading) navigate("/Login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. while loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4. If there is a user render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
