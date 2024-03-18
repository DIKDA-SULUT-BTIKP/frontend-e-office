import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import KadisLayout from "../../layout/KadisLayout";

const LetterDetailKadis = () => {
  const { id } = useParams();
  const [letter, setLetter] = useState({});
  const [selectedTo, setSelectedTo] = useState([]);
  const [purposeOfLetter, setPurposeOfLetter] = useState("a");
  const [notes, setNotes] = useState("");
  const [lookForward, setLookForward] = useState("Mengharapkan 1");
  console.log(id);
  const fetchLetter = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/letter/${id}`);
      setLetter(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLetter();
  }, []);
  return (
    <KadisLayout>
      <div>
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
        {lookForward !== null ? (
          <div className="mb-5">
            <label
              htmlFor=""
              className="block pb-1 text-sm font-semibold text-gray-600"
            >
              Mengharapkan
            </label>
            <input
              type="text"
              value={letter?.lookForward}
              className="w-full px-3 py-2 mt-1 border rounded-lg"
              disabled
            />
          </div>
        ) : (
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
                <option value="Lakukan Pemeriksaan">Lakukan Pemeriksaan</option>
                <option value="UDK">UDK</option>
                <option value="File/Ingatkan">File/Ingatkan</option>
              </select>
            </div>
          </>
        )}

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
      </div>
      <div />
    </KadisLayout>
  );
};

export default LetterDetailKadis;
