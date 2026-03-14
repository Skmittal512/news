import { useState } from "react";
import { Button } from "react-bootstrap";
import { MessageCircleReply } from "lucide-react";

import ReplyForm from "./ReplyForm";
import { User } from "lucide-react";
import { timeAgo } from "../../../../lib/timeAgo";

import "./ReplyItem.scss";

const ReplyItem = ({ reply, threadID, refreshReplies }) => {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="reply-item">

      <div className="reply-wrapper">

        <div className="avatar">
          <User size={18} />
        </div>

        <div className="reply-content">

          <div className="reply-header">

            <span className="username">
              {reply.createdBy}
            </span>

            <span className="time">
              {timeAgo(reply.createdAt)}
            </span>

          </div>

          <div className="reply-body">
            {reply.body}
          </div>

          <div className="reply-actions">

            <Button
              size="sm"
              variant="link"
              className="reply-btn"
              onClick={() => setShowReply(!showReply)}
            >
              <MessageCircleReply size={15} />
              Reply
            </Button>

          </div>

          {showReply && (
            <ReplyForm
              threadID={threadID}
              parentReplyID={reply.id}
              onSuccess={refreshReplies}
            />
          )}

        </div>

      </div>

      {reply.children?.length > 0 && (
        <div className="nested-replies">
          {reply.children.map((child) => (
            <ReplyItem
              key={child.id}
              reply={child}
              threadID={threadID}
              refreshReplies={refreshReplies}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default ReplyItem;