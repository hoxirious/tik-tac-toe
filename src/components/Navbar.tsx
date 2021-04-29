import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home.page";
import PlayGround from "./PlayGround";

function Navbars() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Tic-tac-toe
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/board-size">Board size</Link>
      </Nav>
    </Navbar>
  );
}

export default Navbars;
