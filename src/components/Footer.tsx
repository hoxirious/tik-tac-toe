import React from "react";
import { Navbar } from "react-bootstrap";
import "./styles/layout/Footer.css";

const FooterPage = () => {
  return (
    <Navbar
      className="d-flex align-items-center justify-content-center"
      bg="dark"
      variant="dark"
      fixed="bottom"
    >
      <p className="copyright">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a href="https://www.apheleia.me/home" target="_blank" rel="noreferrer">
          {" "}
          tic-tac-toe{" "}
        </a>
      </p>
    </Navbar>
  );
};

export default FooterPage;
