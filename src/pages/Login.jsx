
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { auth, provider } from "../firebase/firebase";  // Make sure to export 'auth' and 'provider' from Firebase setup
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import Swal from "sweetalert2";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Swal.fire({
//         title: "Logged In!",
//         text: "You have successfully logged in.",
//         icon: "success",
//         confirmButtonText: "OK",
//       }).then(() => {
//         navigate("/main");  // Navigate to your main app page
//       });
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: error.message,
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setLoading(true);

//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       Swal.fire({
//         title: "Logged In!",
//         text: `Welcome ${user.displayName || "User"}!`,
//         icon: "success",
//         confirmButtonText: "OK",
//       }).then(() => {
//         navigate("/main");  // Navigate to your main app page after successful login
//       });
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: error.message,
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md bg-white bg-opacity-10 p-8 rounded-lg shadow-lg backdrop-blur-md"
//       >
//         <motion.h2
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-3xl font-bold mb-6 text-center text-white"
//         >
//           Login
//         </motion.h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//             className="relative"
//           >
//             <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="Email"
//               className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300"
//             />
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4 }}
//             className="relative"
//           >
//             <FaLock className="absolute top-3 left-3 text-gray-400" />
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Password"
//               className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300"
//             />
//           </motion.div>
//           <motion.button
//             type="submit"
//             disabled={loading}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="w-full py-2 px-4 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </motion.button>
//         </form>
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="mt-4"
//         >
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//             disabled={loading}
//           >
//             <FaGoogle className="mr-2" />
//             {loading ? "Logging in with Google..." : "Login with Google"}
//           </button>
//         </motion.div>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="mt-4 text-center text-sm text-gray-300"
//         >
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-purple-300 hover:underline">
//             Sign Up
//           </Link>
//         </motion.p>
//       </motion.div>

//       {loading && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//         >
//           <div className="loader-container">
//             <div className="dot"></div>
//             <div className="dot"></div>
//             <div className="dot"></div>
//             <div className="dot"></div>
//           </div>
//         </motion.div>
//       )}

//       <style jsx>{`
//         .loader-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }
//         .dot {
//           width: 12px;
//           height: 12px;
//           margin: 0 5px;
//           background-color: #fff;
//           border-radius: 50%;
//           animation: dot-flashing 1.5s infinite linear alternate;
//         }
//         .dot:nth-child(2) {
//           animation-delay: 0.2s;
//         }
//         .dot:nth-child(3) {
//           animation-delay: 0.4s;
//         }
//         .dot:nth-child(4) {
//           animation-delay: 0.6s;
//         }
//         @keyframes dot-flashing {
//           0% {
//             opacity: 0.2;
//           }
//           100% {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Login;















import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if (userData.role === 'admin') {
        navigate('/admin');
      } else if (userData.role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/student');
      }
    } catch (error) {
      setError('Failed to log in');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}










