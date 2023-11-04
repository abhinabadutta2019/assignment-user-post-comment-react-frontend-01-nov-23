import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { CreateForm } from "./pages/CreateForm";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  //
  const { user } = useContext(AuthContext);
  //
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/auth" />}
            />
            {/* <Route path="/auth" element={<Auth />} /> */}
            <Route
              path="/auth"
              element={!user ? <Auth /> : <Navigate to="/" />}
            />
            {/* <Route path="/create" element={<CreateForm />} /> */}
            <Route
              path="/create"
              element={user ? <CreateForm /> : <Navigate to="/auth" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
