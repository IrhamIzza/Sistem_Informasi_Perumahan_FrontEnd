import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  BarElement, LineElement,
  PointElement, Tooltip, Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Button } from '@/components/ui/button';

ChartJS.register(
  CategoryScale, LinearScale,
  BarElement, LineElement,
  PointElement, Tooltip, Legend
);

  const handleUpdate = async () => {
    try {
      await axios.post("http://localhost:8000/api/saldo/rekap-bulanan", {
      });
    } catch (error) {
      console.log(error);
    }
  };


const GrafikTahunan = () => {
  const [chartData, setChartData] = useState(null);
  const [tahun, setTahun] = useState(new Date().getFullYear());

  useEffect(() => {
    axios.get(`http://localhost:8000/api/report/grafik-tahunan?tahun=${tahun}`)
      .then(res => {
        const labels = res.data.map(item => `Bulan ${item.bulan}`);
        const pemasukan = res.data.map(item => item.total_pemasukan);
        const pengeluaran = res.data.map(item => item.total_pengeluaran);
        const saldo = res.data.map(item => item.saldo_akhir);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Pemasukan',
              data: pemasukan,
              backgroundColor: 'rgba(34, 197, 94, 0.6)', // green
              stack: 'stack1'
            },
            {
              label: 'Pengeluaran',
              data: pengeluaran,
              backgroundColor: 'rgba(239, 68, 68, 0.6)', // red
              stack: 'stack1'
            },
            {
              label: 'Saldo Akhir',
              type: 'line',
              data: saldo,
              borderColor: 'rgba(59, 130, 246, 1)', // blue
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              tension: 0.3,
              yAxisID: 'y'
            }
          ]
        });
      });
  }, [tahun]);

  if (!chartData) return <div className="text-center">Loading grafik...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow rounded">
      <Button size='sm' onClick={handleUpdate}>update</Button>
      <h2 className="text-xl font-bold mb-4 text-center">Grafik Keuangan Tahun {tahun}</h2>

      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
          },
          scales: {
            x: { stacked: true },
            y: { stacked: false, beginAtZero: true }
          }
        }}
      />

      <div className="mt-4 text-center">
        <label className="mr-2">Tahun:</label>
        <input
          type="number"
          value={tahun}
          onChange={e => setTahun(e.target.value)}
          className="border px-2 py-1 rounded w-24 text-center"
        />
      </div>
    </div>
  );
};

export default GrafikTahunan;
