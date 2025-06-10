import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const Pengeluaran = () => {
  const [form, setForm] = useState({
    nama: '',
    tanggal: '',
    nominal: '',
    keterangan: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/pengeluaran', form)
      .then(res => {
        setMessage('Pengeluaran berhasil ditambahkan.');
        setForm({
          nama: '',
          tanggal: '',
          nominal: '',
          keterangan: ''
        });
      })
      .catch(err => {
        console.error(err);
        setMessage('Terjadi kesalahan saat menyimpan data.');
      });
  };

  return (
    <Card className="max-w-xl mx-auto mt-6 p-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Form Pengeluaran</h2>

        {message && (
          <div className="mb-4 text-green-600 font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nama">Nama Pengeluaran</Label>
            <Input
              id="nama"
              name="nama"
              placeholder="Nama Pengeluaran"
              value={form.nama}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="tanggal">Tanggal</Label>
            <Input
              id="tanggal"
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="nominal">Nominal</Label>
            <Input
              id="nominal"
              type="number"
              name="nominal"
              placeholder="Nominal"
              value={form.nominal}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="keterangan">Keterangan</Label>
            <Textarea
              id="keterangan"
              name="keterangan"
              placeholder="Keterangan"
              value={form.keterangan}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            Simpan Pengeluaran
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Pengeluaran;
