import { useContext } from "react";
import { UserDetailsContext } from "../context/UserDetailsContext";

const useUserDetails = () => {
  return useContext(UserDetailsContext);
};

export default useUserDetails;
