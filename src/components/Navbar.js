import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <Link to="/">
        <h1>My App Title</h1>
      </Link>
      <Link to="/auth">Auth</Link>
    </header>
  );
};

export { Navbar };
