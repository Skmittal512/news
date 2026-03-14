import { useState } from "react";
import { FaTelegramPlane, FaShareAlt, FaHeart } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";

import SendModal from "./modals/SendModal";
import ShareModal from "./modals/ShareModal";

import "./BlogActionBar.scss";

const BlogActionBar = () => {
  const [showSend, setShowSend] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <>
      <div className="blog-action-bar">
        {/* SEND */}
        <button aria-label="Send" onClick={() => setShowSend(true)}>
          <FaTelegramPlane />
        </button>

        {/* SHARE */}
        <button aria-label="Share" onClick={() => setShowShare(true)}>
          <FaShareAlt />
        </button>

        {/* LIKE */}
        <button
          aria-label="Like"
          onClick={() => setLiked(!liked)}
          className={liked ? "liked" : ""}
        >
          <FaHeart />
        </button>

        {/* DOWNLOAD */}
        <button className="download" aria-label="Download">
          <MdFileDownload />
        </button>
      </div>

      {/* Modals */}
      <SendModal show={showSend} handleClose={() => setShowSend(false)} />
      <ShareModal show={showShare} handleClose={() => setShowShare(false)} />
    </>
  );
};

export default BlogActionBar;