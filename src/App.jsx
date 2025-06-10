import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Penghuni from "./pages/penghuni/Penghuni";
import Rumah from "./pages/rumah/Rumah";
import About from "./pages/about";
import CreatePenghuni from "./pages/penghuni/CreatePenghuni";
import EditPenghuni from "./pages/penghuni/EditPenghuni";
import CreateRumah from "./pages/rumah/CreateRumah";
import EditRumah from "./pages/rumah/EditRumah";
import PenghuniRumah from "./pages/penghuniRumah/penghuniRumah";
import CreatePenghuniRumah from "./pages/penghuniRumah/CreatePenghuniRumah";
import EditPenghuniRumah from "./pages/penghuniRumah/EditPenghuniRumah";
import HistoryRumah from "./pages/rumah/HistoryRumah";
import Pembayaran from "./pages/pembayaran/Pembayaran";
import Pengeluaran from "./pages/pembayaran/pengeluaran";
import GrafikTahunan from "./pages/GrafikTahunan";

function App() {
  return (
    <div>
      <Navbar />
      <div className="p-4 md:px-16">
        <Routes>
          <Route path="/penghuni" element={<Penghuni />} />
          <Route path="/penghuni/create" element={<CreatePenghuni />} />
          <Route path="/penghuni/edit/:id" element={<EditPenghuni />} />
          <Route path="/rumah/create" element={<CreateRumah />} />
          <Route path="/rumah/edit/:id" element={<EditRumah />} />
          <Route path="/rumah/penghuni-rumah/:id/:nomer" element={<HistoryRumah />} />
          <Route path="/rumah/penghuni-rumah/:id/:nomer/create" element={<CreatePenghuniRumah />} />
          <Route path="/rumah" element={<Rumah />} />
          <Route path="/penghuni-rumah" element={<PenghuniRumah />} />
          <Route path="/penghuni-rumah/create" element={<CreatePenghuniRumah />} />
          <Route path="/penghuni-rumah/edit/:id" element={<EditPenghuniRumah />} />
          <Route path="/pembayaran" element={<Pembayaran />} />
          <Route path="/pengeluaran" element={<Pengeluaran />} />
          <Route path="/laporan" element={<GrafikTahunan />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
