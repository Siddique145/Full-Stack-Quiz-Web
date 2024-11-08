// // // Import the functions you need from Firebase SDKs
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// // import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
// // import { getStorage } from "firebase/storage";


// // // Your web app's Firebase configuration
// // const firebaseConfig = {
// //   apiKey: "AIzaSyCi6JIjIxIYeAIgaUCpRmHmCnWLALram5M",
// //   authDomain: "hackathon-f4b35.firebaseapp.com",
// //   projectId: "hackathon-f4b35",
// //   storageBucket: "hackathon-f4b35.appspot.com",
// //   messagingSenderId: "154277080268",
// //   appId: "1:154277080268:web:676202f47890ebed72e669",
// //   measurementId: "G-L91095E9YC",
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// // const auth = getAuth(app);
// // const db = getFirestore(app);
// // const firestore = getFirestore(app);
// // const storage = getStorage(app);
// // const provider = new GoogleAuthProvider();

// // export {
// //   app,
// //   auth,
// //   analytics,
// //   firestore,
// //   db,
// //   storage,
// //   createUserWithEmailAndPassword,
// //   provider,
// //   signInWithPopup,
// //   // googleLogin,
// //   // emailLogin,
// //   // emailRegister,
// //   logout,
 
// // };
















// // Import the functions you need from Firebase SDKs
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";  // Added `ref`, `uploadBytes`, and `getDownloadURL` for file operations

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCi6JIjIxIYeAIgaUCpRmHmCnWLALram5M",
//   authDomain: "hackathon-f4b35.firebaseapp.com",
//   projectId: "hackathon-f4b35",
//   storageBucket: "hackathon-f4b35.appspot.com",
//   messagingSenderId: "154277080268",
//   appId: "1:154277080268:web:676202f47890ebed72e669",
//   measurementId: "G-L91095E9YC",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);  // Firebase Storage
// const provider = new GoogleAuthProvider();

// // Firebase Authentication functions
// const loginWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const user = result.user;
//       console.log('User logged in with Google:', user);
//     })
//     .catch((error) => {
//       console.error('Error during Google login:', error);
//     });
// };

// const loginWithEmailPassword = (email, password) => {
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       console.log('User logged in with email/password:', userCredential.user);
//     })
//     .catch((error) => {
//       console.error('Error during email login:', error);
//     });
// };

// const registerWithEmailPassword = (email, password) => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       console.log('User registered with email/password:', userCredential.user);
//     })
//     .catch((error) => {
//       console.error('Error during email registration:', error);
//     });
// };

// const logout = () => {
//   signOut(auth)
//     .then(() => {
//       console.log('User logged out');
//     })
//     .catch((error) => {
//       console.error('Error during logout:', error);
//     });
// };

// // Firebase Storage functions for uploading and retrieving files
// const uploadProfilePic = (file) => {
//   const userId = auth.currentUser.uid;  // Get the UID of the authenticated user
//   const storageRef = ref(storage, `profilePics/${userId}/${file.name}`);  // Define the file path in Firebase Storage

//   // Upload file to Firebase Storage
//   uploadBytes(storageRef, file).then((snapshot) => {
//     console.log('Uploaded a file!', snapshot);
//     // Optionally, you can retrieve the file's URL after upload
//     getDownloadURL(snapshot.ref).then((downloadURL) => {
//       console.log('File available at:', downloadURL);
//       // You can save the URL in Firestore or use it elsewhere in your app
//     });
//   }).catch((error) => {
//     console.error('Error uploading file:', error);
//   });
// };

// const getProfilePicURL = (userId) => {
//   const storageRef = ref(storage, `profilePics/${userId}/profilePic.jpg`);  // Assuming the file name is 'profilePic.jpg'

//   getDownloadURL(storageRef).then((url) => {
//     console.log('Profile picture URL:', url);
//     // Use the URL in your app, e.g., setting the image source
//   }).catch((error) => {
//     console.error('Error retrieving file:', error);
//   });
// };

// // Exporting functions
// export {
//   app,
//   auth,
//   analytics,
//   db,
//   storage,
//   provider,
//   loginWithGoogle,
//   loginWithEmailPassword,
//   registerWithEmailPassword,
//   logout,
//   uploadProfilePic,
//   getProfilePicURL
// };
















// Import the functions you need from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const auth = getAuth(app);
const db = getFirestore(app); // Firestore is initialized as `db`
const storage = getStorage(app);  // Firebase Storage
const provider = new GoogleAuthProvider();

// Firebase Authentication functions
const loginWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('User logged in with Google:', user);
    })
    .catch((error) => {
      console.error('Error during Google login:', error);
    });
};

const loginWithEmailPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User logged in with email/password:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error during email login:', error);
    });
};

const registerWithEmailPassword = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User registered with email/password:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error during email registration:', error);
    });
};

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('User logged out');
    })
    .catch((error) => {
      console.error('Error during logout:', error);
    });
};

// Firebase Storage functions for uploading and retrieving files
const uploadProfilePic = (file) => {
  const userId = auth.currentUser.uid;  // Get the UID of the authenticated user
  const storageRef = ref(storage, `profilePics/${userId}/${file.name}`);  // Define the file path in Firebase Storage

  // Upload file to Firebase Storage
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a file!', snapshot);
    // Optionally, you can retrieve the file's URL after upload
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      console.log('File available at:', downloadURL);
      // You can save the URL in Firestore or use it elsewhere in your app
    });
  }).catch((error) => {
    console.error('Error uploading file:', error);
  });
};

const getProfilePicURL = (userId) => {
  const storageRef = ref(storage, `profilePics/${userId}/profilePic.jpg`);  // Assuming the file name is 'profilePic.jpg'

  getDownloadURL(storageRef).then((url) => {
    console.log('Profile picture URL:', url);
    // Use the URL in your app, e.g., setting the image source
  }).catch((error) => {
    console.error('Error retrieving file:', error);
  });
};

// Exporting functions
export {
  app,
  auth,
  analytics,
  db, // Use `db` for Firestore
  storage,
  provider,
  loginWithGoogle,
  loginWithEmailPassword,
  registerWithEmailPassword,
  logout,
  uploadProfilePic,
  getProfilePicURL
};
