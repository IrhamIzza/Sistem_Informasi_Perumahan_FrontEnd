import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

export default function PembayaranTable() {
  const [pembayaran, setPembayaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bulan, setBulan] = useState(String(new Date().getMonth() + 1));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setPembayaran([]);
      const response = await axios.get("http://localhost:8000/api/pembayaran");
      const data = response.data;
      setPembayaran(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:8000/api/pembayaran/${id}/lunas`);
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const bulanOptions = [
    { value: "1", label: "Januari" },
    { value: "2", label: "Februari" },
    { value: "3", label: "Maret" },
    { value: "4", label: "April" },
    { value: "5", label: "Mei" },
    { value: "6", label: "Juni" },
    { value: "7", label: "Juli" },
    { value: "8", label: "Agustus" },
    { value: "9", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];
  const rumahDihuni = pembayaran.filter(
    (item) => item.status_huni === "dihuni"
  );

  const dataFiltered = rumahDihuni.filter(
    (item) => String(item.periode_bulan) === bulan
  );

  return (
    <Card className="mt-6">
      <CardContent className="overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Daftar Pembayaran</h2>
          <Select value={bulan} onValueChange={setBulan}>
            <SelectTrigger className="w-40">
              <span>
                Bulan: {bulanOptions.find((b) => b.value === bulan)?.label}
              </span>
            </SelectTrigger>
            <SelectContent>
              {bulanOptions.map((b) => (
                <SelectItem key={b.value} value={b.value}>
                  {b.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Rumah</TableHead>
              <TableHead>Iuran</TableHead>
              <TableHead>Periode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataFiltered.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.nomer_rumah}</TableCell>
                <TableCell>{item.jenis_iuran}</TableCell>
                <TableCell>{`${item.periode_bulan}/${item.periode_tahun}`}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status_lunas === "lunas" ? "default" : "destructive"
                    }
                  >
                    {item.status_lunas}
                  </Badge>
                </TableCell>
                <TableCell className="flex">
                  <div className="">
                    <Button
                      onClick={() => handleUpdate(item.id_pembayaran)}
                      size="sm"
                    >
                      Lunas
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
