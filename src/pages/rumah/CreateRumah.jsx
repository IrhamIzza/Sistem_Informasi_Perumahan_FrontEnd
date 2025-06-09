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

export default function CreateRumah() {
  const navigate = useNavigate();
  const [inputNoRumah, setnputNoRumah] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
       setLoading(true)
      await axios.post("http://localhost:8000/api/rumah", {
        nomer_rumah: inputNoRumah,
      });
      navigate("/rumah");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex ">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Rumah</CardTitle>
          <CardDescription>
            Isilah No. rumah, Status Huni
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
                  onChange={(e) => setnputNoRumah(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status_rumah">Status Rumah</Label>
              </div>
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
    </div>
  );
}
