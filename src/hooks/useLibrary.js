import { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";

export function useLibrary() {
  const { currentUser } = useAuth();

  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setSavedBooks([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'library'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const books = snapshot.docs.map(doc => ({
          firestoreId: doc.id,
          ...doc.data()
        }));

        setSavedBooks(books);
        setLoading(false);
      },
      (error) => {
        console.error('Error:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  async function saveBook(book) {
    try {
      await addDoc(collection(db, 'library'), {
        userId: currentUser.uid,
        ...book,
        savedAt: Date.now(),
        notes: '',
        progress: 0,
        currentPage: 0,
        pageCount: book.pageCount || 0,
        status: 'want',
        rating: 0,
        startedAt: null,
        finishedAt: null,
        tags: [],
        comments: [],
        lastRead: null
      });

      return { success: true };
    } catch (error) {
      console.error('Error saving book:', error);
      throw error;
    }
  }

  async function removeBook(firestoreId) {
    try {
      await deleteDoc(doc(db, 'library', firestoreId));
      return { success: true };
    } catch (error) {
      console.error('Error removing book:', error);
      throw error;
    }
  }

  async function updateBook(firestoreId, updates) {
    try {
      await updateDoc(doc(db, 'library', firestoreId), {
        ...updates,
        updatedAt: Date.now()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  }

  async function updateProgress(firestoreId, progress, pageData = {}) {
    const book = savedBooks.find(b => b.firestoreId === firestoreId);

    const updates = {
      progress,
      currentPage: pageData.currentPage || book?.currentPage || 0,
      lastRead: Date.now()
    };

    if (progress === 100) {
      updates.status = 'completed';
      updates.finishedAt = Date.now();
    } else if (progress > 0) {
      updates.status = 'reading';
      if (!book?.startedAt) {
        updates.startedAt = Date.now();
      }
    }

    return updateBook(firestoreId, updates);
  }

  async function addNote(firestoreId, note) {
    return updateBook(firestoreId, { notes: note });
  }

  async function addComment(firestoreId, comment) {
    const book = savedBooks.find(b => b.firestoreId === firestoreId);
    const comments = book?.comments || [];

    return updateBook(firestoreId, {
      comments: [...comments, {
        text: comment,
        createdAt: Date.now()
      }]
    });
  }

  const isBookSaved = (bookId) => savedBooks.some(book => book.id === bookId);

  const getBookByFirestoreId = (firestoreId) => {
    return savedBooks.find(book => book.firestoreId === firestoreId);
  };

  return {
    savedBooks,
    loading,
    error,
    saveBook,
    removeBook,
    updateProgress,
    addNote,
    addComment,
    isBookSaved,
    getBookByFirestoreId
  };
}