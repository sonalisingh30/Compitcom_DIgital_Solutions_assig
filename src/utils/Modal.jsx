/* eslint-disable react/prop-types */
import { createPortal } from "react-dom";
import { HiOutlineXMark } from "react-icons/hi2";

// Modal component
const Modal = ({ isOpen, title, children, onClose, actions }) => {
  // Conditionally render modal only if isOpen is true
  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      ></div>
      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
          {/* Close button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <HiOutlineXMark size={30} />
          </button>
          {/* Modal title */}
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {title}
            </h3>
          )}
          {/* Modal content */}
          <div className="mb-4">{children}</div>
          {/* Modal actions */}
          <div className="flex justify-end space-x-2">{actions}</div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root") // Assuming this element exists in your index.html
  );
};

export default Modal;
