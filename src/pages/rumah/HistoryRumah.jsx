import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function HistoryRumah({}) {
  const { id, nomer } = useParams();
  const [rumah, setRumah] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRumah = async () => {
    try {
      setLoading(true);
      setRumah([]);
      const response = await axios.get(
        `http://localhost:8000/api/rumah/${id}/histori_penghuni`
      );
      const data = response.data;
      setRumah(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRumah();
  }, []);

  if (loading) return <p>Loading data rumah...</p>;

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/penghuni-rumah/${id}`);
      fetchRumah();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center font-bold text-3xl py-4">Rumah {nomer}</div>
      <Button className="bg-zinc-500" size="sm">
        <Link to="create">Create Penghuni</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">Nama</TableHead>
            <TableHead className="text-center">Status Huni</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {rumah.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.penghuni.nama}</TableCell>
              <TableCell>{item.penghuni.status_penghuni}</TableCell>
              <TableCell className="flex">
                <div className="flex gap-1 mx-auto">
                  <Button>
                    <Link to={`edit/${item.id}`}>Edit</Link>
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
