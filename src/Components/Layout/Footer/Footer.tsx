import "./Footer.css";
import { FiGithub } from "react-icons/fi";
import { BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <div>
                <a href="https://github.com/EuclidesTheConstructor" target="_blank"><FiGithub size={75} /></a>
            </div>
            <div>
                <a href="https://www.linkedin.com/in/niv-banai-26a45124a/" target="_blank"><BsLinkedin size={75} /></a>
            </div>
        </div>
    );
}

export default Footer;
