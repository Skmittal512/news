export const buildReplyTree = (replies) => {

  const sortedReplies = [...replies].sort(
    (a, b) => b.createdAt.seconds - a.createdAt.seconds
  );

  const map = {};
  const roots = [];

  sortedReplies.forEach((reply) => {
    map[reply.id] = { ...reply, children: [] };
  });

  sortedReplies.forEach((reply) => {
    if (reply.parentReplyID) {
      map[reply.parentReplyID]?.children.push(map[reply.id]);
    } else {
      roots.push(map[reply.id]);
    }
  });

  return roots;
};