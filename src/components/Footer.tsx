import React from "react";
import "./styles/layout/Footer.css";

const FooterPage = () => {
  return (
    <div className="footer">
      <p className="copyright">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a href="https://www.apheleia.me/home" target="_blank" rel="noreferrer"> tic-tac-toe </a>
      </p>
    </div>
  );
};

export default FooterPage;
