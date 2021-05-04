import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

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
