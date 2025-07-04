import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyTable({}) {
  const [rumah, setRumah] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRumah = async () => {
    try {
      setLoading(true);
      setRumah([])
      const response = await axios.get("http://localhost:8000/api/rumah");
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
      await axios.delete(`http://localhost:8000/api/rumah/${id}`);
      fetchRumah();
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
            <TableCell>{item.nomer_rumah}</TableCell>
            <TableCell>{item.status_huni}</TableCell>
            <TableCell className="flex">
              <div className="flex gap-1 mx-auto">
                <Button>
                  <Link to={`edit/${item.id}`}>Edit</Link>
                </Button>
                <Button>
                  <Link to={`penghuni-rumah/${item.id}/${item.nomer_rumah}`}>Penghuni</Link>
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
  );
}
