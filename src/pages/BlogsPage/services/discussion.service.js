import {
    collection, query, where, orderBy, getDocs, addDoc, doc, getDoc,
    serverTimestamp
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

export const getRepliesByThread = async (threadID) => {
    try {
        const q = query(
            collection(db, "discussionReplies"),
            where("threadID", "==", threadID),
            orderBy("createdAt")
        );

        const snapshot = await getDocs(q);

        const replies = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return replies;
    } catch (error) {
        console.error("Error fetching replies:", error);
        return [];
    }
};

export const addReply = async ({
    threadID,
    parentReplyID = null,
    body,
    createdBy
}) => {

    try {

        await addDoc(collection(db, "discussionReplies"), {
            threadID,
            parentReplyID,
            body,
            createdBy,
            createdAt: serverTimestamp()
        });

    } catch (error) {
        console.error("Error adding reply:", error);
    }

};

export const getThreadByID = async (threadID) => {
  try {

    const docRef = doc(db, "discussionThreads", threadID);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };

  } catch (error) {
    console.error("Error fetching thread:", error);
    return null;
  }
};