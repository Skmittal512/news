import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

import "./StarModal.scss";

const StarModal = ({ show, handleClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="star-modal"
    >
      <Modal.Header closeButton>
        <motion.h5
          className="modal-title-custom"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Rate this Blog
        </motion.h5>
      </Modal.Header>

      <Modal.Body className="star-modal-body text-center">
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <motion.div
              key={star}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <FaStar
                className={
                  star <= (hover || rating) ? "filled" : ""
                }
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              />
            </motion.div>
          ))}
        </div>

        <p className="rating-text">
          {rating > 0
            ? `You rated ${rating} star${rating > 1 ? "s" : ""}`
            : "Tap a star to rate"}
        </p>

        <Button
          className="submit-rating-btn"
          disabled={!rating}
          onClick={handleClose}
        >
          Submit Rating
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default StarModal;