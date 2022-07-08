import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { SocketProvider } from "../SocketContext";

const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  return isAuthenticated ? (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
