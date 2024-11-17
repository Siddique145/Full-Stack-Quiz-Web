// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import { auth, storage, provider, db } from "../firebase/firebase"; // Import db here
// // import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// // import { setDoc, doc } from "firebase/firestore";  // Keep this import for Firestore functions
// // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // import Swal from "sweetalert2";
// // import { Link, useNavigate } from "react-router-dom";
// // import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";

// // function SignUp() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [username, setUsername] = useState("");
// //   const [profilePic, setProfilePic] = useState(null);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleEmailPasswordSignup = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");

// //     if (password !== confirmPassword) {
// //       setError("Passwords do not match");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //       const user = userCredential.user;

// //       let profilePicUrl = "";
// //       if (profilePic) {
// //         const picRef = ref(storage, `profilePics/${user.uid}`);
// //         await uploadBytes(picRef, profilePic);
// //         profilePicUrl = await getDownloadURL(picRef);
// //       }

// //       // Use `db` here instead of `firestore`
// //       await setDoc(doc(db, `users/${user.uid}`), {
// //         username,
// //         email: user.email,
// //         profilePic: profilePicUrl,
// //       });

// //       localStorage.setItem(
// //         "userInfo",
// //         JSON.stringify({
// //           uid: user.uid,
// //           email: user.email,
// //           username,
// //           profilePic: profilePicUrl,
// //         })
// //       );

// //       Swal.fire({
// //         title: "Success!",
// //         text: `${username} registered successfully!`,
// //         icon: "success",
// //         confirmButtonText: "OK",
// //       }).then(() => {
// //         navigate("/main");
// //       });
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleGoogleSignup = async () => {
// //     setLoading(true);
// //     setError("");

// //     try {
// //       const result = await signInWithPopup(auth, provider);
// //       const user = result.user;
// //       const profilePicUrl = user.photoURL || "";

// //       // Use `db` here instead of `firestore`
// //       await setDoc(doc(db, `users/${user.uid}`), {
// //         username: user.displayName || "",
// //         email: user.email,
// //         profilePic: profilePicUrl,
// //       });

// //       localStorage.setItem(
// //         "userInfo",
// //         JSON.stringify({
// //           uid: user.uid,
// //           email: user.email,
// //           username: user.displayName || "",
// //           profilePic: profilePicUrl,
// //         })
// //       );

// //       Swal.fire({
// //         title: "Success!",
// //         text: `${user.displayName || "User"} registered successfully!`,
// //         icon: "success",
// //         confirmButtonText: "OK",
// //       }).then(() => {
// //         navigate("/main");
// //       });
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900">
// //       <motion.div
// //         initial={{ opacity: 0, y: 50 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className="w-full max-w-md bg-white bg-opacity-10 p-8 rounded-lg shadow-lg backdrop-blur-md"
// //       >
// //         <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h2>

// //         {error && (
// //           <motion.p
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             className="text-red-500 mb-4 text-center"
// //           >
// //             {error}
// //           </motion.p>
// //         )}

// //         <form onSubmit={handleEmailPasswordSignup} className="space-y-4">
// //           <motion.div
// //             initial={{ opacity: 0, x: -50 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ delay: 0.1 }}
// //             className="relative"
// //           >
// //             <FaUser className="absolute top-3 left-3 text-gray-400" />
// //             <input
// //               type="text"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               required
// //               placeholder="Username"
// //               className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300"
// //             />
// //           </motion.div>

// //           <motion.div
// //             initial={{ opacity: 0, x: -50 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ delay: 0.2 }}
// //             className="relative"
// //           >
// //             <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
// //             <input
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //               placeholder="Email"
// //               className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300"
// //             />
// //           </motion.div>

// //           <motion.div
// //             initial={{ opacity: 0, x: -50 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ delay: 0.3 }}
// //             className="relative"
// //           >
// //             <FaLock className="absolute top-3 left-3 text-gray-400" />
// //             <input
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //               placeholder="Password"
// //               className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300"
// //             />
// //           </motion.div>

// //           <motion.div
// //             initial={{ opacity: 0, x: -50 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ delay: 0.4 }}
// //             className="relative"
// //           >
// //             <FaLock className="absolute top-3 left-3 text-gray-400" />
// //             <input
// //               type="password"
// //               value={confirmPassword}
// //               onChange={(e) => setConfirmPassword(e.target.value)}
// //               required
// //               placeholder="Confirm Password"
// //               className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300"
// //             />
// //           </motion.div>

// //           <motion.div
// //             initial={{ opacity: 0, x: -50 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ delay: 0.5 }}
// //             className="relative"
// //           >
// //             <FaImage className="absolute top-3 left-3 text-gray-400" />
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={(e) => setProfilePic(e.target.files[0])}
// //               className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
// //             />
// //           </motion.div>

// //           <motion.button
// //             type="submit"
// //             disabled={loading}
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             className="w-full py-2 px-4 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //           >
// //             {loading ? "Signing Up..." : "Sign Up"}
// //           </motion.button>
// //         </form>

// //         <motion.div
// //           initial={{ opacity: 0, y: 50 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 0.6 }}
// //           className="mt-4"
// //         >
// //           <button
// //             onClick={handleGoogleSignup}
// //             className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
// //             disabled={loading}
// //           >
// //             <FaGoogle className="mr-2" />
// //             {loading ? "Signing up with Google..." : "Sign up with Google"}
// //           </button>
// //         </motion.div>

// //         <motion.p
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ delay: 0.7 }}
// //           className="mt-4 text-center text-sm text-gray-300"
// //         >
// //           Already have an account?{" "}
// //           <Link to="/login" className="text-purple-300 hover:underline">
// //             Login
// //           </Link>
// //         </motion.p>
// //       </motion.div>

// //       {loading && (
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
// //         >
// //           <div className="loader-container">
// //             <div className="dot"></div>
// //             <div className="dot"></div>
// //             <div className="dot"></div>
// //             <div className="dot"></div>
// //           </div>
// //         </motion.div>
// //       )}
      
// //       <style jsx>{`
// //         .loader-container {
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //         }
// //         .dot {
// //           width: 12px;
// //           height: 12px;
// //           margin: 0 5px;
// //           background-color: #fff;
// //           border-radius: 50%;
// //           animation: dot-flashing 1.5s infinite linear alternate;
// //         }
// //         .dot:nth-child(2) {
// //           animation-delay: 0.2s;
// //         }
// //         .dot:nth-child(3) {
// //           animation-delay: 0.4s;
// //         }
// //         .dot:nth-child(4) {
// //           animation-delay: 0.6s;
// //         }
// //         @keyframes dot-flashing {
// //           0% {
// //             opacity: 0.2;
// //           }
// //           100% {
// //             opacity: 1;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // export default SignUp;









// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../firebase/firebase';
// import { doc, setDoc } from 'firebase/firestore';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [role, setRole] = useState('student');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await setDoc(doc(db, 'users', user.uid), {
//         name,
//         email,
//         role,
//       });

//       if (role === 'admin') {
//         navigate('/admin');
//       } else if (role === 'teacher') {
//         navigate('/teacher');
//       } else {
//         navigate('/student');
//       }
//     } catch (error) {
//       setError('Failed to create an account');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSignup}>
//           <input type="hidden" name="remember" value="true" />
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="name" className="sr-only">Name</label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="email-address" className="sr-only">Email address</label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="role" className="sr-only">Role</label>
//               <select
//                 id="role"
//                 name="role"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//               >
//                 <option value="student">Student</option>
//                 <option value="teacher">Teacher</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//           </div>

//           {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>
//         <div className="text-sm text-center">
//           <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Already have an account? Log in
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }








///Uper code is perfect














// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../firebase/firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [school, setSchool] = useState('');
//   const [className, setClassName] = useState('');
//   const [teacherEmail, setTeacherEmail] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       // Check if teacher exists
//       const teacherQuery = await getDoc(doc(db, 'users', teacherEmail));
//       if (!teacherQuery.exists() || teacherQuery.data().role !== 'teacher') {
//         setError('Invalid teacher email');
//         return;
//       }

//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await setDoc(doc(db, 'users', user.uid), {
//         name,
//         email,
//         role: 'student',
//         school,
//         class: className,
//         teacherEmail,
//       });

//       navigate('/student');
//     } catch (error) {
//       setError('Failed to create an account');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your student account</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSignup}>
//           <input type="hidden" name="remember" value="true" />
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="name" className="sr-only">Name</label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="email-address" className="sr-only">Email address</label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="school" className="sr-only">School</label>
//               <input
//                 id="school"
//                 name="school"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="School Name"
//                 value={school}
//                 onChange={(e) => setSchool(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="class" className="sr-only">Class</label>
//               <input
//                 id="class"
//                 name="class"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Class"
//                 value={className}
//                 onChange={(e) => setClassName(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="teacher-email" className="sr-only">Teacher's Email</label>
//               <input
//                 id="teacher-email"
//                 name="teacher-email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Teacher's Email"
//                 value={teacherEmail}
//                 onChange={(e) => setTeacherEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>
//         <div className="text-sm text-center">
//           <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Already have an account? Log in
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }











// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../firebase/firebase';
// import { doc, setDoc, query, where, getDocs, collection } from 'firebase/firestore';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [school, setSchool] = useState('');
//   const [className, setClassName] = useState('');
//   const [teacherEmail, setTeacherEmail] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       // Check if teacher exists by querying the 'users' collection for the teacher's email
//       const teacherQuerySnapshot = await getDocs(
//         query(collection(db, 'users'), where('email', '==', teacherEmail), where('role', '==', 'teacher'))
//       );

//       if (teacherQuerySnapshot.empty) {
//         setError('Invalid teacher email');
//         return;
//       }

//       // Proceed to create the user
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await setDoc(doc(db, 'users', user.uid), {
//         name,
//         uid: user.uid,
//         email,
//         password,
//         role: 'student',
//         school,
//         class: className,
//         teacherEmail,
//       });

//       navigate('/student');
//     } catch (error) {
//       setError('Failed to create an account');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your student account</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSignup}>
//           <input type="hidden" name="remember" value="true" />
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="name" className="sr-only">Name</label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="email-address" className="sr-only">Email address</label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="school" className="sr-only">School</label>
//               <input
//                 id="school"
//                 name="school"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="School Name"
//                 value={school}
//                 onChange={(e) => setSchool(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="class" className="sr-only">Class</label>
//               <input
//                 id="class"
//                 name="class"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Class"
//                 value={className}
//                 onChange={(e) => setClassName(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="teacher-email" className="sr-only">Teacher's Email</label>
//               <input
//                 id="teacher-email"
//                 name="teacher-email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Teacher's Email"
//                 value={teacherEmail}
//                 onChange={(e) => setTeacherEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>
//         <div className="text-sm text-center">
//           <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Already have an account? Log in
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }















// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { createUserWithEmailAndPassword, sendEmailVerification, getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';
// import { auth, db } from '../firebase/firebase';
// import { doc, setDoc, query, where, getDocs, collection } from 'firebase/firestore';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [school, setSchool] = useState('');
//   const [className, setClassName] = useState('');
//   const [teacherEmail, setTeacherEmail] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // Loading state to disable the submit button while processing
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true
//     setError(''); // Clear any previous errors

//     try {
//       // Create an instance of Firebase Auth
//       const authInstance = getAuth();

//       // Check if the user already exists in Firebase Authentication
//       const signInMethods = await fetchSignInMethodsForEmail(authInstance, email);
//       if (signInMethods.length > 0) {
//         setError('This email is already in use. Please log in or use another email.');
//         setLoading(false); // Reset loading state
//         return;
//       }

//       // Check if teacher exists by querying the 'users' collection for the teacher's email
//       const teacherQuerySnapshot = await getDocs(
//         query(collection(db, 'users'), where('email', '==', teacherEmail), where('role', '==', 'teacher'))
//       );

//       if (teacherQuerySnapshot.empty) {
//         setError('Invalid teacher email. The teacher does not exist in the database.');
//         setLoading(false); // Reset loading state
//         return;
//       }

//       // Proceed to create the user
//       const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
//       const user = userCredential.user;

//       // Send email verification to the user
//       await sendEmailVerification(user);

//       // Create the user document in Firestore
//       await setDoc(doc(db, 'users', user.uid), {
//         name,
//         uid: user.uid,
//         email,
//         role: 'student',
//         school,
//         class: className,
//         teacherEmail,
//         verified: false, // Initially not verified
//       });

//       // Redirect to the student page after successful signup
//       navigate('/student');

//       // You can display a message asking the user to verify their email before logging in
//       setError('Please check your email to verify your account.');

//     } catch (error) {
//       // Handle various error scenarios with specific messages
//       if (error.code === 'auth/invalid-email') {
//         setError('The email address is invalid. Please check and try again.');
//       } else if (error.code === 'auth/weak-password') {
//         setError('Password is too weak. Please provide a stronger password.');
//       } else {
//         setError('Failed to create an account. Please try again later.');
//       }
//       console.error(error);
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your student account</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSignup}>
//           <input type="hidden" name="remember" value="true" />
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="name" className="sr-only">Name</label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="email-address" className="sr-only">Email address</label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="school" className="sr-only">School</label>
//               <input
//                 id="school"
//                 name="school"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="School Name"
//                 value={school}
//                 onChange={(e) => setSchool(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="class" className="sr-only">Class</label>
//               <input
//                 id="class"
//                 name="class"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Class"
//                 value={className}
//                 onChange={(e) => setClassName(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="teacher-email" className="sr-only">Teacher's Email</label>
//               <input
//                 id="teacher-email"
//                 name="teacher-email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Teacher's Email"
//                 value={teacherEmail}
//                 onChange={(e) => setTeacherEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
//             >
//               {loading ? (
//                 <div className="flex items-center space-x-2">
//                   <div className="animate-spin inline-block w-6 h-6 border-4 border-t-4 border-white rounded-full"></div>
//                   <span>Creating...</span>
//                 </div>
//               ) : (
//                 'Sign up'
//               )}
//             </button>
//           </div>
//         </form>
//         <div className="text-sm text-center">
//           <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Already have an account? Log in
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }









import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc, query, where, getDocs, collection } from 'firebase/firestore';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [className, setClassName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to disable the submit button while processing
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [isVerified, setIsVerified] = useState(false); // State to check if the user has verified their email
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setError(''); // Clear any previous errors

    try {
      // Create an instance of Firebase Auth
      const authInstance = getAuth();

      // Check if the user already exists in Firebase Authentication
      const signInMethods = await fetchSignInMethodsForEmail(authInstance, email);
      if (signInMethods.length > 0) {
        setError('This email is already in use. Please log in or use another email.');
        setLoading(false); // Reset loading state
        return;
      }

      // Check if teacher exists by querying the 'users' collection for the teacher's email
      const teacherQuerySnapshot = await getDocs(
        query(collection(db, 'users'), where('email', '==', teacherEmail), where('role', '==', 'teacher'))
      );

      if (teacherQuerySnapshot.empty) {
        setError('Invalid teacher email. The teacher does not exist in the database.');
        setLoading(false); // Reset loading state
        return;
      }

      // Proceed to create the user
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
      const user = userCredential.user;

      // Send email verification to the user
      await sendEmailVerification(user);

      // Show the modal to inform the user to verify their email
      setShowModal(true);

      // Wait until the user verifies the email before proceeding
      // User will be informed that they must verify their email before they can proceed
    } catch (error) {
      // Handle various error scenarios with specific messages
      if (error.code === 'auth/invalid-email') {
        setError('The email address is invalid. Please check and try again.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please provide a stronger password.');
      } else {
        setError('Failed to create an account. Please try again later.');
      }
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleVerify = async () => {
    // Check if the email is verified
    const user = auth.currentUser;

    if (user.emailVerified) {
      // If the email is verified, proceed to create the user in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        uid: user.uid,
        email,
        role: 'student',
        school,
        class: className,
        teacherEmail,
        verified: true, // Mark as verified
      });

      // Close the modal
      setShowModal(false);

      // Redirect to the student page after successful signup
      navigate('/student');
    } else {
      setError('Please verify your email first.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your student account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="school" className="sr-only">School</label>
              <input
                id="school"
                name="school"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="School Name"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="class" className="sr-only">Class</label>
              <input
                id="class"
                name="class"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Class"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="teacher-email" className="sr-only">Teacher's Email</label>
              <input
                id="teacher-email"
                name="teacher-email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Teacher's Email"
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin inline-block w-6 h-6 border-4 border-t-4 border-white rounded-full"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                'Sign up'
              )}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Already have an account? Log in
          </Link>
        </div>
      </div>

      {/* Modal to inform user to verify email */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Please Verify Your Email</h3>
            <p className="text-sm mt-2">
              We have sent a verification email to your inbox. Please check your email and verify your account.
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="text-indigo-600"
                onClick={handleVerify}
              >
                I have verified my email
              </button>
              <button
                className="text-gray-500"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
