import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  //
  const { logout, user } = useContext(AuthContext);
  //
  const logoutHandler = () => {
    //
    logout();
  };
  //
  return (
    <header>
      <Link to="/">
        <h1>My App Title</h1>
      </Link>
      <Link to="/auth">Auth</Link>
      <Link to="/create">Create</Link>

      <button onClick={logoutHandler}>Logout</button>
    </header>
  );
};

export { Navbar };
