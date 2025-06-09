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

export default function EditRumah() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputNoRumah, setnputNoRumah] = useState("");
  const [inputStatusHuni, setInputStatusHuni] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRumah = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rumah/${id}`
        );
        const data = response.data;
        setnputNoRumah(data.nomer_rumah);
        setInputStatusHuni(data.status_huni);
      } catch (error) {
        console.error("Terjadi error:", error);
      }
    };
    fetchRumah();
  }, [id]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:8000/api/rumah/${id}`, {
        _method: "put",
        nomer_rumah: inputNoRumah,
        status_huni: inputStatusHuni,
      });
      navigate("/rumah");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Edit Rumah</CardTitle>
          <CardDescription>
            Isilah Nama, No. Telepon, Status Huni, dan lainnya
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="nama">No Rumah</Label>
                <Input
                  id="nama"
                  name="nama"
                  value={inputNoRumah}
                  onChange={(e) => setnputNoRumah(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status_huni">Status Huni</Label>
                <Select
                  value={inputStatusHuni}
                  onValueChange={(value) => setInputStatusHuni(value)}
                  required
                >
                  <SelectTrigger id="status_huni" className="w-full">
                    <SelectValue placeholder="Pilih status huni" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dihuni">Huni</SelectItem>
                    <SelectItem value="tidak dihuni">Tidak Dihuni</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
