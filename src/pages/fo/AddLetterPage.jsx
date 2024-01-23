import { useState } from "react";
import FOLayout from "../../layout/FOLayout";
import axios from "axios";
import ToastError from "../../components/common/toast/ToastError";
import ToastSuccess from "../../components/common/toast/ToastSuccess";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/loading/Loading";

const AddLetterPage = () => {
  const [name, setName] = useState("");
  const [originOfLetter, setOriginOfLetter] = useState("");
  const [number, setNumber] = useState("");
  const [to, setTo] = useState("KEPALA DINAS");
  const [dateOfLetter, setDateOfLetter] = useState("");
  const [type, setType] = useState("Umum");
  const [regarding, setRegarding] = useState("");
  const [characteristic, setCharacteristic] = useState("UMUM");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Silahkan upload file terlebih dahulu");
      setStatus("Gagal");
      setTimeout(() => {
        setMessage("");
        setStatus("");
      }, 1500);
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("type", type);
      formData.append("originOfLetter", originOfLetter);
      formData.append("to", to);
      formData.append("number", number);
      formData.append("characteristic", characteristic);
      formData.append("dateOfLetter", dateOfLetter);
      formData.append("regarding", regarding);
      const response = await axios.post(
        "http://localhost:5000/letter/add",
        formData
      );

      if (response.data.status === "Berhasil") {
        setLoading(false);
      }

      setMessage(response.data.message);
      setStatus(response.data.status);
      setTimeout(() => {
        setMessage("");
        setStatus("");
        navigate("/fo/letters");
      }, 1500);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setMessage(error.response.data.message);
        setStatus(error.response.data.status);
      } else if (error.message) {
        setMessage(error.message);
        setStatus("Gagal");
      } else {
        setMessage("Terjadi kesalahan");
        setStatus("Gagal");
      }

      setTimeout(() => {
        setMessage("");
        setStatus("");
      }, 1500);
      console.error(error);
    }
  };

  return (
    <>
      {message.length !== 0 ? (
        status === "Berhasil" ? (
          <ToastSuccess message={message} />
        ) : (
          <ToastError message={message} />
        )
      ) : null}
      {loading ? <Loading /> : null}
      <FOLayout>
        <div>
          <form onSubmit={handleUpload}>
            <div className="mb-5">
              <label
                htmlFor=""
                className="block pb-1 text-sm font-semibold text-gray-600"
              >
                Jenis
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 mt-1 border rounded-lg"
              >
                <option value="SURAT DISPOSISI">Surat Disposisi</option>
                <option value="SURAT LANGSUNG">Surat Langsung</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor=""
                className="block pb-1 text-sm font-semibold text-gray-600"
              >
                Surat Dari
              </label>
              <input
                type="text"
                onChange={(e) => setOriginOfLetter(e.target.value)}
                value={originOfLetter}
                className="w-full px-3 py-2 mt-1 border rounded-lg"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor=""
                className="block pb-1 text-sm font-semibold text-gray-600"
              >
                Nama
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-3 py-2 mt-1 border rounded-lg"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor=""
                className="block pb-1 text-sm font-semibold text-gray-600"
              >
                Nomor Surat
              </label>
              <input
                type="text"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                className="w-full px-3 py-2 mt-1 border rounded-lg"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor=""
                className="block pb-1 text-sm font-semibold text-gray-600"
              >
                Tanggal Surat
              </label>
              <input
                type="date"
                onChange={(e) => setDateOfLetter(e.target.value)}
                value={dateOfLetter}
                className="w-full px-3 py-2 mt-1 border rounded-lg"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor=""
                className="block pb-1 text-sm font-semibold text-gray-600"
              >
                Sifat Surat
              </label>
              <select
                value={characteristic}
                onChange={(e) => setCharacteristic(e.target.value)}
                className="w-full px-3 py-2 mt-1 border rounded-lg"
              >
                <option value="UMUM">Umum</option>
                <option value="SANGAT SEGERA">Sangat Segera</option>
                <option value="Segera">Segera</option>
                <option value="RAHASIA">Rahasia</option>
                <option value="PENTING">Penting</option>
                <option value="BIASA">Biasa</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor=""
                className="block pb-1 text-sm font-semibold text-gray-600"
              >
                Perihal
              </label>
              <input
                type="text"
                onChange={(e) => setRegarding(e.target.value)}
                value={regarding}
                className="w-full px-3 py-2 mt-1 border rounded-lg"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor=""
                className="block pb-1 text-sm font-semibold text-gray-600"
              >
                Tujuan
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-3 py-2 mt-1 border rounded-lg"
              >
                <option value="KEPALA DINAS">Kepala Dinas</option>
                <option value="SEKRETARIS">Sekretaris</option>
              </select>
            </div>
            <div className="relative border border-gray-500 border-dashed">
              <input
                type="file"
                onChange={handleFileChange}
                className="relative z-50 block w-full h-full p-20 opacity-0 cursor-pointer"
              />
              <div className="absolute top-0 left-0 right-0 p-10 m-auto text-center">
                {fileName.length !== 0 ? (
                  <h4>{fileName}</h4>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center">
                      <h4>
                        Taruh berkas di mana saja untuk mengunggah
                        <br />
                        atau
                      </h4>
                      <p className>Pilih Berkas</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-1/2 px-5 py-2 mt-6 text-sm tracking-wide text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-red-500 dark:bg-red-600"
            >
              Simpan
            </button>
          </form>
        </div>
      </FOLayout>
    </>
  );
};

export default AddLetterPage;
