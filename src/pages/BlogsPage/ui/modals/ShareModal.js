import { useState } from "react";
import { Modal } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaLink,
} from "react-icons/fa";

import "./ShareModal.scss";

const ShareModal = ({ show, handleClose }) => {
  const link = window.location.href;
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const shareItems = [
    { icon: <FaWhatsapp />, color: "#25D366" },
    { icon: <FaFacebookF />, color: "#1877F2" },
    { icon: <FaTwitter />, color: "#1DA1F2" },
    { icon: <FaLinkedinIn />, color: "#0077B5" },
    { icon: <FaLink />, color: "#555", action: copyLink },
  ];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="share-modal"
    >
      <Modal.Header closeButton className="send-modal-header">
        <motion.h5
          className="modal-title-custom"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Share To
        </motion.h5>
      </Modal.Header>
      <Modal.Body className="share-modal-body">

        <div className="share-icons">
          {shareItems.map((item, index) => (
            <motion.div
              key={index}
              className="share-icon-box"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ background: item.color }}
              onClick={item.action}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>

        <div className="share-link-preview">
          {link}
        </div>

        {/* Copy Success Message */}
        <AnimatePresence>
          {copied && (
            <motion.div
              className="copy-success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Link Copied!
            </motion.div>
          )}
        </AnimatePresence>
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal;