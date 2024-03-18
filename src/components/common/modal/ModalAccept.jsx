import PropTypes from "prop-types";

const ModalAccept = ({ isOpen, onClose, handleAccept, title, subTitle }) => {
  const modalClass = isOpen ? "" : "hidden";
  return (
    <div
      className={`fixed inset-0 z-index-top  flex items-center justify-center ${modalClass}`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="absolute p-6 bg-white rounded shadow-md w-72">
        <h2 className="text-lg font-semibold text-center">{title}</h2>
        <p className="mt-4 text-center text-gray-500">{subTitle}</p>
        <div className="grid grid-cols-2 gap-2 mt-6">
          <button onClick={handleAccept} className="btn-primary">
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

ModalAccept.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  handleAccept: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default ModalAccept;
