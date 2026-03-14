import { useState } from "react";
import { Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import { dummyFriends } from "./dummyFriends";

import "./SendModal.scss";

const SendModal = ({ show, handleClose }) => {
  const [selected, setSelected] = useState(null);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="send-modal"
    >
      {/* HEADER WITH TITLE */}
      <Modal.Header closeButton className="send-modal-header">
        <motion.h5
          className="modal-title-custom"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Send To
        </motion.h5>
      </Modal.Header>

      <Modal.Body className="send-modal-body">
        <div className="friends-grid">
          {dummyFriends.map((friend, index) => (
            <motion.div
              key={friend.id}
              className={`friend-card ${
                selected === friend.id ? "active" : ""
              }`}
              onClick={() => setSelected(friend.id)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="avatar-wrapper">
                <img src={friend.avatar} alt={friend.name} />
              </div>
              <p>{friend.name}</p>
            </motion.div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SendModal;