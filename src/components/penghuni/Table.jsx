import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

export default function MyTable({ data }) {
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
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.nama}</TableCell>
            <TableCell>{item.status_penghuni}</TableCell>
            <TableCell>{item.nomor_telepon}</TableCell>
            <TableCell>{item.status_perkawinan}</TableCell>
            <TableCell>
            <Button>Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
