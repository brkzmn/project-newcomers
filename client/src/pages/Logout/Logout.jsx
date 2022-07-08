import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSuccess = () => {
    logout(() => navigate("/login"));
  };

  const { performFetch, cancelFetch } = useFetch("/user/logout", onSuccess);

  useEffect(() => {
    performFetch({
      method: "POST",
      credentials: "include",
    });

    return () => {
      cancelFetch();
    };
  }, []);

  return (
    <h1
      style={{
        textAlign: "center",
        padding: "2rem",
      }}
    >
      Logout. Please wait...
    </h1>
  );
};

export default Logout;
