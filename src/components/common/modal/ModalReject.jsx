import PropTypes from "prop-types";
import { useState } from "react";

const ModalReject = ({
  isOpen,
  onClose,
  handleReject,
  title,
  subTitle,
  isError: parentIsError,
}) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const modalClass = isOpen ? "" : "hidden";

  const handleRejectClick = () => {
    if (message.trim() === "") {
      setIsError(true);
    } else {
      setIsError(false);
      handleReject(message);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    setIsError(false); // Reset error when the user starts typing
  };

  return (
    <div
      className={`fixed inset-0 z-index-top flex items-center justify-center ${modalClass}`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="absolute p-6 bg-white rounded shadow-md w-80">
        <h2 className="text-lg font-semibold text-center">{title}</h2>
        <p className="mt-4 text-center text-gray-500">{subTitle}</p>
        <div className="mt-4">
          <label htmlFor="rejectionReason" className="block">
            Alasan Penolakan
          </label>
          <textarea
            id="rejectionReason"
            name="rejectionReason"
            cols="30"
            rows="10"
            className={`border-[1px] p-2 mt-2 border-gray-500 ${
              isError ? "border-red-500" : ""
            }`}
            value={message}
            onFocus={() => setIsError(false)}
            onChange={handleTextareaChange}
          ></textarea>
        </div>
        {isError && (
          <p className="text-red-500">Alasan penolakan harus diisi</p>
        )}
        <div className="grid grid-cols-2 gap-2 mt-6">
          <button onClick={handleRejectClick} className="btn-primary">
            Ya
          </button>
          <button onClick={onClose} className="btn-secondary">
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

ModalReject.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  handleReject: PropTypes.func,
  title: PropTypes.node,
  subTitle: PropTypes.node,
  isError: PropTypes.bool,
};

export default ModalReject;
