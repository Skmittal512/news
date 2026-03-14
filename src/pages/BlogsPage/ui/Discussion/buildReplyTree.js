export const buildReplyTree = (replies) => {
  const map = {};
  const roots = [];

  replies.forEach((reply) => {
    map[reply.id] = { ...reply, children: [] };
  });

  replies.forEach((reply) => {
    if (reply.parentReplyID) {
      map[reply.parentReplyID]?.children.push(map[reply.id]);
    } else {
      roots.push(map[reply.id]);
    }
  });

  return roots;
};