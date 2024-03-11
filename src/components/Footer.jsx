import "./Footer.css";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div>
          <p>Este es un sitio esta hecho para ti!!!</p>
          <p>
            Creado con amor por{" "}
            <a className="footer-link" href="https://github.com/mks1313">
              Maksim y Jose
            </a>
          </p>
        </div>
        <div className="fagitub">
        <FaGithub style={{ width: '40px', height: '40px', color: '#b0bfd8' }} />
        <CiLinkedin style={{ width: '40px', height: '40px', color: '#b0bfd8' }}/>
        <CiFacebook style={{ width: '40px', height: '40px', color: '#b0bfd8' }}/>
        <BsInstagram style={{ width: '40px', height: '40px', color: '#b0bfd8' }} />

        </div>
        <span>
        Promotional offers are subject to the conditions listed on the restaurants website. Offers on alcoholic beverages are intended for adults only. Excessive alcohol consumption is harmful to health. Drink in moderation.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
