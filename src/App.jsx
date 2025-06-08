import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Penghuni from "./pages/penghuni/Penghuni";
import Rumah from "./pages/rumah/Rumah";
import About from "./pages/about";
import CreatePenghuni from "./pages/penghuni/CreatePenghuni";

function App() {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/penghuni" element={<Penghuni />} />
          <Route path="/penghuni/create" element={<CreatePenghuni />} />
          <Route path="/rumah" element={<Rumah />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
