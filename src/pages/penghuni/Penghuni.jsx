import { useEffect, useState } from "react";
import axios from "axios";
import MyTable from "@/components/penghuni/Table";
import { Button } from "@/components/ui/button";
import { Link, Route, Routes } from "react-router-dom";
import CreatePenghuni from "./CreatePenghuni";

function Penghuni() {
  const [penghuni, setPenghuni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/penghuni")
      .then((response) => {
        setPenghuni(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data penghuni:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading data penghuni...</p>;

  return (
    <div>
      <div className="p-3">
        <h1 className="font-bold text-3xl text-center">TABEL PENGHUNI</h1>
      </div>
      <Button className="bg-zinc-500" size="sm">
        <Link to="create">Create</Link>
      </Button>
      <MyTable data={penghuni} />
    </div>
  );
}

export default Penghuni;
