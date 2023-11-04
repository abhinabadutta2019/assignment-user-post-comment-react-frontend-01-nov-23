import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  //
  const { login } = useContext(AuthContext);
  //
  const loginHandler = async (event) => {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    //
    try {
      const response = await fetch("http://localhost:3006/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      //
      if (response.ok) {
        const loginResult = await response.json();
        //
        console.log(loginResult, "loginResult from login-response.ok");
        if (loginResult.token) {
          login(loginResult);
        }
      }

      //
    } catch (err) {
      console.log(err);
    }
    //
  };
  //
  return (
    <div>
      <h1>Auth</h1>
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
