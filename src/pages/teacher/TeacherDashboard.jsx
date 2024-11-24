// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { Link } from 'react-router-dom';
// // // // // // import { auth, db } from '../../firebase/firebase';
// // // // // // import { collection, query, where, getDocs } from 'firebase/firestore';
// // // // // // import QRCode from 'qrcode.react';

// // // // // // export default function TeacherDashboard() {
// // // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [selectedQuiz, setSelectedQuiz] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     const fetchQuizzes = async () => {
// // // // // //       const q = query(collection(db, 'quizzes'), where('teacherId', '==', auth.currentUser.uid));
// // // // // //       const querySnapshot = await getDocs(q);
// // // // // //       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // // // //       setQuizzes(quizzesData);
// // // // // //       setLoading(false);
// // // // // //     };

// // // // // //     fetchQuizzes();
// // // // // //   }, []);

// // // // // //   const generateShareableLink = (quizId) => {
// // // // // //     return `${window.location.origin}/take-quiz/${quizId}`;
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return <div className="text-center mt-8">Loading...</div>;
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="container mx-auto px-4 py-8">
// // // // // //       <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
// // // // // //       <Link
// // // // // //         to="/create-quiz"
// // // // // //         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
// // // // // //       >
// // // // // //         Create New Quiz
// // // // // //       </Link>
// // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
// // // // // //         {quizzes.map(quiz => (
// // // // // //           <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6">
// // // // // //             <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
// // // // // //             <p className="text-gray-600 mb-4">{quiz.description}</p>
// // // // // //             <div className="flex space-x-2">
// // // // // //               <button
// // // // // //                 onClick={() => setSelectedQuiz(quiz)}
// // // // // //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // // // // //               >
// // // // // //                 Share
// // // // // //               </button>
// // // // // //               <Link
// // // // // //                 to={`/results/${quiz.id}`}
// // // // // //                 className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
// // // // // //               >
// // // // // //                 View Results
// // // // // //               </Link>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //       {selectedQuiz && (
// // // // // //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
// // // // // //           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
// // // // // //             <div className="mt-3 text-center">
// // // // // //               <h3 className="text-lg leading-6 font-medium text-gray-900">Shareable Link and QR Code</h3>
// // // // // //               <div className="mt-2 px-7 py-3">
// // // // // //                 <p className="text-sm text-gray-500">
// // // // // //                   {generateShareableLink(selectedQuiz.id)}
// // // // // //                 </p>
// // // // // //                 <div className="mt-4 flex justify-center">
// // // // // //                   <QRCode value={generateShareableLink(selectedQuiz.id)} />
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <div className="items-center px-4 py-3">
// // // // // //                 <button
// // // // // //                   id="ok-btn"
// // // // // //                   className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
// // // // // //                   onClick={() => setSelectedQuiz(null)}
// // // // // //                 >
// // // // // //                   Close
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }








// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { Link } from 'react-router-dom';
// // // // // // import { auth, db } from '../../firebase/firebase';
// // // // // // import { collection, query, where, getDocs } from 'firebase/firestore';
// // // // // // // import { QRCode } from 'qrcode.react';  // Fixed import
// // // // // // import { QRCode } from 'antd';


// // // // // // export default function TeacherDashboard() {
// // // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [selectedQuiz, setSelectedQuiz] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     const fetchQuizzes = async () => {
// // // // // //       const q = query(collection(db, 'quizzes'), where('teacherId', '==', auth.currentUser.uid));
// // // // // //       const querySnapshot = await getDocs(q);
// // // // // //       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // // // //       setQuizzes(quizzesData);
// // // // // //       setLoading(false);
// // // // // //     };

// // // // // //     fetchQuizzes();
// // // // // //   }, []);

// // // // // //   const generateShareableLink = (quizId) => {
// // // // // //     return `${window.location.origin}/take-quiz/${quizId}`;
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return <div className="text-center mt-8">Loading...</div>;
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="container mx-auto px-4 py-8">
// // // // // //       <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
// // // // // //       <Link
// // // // // //         to="/create-quiz"
// // // // // //         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
// // // // // //       >
// // // // // //         Create New Quiz
// // // // // //       </Link>
// // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
// // // // // //         {quizzes.map(quiz => (
// // // // // //           <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6">
// // // // // //             <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
// // // // // //             <p className="text-gray-600 mb-4">{quiz.description}</p>
// // // // // //             <div className="flex space-x-2">
// // // // // //               <button
// // // // // //                 onClick={() => setSelectedQuiz(quiz)}
// // // // // //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // // // // //               >
// // // // // //                 Share
// // // // // //               </button>
// // // // // //               <Link
// // // // // //                 to={`/results/${quiz.id}`}
// // // // // //                 className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
// // // // // //               >
// // // // // //                 View Results
// // // // // //               </Link>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //       {selectedQuiz && (
// // // // // //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
// // // // // //           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
// // // // // //             <div className="mt-3 text-center">
// // // // // //               <h3 className="text-lg leading-6 font-medium text-gray-900">Shareable Link and QR Code</h3>
// // // // // //               <div className="mt-2 px-7 py-3">
// // // // // //                 <p className="text-sm text-gray-500">
// // // // // //                   {generateShareableLink(selectedQuiz.id)}
// // // // // //                 </p>
// // // // // //                 <div className="mt-4 flex justify-center">
// // // // // //                   <QRCode value={generateShareableLink(selectedQuiz.id)} />
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <div className="items-center px-4 py-3">
// // // // // //                 <button
// // // // // //                   id="ok-btn"
// // // // // //                   className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
// // // // // //                   onClick={() => setSelectedQuiz(null)}
// // // // // //                 >
// // // // // //                   Close
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }










// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { Link } from 'react-router-dom';
// // // // // // import { auth, db } from '../../firebase/firebase';
// // // // // // import { collection, query, where, getDocs } from 'firebase/firestore';
// // // // // // import { QRCode } from 'antd'; // Correct import for Ant Design QRCode

// // // // // // export default function TeacherDashboard() {
// // // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [selectedQuiz, setSelectedQuiz] = useState(null);

// // // // // //   // Fetch quizzes on component mount
// // // // // //   useEffect(() => {
// // // // // //     const fetchQuizzes = async () => {
// // // // // //       const q = query(collection(db, 'quizzes'), where('teacherId', '==', auth.currentUser.uid));
// // // // // //       const querySnapshot = await getDocs(q);
// // // // // //       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // // // //       setQuizzes(quizzesData);
// // // // // //       setLoading(false);
// // // // // //     };

// // // // // //     fetchQuizzes();
// // // // // //   }, []);

// // // // // //   // Generate the shareable link for a quiz
// // // // // //   const generateShareableLink = (quizId) => {
// // // // // //     return `${window.location.origin}`;
// // // // // //   };

// // // // // //   // Show loading state while fetching quizzes
// // // // // //   if (loading) {
// // // // // //     return <div className="text-center mt-8">Loading...</div>;
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="container mx-auto px-4 py-8">
// // // // // //       <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
// // // // // //       <Link
// // // // // //         to="/create-quiz"
// // // // // //         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
// // // // // //       >
// // // // // //         Create New Quiz
// // // // // //       </Link>
// // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
// // // // // //         {/* Render each quiz */}
// // // // // //         {quizzes.map(quiz => (
// // // // // //           <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6">
// // // // // //             <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
// // // // // //             <p className="text-gray-600 mb-4">{quiz.description}</p>
// // // // // //             <div className="flex space-x-2">
// // // // // //               <button
// // // // // //                 onClick={() => setSelectedQuiz(quiz)}
// // // // // //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // // // // //               >
// // // // // //                 Share
// // // // // //               </button>
// // // // // //               <Link
// // // // // //                 to={`/results/${quiz.id}`}
// // // // // //                 className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
// // // // // //               >
// // // // // //                 View Results
// // // // // //               </Link>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* Modal for QR code */}
// // // // // //       {selectedQuiz && (
// // // // // //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
// // // // // //           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
// // // // // //             <div className="mt-3 text-center">
// // // // // //               <h3 className="text-lg leading-6 font-medium text-gray-900">Shareable Link and QR Code</h3>
// // // // // //               <div className="mt-2 px-7 py-3">
// // // // // //                 <p className="text-sm text-gray-500">
// // // // // //                   {/* {generateShareableLink(selectedQuiz.id)} */}
// // // // // //                   {generateShareableLink}
// // // // // //                 </p>
// // // // // //                 <div className="mt-4 flex justify-center">
// // // // // //                   {/* Ant Design QRCode component */}
// // // // // //                   {/* <QRCode value={generateShareableLink(selectedQuiz.id)} size={128} /> */}
// // // // // //                   <QRCode value={generateShareableLink} size={128} />
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <div className="items-center px-4 py-3">
// // // // // //                 <button
// // // // // //                   id="ok-btn"
// // // // // //                   className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
// // // // // //                   onClick={() => setSelectedQuiz(null)}
// // // // // //                 >
// // // // // //                   Close
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }








// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { Link } from 'react-router-dom';
// // // // // import { auth, db } from '../../firebase/firebase';
// // // // // import { collection, query, where, getDocs } from 'firebase/firestore';
// // // // // import { QRCode } from 'antd'; // Correct import for Ant Design QRCode

// // // // // export default function TeacherDashboard() {
// // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [selectedQuiz, setSelectedQuiz] = useState(null);

// // // // //   // Fetch quizzes on component mount
// // // // //   useEffect(() => {
// // // // //     const fetchQuizzes = async () => {
// // // // //       const q = query(collection(db, 'quizzes'), where('teacherId', '==', auth.currentUser.uid));
// // // // //       const querySnapshot = await getDocs(q);
// // // // //       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // // //       setQuizzes(quizzesData);
// // // // //       setLoading(false);
// // // // //     };

// // // // //     fetchQuizzes();
// // // // //   }, []);

// // // // //   // Generate the shareable link for the homepage
// // // // //   const generateShareableLink = () => {
// // // // //     return `https://muhammadsiddiquequiz.vercel.app/`; // Fixed URL
// // // // //   };

// // // // //   // Show loading state while fetching quizzes
// // // // //   if (loading) {
// // // // //     return <div className="text-center mt-8">Loading...</div>;
// // // // //   }

// // // // //   return (
// // // // //     <div className="container mx-auto px-4 py-8">
// // // // //       <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
// // // // //       <Link
// // // // //         to="/create-quiz"
// // // // //         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
// // // // //       >
// // // // //         Create New Quiz
// // // // //       </Link>
// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
// // // // //         {/* Render each quiz */}
// // // // //         {quizzes.map(quiz => (
// // // // //           <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6">
// // // // //             <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
// // // // //             <p className="text-gray-600 mb-4">{quiz.description}</p>
// // // // //             <div className="flex space-x-2">
// // // // //               <button
// // // // //                 onClick={() => setSelectedQuiz(quiz)}
// // // // //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // // // //               >
// // // // //                 Share
// // // // //               </button>
// // // // //               <Link
// // // // //                 to={`/results/${quiz.id}`}
// // // // //                 className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
// // // // //               >
// // // // //                 View Results
// // // // //               </Link>
// // // // //             </div>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>

// // // // //       {/* Modal for QR code */}
// // // // //       {selectedQuiz && (
// // // // //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
// // // // //           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
// // // // //             <div className="mt-3 text-center">
// // // // //               <h3 className="text-lg leading-6 font-medium text-gray-900">Shareable Link and QR Code</h3>
// // // // //               <div className="mt-2 px-7 py-3">
// // // // //                 <p className="text-sm text-gray-500">
// // // // //                   {generateShareableLink()} {/* Display the fixed URL */}
// // // // //                 </p>
// // // // //                 <div className="mt-4 flex justify-center">
// // // // //                   {/* Ant Design QRCode component */}
// // // // //                   <QRCode value={generateShareableLink()} size={128} />
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div className="items-center px-4 py-3">
// // // // //                 <button
// // // // //                   id="ok-btn"
// // // // //                   className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
// // // // //                   onClick={() => setSelectedQuiz(null)}
// // // // //                 >
// // // // //                   Close
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }













// // // // //uperr code is perfect








// // // // import React, { useState, useEffect } from 'react';
// // // // import { Link } from 'react-router-dom';
// // // // import { auth, db } from '../../firebase/firebase';
// // // // import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
// // // // // import QRCode from 'qrcode.react';
// // // // import { QRCode } from 'antd';

// // // // export default function TeacherDashboard() {
// // // //   const [quizzes, setQuizzes] = useState([]);
// // // //   const [students, setStudents] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [selectedQuiz, setSelectedQuiz] = useState(null);

// // // //   useEffect(() => {
// // // //     fetchQuizzes();
// // // //     fetchStudents();
// // // //   }, []);

// // // //   const fetchQuizzes = async () => {
// // // //     const q = query(collection(db, 'quizzes'), where('teacherId', '==', auth.currentUser.uid));
// // // //     const querySnapshot = await getDocs(q);
// // // //     const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // //     setQuizzes(quizzesData);
// // // //     setLoading(false);
// // // //   };

// // // //   const fetchStudents = async () => {
// // // //     const q = query(collection(db, 'users'), where('teacherEmail', '==', auth.currentUser.email));
// // // //     const querySnapshot = await getDocs(q);
// // // //     const studentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // //     setStudents(studentsData);
// // // //   };

// // // //   const generateShareableLink = (quizId) => {
// // // //     return `${window.location.origin}/take-quiz/${quizId}`;
// // // //   };

// // // //   const toggleQuizLock = async (quizId, currentLockState) => {
// // // //     await updateDoc(doc(db, 'quizzes', quizId), { locked: !currentLockState });
// // // //     fetchQuizzes();
// // // //   };

// // // //   const generateAccessCode = async (quizId) => {
// // // //     const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
// // // //     await updateDoc(doc(db, 'quizzes', quizId), { accessCode });
// // // //     fetchQuizzes();
// // // //   };

// // // //   if (loading) {
// // // //     return <div className="text-center mt-8">Loading...</div>;
// // // //   }

// // // //   return (
// // // //     <div className="container mx-auto px-4 py-8">
// // // //       <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
// // // //       <Link
// // // //         to="/create-quiz"
// // // //         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
// // // //       >
// // // //         Create New Quiz
// // // //       </Link>
// // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
// // // //         <div>
// // // //           <h2 className="text-2xl font-bold mb-4">Your Quizzes</h2>
// // // //           {quizzes.map(quiz => (
// // // //             <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
// // // //               <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
// // // //               <p className="text-gray-600 mb-4">{quiz.description}</p>
// // // //               <div className="flex flex-wrap gap-2">
// // // //                 <button
// // // //                   onClick={() => setSelectedQuiz(quiz)}
// // // //                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // // //                 >
// // // //                   Share
// // // //                 </button>
// // // //                 <Link
// // // //                   to={`/results/${quiz.id}`}
// // // //                   className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
// // // //                 >
// // // //                   View Results
// // // //                 </Link>
// // // //                 <button
// // // //                   onClick={() => toggleQuizLock(quiz.id, quiz.locked)}
// // // //                   className={`${quiz.locked ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded`}
// // // //                 >
// // // //                   {quiz.locked ? 'Unlock Quiz' : 'Lock Quiz'}
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => generateAccessCode(quiz.id)}
// // // //                   className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
// // // //                 >
// // // //                   Generate Access Code
// // // //                 </button>
// // // //               </div>
// // // //               {quiz.accessCode && (
// // // //                 <p className="mt-2">Access Code: {quiz.accessCode}</p>
// // // //               )}
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //         <div>
// // // //           <h2 className="text-2xl font-bold mb-4">Your Students</h2>
// // // //           {students.map(student => (
// // // //             <div key={student.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
// // // //               <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
// // // //               <p className="text-gray-600 mb-2">Email: {student.email}</p>
// // // //               <p className="text-gray-600 mb-2">School: {student.school}</p>
// // // //               <p className="text-gray-600">Class: {student.class}</p>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>
// // // //       {selectedQuiz && (
// // // //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
// // // //           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
// // // //             <div className="mt-3 text-center">
// // // //               <h3 className="text-lg leading-6 font-medium text-gray-900">Shareable Link and QR Code</h3>
// // // //               <div className="mt-2 px-7 py-3">
// // // //                 <p className="text-sm text-gray-500">
// // // //                   {generateShareableLink(selectedQuiz.id)}
// // // //                 </p>
// // // //                 <div className="mt-4 flex justify-center">
// // // //                   <QRCode value={generateShareableLink(selectedQuiz.id)} />
// // // //                 </div>
// // // //               </div>
// // // //               <div className="items-center px-4 py-3">
// // // //                 <button
// // // //                   id="ok-btn"
// // // //                   className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
// // // //                   onClick={() => setSelectedQuiz(null)}
// // // //                 >
// // // //                   Close
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }
































// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { auth, db } from '';
// // // import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
// // // import { Layout, Menu, Button, Card, Avatar, Input, Modal, Form, InputNumber, List, Typography, message } from 'antd';
// // // import { UserOutlined, LogoutOutlined, PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined, ShareAltOutlined, QrcodeOutlined } from '@ant-design/icons';
// // // import { QRCode } from 'antd';

// // // const { Header, Content, Sider } = Layout;
// // // const { Meta } = Card;
// // // const { Title, Text } = Typography;

// // // export default function TeacherDashboard() {
// // //   const [quizzes, setQuizzes] = useState([]);
// // //   const [students, setStudents] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedQuiz, setSelectedQuiz] = useState(null);
// // //   const [editingQuiz, setEditingQuiz] = useState(null);
// // //   const [teacherName, setTeacherName] = useState('');
// // //   const [isShareModalVisible, setIsShareModalVisible] = useState(false);
// // //   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     fetchQuizzes();
// // //     fetchStudents();
// // //     fetchTeacherName();
// // //   }, []);

// // //   const fetchQuizzes = async () => {
// // //     const q = query(collection(db, 'quizzes'), where('teacherId', '==', auth.currentUser.uid));
// // //     const querySnapshot = await getDocs(q);
// // //     const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // //     setQuizzes(quizzesData);
// // //     setLoading(false);
// // //   };

// // //   const fetchStudents = async () => {
// // //     const q = query(collection(db, 'users'), where('teacherEmail', '==', auth.currentUser.email));
// // //     const querySnapshot = await getDocs(q);
// // //     const studentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // //     setStudents(studentsData);
// // //   };

// // //   const fetchTeacherName = async () => {
// // //     const teacherDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
// // //     if (!teacherDoc.empty) {
// // //       setTeacherName(teacherDoc.docs[0].data().name);
// // //     }
// // //   };

// // //   const generateShareableLink = (quizId) => {
// // //     return `${window.location.origin}/take-quiz/${quizId}`;
// // //   };

// // //   const toggleQuizLock = async (quizId, currentLockState) => {
// // //     await updateDoc(doc(db, 'quizzes', quizId), { locked: !currentLockState });
// // //     fetchQuizzes();
// // //     message.success(`Quiz ${currentLockState ? 'unlocked' : 'locked'} successfully`);
// // //   };

// // //   const generateAccessCode = async (quizId) => {
// // //     const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
// // //     await updateDoc(doc(db, 'quizzes', quizId), { accessCode });
// // //     fetchQuizzes();
// // //     message.success('Access code generated successfully');
// // //   };

// // //   const handleLogout = () => {
// // //     auth.signOut();
// // //     navigate('/login');
// // //   };

// // //   const handleEditQuiz = (quiz) => {
// // //     setEditingQuiz(quiz);
// // //     setIsEditModalVisible(true);
// // //   };

// // //   const handleUpdateQuiz = async (values) => {
// // //     if (editingQuiz) {
// // //       await updateDoc(doc(db, 'quizzes', editingQuiz.id), values);
// // //       setIsEditModalVisible(false);
// // //       fetchQuizzes();
// // //       message.success('Quiz updated successfully');
// // //     }
// // //   };

// // //   const handleDeleteQuiz = async (quizId) => {
// // //     Modal.confirm({
// // //       title: 'Are you sure you want to delete this quiz?',
// // //       content: 'This action cannot be undone.',
// // //       onOk: async () => {
// // //         await deleteDoc(doc(db, 'quizzes', quizId));
// // //         fetchQuizzes();
// // //         message.success('Quiz deleted successfully');
// // //       },
// // //     });
// // //   };

// // //   if (loading) {
// // //     return <div className="text-center mt-8">Loading...</div>;
// // //   }

// // //   return (
// // //     <Layout style={{ minHeight: '100vh' }}>
// // //       <Header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
// // //         <div style={{ display: 'flex', alignItems: 'center' }}>
// // //           <Avatar icon={<UserOutlined />} />
// // //           <Title level={4} style={{ color: 'white', margin: '0 0 0 10px' }}>Welcome, {teacherName}</Title>
// // //         </div>
// // //         <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
// // //           Logout
// // //         </Button>
// // //       </Header>
// // //       <Layout>
// // //         <Sider width={200} className="site-layout-background">
// // //           <Menu
// // //             mode="inline"
// // //             defaultSelectedKeys={['1']}
// // //             defaultOpenKeys={['sub1']}
// // //             style={{ height: '100%', borderRight: 0 }}
// // //           >
// // //             <Menu.Item key="1" icon={<PlusOutlined />} onClick={() => navigate('/create-quiz')}>
// // //               Create New Quiz
// // //             </Menu.Item>
// // //           </Menu>
// // //         </Sider>
// // //         <Layout style={{ padding: '0 24px 24px' }}>
// // //           <Content
// // //             className="site-layout-background"
// // //             style={{
// // //               padding: 24,
// // //               margin: 0,
// // //               minHeight: 280,
// // //             }}
// // //           >
// // //             <Title level={2}>Your Quizzes</Title>
// // //             <List
// // //               grid={{ gutter: 16, column: 3 }}
// // //               dataSource={quizzes}
// // //               renderItem={quiz => (
// // //                 <List.Item>
// // //                   <Card
// // //                     actions={[
// // //                       <ShareAltOutlined key="share" onClick={() => { setSelectedQuiz(quiz); setIsShareModalVisible(true); }} />,
// // //                       <Button type="link" onClick={() => navigate(`/results/${quiz.id}`)}>View Results</Button>,
// // //                       quiz.locked ? 
// // //                         <UnlockOutlined key="unlock" onClick={() => toggleQuizLock(quiz.id, quiz.locked)} /> :
// // //                         <LockOutlined key="lock" onClick={() => toggleQuizLock(quiz.id, quiz.locked)} />,
// // //                       <Button type="link" onClick={() => generateAccessCode(quiz.id)}>Generate Access Code</Button>,
// // //                       <EditOutlined key="edit" onClick={() => handleEditQuiz(quiz)} />,
// // //                       <DeleteOutlined key="delete" onClick={() => handleDeleteQuiz(quiz.id)} />,
// // //                     ]}
// // //                   >
// // //                     <Meta
// // //                       title={quiz.title}
// // //                       description={quiz.description}
// // //                     />
// // //                     <div style={{ marginTop: '10px' }}>
// // //                       <Text>Time Limit: {quiz.timeLimit || 'Not set'} minutes</Text>
// // //                       {quiz.accessCode && (
// // //                         <Text style={{ display: 'block' }}>Access Code: {quiz.accessCode}</Text>
// // //                       )}
// // //                     </div>
// // //                   </Card>
// // //                 </List.Item>
// // //               )}
// // //             />

// // //             <Title level={2} style={{ marginTop: '20px' }}>Your Students</Title>
// // //             <List
// // //               itemLayout="horizontal"
// // //               dataSource={students}
// // //               renderItem={student => (
// // //                 <List.Item>
// // //                   <List.Item.Meta
// // //                     avatar={<Avatar icon={<UserOutlined />} />}
// // //                     title={student.name}
// // //                     description={`Email: ${student.email}, School: ${student.school}, Class: ${student.class}`}
// // //                   />
// // //                 </List.Item>
// // //               )}
// // //             />
// // //           </Content>
// // //         </Layout>
// // //       </Layout>

// // //       <Modal
// // //         title="Shareable Link and QR Code"
// // //         visible={isShareModalVisible}
// // //         onCancel={() => setIsShareModalVisible(false)}
// // //         footer={null}
// // //       >
// // //         {selectedQuiz && (
// // //           <>
// // //             <Input value={generateShareableLink(selectedQuiz.id)} readOnly />
// // //             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
// // //               <QRCode value={generateShareableLink(selectedQuiz.id)} />
// // //             </div>
// // //           </>
// // //         )}
// // //       </Modal>

// // //       <Modal
// // //         title="Edit Quiz"
// // //         visible={isEditModalVisible}
// // //         onCancel={() => setIsEditModalVisible(false)}
// // //         footer={null}
// // //       >
// // //         {editingQuiz && (
// // //           <Form
// // //             initialValues={editingQuiz}
// // //             onFinish={handleUpdateQuiz}
// // //           >
// // //             <Form.Item name="title" label="Title" rules={[{ required: true }]}>
// // //               <Input />
// // //             </Form.Item>
// // //             <Form.Item name="description" label="Description" rules={[{ required: true }]}>
// // //               <Input.TextArea />
// // //             </Form.Item>
// // //             <Form.Item name="timeLimit" label="Time Limit (minutes)">
// // //               <InputNumber min={1} />
// // //             </Form.Item>
// // //             <Form.Item>
// // //               <Button type="primary" htmlType="submit">
// // //                 Save Changes
// // //               </Button>
// // //             </Form.Item>
// // //           </Form>
// // //         )}
// // //       </Modal>
// // //     </Layout>
// // //   );
// // // }






















// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { auth, db } from '../../firebase/firebase';
// // import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
// // import { Layout, Menu, Button, Card, Avatar, Input, Modal, Form, InputNumber, List, Typography, message, Row, Col, Spin, Statistic } from 'antd';
// // import { UserOutlined, LogoutOutlined, PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined, ShareAltOutlined, QrcodeOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons';
// // import { QRCode } from 'antd';

// // const { Header, Content, Sider } = Layout;
// // const { Meta } = Card;
// // const { Title, Text, Paragraph } = Typography;

// // export default function TeacherDashboard() {
// //   const [quizzes, setQuizzes] = useState([]);
// //   const [students, setStudents] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedQuiz, setSelectedQuiz] = useState(null);
// //   const [editingQuiz, setEditingQuiz] = useState(null);
// //   const [teacherName, setTeacherName] = useState('');
// //   const [isShareModalVisible, setIsShareModalVisible] = useState(false);
// //   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchQuizzes();
// //     fetchStudents();
// //     fetchTeacherName();
// //   }, []);

// //   const fetchQuizzes = async () => {
// //     setLoading(true);
// //     try {
// //       const q = query(collection(db, 'quizzes'), where('teacherId', '==', auth.currentUser.uid));
// //       const querySnapshot = await getDocs(q);
// //       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //       setQuizzes(quizzesData);
// //     } catch (error) {
// //       message.error('Failed to fetch quizzes');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchStudents = async () => {
// //     try {
// //       const q = query(collection(db, 'users'), where('teacherEmail', '==', auth.currentUser.email));
// //       const querySnapshot = await getDocs(q);
// //       const studentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //       setStudents(studentsData);
// //     } catch (error) {
// //       message.error('Failed to fetch students');
// //     }
// //   };

// //   const fetchTeacherName = async () => {
// //     try {
// //       const teacherDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
// //       if (!teacherDoc.empty) {
// //         setTeacherName(teacherDoc.docs[0].data().name);
// //       }
// //     } catch (error) {
// //       message.error('Failed to fetch teacher information');
// //     }
// //   };

// //   const generateShareableLink = (quizId) => {
// //     return `${window.location.origin}/take-quiz/${quizId}`;
// //   };

// //   const toggleQuizLock = async (quizId, currentLockState) => {
// //     try {
// //       await updateDoc(doc(db, 'quizzes', quizId), { locked: !currentLockState });
// //       fetchQuizzes();
// //       message.success(`Quiz ${currentLockState ? 'unlocked' : 'locked'} successfully`);
// //     } catch (error) {
// //       message.error('Failed to update quiz lock status');
// //     }
// //   };

// //   const generateAccessCode = async (quizId) => {
// //     try {
// //       const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
// //       await updateDoc(doc(db, 'quizzes', quizId), { accessCode });
// //       fetchQuizzes();
// //       message.success('Access code generated successfully');
// //     } catch (error) {
// //       message.error('Failed to generate access code');
// //     }
// //   };

// //   const handleLogout = () => {
// //     auth.signOut();
// //     navigate('/login');
// //   };

// //   const handleEditQuiz = (quiz) => {
// //     setEditingQuiz(quiz);
// //     setIsEditModalVisible(true);
// //   };

// //   const handleUpdateQuiz = async (values) => {
// //     if (editingQuiz) {
// //       try {
// //         await updateDoc(doc(db, 'quizzes', editingQuiz.id), values);
// //         setIsEditModalVisible(false);
// //         fetchQuizzes();
// //         message.success('Quiz updated successfully');
// //       } catch (error) {
// //         message.error('Failed to update quiz');
// //       }
// //     }
// //   };

// //   const handleDeleteQuiz = async (quizId) => {
// //     Modal.confirm({
// //       title: 'Are you sure you want to delete this quiz?',
// //       content: 'This action cannot be undone.',
// //       onOk: async () => {
// //         try {
// //           await deleteDoc(doc(db, 'quizzes', quizId));
// //           fetchQuizzes();
// //           message.success('Quiz deleted successfully');
// //         } catch (error) {
// //           message.error('Failed to delete quiz');
// //         }
// //       },
// //     });
// //   };

// //   return (
// //     <Layout style={{ minHeight: '100vh' }}>
// //       <Header className="header" style={{ padding: '0 20px', background: '#001529' }}>
// //         <Row justify="space-between" align="middle">
// //           <Col>
// //             <div style={{ display: 'flex', alignItems: 'center' }}>
// //               <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
// //               <Title level={4} style={{ color: 'white', margin: 0 }}>Welcome, {teacherName}</Title>
// //             </div>
// //           </Col>
// //           <Col>
// //             <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
// //               Logout
// //             </Button>
// //           </Col>
// //         </Row>
// //       </Header>
// //       <Layout>
// //         <Sider width={200} className="site-layout-background" breakpoint="lg" collapsedWidth="0">
// //           <Menu
// //             mode="inline"
// //             defaultSelectedKeys={['1']}
// //             style={{ height: '100%', borderRight: 0 }}
// //           >
// //             <Menu.Item key="1" icon={<BookOutlined />}>Quizzes</Menu.Item>
// //             <Menu.Item key="2" icon={<TeamOutlined />}>Students</Menu.Item>
// //             <Menu.Item key="3" icon={<PlusOutlined />} onClick={() => navigate('/create-quiz')}>
// //               Create New Quiz
// //             </Menu.Item>
// //           </Menu>
// //         </Sider>
// //         <Layout style={{ padding: '24px' }}>
// //           <Content
// //             className="site-layout-background"
// //             style={{
// //               padding: 24,
// //               margin: 0,
// //               minHeight: 280,
// //               background: '#fff',
// //               borderRadius: '8px',
// //               boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
// //             }}
// //           >
// //             <Spin spinning={loading}>
// //               <Row gutter={[16, 16]}>
// //                 <Col xs={24} sm={12} md={8} lg={6}>
// //                   <Statistic title="Total Quizzes" value={quizzes.length} />
// //                 </Col>
// //                 <Col xs={24} sm={12} md={8} lg={6}>
// //                   <Statistic title="Total Students" value={students.length} />
// //                 </Col>
// //               </Row>

// //               <Title level={2} style={{ marginTop: '20px' }}>Your Quizzes</Title>
// //               <List
// //                 grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
// //                 dataSource={quizzes}
// //                 renderItem={quiz => (
// //                   <List.Item>
// //                     <Card
// //                       hoverable
// //                       actions={[
// //                         <ShareAltOutlined key="share" onClick={() => { setSelectedQuiz(quiz); setIsShareModalVisible(true); }} />,
// //                         <Button type="link" onClick={() => navigate(`/results/${quiz.id}`)}>C-R</Button>,
// //                         quiz.locked ? 
// //                           <UnlockOutlined key="unlock" onClick={() => toggleQuizLock(quiz.id, quiz.locked)} /> :
// //                           <LockOutlined key="lock" onClick={() => toggleQuizLock(quiz.id, quiz.locked)} />,
// //                         <Button type="link" onClick={() => generateAccessCode(quiz.id)}>G-C</Button>,
// //                         <EditOutlined key="edit" onClick={() => handleEditQuiz(quiz)} />,
// //                         <DeleteOutlined key="delete" onClick={() => handleDeleteQuiz(quiz.id)} />,
// //                       ]}
// //                     >
// //                       <Meta
// //                         title={quiz.title}
// //                         description={
// //                           <>
// //                             <Paragraph ellipsis={{ rows: 2 }}>{quiz.description}</Paragraph>
// //                             <Text>Time Limit: {quiz.timeLimit || 'Not set'} minutes</Text>
// //                             {quiz.accessCode && (
// //                               <Text style={{ display: 'block' }}>Access Code: {quiz.accessCode}</Text>
// //                             )}
// //                           </>
// //                         }
// //                       />
// //                     </Card>
// //                   </List.Item>
// //                 )}
// //               />

// //               <Title level={2} style={{ marginTop: '20px' }}>Your Students</Title>
// //               <List
// //                 grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
// //                 dataSource={students}
// //                 renderItem={student => (
// //                   <List.Item>
// //                     <Card hoverable>
// //                       <Meta
// //                         avatar={<Avatar icon={<UserOutlined />} />}
// //                         title={student.name}
// //                         description={
// //                           <>
// //                             <Text>Email: {student.email}</Text>
// //                             <Text style={{ display: 'block' }}>School: {student.school}</Text>
// //                             <Text>Class: {student.class}</Text>
// //                           </>
// //                         }
// //                       />
// //                     </Card>
// //                   </List.Item>
// //                 )}
// //               />
// //             </Spin>
// //           </Content>
// //         </Layout>
// //       </Layout>

// //       <Modal
// //         title="Shareable Link and QR Code"
// //         visible={isShareModalVisible}
// //         onCancel={() => setIsShareModalVisible(false)}
// //         footer={null}
// //       >
// //         {selectedQuiz && (
// //           <>
// //             <Input.TextArea value={generateShareableLink(selectedQuiz.id)} readOnly autoSize />
// //             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
// //               <QRCode value={generateShareableLink(selectedQuiz.id)} />
// //             </div>
// //           </>
// //         )}
// //       </Modal>

// //       <Modal
// //         title="Edit Quiz"
// //         visible={isEditModalVisible}
// //         onCancel={() => setIsEditModalVisible(false)}
// //         footer={null}
// //       >
// //         {editingQuiz && (
// //           <Form
// //             initialValues={editingQuiz}
// //             onFinish={handleUpdateQuiz}
// //             layout="vertical"
// //           >
// //             <Form.Item name="title" label="Title" rules={[{ required: true }]}>
// //               <Input />
// //             </Form.Item>
// //             <Form.Item name="description" label="Description" rules={[{ required: true }]}>
// //               <Input.TextArea />
// //             </Form.Item>
// //             <Form.Item name="timeLimit" label="Time Limit (minutes)">
// //               <InputNumber min={1} />
// //             </Form.Item>
// //             <Form.Item>
// //               <Button type="primary" htmlType="submit">
// //                 Save Changes
// //               </Button>
// //             </Form.Item>
// //           </Form>
// //         )}
// //       </Modal>
// //     </Layout>
// //   );
// // }

















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebase';
// import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { Layout, Menu, Button, Card, Avatar, Input, Modal, Form, InputNumber, List, Typography, message, Row, Col, Spin, Statistic } from 'antd';
// import { UserOutlined, LogoutOutlined, PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined, ShareAltOutlined, QrcodeOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons';
// import { QRCode } from 'antd';

// const { Header, Content, Sider } = Layout;
// const { Meta } = Card;
// const { Title, Text, Paragraph } = Typography;

// export default function TeacherDashboard() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [editingQuiz, setEditingQuiz] = useState(null);
//   const [teacherName, setTeacherName] = useState('');
//   const [isShareModalVisible, setIsShareModalVisible] = useState(false);
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchQuizzes();
//     fetchStudents();
//     fetchTeacherName();
//   }, []);

//   const fetchQuizzes = async () => {
//     setLoading(true);
//     try {
//       const q = query(collection(db, 'quizzes'), where('teacherId', '==', auth.currentUser.uid));
//       const querySnapshot = await getDocs(q);
//       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setQuizzes(quizzesData);
//     } catch (error) {
//       message.error('Failed to fetch quizzes');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStudents = async () => {
//     try {
//       const q = query(collection(db, 'users'), where('teacherEmail', '==', auth.currentUser.email));
//       const querySnapshot = await getDocs(q);
//       const studentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setStudents(studentsData);
//     } catch (error) {
//       message.error('Failed to fetch students');
//     }
//   };

//   const fetchTeacherName = async () => {
//     try {
//       const teacherDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
//       if (!teacherDoc.empty) {
//         setTeacherName(teacherDoc.docs[0].data().name);
//       }
//     } catch (error) {
//       message.error('Failed to fetch teacher information');
//     }
//   };

//   const generateShareableLink = (quizId) => {
//     return `${window.location.origin}/take-quiz/${quizId}`;
//   };

//   const toggleQuizLock = async (quizId, currentLockState) => {
//     try {
//       await updateDoc(doc(db, 'quizzes', quizId), { locked: !currentLockState });
//       fetchQuizzes();
//       message.success(`Quiz ${currentLockState ? 'unlocked' : 'locked'} successfully`);
//     } catch (error) {
//       message.error('Failed to update quiz lock status');
//     }
//   };

//   const generateAccessCode = async (quizId) => {
//     try {
//       const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
//       await updateDoc(doc(db, 'quizzes', quizId), { accessCode });
//       fetchQuizzes();
//       message.success('Access code generated successfully');
//     } catch (error) {
//       message.error('Failed to generate access code');
//     }
//   };

//   const handleLogout = () => {
//     auth.signOut();
//     navigate('/login');
//   };

//   const handleEditQuiz = (quiz) => {
//     setEditingQuiz(quiz);
//     setIsEditModalVisible(true);
//   };

//   const handleUpdateQuiz = async (values) => {
//     if (editingQuiz) {
//       try {
//         await updateDoc(doc(db, 'quizzes', editingQuiz.id), values);
//         setIsEditModalVisible(false);
//         fetchQuizzes();
//         message.success('Quiz updated successfully');
//       } catch (error) {
//         message.error('Failed to update quiz');
//       }
//     }
//   };

//   const handleDeleteQuiz = async (quizId) => {
//     Modal.confirm({
//       title: 'Are you sure you want to delete this quiz?',
//       content: 'This action cannot be undone.',
//       onOk: async () => {
//         try {
//           await deleteDoc(doc(db, 'quizzes', quizId));
//           fetchQuizzes();
//           message.success('Quiz deleted successfully');
//         } catch (error) {
//           message.error('Failed to delete quiz');
//         }
//       },
//     });
//   };

//   return (
//     <Layout className="min-h-screen">
//       <Header className="px-4 bg-gradient-to-r  text-white bg-indigo-600 hover:bg-indigo-700">
//         <Row justify="space-between" align="middle">
//           <Col>
//             <div className="flex items-center">
//               <Avatar icon={<UserOutlined />} className="mr-2 bg-white text-blue-600" />
//               <Title level={4} className="m-0 text-white">Welcome, {teacherName}</Title>
//             </div>
//           </Col>
//           <Col>
//             <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout} className="bg-white text-blue-600 border-white hover:bg-blue-100 hover:border-blue-100">
//               Logout
//             </Button>
//           </Col>
//         </Row>
//       </Header>
//       <Layout>
//         <Sider width={200} className="bg-gray-100" breakpoint="lg" collapsedWidth="0">
//           <Menu
//             mode="inline"
//             defaultSelectedKeys={['1']}
//             className="h-full border-r-0"
//           >
//             <Menu.Item key="1" icon={<BookOutlined />}>Quizzes</Menu.Item>
//             <Menu.Item key="2" icon={<TeamOutlined />}>Students</Menu.Item>
//             <Menu.Item key="3" icon={<PlusOutlined />} onClick={() => navigate('/create-quiz')}>
//               Create New Quiz
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         <Layout className="p-6">
//           <Content
//             className="bg-white rounded-lg shadow-md"
//           >
//             <Spin spinning={loading}>
//               <div className="p-6">
//                 <Row gutter={[16, 16]} className="mb-6">
//                   <Col xs={24} sm={12} md={8} lg={6}>
//                     <Statistic title="Total Quizzes" value={quizzes.length} className="bg-blue-50 p-4 rounded-lg" />
//                   </Col>
//                   <Col xs={24} sm={12} md={8} lg={6}>
//                     <Statistic title="Total Students" value={students.length} className="bg-green-50 p-4 rounded-lg" />
//                   </Col>
//                 </Row>

//                 <Title level={2} className="mb-4">Your Quizzes</Title>
//                 <List
//                   grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
//                   dataSource={quizzes}
//                   renderItem={quiz => (
//                     <List.Item>
//                       <Card
//                         hoverable
//                         className="shadow-sm transition-all duration-300 hover:shadow-lg"
//                         actions={[
//                           <ShareAltOutlined key="share" onClick={() => { setSelectedQuiz(quiz); setIsShareModalVisible(true); }} />,
//                           <Button type="link" onClick={() => navigate(`/results/${quiz.id}`)}>C-R</Button>,
//                           quiz.locked ? 
//                             <UnlockOutlined key="unlock" onClick={() => toggleQuizLock(quiz.id, quiz.locked)} /> :
//                             <LockOutlined key="lock" onClick={() => toggleQuizLock(quiz.id, quiz.locked)} />,
//                           <Button type="link" onClick={() => generateAccessCode(quiz.id)}>G-c</Button>,
//                           <EditOutlined key="edit" onClick={() => handleEditQuiz(quiz)} />,
//                           <DeleteOutlined key="delete" onClick={() => handleDeleteQuiz(quiz.id)} />,
//                         ]}
//                       >
//                         <Meta
//                           title={<span className="text-lg font-semibold">{quiz.title}</span>}
//                           description={
//                             <>
//                               <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">{quiz.description}</Paragraph>
//                               <Text className="block mt-2">Time Limit: {quiz.timeLimit || 'Not set'} minutes</Text>
//                               {quiz.accessCode && (
//                                 <Text className="block mt-1 text-green-600">Access Code: {quiz.accessCode}</Text>
//                               )}
//                             </>
//                           }
//                         />
//                       </Card>
//                     </List.Item>
//                   )}
//                 />

//                 <Title level={2} className="mt-8 mb-4">Your Students</Title>
//                 <List
//                   grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
//                   dataSource={students}
//                   renderItem={student => (
//                     <List.Item>
//                       <Card hoverable className="shadow-sm transition-all duration-300 hover:shadow-lg">
//                         <Meta
//                           avatar={<Avatar icon={<UserOutlined />} className="bg-blue-100 text-blue-600" />}
//                           title={<span className="text-lg font-semibold">{student.name}</span>}
//                           description={
//                             <>
//                               <Text className="block text-gray-600">Email: {student.email}</Text>
//                               <Text className="block text-red-600">Password: {student.password}</Text>
//                               <Text className="block text-gray-600">School: {student.school}</Text>
//                               <Text className="block text-gray-600">Class: {student.class}</Text>
//                             </>
//                           }
//                         />
//                       </Card>
//                     </List.Item>
//                   )}
//                 />
//               </div>
//             </Spin>
//           </Content>
//         </Layout>
//       </Layout>

//       <Modal
//         title="Shareable Link and QR Code"
//         visible={isShareModalVisible}
//         onCancel={() => setIsShareModalVisible(false)}
//         footer={null}
//         className="rounded-lg overflow-hidden"
//       >
//         {selectedQuiz && (
//           <>
//             <Input.TextArea value={generateShareableLink(selectedQuiz.id)} readOnly autoSize className="mb-4" />
//             <div className="flex justify-center">
//               <QRCode value={generateShareableLink(selectedQuiz.id)} />
//             </div>
//           </>
//         )}
//       </Modal>

//       <Modal
//         title="Edit Quiz"
//         visible={isEditModalVisible}
//         onCancel={() => setIsEditModalVisible(false)}
//         footer={null}
//         className="rounded-lg overflow-hidden"
//       >
//         {editingQuiz && (
//           <Form
//             initialValues={editingQuiz}
//             onFinish={handleUpdateQuiz}
//             layout="vertical"
//           >
//             <Form.Item name="title" label="Title" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="description" label="Description" rules={[{ required: true }]}>
//               <Input.TextArea />
//             </Form.Item>
//             <Form.Item name="timeLimit" label="Time Limit (minutes)">
//               <InputNumber min={1} />
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700">
//                 Save Changes
//               </Button>
//             </Form.Item>
//           </Form>
//         )}
//       </Modal>
//     </Layout>
//   );
// }



















import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Layout, Button, Card, Avatar, Input, Modal, Form, InputNumber, List, Typography, message, Row, Col, Spin, Statistic, Tabs } from 'antd';
import { UserOutlined, LogoutOutlined, PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined, ShareAltOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons';
import { QRCode } from 'antd';

const { Header, Content } = Layout;
const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [teacherName, setTeacherName] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherAvatar, setTeacherAvatar] = useState('');
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTeacherModalVisible, setIsTeacherModalVisible] = useState(false);  // for teacher profile modal
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
    fetchStudents();
    fetchTeacherInfo();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'quizzes'), where('teacherId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuizzes(quizzesData);
    } catch (error) {
      message.error('Failed to fetch quizzes');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const q = query(collection(db, 'users'), where('teacherEmail', '==', auth.currentUser.email));
      const querySnapshot = await getDocs(q);
      const studentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentsData);
    } catch (error) {
      message.error('Failed to fetch students');
    }
  };

  const fetchTeacherInfo = async () => {
    try {
      const teacherDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
      if (!teacherDoc.empty) {
        const teacher = teacherDoc.docs[0].data();
        setTeacherName(teacher.name);
        setTeacherEmail(teacher.email);
        setTeacherPassword(teacher.password)
        
        setTeacherAvatar(teacher.name.charAt(0)); // Only first letter of teacher's name
      }
    } catch (error) {
      message.error('Failed to fetch teacher information');
    }
  };

  const generateShareableLink = (quizId) => {
    return `${window.location.origin}/take-quiz/${quizId}`;
  };

  const toggleQuizLock = async (quizId, currentLockState) => {
    try {
      await updateDoc(doc(db, 'quizzes', quizId), { locked: !currentLockState });
      fetchQuizzes();
      message.success(`Quiz ${currentLockState ? 'unlocked' : 'locked'} successfully`);
    } catch (error) {
      message.error('Failed to update quiz lock status');
    }
  };

  const generateAccessCode = async (quizId) => {
    try {
      const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      await updateDoc(doc(db, 'quizzes', quizId), { accessCode });
      fetchQuizzes();
      message.success('Access code generated successfully');
    } catch (error) {
      message.error('Failed to generate access code');
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setIsEditModalVisible(true);
  };

  const handleUpdateQuiz = async (values) => {
    if (editingQuiz) {
      try {
        await updateDoc(doc(db, 'quizzes', editingQuiz.id), values);
        setIsEditModalVisible(false);
        fetchQuizzes();
        message.success('Quiz updated successfully');
      } catch (error) {
        message.error('Failed to update quiz');
      }
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this quiz?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          await deleteDoc(doc(db, 'quizzes', quizId));
          fetchQuizzes();
          message.success('Quiz deleted successfully');
        } catch (error) {
          message.error('Failed to delete quiz');
        }
      },
    });
  };

  const handleDisableStudent = async (studentId) => {
    try {
      await updateDoc(doc(db, 'users', studentId), { disabled: true });
      message.success('Student disabled successfully');
      fetchStudents();
    } catch (error) {
      message.error('Failed to disable student');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this student?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          await deleteDoc(doc(db, 'users', studentId));
          fetchStudents();
          message.success('Student deleted successfully');
        } catch (error) {
          message.error('Failed to delete student');
        }
      },
    });
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout className="min-h-screen bg-black">
      <Header className="px-4 bg-gradient-to-r text-white bg-indigo-600 hover:bg-indigo-700">
        <Row justify="space-between" align="middle">
          <Col>
            <div className="flex items-center">
              {/* Avatar with first letter of teacher's name */}
              <Avatar className="mr-2 bg-white text-blue-600" onClick={() => setIsTeacherModalVisible(true)}>{teacherAvatar}</Avatar>
              <Button type="link" onClick={() => setIsTeacherModalVisible(true)} className="text-white">
              {teacherName}
              </Button>
            </div>
          </Col>
          <Col>
            <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout} className="bg-white text-blue-600 border-white hover:bg-blue-100 hover:border-blue-100">

            </Button>
          </Col>
        </Row>
      </Header>

      <Layout>
        <Content className="p-6">
          <Spin spinning={loading}>
            <Tabs defaultActiveKey="1" className="w-full">
              {/* Quizzes Tab */}
              <TabPane tab="Quizzes" key="1">
                <Row gutter={[16, 16]} className="mb-6">
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Statistic title="Total Quizzes" value={quizzes.length} className="bg-blue-50 p-4 rounded-lg" />
                  </Col>
                </Row>

                <Title level={2} className="mb-4">Your Quizzes</Title>
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
                  dataSource={quizzes}
                  renderItem={quiz => (
                    <List.Item>
                      <Card
                        hoverable
                        className="shadow-sm transition-all duration-300 hover:shadow-lg"
                        actions={[
                          <ShareAltOutlined key="share" onClick={() => { setSelectedQuiz(quiz); setIsShareModalVisible(true); }} />,
                          <Button type="link" onClick={() => navigate(`/results/${quiz.id}`)}>C-R</Button>,
                          quiz.locked ? 
                          <LockOutlined key="unlock" onClick={() => toggleQuizLock(quiz.id, quiz.locked)} />:
                            <UnlockOutlined key="unlock" onClick={() => toggleQuizLock(quiz.id, quiz.locked)} /> ,
                          <Button type="link" onClick={() => generateAccessCode(quiz.id)}>G-c</Button>,
                          <EditOutlined key="edit" onClick={() => handleEditQuiz(quiz)} />,
                          <DeleteOutlined key="delete" onClick={() => handleDeleteQuiz(quiz.id)} />,
                        ]}
                      >
                        <Meta
                          title={<span className="text-lg font-semibold">{quiz.title}</span>}
                          description={
                            <>
                              <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">{quiz.description}</Paragraph>
                              <Text className="block mt-2">Time Limit: {quiz.timeLimit || 'Not set'} minutes</Text>
                              {quiz.accessCode && (
                                <Text className="block mt-1 text-green-600">Access Code: {quiz.accessCode}</Text>
                              )}
                            </>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              {/* Students Tab */}
              <TabPane tab="Students" key="2">
                <Input
                  placeholder="Search Students"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
                  dataSource={filteredStudents}
                  renderItem={student => (
                    <List.Item>
                      <Card hoverable className="shadow-sm transition-all duration-300 hover:shadow-lg">
                        <Meta
                          avatar={<Avatar icon={<UserOutlined />} className="bg-blue-100 text-blue-600" />}
                          title={<span className="text-lg font-semibold">{student.name}</span>}
                          description={
                            <>
                              <Text className="block text-gray-600">Email: {student.email}</Text>
                              <Text className="block text-red-600">Password: {student.password}</Text>
                              <Text className="block text-gray-600">School: {student.school}</Text>
                              <Text className="block text-gray-600">Class: {student.class}</Text>
                              {student.disabled && (
                                <Text className="block text-red-600">Disabled</Text>
                              )}
                              <Button type="link" onClick={() => handleDisableStudent(student.id)}>Disable</Button>
                              <Button type="link" onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
                            </>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Spin>

          {/* Floating Plus Icon for adding quiz */}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            shape="circle"
            size="large"
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 shadow-lg"
            onClick={() => navigate('/create-quiz')}
          />
        </Content>
      </Layout>

      {/* Teacher Profile Modal */}
      <Modal
        title="Teacher Profile"
        visible={isTeacherModalVisible}
        onCancel={() => setIsTeacherModalVisible(false)}
        footer={null}
        className="rounded-lg overflow-hidden"
      >
        <p><strong>Name:</strong> {teacherName}</p>
        <p><strong>Email:</strong> {teacherEmail}</p>
        {/* <p><strong>Password:</strong> {teacherPassword}</p> */}
      </Modal>

      {/* Share Modal */}
      <Modal
        title="Shareable Link and QR Code"
        visible={isShareModalVisible}
        onCancel={() => setIsShareModalVisible(false)}
        footer={null}
        className="rounded-lg overflow-hidden"
      >
        {selectedQuiz && (
          <>
            <Input.TextArea value={generateShareableLink(selectedQuiz.id)} readOnly autoSize className="mb-4" />
            <div className="flex justify-center">
              <QRCode value={generateShareableLink(selectedQuiz.id)} />
            </div>
          </>
        )}
      </Modal>

      {/* Edit Quiz Modal */}
      <Modal
        title="Edit Quiz"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        className="rounded-lg overflow-hidden"
      >
        {editingQuiz && (
          <Form
            initialValues={editingQuiz}
            onFinish={handleUpdateQuiz}
            layout="vertical"
          >
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="timeLimit" label="Time Limit (minutes)">
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Layout>
  );
}
