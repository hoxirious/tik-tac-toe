import { Link } from "react-router-dom";
import './styles/layout/loader.styles.layout';

function Navbar() {
  return (
    <div>
      <nav className="nav">
        <div className="nav-container">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-links">
                H0m3
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/3x3" className="nav-links">
                3x3
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/4x4" className="nav-links">
                4x4
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
