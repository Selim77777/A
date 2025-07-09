import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
        >
          <motion.div
            // Modal Content
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            className="bg-white rounded-lg shadow-xl p-6 relative w-full max-w-md"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
// c:/Users/BAHZ/ESL Pathway/A/src/components/Modal.jsx
// This component uses Framer Motion for animations and Lucide icons for the close button.