import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const { login } = useContext(AuthContext);

  const loginHandler = async (event) => {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch("http://localhost:3006/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const loginResult = await response.json();

        if (loginResult.token) {
          login(loginResult);
        }
      } else {
        // Show an alert for login error
        window.alert("Login failed. Please check your username and password.");
      }
    } catch (err) {
      console.log(err);
      // Show a generic error alert for network or other errors
      window.alert("An error occurred. Please try again.");
    }
  };

  const registerHandler = async (event) => {
    event.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    try {
      const response = await fetch("http://localhost:3006/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const registrationResult = await response.json();

        if (registrationResult.token) {
          login(registrationResult);
        }
      } else {
        // Show an alert for registration error
        window.alert(
          "Registration failed. Please try a different username or password."
        );
      }
    } catch (err) {
      console.log(err);
      // Show a generic error alert for network or other errors
      window.alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Auth</h1>
      <h2>Registration form</h2>
      <form onSubmit={registerHandler}>
        <label>Username</label>
        <input id="registerUsername" type="text" required />
        <label>Password</label>
        <input id="registerPassword" type="text" required />
        <button type="submit">Register</button>
      </form>

      <h2>Login form</h2>
      <form onSubmit={loginHandler}>
        <label>Username</label>
        <input id="loginUsername" type="text" required />
        <label>Password</label>
        <input id="loginPassword" type="text" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export { Auth };
