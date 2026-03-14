import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Send } from "lucide-react";

import { addReply } from "../../services/discussion.service";

import "./ReplyForm.scss";

const ReplyForm = ({ threadID, parentReplyID, onSuccess }) => {

  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    await addReply({
      threadID,
      parentReplyID,
      body: text,
      createdBy: "user123"
    });

    setText("");
    onSuccess?.();
  };

  return (
    <Form className="reply-form" onSubmit={handleSubmit}>

      <Form.Control
        as="textarea"
        rows={2}
        placeholder="Write a reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button type="submit" size="sm" className="send-btn">
        <Send size={16}/>
      </Button>

    </Form>
  );
};

export default ReplyForm;