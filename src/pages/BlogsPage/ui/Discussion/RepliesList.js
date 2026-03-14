import ReplyItem from "./ReplyItem";

const RepliesList = ({ replies, threadID, refreshReplies }) => {

  return (
    <div>

      {replies.map((reply) => (
        <ReplyItem
          key={reply.id}
          reply={reply}
          threadID={threadID}
          refreshReplies={refreshReplies}
        />
      ))}

    </div>
  );

};

export default RepliesList;