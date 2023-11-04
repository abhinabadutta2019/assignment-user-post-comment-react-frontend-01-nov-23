import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  //
  const { logout, user } = useContext(AuthContext);
  //
  const navigate = useNavigate();
  //
  const logoutHandler = () => {
    //
    logout();
  };
  //
  const goToCreatePage = () => {
    navigate("/create"); // Use the navigate function to go to the "/create" page
  };
  //
  return (
    <header>
      <Link to="/">
        <h1>My App Title</h1>
      </Link>
      <Link to="/auth">Auth</Link>
      {/* <Link to="/create">Create</Link> */}
      <button onClick={goToCreatePage}>Create Post</button>
      <button onClick={logoutHandler}>Logout</button>
    </header>
  );
};

export { Navbar };
