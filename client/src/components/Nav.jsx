import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
//import burgerIcon from "../images/icon-hamburger.svg";
import "./Nav.css";
import { AuthContext } from "../AuthContext";
import TEST_ID from "./Nav.testid";
import Dropdown from "./Dropdown";
import useUserDetails from "./../hooks/useUserDetails";
import { useWindowSize } from "./../hooks/useWindowSize";
import ThemeToggleButton from "./ThemeToggleButton";
import { ThemeContext } from "../ThemeContext";
import { MdMenu } from "react-icons/md";
import { IconContext } from "react-icons";

const Nav = () => {
  const [isDropdown, setDropdown] = useState();
  const { isAuthenticated } = useContext(AuthContext);
  const { userDetails } = useUserDetails();
  const [width] = useWindowSize();
  const toggleDropdown = () => setDropdown((prev) => !prev);
  const { theme } = useContext(ThemeContext);
  const handleOnMouseEnter = (e) =>
    (e.target.style.color = "hsla(35, 78%, 49%, 0.9)");
  const handleOnMouseLeave = (e) => (e.target.style.color = theme.foreground);

  return (
    <>
      <IconContext.Provider
        value={{
          color: theme.foreground,
          size: "2.9rem",
          className: "react-nav-icon",
        }}
      >
        <div
          className="navbar"
          style={{ backgroundColor: theme.background, color: theme.foreground }}
        >
          <Link to={"/"} className="logo" data-testid={TEST_ID.linkToHome}>
            <img src={logo} />
          </Link>
          <div className="navbar-right">
            <div className="collapse">
              {isAuthenticated && userDetails && (
                <Link
                  to={"/news"}
                  className="nav-link-simple"
                  style={{ color: theme.foreground }}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                >
                  News
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  to="/activities"
                  className="nav-link-simple"
                  style={{ color: theme.foreground }}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                >
                  Activities
                </Link>
              )}
              {userDetails && isAuthenticated && (
                <Link
                  to="connect"
                  className="nav-link-simple"
                  style={{ color: theme.foreground }}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                >
                  {userDetails.userType === "Newcomer"
                    ? "Connect to Locals"
                    : "Connect to Newcomers"}
                </Link>
              )}
              {!isAuthenticated && (
                <Link
                  to="/about"
                  className="nav-link-simple"
                  style={{ color: theme.foreground }}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                >
                  About
                </Link>
              )}
              {!isAuthenticated && (
                <Link
                  to="/contact"
                  className="nav-link-simple"
                  style={{ color: theme.foreground }}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                >
                  Contact us
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="nav-link-simple"
                    style={{ color: theme.foreground }}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    data-testid={TEST_ID.linkToUsers}
                  >
                    Dashboard
                  </Link>
                  <Link to="/logout" className="navbar-link  btn-link">
                    Sign out
                  </Link>
                </>
              ) : (
                <Link to="/login" className="navbar-link  btn-link">
                  Sign in
                </Link>
              )}
            </div>
            <button
              onClick={toggleDropdown}
              className="btn-menu mobile"
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            >
              <MdMenu />
            </button>
            <ThemeToggleButton className="theme-btn" />
          </div>
          {isDropdown && width < 1080 && (
            <Dropdown
              closeDropdown={() => setDropdown(false)}
              isDropdown={isDropdown}
              setDropdown={setDropdown}
            />
          )}
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Nav;
