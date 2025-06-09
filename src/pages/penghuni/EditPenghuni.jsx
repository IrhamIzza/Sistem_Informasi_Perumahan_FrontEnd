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

export default function EditPenghuni() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [statusHuni, setStatusHuni] = useState("");
  const [noTel, setNoTel] = useState("");
  const [statusKawin, setStatusKawin] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPenghuni = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/penghuni/${id}`
        );
        const data = response.data;
        setNama(data.nama);
        setStatusHuni(data.status_penghuni);
        setNoTel(data.nomor_telepon);
        setStatusKawin(data.status_perkawinan);
      } catch (error) {
        console.error("Terjadi error:", error);
      }
    };
    fetchPenghuni();
  }, [id]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:8000/api/penghuni/${id}`, {
        _method: "put",
        nama: nama,
        status_penghuni: statusHuni,
        nomor_telepon: noTel,
        status_perkawinan: statusKawin,
      });
      navigate("/penghuni");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Penghuni</CardTitle>
          <CardDescription>
            Isilah Nama, No. Telepon, Status Huni, dan lainnya
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  name="nama"
                  value={nama }
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status_penghuni">Status Penghuni</Label>
                <Select
                  value={statusHuni}
                  onValueChange={(value) => setStatusHuni(value)}
                  required
                >
                  <SelectTrigger id="status_penghuni" className="w-full">
                    <SelectValue placeholder="Pilih status huni" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tetap">Tetap</SelectItem>
                    <SelectItem value="kontrak">Kontrak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nomor_telepon">No Telepon</Label>
                <Input
                  id="nomor_telepon"
                  name="nomor_telepon"
                  value={noTel}
                  onChange={(e) => setNoTel(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status_perkawinan">Status Perkawinan</Label>
                <Select
                  value={statusKawin}
                  onValueChange={(value) => setStatusKawin(value)}
                  required
                >
                  <SelectTrigger id="status_perkawinan" className="w-full">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="menikah">Menikah</SelectItem>
                    <SelectItem value="belum menikah">Belum Menikah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* <div className="grid gap-2">
                        <Label htmlFor="foto_ktp">Foto KTP</Label>
                        <Input
                          id="foto_ktp"
                          name="foto_ktp"
                          type="file"
                          onChange={onChange}
                        />
                      </div> */}
            </div>
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
            Update
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
