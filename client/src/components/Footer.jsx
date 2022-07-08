import React, { useContext } from "react";
import instagram from "../images/instagram.svg";
import linkedin from "../images/linkedin.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <footer className="footer">
      {/* { window.innerWidth < 900 && <div className="logo-container">
        <Link to={"/"} className="logo">
          <img src={logo} alt="logo" />
        </Link></div> } */}
      <div className="social-link-container">
        <a href={"http://www.instagram.com"} className="social-link">
          <img src={instagram} alt="instagram" />
        </a>
        <a href={"http://www.linkedin.com"} className="social-link">
          <img src={linkedin} alt="linkedin" />
        </a>
      </div>

      <div className="footer-stack">
        <p className="copyright">Copyright &copy; 2022 NlLink® </p>
        <div className="footer-links">
          <button
            className="footer-link"
            onClick={
              isAuthenticated
                ? () => navigate("/logout")
                : () => navigate("/login")
            }
          >
            {isAuthenticated ? "Sing out 📤" : "Sign in 📥"}
          </button>
          <button className="footer-link" onClick={() => navigate("/")}>
            Home 🏠
          </button>
          <button className="footer-link" onClick={() => navigate("/about")}>
            About Us 🆎
          </button>
          <button className="footer-link" onClick={() => navigate("/contact")}>
            Contact us ☎️
          </button>
          <button
            onClick={() => navigate("/user/create")}
            className="footer-link"
          >
            Sign up 📝
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
