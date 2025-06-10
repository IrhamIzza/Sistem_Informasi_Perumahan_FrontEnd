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
  const [penghuniRumah, setPenghuniRumah] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setPenghuniRumah([]);
      const response = await axios.get("http://localhost:8000/api/penghuni-rumah");
      const data = response.data;
      setPenghuniRumah(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading data Penghuni Rumah...</p>;

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/penghuni-rumah/${id}`);
      fetchData();
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
          <TableHead className="text-center">Nomer Rumah</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {penghuniRumah.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.penghuni.nama}</TableCell>
            <TableCell>{item.penghuni.status_penghuni}</TableCell>
            <TableCell>{item.rumah.nomer_rumah}</TableCell>
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
  );
}
