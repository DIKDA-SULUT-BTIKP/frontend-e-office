import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import KadisLayout from "../../layout/KadisLayout";
import Loading from "../../components/common/loading/Loading";
import ToastError from "../../components/common/toast/ToastError";
import ToastSuccess from "../../components/common/toast/ToastSuccess";
import Letter from "../../components/common/pdf/letter";

const ProcessKadisPage = () => {
  const { id } = useParams();
  const [letter, setLetter] = useState({});
  const [selectedTo, setSelectedTo] = useState([]);
  const [notes, setNotes] = useState("");
  const [lookForward, setLookForward] = useState("Mengharapkan 1");
  const [isDisposition, setIsDisposition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const fetchLetter = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/letter/${id}`);

      setLetter(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (value) => {
    setSelectedTo((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  const handleDisposition = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // /letter/disposition-to-secretary/kadis/:
      const response = await axios.patch(
        `http://localhost:5000/letter/disposition/${id}`,
        {
          notes: notes,
          lookForward: lookForward,
          selectedTo: selectedTo,
        }
      );
      setLoading(false);
      if (loading === false && response.data !== null) {
        navigate("/kadis/letters/dispositioned");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleProcess = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:5000/letter/process/kadis/${id}`
      );
      console.log(response.data);
      setLoading(false);
      navigate("/kadis/letters/in-process");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCompleted = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:5000/letter/finish/kadis/${id}`
      );
      console.log(response.data);
      setLoading(false);
      navigate("/kadis/letters/completed");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLetter();
  }, []);
  return (
    <KadisLayout>
      <>
        {loading && <Loading />}
        <form onSubmit={handleDisposition}>
          <div className="mb-5">
            <label
              htmlFor=""
              className="block pb-1 text-sm font-semibold text-gray-600"
            >
              Nomor Surat
            </label>
            <input
              type="text"
              value={letter?.number}
              className="w-full px-3 py-2 mt-1 border rounded-lg"
              disabled
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor=""
              className="block pb-1 text-sm font-semibold text-gray-600"
            >
              Nama Surat
            </label>
            <input
              type="text"
              value={letter?.name}
              className="w-full px-3 py-2 mt-1 border rounded-lg"
              disabled
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor=""
              className="block pb-1 text-sm font-semibold text-gray-600"
            >
              Asal Surat
            </label>
            <input
              type="text"
              value={letter?.originOfLetter}
              className="w-full px-3 py-2 mt-1 border rounded-lg"
              disabled
            />
          </div>
          {letter?.status === "BELUM DIPROSES" ? (
            <div>
              <p className="text-xl font-bold">Disposisi Surat ini?</p>
              <input
                type="checkbox"
                onChange={(e) => setIsDisposition(e.target.checked)}
                checked={isDisposition}
              />
            </div>
          ) : null}
          {isDisposition ? (
            <>
              <div className="mb-5">
                <label
                  htmlFor=""
                  className="block pb-1 text-sm font-semibold text-gray-600"
                >
                  Mengharapkan
                </label>
                <select
                  className="w-full px-3 py-2 mt-1 border rounded-lg"
                  value={lookForward}
                  onChange={(e) => setLookForward(e.target.value)}
                >
                  <option value="Proses/Selesaikan Sesuai Ketentuan">
                    Proses/Selesaikan Sesuai Ketentuan
                  </option>
                  <option value="Telah Staf/Pelajar/Kajian/Teliti">
                    Telah Staf/Pelajar/Kajian/Teliti
                  </option>
                  <option value="Koordinasikan">Koordinasikan</option>
                  <option value="Buat Tanggapan dan Saran">
                    Buat Tanggapan dan Saran
                  </option>
                  <option value="Monitor Untuk Masukan">
                    Monitor Untuk Masukan
                  </option>
                  <option value="Teliti Ketersediaan Anggaran">
                    Teliti Ketersediaan Anggaran
                  </option>
                  <option value="Mewakili Kepala Dinas">
                    Mewakili Kepala Dinas
                  </option>
                  <option value="Laporan Tertulis">Laporan Tertulis</option>
                  <option value="Hadapkan Langsung ke Kadis">
                    Hadapkan Langsung ke Kadis
                  </option>
                  <option value="Buatkan Materi/Sambutan">
                    Buatkan Materi/Sambutan
                  </option>
                  <option value="Tangani/Proses Lebih Lanjut">
                    Tangani/Proses Lebih Lanjut
                  </option>
                  <option value="Untuk Minta Perhatian">
                    Untuk Minta Perhatian
                  </option>
                  <option value="Lakukan Pemeriksaan">
                    Lakukan Pemeriksaan
                  </option>
                  <option value="UDK">UDK</option>
                  <option value="File/Ingatkan">File/Ingatkan</option>
                </select>
              </div>
              <div className="mb-5">
                <label
                  htmlFor=""
                  className="block pb-1 text-sm font-semibold text-gray-600"
                >
                  Catatan
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-lg"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor=""
                  className="block pb-1 text-sm font-semibold text-gray-600"
                >
                  Tujuan Selanjutnya
                </label>
                <div className="flex">
                  <div className="mr-4">
                    <input
                      type="checkbox"
                      id="tujuanSekretaris"
                      value="Sekretaris"
                      className="mr-1"
                      checked={selectedTo.includes("SEKRETARIS")}
                      onChange={() => handleCheckboxChange("SEKRETARIS")}
                    />
                    <label htmlFor="tujuanSekretaris">Sekretaris</label>
                  </div>
                  <div className="mr-4">
                    <input
                      type="checkbox"
                      id="tujuanBTIKP"
                      value="BTIKP"
                      className="mr-1"
                      checked={selectedTo.includes("BTIKP")}
                      onChange={() => handleCheckboxChange("BTIKP")}
                    />
                    <label htmlFor="tujuanBTIKP">Kepala BTIKP</label>
                  </div>
                  <div className="mr-4">
                    <input
                      type="checkbox"
                      id="tujuanSMA"
                      value="SMA"
                      className="mr-1"
                      checked={selectedTo.includes("SMA")}
                      onChange={() => handleCheckboxChange("SMA")}
                    />
                    <label htmlFor="tujuanSMA">Kepala Bidang SMA</label>
                  </div>
                  <div className="mr-4">
                    <input
                      type="checkbox"
                      id="tujuanSMK"
                      value="SMK"
                      className="mr-1"
                      checked={selectedTo.includes("SMK")}
                      onChange={() => handleCheckboxChange("SMK")}
                    />
                    <label htmlFor="tujuanSMK">Kepala Bidang SMK</label>
                  </div>
                  <div className="mr-4">
                    <input
                      type="checkbox"
                      id="tujuanGTK"
                      value="GTK"
                      className="mr-1"
                      checked={selectedTo.includes("GTK")}
                      onChange={() => handleCheckboxChange("GTK")}
                    />
                    <label htmlFor="tujuanSMK">Kepala Bidang GTK</label>
                  </div>
                  <div className="mr-4">
                    <input
                      type="checkbox"
                      id="tujuanPKLK"
                      value="PKLK"
                      className="mr-1"
                      checked={selectedTo.includes("PKLK")}
                      onChange={() => handleCheckboxChange("PKLK")}
                    />
                    <label htmlFor="tujuanSMK">Kepala Bidang PKLK</label>
                  </div>
                </div>
              </div>
              <div>
                {letter?.status === "SELESAI" ? null : (
                  <button
                    type="submit"
                    className="flex items-center justify-center w-1/2 px-5 py-2 mt-6 text-sm tracking-wide text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-red-500 dark:bg-red-600"
                  >
                    Disposisi
                  </button>
                )}
              </div>
            </>
          ) : null}
        </form>
        <React.Fragment>
          {letter?.status === "SELESAI" || isDisposition ? null : (
            <>
              {letter?.status === "BELUM DIPROSES" ? (
                <button
                  onClick={(e) => handleProcess(e)}
                  className="flex items-center justify-center w-1/2 px-5 py-2 mt-6 text-sm tracking-wide border-[1px] border-red-500 text-red-500 transition-colors duration-200 bg-white rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-gray-100 dark:hover:bg-red-500 dark:bg-red-600"
                >
                  Proses Surat ini
                </button>
              ) : (
                <button
                  onClick={(e) => handleCompleted(e)}
                  className="flex items-center justify-center w-1/2 px-5 py-2 mt-6 text-sm tracking-wide border-[1px] border-red-500 text-red-500 transition-colors duration-200 bg-white rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-gray-100 dark:hover:bg-red-500 dark:bg-red-600"
                >
                  Selesai
                </button>
              )}
            </>
          )}
        </React.Fragment>
      </>
    </KadisLayout>
  );
};

export default ProcessKadisPage;
