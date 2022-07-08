import React, { useState, createContext, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";
import { AuthContext } from "../AuthContext";

export const UserDetailsContext = createContext();
export const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  const onSuccess = (res) => {
    const { user } = res;
    setUserDetails(user);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/me",
    onSuccess
  );

  const getMe = () => {
    if (isAuthenticated) {
      performFetch({
        method: "GET",
        credentials: "include",
      });
    }
  };

  useEffect(() => {
    //window.addEventListener("load", getMe);
    if (isAuthenticated) {
      performFetch({
        method: "GET",
        credentials: "include",
      });
    }
    return () => cancelFetch();
  }, []);

  return (
    <UserDetailsContext.Provider
      value={{
        userDetails,
        setUserDetails,
        getMe,
        isMeLoading: isLoading,
        meError: error,
        cancelMeFetch: cancelFetch,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

UserDetailsProvider.propTypes = {
  children: PropTypes.array.isRequired,
};
