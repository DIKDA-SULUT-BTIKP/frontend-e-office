import { useEffect, useState } from "react";
import KadisLayout from "../../../layout/KadisLayout";
import ModalReject from "../../../components/common/modal/ModalReject";
import ModalAccept from "../../../components/common/modal/ModalAccept";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../../components/common/loading/Loading";
import { useNavigate } from "react-router-dom";

const PTKDetailPage = () => {
  const [isOpenModalReject, setIsOpenModalReject] = useState(false);
  const [isOpenModalAccept, setIsOpenModalAccept] = useState(false);
  const [isOpenToastError, setIsOpenToastError] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const [ptk, setPTK] = useState({});
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const handleReject = async (message) => {
    try {
      setLoading(true);
      const data = {
        aksi: "tolak",
        alasan_penolakan: message,
      };

      const config = {
        headers: {
          Authorization: "btikp1234567890pkitb",
        },
        withCredentials: false,
      };
      const response = await axios.patch(
        `https://apps-dikda.sulutprov.go.id/ptk_baru/${id}`,
        data,
        config
      );
      if (response) {
        setLoading(false);
        navigate("/kadis/ptk/rejected");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchDetailPTK = async () => {
    try {
      const response = await axios.get(
        `https://apps-dikda.sulutprov.go.id/ptk_baru/${id}`,
        {
          headers: {
            Authorization: "btikp1234567890pkitb",
          },
          withCredentials: false,
        }
      );
      const { result } = response.data;
      setPTK(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailPTK();
  }, []);
  const handleAccept = async () => {
    try {
      setLoading(true);
      const data = {
        aksi: "terima",
      };

      const config = {
        headers: {
          Authorization: "btikp1234567890pkitb",
        },
        withCredentials: false,
      };
      const response = await axios.patch(
        `https://apps-dikda.sulutprov.go.id/ptk_baru/${id}`,
        data,
        config
      );

      if (response) {
        setLoading(false);
        navigate("/kadis/ptk/accepted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KadisLayout>
      {loading && <Loading />}
      <ModalReject
        isError={isError}
        isOpen={isOpenModalReject}
        handleReject={handleReject}
        title="Konfirmasi Pengajuan GTK"
        subTitle="Apakah anda yakin ingin menolak pengajuan GTK?"
        onClose={() => setIsOpenModalReject(false)}
      />
      <ModalAccept
        isOpen={isOpenModalAccept}
        handleAccept={handleAccept}
        title="Konfirmasi Pengajuan GTK"
        subTitle="Apakah anda yakin ingin menyetujui pengajuan GTK?"
        onClose={() => setIsOpenModalAccept(false)}
      />
      <div>
        <table className="text-left">
          <tr>
            <th>Nama GTK</th>
            <td>: {ptk.nama_gtk}</td>
          </tr>
          <tr>
            <th>Nama Sekolah (Sekarang)</th>
            <td>: {ptk.nama_sekolah_sekarang}</td>
          </tr>
          <tr>
            <th>Jenis GTK</th>
            <td>: {ptk.jenis_gtk}</td>
          </tr>
          <tr>
            <th>Pendidikan Terakhir</th>
            <td>: {ptk.pendidikan_terakhir}</td>
          </tr>
          <tr>
            <th>Jurusan</th>
            <td>: {ptk.jurusan}</td>
          </tr>
          <tr>
            <th>Sudah Pernah Terdaftar di Dapodik</th>
            <td>: {ptk.status_dapodik}</td>
          </tr>
          <tr>
            <th>Nama Sekolah (Sebelumnya)</th>
            <td>: {ptk.nama_sekolah_sebelumnya}</td>
          </tr>
          <tr>
            <th>Sudah Ada NUPTK</th>
            <td>: {ptk.status_nuptk}</td>
          </tr>
          <tr>
            <th>NUPTK</th>
            <td>: {ptk.nuptk}</td>
          </tr>
          <tr>
            <th>Status Pengajuan</th>
            <td>: Menunggu Verifikasi oleh GTK</td>
          </tr>
        </table>
      </div>
      <div className="mt-8">
        <h4>
          Surat Permohonan Tambah GTK Baru di Satuan Pendidikan di Tujukan ke
          Kepala Dinas mengetahui Cabang Dinas / Bidang ( .pdf ) *
        </h4>
        <div className="p-8 mt-8">
          <iframe src={ptk.lokasi_dokumen} width="100%" height="500px" />
        </div>
      </div>
      <div className="flex items-center justify-center w-48 mt-8 mb-10 space-x-2">
        <button
          onClick={() => setIsOpenModalAccept(true)}
          className="uppercase btn-primary"
        >
          Terima
        </button>
        <button
          onClick={() => setIsOpenModalReject(true)}
          className="uppercase btn-secondary"
        >
          Tolak
        </button>
      </div>
    </KadisLayout>
  );
};

export default PTKDetailPage;
