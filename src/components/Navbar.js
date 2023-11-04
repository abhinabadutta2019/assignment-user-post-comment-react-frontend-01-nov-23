import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
  };

  const goToCreatePage = () => {
    navigate("/create");
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        My App Title
      </Link>

      {user && (
        <div className="navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="btn btn-primary" onClick={goToCreatePage}>
                Create Post
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export { Navbar };
