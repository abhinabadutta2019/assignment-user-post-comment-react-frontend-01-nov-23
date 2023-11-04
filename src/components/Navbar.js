import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

const CustomNavbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
  };

  const goToCreatePage = () => {
    navigate("/create");
  };

  return (
    <Navbar bg="light" expand="lg">
      <div style={centerStyle}>
        <Navbar.Brand as={Link} to="/" style={{ textAlign: "center" }}>
          Let's Discuss
        </Navbar.Brand>
        {user && (
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ marginLeft: "auto" }}
          />
        )}
      </div>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          {user && (
            <Button variant="primary" onClick={goToCreatePage}>
              Create Post
            </Button>
          )}
          {user && (
            <Button variant="danger" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
