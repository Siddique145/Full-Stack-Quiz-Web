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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
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
//           <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
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
//   const [phone, setPhone] = useState(''); // New phone number field
//   const [parentPhone, setParentPhone] = useState(''); // New parent phone number field
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
//         phone,
//         parentPhone,
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
//                 placeholder="Teacher's Email"
//                 value={teacherEmail}
//                 onChange={(e) => setTeacherEmail(e.target.value)}
//               />
//             </div>
//             {/* New phone number fields */}
//             <div>
//               <label htmlFor="phone" className="sr-only">Phone Number</label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
//                 placeholder="Phone Number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="parent-phone" className="sr-only">Parent's Phone Number</label>
//               <input
//                 id="parent-phone"
//                 name="parent-phone"
//                 type="tel"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
//                 placeholder="Parent's Phone Number"
//                 value={parentPhone}
//                 onChange={(e) => setParentPhone(e.target.value)}
//               />
//             </div>
//           </div>

//           {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
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
//           <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
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
// import Swal from 'sweetalert2'; // Import SweetAlert2

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [school, setSchool] = useState('');
//   const [className, setClassName] = useState('');
//   const [teacherEmail, setTeacherEmail] = useState('');
//   const [phone, setPhone] = useState(''); // New phone number field
//   const [parentPhone, setParentPhone] = useState(''); // New parent phone number field
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // Loading state to disable the submit button while processing
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true
//     setError(''); // Clear any previous errors

//     // Trim and capitalize fields properly
//     const trimmedName = name.trim().replace(/^\w/, (c) => c.toUpperCase());
//     const trimmedSchool = school.trim();
//     const trimmedClassName = className.trim();
//     const trimmedPhone = phone.trim();
//     const trimmedParentPhone = parentPhone.trim();
//     const trimmedTeacherEmail = teacherEmail.trim();

//     // Validate the password length
//     if (password.length < 8) {
//       Swal.fire('Error', 'Password must be at least 8 characters long.', 'error');
//       setLoading(false);
//       return;
//     }

//     // Validate the phone number for Pakistan (should be up to 11 digits)
//     if (!/^\d{11}$/.test(trimmedPhone)) {
//       Swal.fire('Error', 'Phone number must be exactly 11 digits for Pakistan.', 'error');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Create an instance of Firebase Auth
//       const authInstance = getAuth();

//       // Check if the user already exists in Firebase Authentication
//       const signInMethods = await fetchSignInMethodsForEmail(authInstance, email);
//       if (signInMethods.length > 0) {
//         Swal.fire('Error', 'This email is already in use. Please log in or use another email.', 'error');
//         setLoading(false); // Reset loading state
//         return;
//       }

//       // Check if teacher exists by querying the 'users' collection for the teacher's email
//       const teacherQuerySnapshot = await getDocs(
//         query(collection(db, 'users'), where('email', '==', trimmedTeacherEmail), where('role', '==', 'teacher'))
//       );

//       if (teacherQuerySnapshot.empty) {
//         Swal.fire('Error', 'Your teacher email is incorrect.', 'error');
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
//         name: trimmedName,
//         uid: user.uid,
//         email,
//         password,
//         role: 'student',
//         school: trimmedSchool,
//         class: trimmedClassName,
//         teacherEmail: trimmedTeacherEmail,
//         phone: trimmedPhone,
//         parentPhone: trimmedParentPhone,
//         verified: false, // Initially not verified
//       });

//       // Redirect to the student page after successful signup
//       navigate('/login');

//       // Show success alert
//       Swal.fire('Success', 'Please check your email to verify your account.', 'success');

//     } catch (error) {
//       // Handle various error scenarios with specific messages
//       if (error.code === 'auth/invalid-email') {
//         Swal.fire('Error', 'The email address is invalid. Please check and try again.', 'error');
//       } else if (error.code === 'auth/weak-password') {
//         Swal.fire('Error', 'Password is too weak. Please provide a stronger password.', 'error');
//       } else {
//         Swal.fire('Error', 'Failed to create an account. Please try again later.', 'error');
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
//                 placeholder="Teacher's Email"
//                 value={teacherEmail}
//                 onChange={(e) => setTeacherEmail(e.target.value)}
//               />
//             </div>
//             {/* New phone number fields */}
//             <div>
//               <label htmlFor="phone" className="sr-only">Phone Number</label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
//                 placeholder="Phone Number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="parent-phone" className="sr-only">Parent's Phone Number</label>
//               <input
//                 id="parent-phone"
//                 name="parent-phone"
//                 type="tel"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
//                 placeholder="Parent's Phone Number"
//                 value={parentPhone}
//                 onChange={(e) => setParentPhone(e.target.value)}
//               />
//             </div>
//           </div>

//           {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
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
//           <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
//             Already have an account? Log in
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAuth,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import {
  doc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define Zod validation schema
const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .trim(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  school: z.string().min(3, { message: "School name is required" }).trim(),
  className: z.string().min(1, { message: "Class is required" }).trim(),
  teacherEmail: z.string().email({ message: "Invalid teacher email" }),
  phone: z
    .string()
    .length(11, { message: "Phone number must be exactly 11 digits" })
    .regex(/^\d{11}$/, { message: "Phone number must be exactly 11 digits" }),
  parentPhone: z
    .string()
    .length(11, { message: "Parent phone number must be exactly 11 digits" })
    .regex(/^\d{11}$/, {
      message: "Parent phone number must be exactly 11 digits",
    }),
});

export default function Signup() {
  const [loading, setLoading] = useState(false); // Loading state to disable the submit button while processing
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSignup = async (data) => {
    setLoading(true);
    const {
      name,
      email,
      password,
      school,
      className,
      teacherEmail,
      phone,
      parentPhone,
    } = data;

    try {
      // Check if the user already exists in Firebase Authentication
      const signInMethods = await fetchSignInMethodsForEmail(getAuth(), email);
      if (signInMethods.length > 0) {
        Swal.fire(
          "Error",
          "This email is already in use. Please log in or use another email.",
          "error"
        );
        setLoading(false);
        return;
      }

      // Check if teacher exists by querying the 'users' collection for the teacher's email
      const teacherQuerySnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("email", "==", teacherEmail),
          where("role", "==", "teacher")
        )
      );

      if (teacherQuerySnapshot.empty) {
        Swal.fire("Error", "Your teacher email is incorrect.", "error");
        setLoading(false);
        return;
      }

      // Proceed to create the user
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification to the user
      await sendEmailVerification(user);

      // Create the user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        uid: user.uid,
        email,
        password,
        role: "student",
        school,
        class: className,
        teacherEmail,
        phone,
        parentPhone,
        verified: false, // Initially not verified
      });

      // Redirect to the login page after successful signup
      navigate("/login");

      // Show success alert
      Swal.fire(
        "Success",
        "Please check your email to verify your account.",
        "success"
      );
    } catch (error) {
      // Handle various error scenarios with specific messages
      if (error.code === "auth/invalid-email") {
        Swal.fire(
          "Error",
          "The email address is invalid. Please check and try again.",
          "error"
        );
      } else if (error.code === "auth/weak-password") {
        Swal.fire(
          "Error",
          "Password is too weak. Please provide a stronger password.",
          "error"
        );
      } else {
        Swal.fire(
          "Error",
          "Failed to create an account. Please try again later.",
          "error"
        );
      }
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your student account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignup)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                {...register("name")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                {...register("password")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="school" className="sr-only">
                School
              </label>
              <input
                id="school"
                name="school"
                type="text"
                {...register("school")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="School Name"
              />
              {errors.school && (
                <p className="text-red-600">{errors.school.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="class" className="sr-only">
                Class
              </label>
              <input
                id="class"
                name="class"
                type="text"
                {...register("className")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Class"
              />
              {errors.className && (
                <p className="text-red-600">{errors.className.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="teacher-email" className="sr-only">
                Teacher Email
              </label>
              <input
                id="teacher-email"
                name="teacherEmail"
                type="email"
                {...register("teacherEmail")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Teacher's Email"
              />
              {errors.teacherEmail && (
                <p className="text-red-600">{errors.teacherEmail.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                {...register("phone")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
              />
              {errors.phone && (
                <p className="text-red-600">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="parent-phone" className="sr-only">
                Parent's Phone Number
              </label>
              <input
                id="parent-phone"
                name="parentPhone"
                type="tel"
                {...register("parentPhone")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Parent's Phone Number"
              />
              {errors.parentPhone && (
                <p className="text-red-600">{errors.parentPhone.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="centered-container">
                    <Spin indicator={<LoadingOutlined spin />} />
                  </div>
                </div>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
