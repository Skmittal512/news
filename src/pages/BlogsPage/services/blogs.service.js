import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

const newsRef = collection(db, "newsArticles");

// 🔹 ALL NEWS
export const getAllNews = async () => {
  const q = query(newsRef, orderBy("headlineDate", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

// 🔹 SINGLE NEWS
export const getNewsById = async (id) => {
  const ref = doc(db, "newsArticles", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};

// 🔹 CATEGORY NEWS
export const getNewsByCategoryFromFirestore = async (category) => {
  const q = query(
    newsRef,
    where("newsArticleCategory", "==", category)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// 🔹 RELATED NEWS
export const getRelatedNewsFromFirestore = async () => {
  const q = query(newsRef);

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};