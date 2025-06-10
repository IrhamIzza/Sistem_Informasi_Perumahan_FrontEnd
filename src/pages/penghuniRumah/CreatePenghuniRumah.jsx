import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreatePenghuniRumah() {
  const { id ,nomer } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [tglMulai, setTglMulai] = useState("");
  const [tglSelesai, setTglSelesai] = useState("");
  const [loading, setLoading] = useState(false);
  const [penghuniList, setPenghuniList] = useState([]);
  const [selectedNama, setSelectedNama] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/penghuni");
        setPenghuniList(response.data);
      } catch (error) {
        console.error("Gagal ambil data penghuni:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:8000/api/rumah/${id}/penghuni`, {
        id_rumah: id,
        id_penghuni: parseInt(selectedNama),
        tanggal_mulai: tglMulai,
        tanggal_selesai: tglSelesai,
      });
      navigate(`/rumah/penghuni-rumah/${id}/${nomer}`);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex ">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Tambah Penghuni Rumah {nomer}</CardTitle>
          <CardDescription>Isilah No. rumah, Status Huni</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="status_huni">Nama</Label>
                <Select
                  onValueChange={(value) => setSelectedNama(value)}
                  required
                >
                  <SelectTrigger id="nama_penghuni" className="w-full">
                    <SelectValue placeholder="Pilih nama penghuni" />
                  </SelectTrigger>
                  <SelectContent>
                    {penghuniList.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tgl_mulai">Tangggal Mulai (Y-M-D)</Label>
                <Input
                  id="tgl_mulai"
                  name="tgl_mulai"
                  placeholder="2024-10-10"
                  onChange={(e) => setTglMulai(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tgl_selesai">Tangggal Selesai (Y-M-D)</Label>
                <Input
                  id="tgl_selesai"
                  name="tgl_selesai"
                  placeholder="2024-10-10"
                  onChange={(e) => setTglSelesai(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-600">{error}</p>}
            {loading ? <p>loading....</p> : null}
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            disabled={loading}
            type="submit"
            className="w-full"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
