import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, displayName) {
    try {
      //create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      //add name to profile
      await updateProfile(user, { displayName });

      //save in firestore
      await setDoc(
        doc(db, 'users', user.uid),
        {
          uid: user.uid,
          email: user.email,
          displayName: displayName,
          createdAt: Date.now()
        }
      );

      return user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Auth state change error:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}