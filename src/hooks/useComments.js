import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  orderBy
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";

export function useComments(bookId) {
  const { currentUser, userProfile } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookId) {
      setComments([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'comments'),
      where('bookId', '==', bookId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const commentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setComments(commentsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching comments:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [bookId]);

  async function addComment(bookId, text) {
    try {
      await addDoc(collection(db, 'comments'), {
        bookId,
        text,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: userProfile?.displayName || currentUser.displayName || 'Reader',
        createdAt: Date.now(),
      });

      return { success: true };
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  async function deleteComment(commentId) {
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }

  return {
    comments,
    loading,
    error,
    addComment,
    deleteComment,
  };
}