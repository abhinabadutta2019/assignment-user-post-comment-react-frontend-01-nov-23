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
      <div className="container">
        <Link to="/" className="navbar-brand">
          {" "}
          {/* Center the title */}
          My App Title
        </Link>

        {user && (
          <button
            className="navbar-toggler" // Add a button for small screens
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        <div
          className={`navbar-collapse${user ? " collapse" : ""}`} // Initially collapse for small screens
          id="navbarNav"
        >
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
      </div>
    </header>
  );
};

export { Navbar };
