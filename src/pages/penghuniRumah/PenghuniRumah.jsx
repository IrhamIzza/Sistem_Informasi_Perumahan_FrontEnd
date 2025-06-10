import MyTable from "@/components/RumahPenghuniTable";
import { Button } from "@/components/ui/button";
import { Link, Route, Routes } from "react-router-dom";

function PenghuniRumah() {
  return (
    <div>
      <div className="p-3">
        <h1 className="font-bold text-3xl text-center">TABEL PENGHUNI RUMAH</h1>
      </div>
      <Button className="bg-zinc-500" size="sm">
        <Link to="create">Create</Link>
      </Button>
      <MyTable />
    </div>
  );
}

export default PenghuniRumah;