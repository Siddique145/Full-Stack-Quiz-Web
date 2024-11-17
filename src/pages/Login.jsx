// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
// import { auth, db } from '../firebase/firebase';
// import { doc, getDoc } from 'firebase/firestore';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // Loading state to disable button and show loader
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(''); // Clear any previous error
//     setLoading(true); // Set loading to true when login starts

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Fetch user data to check the role
//       const userDoc = await getDoc(doc(db, 'users', user.uid));
//       const userData = userDoc.data();

//       // Check if the user's email is verified
//       if (!user.emailVerified) {
//         // Send email verification if not verified
//         await sendEmailVerification(user);
//         setError('Please verify your email. We have sent you a verification link.');
//         setLoading(false);
//         return;
//       }

//       // Redirect based on role
//       if (userData?.role === 'admin') {
//         navigate('/admin');
//       } else if (userData?.role === 'teacher') {
//         navigate('/teacher');
//       } else {
//         navigate('/student');
//       }
//     } catch (err) {
//       // Handle errors specifically based on error code
//       if (err.code === 'auth/user-not-found') {
//         setError('User not found. Please check your email or sign up.');
//       } else if (err.code === 'auth/wrong-password') {
//         setError('Incorrect password. Please try again.');
//       } else if (err.code === 'auth/invalid-email') {
//         setError('Invalid email address. Please check your email.');
//       } else {
//         setError('Failed to log in. Please try again.');
//       }
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//           <input type="hidden" name="remember" value="true" />
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email-address" className="sr-only">Email address</label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
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
//                   {/* Spinner */}
//                   <div className="animate-spin inline-block w-6 h-6 border-4 border-t-4 border-white rounded-full"></div>
//                   {/* Text */}
//                   <span>Logging...</span>
//                 </div>
//               ) : (
//                 'Log in'
//               )}
//             </button>
//           </div>
//         </form>
//         <div className="text-sm text-center">
//           <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Don't have an account? Sign up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to disable button and show loader
  const navigate = useNavigate();

  // Email format validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle login attempt
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error
    setLoading(true); // Set loading to true when login starts

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in both email and password.');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      // Attempt login with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data to check the role
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      // Check if the user's email is verified
      if (!user.emailVerified) {
        // Send email verification if not verified
        await sendEmailVerification(user);
        setError('Please verify your email. We have sent you a verification link.');
        setLoading(false);
        return;
      }

      // Redirect based on role
      if (userData?.role === 'admin') {
        navigate('/admin');
      } else if (userData?.role === 'teacher') {
        navigate('/teacher');
      } else if (userData?.role === 'student') {
        navigate('/student');
      } else {
        setError('User role is not recognized.');
      }
    } catch (err) {
      // Handle errors specifically based on error code
if (err.code === 'auth/user-not-found') {
  setError('User not found. Please check your email or sign up.');
} else if (err.code === 'auth/wrong-password') {
  setError('Incorrect password. Please try again.');
} else if (err.code === 'auth/invalid-email') {
  setError('Invalid email address. Please check your email.');
} else if (err.code === 'auth/too-many-requests') {
  setError('Too many login attempts. Please try again later.');
} else if (err.code === 'auth/email-already-in-use') {
  setError('This email is already in use. Please use a different email or sign in.');
} else if (err.code === 'auth/operation-not-allowed') {
  setError('This operation is not allowed. Please contact support.');
} else if (err.code === 'auth/weak-password') {
  setError('Password is too weak. Please choose a stronger password.');
} else if (err.code === 'auth/invalid-verification-code') {
  setError('The verification code is invalid. Please try again.');
} else if (err.code === 'auth/invalid-verification-id') {
  setError('The verification ID is invalid. Please try again.');
} else if (err.code === 'auth/expired-action-code') {
  setError('This action code has expired. Please request a new one.');
} else if (err.code === 'auth/account-exists-with-different-credential') {
  setError('An account already exists with this credential. Try signing in with a different method.');
} else if (err.code === 'auth/cancelled-popup-request') {
  setError('Login popup request was cancelled. Please try again.');
} else if (err.code === 'auth/popup-blocked') {
  setError('Popup blocked by the browser. Please enable popups for this site.');
} else if (err.code === 'auth/popup-closed-by-user') {
  setError('Popup was closed before completing the action. Please try again.');
} else if (err.code === 'auth/requires-recent-login') {
  setError('Please log in again to perform this action.');
} else if (err.code === 'auth/unauthorized-domain') {
  setError('This domain is not authorized for login. Please contact support.');
} else if (err.code === 'auth/user-cancelled') {
  setError('User cancelled the authentication request. Please try again.');
} else if (err.code === 'auth/web-storage-unsupported') {
  setError('Your browser does not support web storage. Please use a supported browser.');
} else {
  setError('Check Your Password and Email. Please try again later.');
}

    } finally {
      setLoading(false); // Reset loading state after handling the login attempt
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

          {/* Display error message if any */}
          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  {/* Spinner */}
                  <div className="animate-spin inline-block w-6 h-6 border-4 border-t-4 border-white rounded-full"></div>
                  {/* Text */}
                  <span>Logging...</span>
                </div>
              ) : (
                'Log in'
              )}
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
