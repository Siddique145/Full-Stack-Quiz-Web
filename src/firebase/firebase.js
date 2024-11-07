// Import the functions you need from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi6JIjIxIYeAIgaUCpRmHmCnWLALram5M",
  authDomain: "hackathon-f4b35.firebaseapp.com",
  projectId: "hackathon-f4b35",
  storageBucket: "hackathon-f4b35.appspot.com",
  messagingSenderId: "154277080268",
  appId: "1:154277080268:web:676202f47890ebed72e669",
  measurementId: "G-L91095E9YC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Firebase Authentication Functions
const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google User: ", result.user);
    return result.user;
  } catch (error) {
    console.error("Error with Google login:", error.message);
    throw error;
  }
};

const emailLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User Logged In:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error with Email login:", error.message);
    throw error;
  }
};

const emailRegister = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User Registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error with Registration:", error.message);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error with logout:", error.message);
  }
};

// Firestore Functions
const addQuiz = async (quizData) => {
  try {
    const docRef = await addDoc(collection(db, "quizzes"), quizData);
    console.log("Quiz added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding quiz:", error.message);
    throw error;
  }
};

const getQuizzes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "quizzes"));
    const quizzes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return quizzes;
  } catch (error) {
    console.error("Error getting quizzes:", error.message);
    throw error;
  }
};

// Save user scores (after quiz completion)
const saveUserScore = async (userId, quizId, score) => {
  const scoreRef = doc(db, "userScores", userId);
  try {
    await updateDoc(scoreRef, {
      [quizId]: score,
    });
    console.log("Score saved successfully");
  } catch (error) {
    console.error("Error saving score:", error.message);
  }
};

export {
  googleLogin,
  emailLogin,
  emailRegister,
  logout,
  addQuiz,
  getQuizzes,
  saveUserScore,
  auth,
};
