import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [showRegistration, setShowRegistration] = useState(false);

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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Authentication</h1>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowRegistration(!showRegistration)}
        >
          {showRegistration ? "Switch to Login" : "Switch to Registration"}
        </button>
      </div>

      {showRegistration ? (
        <div className="d-flex justify-content-center">
          <div className="col-6">
            <h2 className="mb-3">Registration Form</h2>
            <form onSubmit={registerHandler}>
              <div className="mb-3">
                <label htmlFor="registerUsername" className="form-label">
                  Username
                </label>
                <input
                  id="registerUsername"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="registerPassword" className="form-label">
                  Password
                </label>
                <input
                  id="registerPassword"
                  type="password"
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                Register
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="col-6">
            <h2 className="mb-3">Login Form</h2>
            <form onSubmit={loginHandler}>
              <div className="mb-3">
                <label htmlFor="loginUsername" className="form-label">
                  Username
                </label>
                <input
                  id="loginUsername"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">
                  Password
                </label>
                <input
                  id="loginPassword"
                  type="password"
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export { Auth };
