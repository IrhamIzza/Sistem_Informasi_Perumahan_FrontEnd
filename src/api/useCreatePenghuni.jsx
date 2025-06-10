import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useCreatePenghuni() {
  const navigate = useNavigate();

  const createPenghuni = async (inputNama,inputStatusHuni,inputNoTel,inputStausKawin) => {
    try {
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
  return(
    createPenghuni
  )
}
