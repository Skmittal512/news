import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import {
  getRepliesByThread,
  getThreadByID
} from "../../services/discussion.service";

import { buildReplyTree } from "./buildReplyTree";
import {
  MessageSquare,
  Sparkles,
  Globe,
  Layers,
  Rocket,
  ArrowRight
} from "lucide-react";

import RepliesList from "./RepliesList";
import ReplyForm from "./ReplyForm";
import "./ThreadDiscussion.scss"

const ThreadDiscussion = ({ threadID }) => {

  const [replies, setReplies] = useState([]);
  const [thread, setThread] = useState(null);
  const [openDiscussion, setOpenDiscussion] = useState(false);

  const fetchReplies = async () => {
    const data = await getRepliesByThread(threadID);
    const tree = buildReplyTree(data);
    setReplies(tree);
  };

  useEffect(() => {

  const fetchThread = async () => {
    const data = await getThreadByID(threadID);
    setThread(data);
  };

  fetchThread();

}, [threadID]);

  const handleOpenDiscussion = async () => {
    setOpenDiscussion(true);
    fetchReplies();
  };

  if (!thread) return null;

  return (
    <div>

      {/* HERO DISCUSSION CARD */}

      <Card className="discussion-hero-card">

        <Card.Body>

          <div className="discussion-top">

            <div className="quest-badge">
              <Sparkles size={16} />
              Quest Board
            </div>

            <div className="visibility">
              <Globe size={16} />
              Public
            </div>

          </div>

          <h2 className="discussion-heading">
            Discussion Forum
          </h2>

          <p className="discussion-sub">
            Ask questions, share insights, and grow together.
          </p>

          <p className="discussion-module">
            On Module 1 : <strong>{thread.title}</strong>
          </p>

          <div className="discussion-stats">

            <div className="stat-pill">
              <Layers size={16} />
              <span>0</span>
              Threads
            </div>

            <div className="stat-pill">
              <MessageSquare size={16} />
              <span>{replies.length}</span>
              Replies
            </div>

            <div className="stat-pill">
              <Rocket size={16} />
              <span>0</span>
              Boosts
            </div>

          </div>

          {!openDiscussion && (

            <div
              className="start-discussion-btn"
              onClick={handleOpenDiscussion}
            >

              <div className="cta-icon">
                <Sparkles size={20} />
              </div>

              <div className="cta-text">

                <div className="cta-title">
                  Start a discussion
                </div>

                <div className="cta-sub">
                  Launch a new quest for answers
                </div>

              </div>

              <ArrowRight size={22} className="cta-arrow" />

            </div>

          )}

        </Card.Body>

      </Card>


      {/* OPEN DISCUSSION */}

      {openDiscussion && (
        <>
          <ReplyForm
            threadID={threadID}
            parentReplyID={null}
            onSuccess={fetchReplies}
          />

          <RepliesList
            replies={replies}
            threadID={threadID}
            refreshReplies={fetchReplies}
          />
        </>
      )}

    </div>
  );
};

export default ThreadDiscussion;