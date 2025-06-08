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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePenghuni() {
  const navigate = useNavigate();
  const [inputNama, setInputNama] = useState("");
  const [inputStatusHuni, setInputStatusHuni] = useState("");
  const [inputNoTel, setInputNoTel] = useState("");
  const [inputStausKawin, setInputStausKawin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
       setLoading(true)
      await axios.post("http://localhost:8000/api/penghuni", {
        nama: inputNama,
        status_penghuni: inputStatusHuni,
        nomor_telepon: inputNoTel,
        status_perkawinan: inputStausKawin,
      });
      navigate("/penghuni");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Card className="w-full max-w-sm">
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
                  onChange={(e) => setInputNama(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status_penghuni">Status Penghuni</Label>
                <Select
                  onValueChange={(value) => setStatusHuni(value)}
                  required
                >
                  <SelectTrigger id="status_perkawinan" className="w-full">
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
                  onChange={(e) => setInputNoTel(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status_perkawinan">Status Perkawinan</Label>
                <Select
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
          <Button disabled={loading} type="submit" className="w-full" onClick={handleSubmit}>
            Create
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
