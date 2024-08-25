import { useNavigate } from "react-router-dom";
import { useUser } from "../features/users/useUser";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //If there's no authenticated user, redirect to the login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
