// Footer.js
import "./Footer.css";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-icons">
          <a href="https://github.com/mks1313" target="_blank" rel="noopener noreferrer">
            <FaGithub className="footer-icon" />
          </a>
          <a href="https://www.linkedin.com/in/maksim-georgiev-marinov-225b20200?original_referer=" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="footer-icon" />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="footer-icon" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="footer-icon" />
          </a>
        </div>
      </div>
      <div className="footer-center">
        <p>Este sitio está hecho para ti!!!</p>
        <p>
          Creado por{" "}
          <a className="footer-link" href="https://github.com/mks1313">
            Maksim 
          </a>
        </p>
      </div>
      <div className="footer-right">
        <span>
          Promotional offers are subject to the conditions listed on the
          restaurants website. Offers on alcoholic beverages are intended for
          adults only. Excessive alcohol consumption is harmful to health. Drink
          in moderation.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
