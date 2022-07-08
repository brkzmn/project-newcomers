import React, { useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";
import { useNavigate } from "react-router-dom";
import Divider from "./Divider";
import DropdownLink from "./DropdownLink";
import { AuthContext } from "../AuthContext";
import useUserDetails from "../hooks/useUserDetails";

const Dropdown = ({ closeDropdown, isDropdown }) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);
  const { userDetails } = useUserDetails();

  const handleNavigation = (route) => {
    closeDropdown();
    navigate(route);
  };

  const dropdownRef = useRef();

  useEffect(() => {
    const closeDropdownEvent = (event) => {
      if (
        isDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    return document.addEventListener("click", closeDropdownEvent);
  }, []);

  // const dropdownRef = useRef();

  // useEffect(() => {

  //     document.addEventListener("mousedown", (event) => {
  //       if (!dropdownRef.current.contains(event.target)) {
  //         setDropdown(false);

  //     });
  //   }
  // });

  return (
    <div className="dropdown" ref={dropdownRef}>
      {isAuthenticated && (
        <DropdownLink onClick={() => handleNavigation("/news")}>
          News
        </DropdownLink>
      )}
      <DropdownLink onClick={() => handleNavigation("/about")}>
        About
      </DropdownLink>
      <DropdownLink onClick={() => handleNavigation("/contact")}>
        Contact us
      </DropdownLink>
      {isAuthenticated && userDetails && (
        <DropdownLink onClick={() => handleNavigation("/connect")}>
          {userDetails.userType === "NewComer"
            ? "Connect to Locals"
            : "Connect to New Comers"}
        </DropdownLink>
      )}
      {isAuthenticated && (
        <DropdownLink onClick={() => handleNavigation("/activities")}>
          Activities
        </DropdownLink>
      )}
      <Divider />
      {!isAuthenticated ? (
        <>
          <DropdownLink onClick={() => handleNavigation("/login")}>
            Sign in
          </DropdownLink>
          <DropdownLink onClick={() => handleNavigation("/user/create")}>
            Sign up
          </DropdownLink>
        </>
      ) : (
        <>
          <DropdownLink onClick={() => handleNavigation("/dashboard")}>
            Dashboard
          </DropdownLink>
          <DropdownLink onClick={() => handleNavigation("/logout")}>
            Logout
          </DropdownLink>
        </>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  closeDropdown: PropTypes.func.isRequired,
  isDropdown: PropTypes.bool.isRequired,
};

export default Dropdown;
