import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyTable({}) {
  const [penghuni, setPenghuni] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPenghuni = () => {
    setLoading(true);
    setPenghuni([]);
    axios
      .get("http://localhost:8000/api/penghuni")
      .then((response) => {
        setPenghuni(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data penghuni:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPenghuni();
  }, []);

  if (loading) return <p>Loading data penghuni...</p>;

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/penghuni/${id}`);
      fetchPenghuni();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Status Huni</TableHead>
          <TableHead>No. Telp</TableHead>
          <TableHead>Status Perkawinan</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {penghuni.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.nama}</TableCell>
            <TableCell>{item.status_penghuni}</TableCell>
            <TableCell>{item.nomor_telepon}</TableCell>
            <TableCell>{item.status_perkawinan}</TableCell>
            <TableCell className="flex gap-1">
              <Button>
                <Link to={`edit/${item.id}`}>Edit</Link>
              </Button>
              <Button
                onClick={() => handleDelete(item.id)}
                variant="destructive"
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
