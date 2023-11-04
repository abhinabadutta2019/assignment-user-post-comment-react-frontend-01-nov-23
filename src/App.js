import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { CreateForm } from "./pages/CreateForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/create" element={<CreateForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
