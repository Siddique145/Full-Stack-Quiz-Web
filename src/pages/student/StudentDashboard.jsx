// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import { Link } from 'react-router-dom';
// // // // // // // import { auth, db } from '../../firebase/firebase';
// // // // // // // import { collection, query, where, getDocs } from 'firebase/firestore';

// // // // // // // export default function StudentDashboard() {
// // // // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchQuizzes = async () => {
// // // // // // //       const q = query(collection(db, 'quizzes'));
// // // // // // //       const querySnapshot = await getDocs(q);
// // // // // // //       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // // // // //       setQuizzes(quizzesData);
// // // // // // //       setLoading(false);
// // // // // // //     };

// // // // // // //     fetchQuizzes();
// // // // // // //   }, []);

// // // // // // //   if (loading) {
// // // // // // //     return <div className="text-center mt-8">Loading...</div>;
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="container mx-auto px-4 py-8">
// // // // // // //       <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
// // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // // // //         {quizzes.map(quiz => (
// // // // // // //           <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6">
// // // // // // //             <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
// // // // // // //             <p className="text-gray-600 mb-4">{quiz.description}</p>
// // // // // // //             <Link
// // // // // // //               to={`/take-quiz/${quiz.id}`}
// // // // // // //               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // // // // // //             >
// // // // // // //               Take Quiz
// // // // // // //             </Link>
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // ///upwer code is perfect

// // // // // // // import React, { useState, useEffect } from "react"
// // // // // // // import { Link } from "react-router-dom"
// // // // // // // import { auth, db } from "../../firebase/firebase"
// // // // // // // import { collection, query, where, getDocs, getDoc } from "firebase/firestore"

// // // // // // // export default function StudentDashboard() {
// // // // // // //   const [quizzes, setQuizzes] = useState([])
// // // // // // //   const [quizResults, setQuizResults] = useState([])
// // // // // // //   const [loading, setLoading] = useState(true)
// // // // // // //   const [accessCode, setAccessCode] = useState("")
// // // // // // //   const [error, setError] = useState("")

// // // // // // //   useEffect(() => {
// // // // // // //     fetchQuizzes()
// // // // // // //     fetchQuizResults()
// // // // // // //   }, [])

// // // // // // //   const fetchQuizzes = async () => {
// // // // // // //     try {
// // // // // // //       const userDoc = await getDocs(
// // // // // // //         query(
// // // // // // //           collection(db, "users"),
// // // // // // //           where("email", "==", auth.currentUser?.email)
// // // // // // //         )
// // // // // // //       )
// // // // // // //       const userData = userDoc.docs[0].data()
// // // // // // //       const teacherEmail = userData.teacherEmail

// // // // // // //       const teacherDoc = await getDocs(
// // // // // // //         query(collection(db, "users"), where("email", "==", teacherEmail))
// // // // // // //       )
// // // // // // //       const teacherId = teacherDoc.docs[0].id

// // // // // // //       const q = query(
// // // // // // //         collection(db, "quizzes"),
// // // // // // //         where("teacherId", "==", teacherId),
// // // // // // //         where("locked", "==", false)
// // // // // // //       )
// // // // // // //       const querySnapshot = await getDocs(q)
// // // // // // //       const quizzesData = querySnapshot.docs.map(doc => ({
// // // // // // //         id: doc.id,
// // // // // // //         ...doc.data()
// // // // // // //       }))
// // // // // // //       setQuizzes(quizzesData)
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error fetching quizzes:", error)
// // // // // // //       setError("Failed to load quizzes. Please try again later.")
// // // // // // //     } finally {
// // // // // // //       setLoading(false)
// // // // // // //     }
// // // // // // //   }

// // // // // // //   const fetchQuizResults = async () => {
// // // // // // //     try {
// // // // // // //       const q = query(
// // // // // // //         collection(db, "quizResults"),
// // // // // // //         where("studentId", "==", auth.currentUser?.uid)
// // // // // // //       )
// // // // // // //       const querySnapshot = await getDocs(q)
// // // // // // //       const resultsData = await Promise.all(
// // // // // // //         querySnapshot.docs.map(async doc => {
// // // // // // //           const resultData = doc.data()
// // // // // // //           const quizDoc = await getDoc(doc(db, "quizzes", resultData.quizId))
// // // // // // //           const quizData = quizDoc.data()
// // // // // // //           return {
// // // // // // //             id: doc.id,
// // // // // // //             quizId: resultData.quizId,
// // // // // // //             quizTitle: quizData?.title || "Unknown Quiz",
// // // // // // //             score: resultData.score,
// // // // // // //             totalQuestions: resultData.totalQuestions,
// // // // // // //             answers: resultData.answers
// // // // // // //           }
// // // // // // //         })
// // // // // // //       )
// // // // // // //       setQuizResults(resultsData)
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error fetching quiz results:", error)
// // // // // // //       setError("Failed to load quiz results. Please try again later.")
// // // // // // //     }
// // // // // // //   }

// // // // // // //   const handleAccessCodeSubmit = quizId => {
// // // // // // //     const quiz = quizzes.find(q => q.id === quizId)
// // // // // // //     if (quiz?.accessCode === accessCode) {
// // // // // // //       setError("")
// // // // // // //       window.location.href = `/take-quiz/${quizId}`
// // // // // // //     } else {
// // // // // // //       setError("Invalid access code")
// // // // // // //     }
// // // // // // //   }

// // // // // // //   if (loading) {
// // // // // // //     return <div className="text-center mt-8">Loading...</div>
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="container mx-auto px-4 py-8">
// // // // // // //       <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

// // // // // // //       <h2 className="text-2xl font-semibold mb-4">Available Quizzes</h2>
// // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
// // // // // // //         {quizzes.map(quiz => (
// // // // // // //           <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6">
// // // // // // //             <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
// // // // // // //             <p className="text-gray-600 mb-4">{quiz.description}</p>
// // // // // // //             {quiz.accessCode ? (
// // // // // // //               <div>
// // // // // // //                 <input
// // // // // // //                   type="text"
// // // // // // //                   placeholder="Enter access code"
// // // // // // //                   value={accessCode}
// // // // // // //                   onChange={e => setAccessCode(e.target.value)}
// // // // // // //                   className="mb-2 p-2 border rounded w-full"
// // // // // // //                 />
// // // // // // //                 <button
// // // // // // //                   onClick={() => handleAccessCodeSubmit(quiz.id)}
// // // // // // //                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
// // // // // // //                 >
// // // // // // //                   Submit Access Code
// // // // // // //                 </button>
// // // // // // //               </div>
// // // // // // //             ) : (
// // // // // // //               <Link
// // // // // // //                 to={`/take-quiz/${quiz.id}`}
// // // // // // //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
// // // // // // //               >
// // // // // // //                 Take Quiz
// // // // // // //               </Link>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       <h2 className="text-2xl font-semibold mb-4">Your Quiz Results</h2>
// // // // // // //       <div className="space-y-4">
// // // // // // //         {quizResults.map(result => (
// // // // // // //           <div key={result.id} className="bg-white shadow-md rounded-lg p-6">
// // // // // // //             <h3 className="text-xl font-semibold mb-2">{result.quizTitle}</h3>
// // // // // // //             <p className="text-lg mb-2">
// // // // // // //               Score: {result.score} / {result.totalQuestions}
// // // // // // //             </p>
// // // // // // //             <div className="mt-4">
// // // // // // //               <h4 className="text-lg font-semibold mb-2">Detailed Results:</h4>
// // // // // // //               {result.answers.map((answer, index) => (
// // // // // // //                 <div
// // // // // // //                   key={index}
// // // // // // //                   className={`p-2 rounded ${
// // // // // // //                     answer.isCorrect ? "bg-green-100" : "bg-red-100"
// // // // // // //                   } mb-2`}
// // // // // // //                 >
// // // // // // //                   <p className="font-medium">{answer.question}</p>
// // // // // // //                   <p>Your answer: {answer.userAnswer}</p>
// // // // // // //                   {!answer.isCorrect && (
// // // // // // //                     <p className="text-green-700">
// // // // // // //                       Correct answer: {answer.correctAnswer}
// // // // // // //                     </p>
// // // // // // //                   )}
// // // // // // //                 </div>
// // // // // // //               ))}
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {error && <p className="text-red-500 mt-4">{error}</p>}
// // // // // // //     </div>
// // // // // // //   )
// // // // // // // }

// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { Link, useNavigate } from 'react-router-dom';
// // // // // // import { auth, db } from '../../firebase/firebase';
// // // // // // import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

// // // // // // export default function StudentDashboard() {
// // // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // // //   const [quizResults, setQuizResults] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [accessCode, setAccessCode] = useState('');
// // // // // //   const [error, setError] = useState('');
// // // // // //   const navigate = useNavigate();

// // // // // //   useEffect(() => {
// // // // // //     fetchQuizzes();
// // // // // //     fetchQuizResults();
// // // // // //   }, []);

// // // // // //   const fetchQuizzes = async () => {
// // // // // //     try {
// // // // // //       const userDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
// // // // // //       const userData = userDoc.docs[0].data();
// // // // // //       const teacherEmail = userData.teacherEmail;

// // // // // //       const teacherDoc = await getDocs(query(collection(db, 'users'), where('email', '==', teacherEmail)));
// // // // // //       const teacherId = teacherDoc.docs[0].id;

// // // // // //       const q = query(collection(db, 'quizzes'), where('teacherId', '==', teacherId));
// // // // // //       const querySnapshot = await getDocs(q);
// // // // // //       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // // // //       setQuizzes(quizzesData);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching quizzes:", error);
// // // // // //       setError("Failed to load quizzes. Please try again later.");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const fetchQuizResults = async () => {
// // // // // //     try {
// // // // // //       const q = query(collection(db, 'quizResults'), where('studentId', '==', auth.currentUser.uid));
// // // // // //       const querySnapshot = await getDocs(q);
// // // // // //       const resultsData = await Promise.all(querySnapshot.docs.map(async (doc) => {
// // // // // //         const resultData = doc.data();
// // // // // //         const quizDoc = await getDoc(doc(db, 'quizzes', resultData.quizId));
// // // // // //         const quizData = quizDoc.data();
// // // // // //         return {
// // // // // //           id: doc.id,
// // // // // //           quizId: resultData.quizId,
// // // // // //           quizTitle: quizData?.title || 'Unknown Quiz',
// // // // // //           score: resultData.score,
// // // // // //           totalQuestions: resultData.totalQuestions,
// // // // // //           answers: resultData.answers,
// // // // // //           attemptDate: resultData.attemptDate.toDate().toLocaleString(),
// // // // // //         };
// // // // // //       }));
// // // // // //       setQuizResults(resultsData);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching quiz results:", error);
// // // // // //       setError("Failed to load quiz results. Please try again later.");
// // // // // //     }
// // // // // //   };

// // // // // //   const handleAccessCodeSubmit = (quizId) => {
// // // // // //     const quiz = quizzes.find(q => q.id === quizId);
// // // // // //     if (quiz.accessCode === accessCode) {
// // // // // //       setError('');
// // // // // //       navigate(`/take-quiz/${quizId}`);
// // // // // //     } else {
// // // // // //       setError('Invalid access code');
// // // // // //     }
// // // // // //   };

// // // // // //   const isQuizAttempted = (quizId) => {
// // // // // //     return quizResults.some(result => result.quizId === quizId);
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return <div className="text-center mt-8">Loading...</div>;
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="container mx-auto px-4 py-8">
// // // // // //       <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

// // // // // //       <h2 className="text-2xl font-semibold mb-4">Available Quizzes</h2>
// // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
// // // // // //         {quizzes.map(quiz => (
// // // // // //           <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6">
// // // // // //             <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
// // // // // //             <p className="text-gray-600 mb-4">{quiz.description}</p>
// // // // // //             {isQuizAttempted(quiz.id) ? (
// // // // // //               <p className="text-yellow-600 font-semibold">You have already attempted this quiz</p>
// // // // // //             ) : quiz.accessCode ? (
// // // // // //               <div>
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   placeholder="Enter access code"
// // // // // //                   value={accessCode}
// // // // // //                   onChange={(e) => setAccessCode(e.target.value)}
// // // // // //                   className="mb-2 p-2 border rounded w-full"
// // // // // //                 />
// // // // // //                 <button
// // // // // //                   onClick={() => handleAccessCodeSubmit(quiz.id)}
// // // // // //                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
// // // // // //                 >
// // // // // //                   Submit Access Code
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <Link
// // // // // //                 to={`/take-quiz/${quiz.id}`}
// // // // // //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
// // // // // //               >
// // // // // //                 Take Quiz
// // // // // //               </Link>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       <h2 className="text-2xl font-semibold mb-4">Your Quiz Results</h2>
// // // // // //       <div className="space-y-4">
// // // // // //         {quizResults.map(result => (
// // // // // //           <div key={result.id} className="bg-white shadow-md rounded-lg p-6">
// // // // // //             <h3 className="text-xl font-semibold mb-2">{result.quizTitle}</h3>
// // // // // //             <p className="text-lg mb-2">Score: {result.score} / {result.totalQuestions}</p>
// // // // // //             <p className="text-sm text-gray-500 mb-4">Attempted on: {result.attemptDate}</p>
// // // // // //             <div className="mt-4">
// // // // // //               <h4 className="text-lg font-semibold mb-2">Detailed Results:</h4>
// // // // // //               {result.answers.map((answer, index) => (
// // // // // //                 <div key={index} className={`p-2 rounded ${answer.isCorrect ? 'bg-green-100' : 'bg-red-100'} mb-2`}>
// // // // // //                   <p className="font-medium">{answer.question}</p>
// // // // // //                   <p>Your answer: {answer.userAnswer}</p>
// // // // // //                   {!answer.isCorrect && <p className="text-green-700">Correct answer: {answer.correctAnswer}</p>}
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {error && <p className="text-red-500 mt-4">{error}</p>}

// // // // // //       <button
// // // // // //         onClick={() => navigate(-1)}
// // // // // //         className="mt-8 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
// // // // // //       >
// // // // // //         Back
// // // // // //       </button>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { auth, db } from '../../firebase/firebase';
// // // // // import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
// // // // // import { Layout, Menu, Button, Card, Avatar, Input, Modal, List, Typography, message } from 'antd';
// // // // // import { UserOutlined, LogoutOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';

// // // // // const { Header, Content } = Layout;
// // // // // const { Meta } = Card;
// // // // // const { Title, Text } = Typography;

// // // // // export default function StudentDashboard() {
// // // // //   const [quizzes, setQuizzes] = useState([]);
// // // // //   const [quizResults, setQuizResults] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [accessCode, setAccessCode] = useState('');
// // // // //   const [error, setError] = useState('');
// // // // //   const [studentName, setStudentName] = useState('');
// // // // //   const [selectedResult, setSelectedResult] = useState(null);
// // // // //   const [isResultModalVisible, setIsResultModalVisible] = useState(false);
// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     fetchQuizzes();
// // // // //     fetchQuizResults();
// // // // //     fetchStudentName();
// // // // //   }, []);

// // // // //   const fetchQuizzes = async () => {
// // // // //     try {
// // // // //       const userDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
// // // // //       const userData = userDoc.docs[0].data();
// // // // //       const teacherEmail = userData.teacherEmail;

// // // // //       const teacherDoc = await getDocs(query(collection(db, 'users'), where('email', '==', teacherEmail)));
// // // // //       const teacherId = teacherDoc.docs[0].id;

// // // // //       const q = query(collection(db, 'quizzes'), where('teacherId', '==', teacherId), where('locked', '==', false));
// // // // //       const querySnapshot = await getDocs(q);
// // // // //       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // // //       setQuizzes(quizzesData);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching quizzes:", error);
// // // // //       setError("Failed to load quizzes. Please try again later.");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const fetchQuizResults = async () => {
// // // // //     try {
// // // // //       const q = query(collection(db, 'quizResults'), where('studentId', '==', auth.currentUser.uid));
// // // // //       const querySnapshot = await getDocs(q);
// // // // //       const resultsData = await Promise.all(querySnapshot.docs.map(async (doc) => {
// // // // //         const resultData = doc.data();
// // // // //         const quizDoc = await getDoc(doc(db, 'quizzes', resultData.quizId));
// // // // //         const quizData = quizDoc.data();
// // // // //         return {
// // // // //           id: doc.id,
// // // // //           quizId: resultData.quizId,
// // // // //           quizTitle: quizData?.title || 'Unknown Quiz',
// // // // //           score: resultData.score,
// // // // //           totalQuestions: resultData.totalQuestions,
// // // // //           answers: resultData.answers,
// // // // //           attemptDate: resultData.attemptDate.toDate().toLocaleString(),
// // // // //         };
// // // // //       }));
// // // // //       setQuizResults(resultsData);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching quiz results:", error);
// // // // //       setError("Failed to load quiz results. Please try again later.");
// // // // //     }
// // // // //   };

// // // // //   const fetchStudentName = async () => {
// // // // //     const studentDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
// // // // //     if (!studentDoc.empty) {
// // // // //       setStudentName(studentDoc.docs[0].data().name);
// // // // //     }
// // // // //   };

// // // // //   const handleAccessCodeSubmit = (quizId) => {
// // // // //     const quiz = quizzes.find(q => q.id === quizId);
// // // // //     if (quiz.accessCode === accessCode) {
// // // // //       setError('');
// // // // //       navigate(`/take-quiz/${quizId}`);
// // // // //     } else {
// // // // //       message.error('Invalid access code');
// // // // //     }
// // // // //   };

// // // // //   const isQuizAttempted = (quizId) => {
// // // // //     return quizResults.some(result => result.quizId === quizId);
// // // // //   };

// // // // //   const handleLogout = () => {
// // // // //     auth.signOut();
// // // // //     navigate('/login');
// // // // //   };

// // // // //   if (loading) {
// // // // //     return <div className="text-center mt-8">Loading...</div>;
// // // // //   }

// // // // //   return (
// // // // //     <Layout style={{ minHeight: '100vh' }}>
// // // // //       <Header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
// // // // //         <div style={{ display: 'flex', alignItems: 'center' }}>
// // // // //           <Avatar icon={<UserOutlined />} />
// // // // //           <Title level={4} style={{ color: 'white', margin: '0 0 0 10px' }}>Welcome, {studentName}</Title>
// // // // //         </div>
// // // // //         <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
// // // // //           Logout
// // // // //         </Button>
// // // // //       </Header>
// // // // //       <Content style={{ padding: '0 50px' }}>
// // // // //         <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
// // // // //           <Content style={{ padding: '0 24px', minHeight: 280 }}>
// // // // //             <Title level={2}>Available Quizzes</Title>
// // // // //             <List
// // // // //               grid={{ gutter: 16, column: 3 }}
// // // // //               dataSource={quizzes}
// // // // //               renderItem={quiz => (
// // // // //                 <List.Item>
// // // // //                   <Card
// // // // //                     title={quiz.title}
// // // // //                     extra={quiz.timeLimit && <Text><ClockCircleOutlined /> {quiz.timeLimit} min</Text>}
// // // // //                   >
// // // // //                     <Meta description={quiz.description} />
// // // // //                     {isQuizAttempted(quiz.id) ? (
// // // // //                       <Text type="warning" style={{ display: 'block', marginTop: '10px' }}>You have already attempted this quiz</Text>
// // // // //                     ) : quiz.accessCode ? (
// // // // //                       <div style={{ marginTop: '10px' }}>
// // // // //                         <Input
// // // // //                           placeholder="Enter access code"
// // // // //                           value={accessCode}
// // // // //                           onChange={(e) => setAccessCode(e.target.value)}
// // // // //                           style={{ marginBottom: '10px' }}
// // // // //                         />
// // // // //                         <Button type="primary" onClick={() => handleAccessCodeSubmit(quiz.id)} block>
// // // // //                           Submit Access Code
// // // // //                         </Button>
// // // // //                       </div>
// // // // //                     ) : (
// // // // //                       <Button type="primary" onClick={() => navigate(`/take-quiz/${quiz.id}`)} style={{ marginTop: '10px' }} block>
// // // // //                         Take Quiz
// // // // //                       </Button>
// // // // //                     )}
// // // // //                   </Card>
// // // // //                 </List.Item>
// // // // //               )}
// // // // //             />

// // // // //             <Title level={2} style={{ marginTop: '20px' }}>Your Quiz Results</Title>
// // // // //             <List
// // // // //               itemLayout="horizontal"
// // // // //               dataSource={quizResults}
// // // // //               renderItem={result => (
// // // // //                 <List.Item
// // // // //                   actions={[
// // // // //                     <Button type="link" onClick={() => { setSelectedResult(result); setIsResultModalVisible(true); }}>
// // // // //                       <EyeOutlined /> See Detailed Results
// // // // //                     </Button>
// // // // //                   ]}
// // // // //                 >
// // // // //                   <List.Item.Meta
// // // // //                     title={result.quizTitle}
// // // // //                     description={`Attempted on: ${result.attemptDate}`}
// // // // //                   />
// // // // //                   <div>Score: {result.score} / {result.totalQuestions}</div>
// // // // //                 </List.Item>
// // // // //               )}
// // // // //             />

// // // // //             {error && <Text type="danger" style={{ marginTop: '20px' }}>{error}</Text>}

// // // // //             <Modal
// // // // //               title={`Detailed Quiz Results: ${selectedResult?.quizTitle}`}
// // // // //               visible={isResultModalVisible}
// // // // //               onCancel={() => setIsResultModalVisible(false)}
// // // // //               footer={null}
// // // // //             >
// // // // //               {selectedResult && (
// // // // //                 <div>
// // // // //                   <Text>Score: {selectedResult.score} / {selectedResult.totalQuestions}</Text>
// // // // //                   <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>Attempted on: {selectedResult.attemptDate}</Text>
// // // // //                   {selectedResult.answers.map((answer, index) => (
// // // // //                     <Card key={index} style={{ marginBottom: '10px', backgroundColor: answer.isCorrect ? '#f6ffed' : '#fff1f0' }}>
// // // // //                       <Text strong>{answer.question}</Text>
// // // // //                       <Text style={{ display: 'block' }}>Your answer: {answer.userAnswer}</Text>
// // // // //                       {!answer.isCorrect && <Text type="success">Correct answer: {answer.correctAnswer}</Text>}
// // // // //                     </Card>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               )}
// // // // //             </Modal>
// // // // //           </Content>
// // // // //         </Layout>
// // // // //       </Content>
// // // // //     </Layout>
// // // // //   );
// // // // // }

// // // // import React, { useState, useEffect } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { auth, db } from '../../firebase/firebase';
// // // // import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
// // // // import { Layout, Menu, Button, Card, Avatar, Input, Modal, List, Typography, message, Row, Col, Spin, Statistic, Progress } from 'antd';
// // // // import { UserOutlined, LogoutOutlined, ClockCircleOutlined, EyeOutlined, BookOutlined, TrophyOutlined } from '@ant-design/icons';

// // // // const { Header, Content, Sider } = Layout;
// // // // const { Meta } = Card;
// // // // const { Title, Text, Paragraph } = Typography;

// // // // export default function StudentDashboard() {
// // // //   const [quizzes, setQuizzes] = useState([]);
// // // //   const [quizResults, setQuizResults] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [accessCode, setAccessCode] = useState('');
// // // //   const [error, setError] = useState('');
// // // //   const [studentName, setStudentName] = useState('');
// // // //   const [selectedResult, setSelectedResult] = useState(null);
// // // //   const [isResultModalVisible, setIsResultModalVisible] = useState(false);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     fetchQuizzes();
// // // //     fetchQuizResults();
// // // //     fetchStudentName();
// // // //   }, []);

// // // //   const fetchQuizzes = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const userDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
// // // //       const userData = userDoc.docs[0].data();
// // // //       const teacherEmail = userData.teacherEmail;

// // // //       const teacherDoc = await getDocs(query(collection(db, 'users'), where('email', '==', teacherEmail)));
// // // //       const teacherId = teacherDoc.docs[0].id;

// // // //       const q = query(collection(db, 'quizzes'), where('teacherId', '==', teacherId), where('locked', '==', false));
// // // //       const querySnapshot = await getDocs(q);
// // // //       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // //       setQuizzes(quizzesData);
// // // //     } catch (error) {
// // // //       console.error("Error fetching quizzes:", error);
// // // //       setError("Failed to load quizzes. Please try again later.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const fetchQuizResults = async () => {
// // // //     try {
// // // //       const q = query(collection(db, 'quizResults'), where('studentId', '==', auth.currentUser.uid));
// // // //       const querySnapshot = await getDocs(q);
// // // //       const resultsData = await Promise.all(querySnapshot.docs.map(async (doc) => {
// // // //         const resultData = doc.data();
// // // //         const quizDoc = await getDoc(doc(db, 'quizzes', resultData.quizId));
// // // //         const quizData = quizDoc.data();
// // // //         return {
// // // //           id: doc.id,
// // // //           quizId: resultData.quizId,
// // // //           quizTitle: quizData?.title || 'Unknown Quiz',
// // // //           score: resultData.score,
// // // //           totalQuestions: resultData.totalQuestions,
// // // //           answers: resultData.answers,
// // // //           attemptDate: resultData.attemptDate.toDate().toLocaleString(),
// // // //         };
// // // //       }));
// // // //       setQuizResults(resultsData);
// // // //     } catch (error) {
// // // //       console.error("Error fetching quiz results:", error);
// // // //       setError("Failed to load quiz results. Please try again later.");
// // // //     }
// // // //   };

// // // //   const fetchStudentName = async () => {
// // // //     const studentDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
// // // //     if (!studentDoc.empty) {
// // // //       setStudentName(studentDoc.docs[0].data().name);
// // // //     }
// // // //   };

// // // //   const handleAccessCodeSubmit = (quizId) => {
// // // //     const quiz = quizzes.find(q => q.id === quizId);
// // // //     if (quiz.accessCode === accessCode) {
// // // //       setError('');
// // // //       navigate(`/take-quiz/${quizId}`);
// // // //     } else {
// // // //       message.error('Invalid access code');
// // // //     }
// // // //   };

// // // //   const isQuizAttempted = (quizId) => {
// // // //     return quizResults.some(result => result.quizId === quizId);
// // // //   };

// // // //   const handleLogout = () => {
// // // //     auth.signOut();
// // // //     navigate('/login');
// // // //   };

// // // //   return (
// // // //     <Layout style={{ minHeight: '100vh' }}>
// // // //       <Header className="header" style={{ padding: '0 20px', background: '#001529' }}>
// // // //         <Row justify="space-between" align="middle">
// // // //           <Col>
// // // //             <div style={{ display: 'flex', alignItems: 'center' }}>
// // // //               <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
// // // //               <Title level={4} style={{ color: 'white', margin: 0 }}>Welcome, {studentName}</Title>
// // // //             </div>
// // // //           </Col>
// // // //           <Col>
// // // //             <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
// // // //               Logout
// // // //             </Button>
// // // //           </Col>
// // // //         </Row>
// // // //       </Header>
// // // //       <Layout>
// // // //         <Sider width={200} className="site-layout-background" breakpoint="lg" collapsedWidth="0">
// // // //           <Menu
// // // //             mode="inline"
// // // //             defaultSelectedKeys={['1']}
// // // //             style={{ height: '100%', borderRight: 0 }}
// // // //           >
// // // //             <Menu.Item key="1" icon={<BookOutlined />}>Available Quizzes</Menu.Item>
// // // //             <Menu.Item key="2" icon={<TrophyOutlined />}>Quiz Results</Menu.Item>
// // // //           </Menu>
// // // //         </Sider>
// // // //         <Layout style={{ padding: '24px' }}>
// // // //           <Content
// // // //             className="site-layout-background"
// // // //             style={{
// // // //               padding: 24,
// // // //               margin: 0,
// // // //               minHeight: 280,
// // // //               background: '#fff',
// // // //               borderRadius: '8px',
// // // //               boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
// // // //             }}
// // // //           >
// // // //             <Spin spinning={loading}>
// // // //               <Row gutter={[16, 16]}>
// // // //                 <Col xs={24} sm={12} md={8} lg={6}>
// // // //                   <Statistic title="Available Quizzes" value={quizzes.length} />
// // // //                 </Col>
// // // //                 <Col xs={24} sm={12} md={8} lg={6}>
// // // //                   <Statistic title="Completed Quizzes" value={quizResults.length} />
// // // //                 </Col>
// // // //               </Row>

// // // //               <Title level={2} style={{ marginTop: '20px' }}>Available Quizzes</Title>
// // // //               <List
// // // //                 grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
// // // //                 dataSource={quizzes}
// // // //                 renderItem={quiz => (
// // // //                   <List.Item>
// // // //                     <Card
// // // //                       hoverable
// // // //                       title={quiz.title}
// // // //                       extra={quiz.timeLimit && <Text><ClockCircleOutlined /> {quiz.timeLimit} min</Text>}
// // // //                     >
// // // //                       <Meta
// // // //                         description={
// // // //                           <Paragraph ellipsis={{ rows: 2 }}>{quiz.description}</Paragraph>
// // // //                         }
// // // //                       />
// // // //                       {isQuizAttempted(quiz.id) ? (
// // // //                         <Text type="warning" style={{ display: 'block', marginTop: '10px' }}>You have already attempted this quiz</Text>
// // // //                       ) : quiz.accessCode ? (
// // // //                         <div style={{ marginTop: '10px' }}>
// // // //                           <Input
// // // //                             placeholder="Enter access code"
// // // //                             value={accessCode}
// // // //                             onChange={(e) => setAccessCode(e.target.value)}
// // // //                             style={{ marginBottom: '10px' }}
// // // //                           />
// // // //                           <Button type="primary" onClick={() => handleAccessCodeSubmit(quiz.id)} block>
// // // //                             Submit Access Code
// // // //                           </Button>
// // // //                         </div>
// // // //                       ) : (
// // // //                         <Button type="primary" onClick={() => navigate(`/take-quiz/${quiz.id}`)} style={{ marginTop: '10px' }} block>
// // // //                           Take Quiz
// // // //                         </Button>
// // // //                       )}
// // // //                     </Card>
// // // //                   </List.Item>
// // // //                 )}
// // // //               />

// // // //               <Title level={2} style={{ marginTop: '20px' }}>Your Quiz Results</Title>
// // // //               <List
// // // //                 grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
// // // //                 dataSource={quizResults}
// // // //                 renderItem={result => (
// // // //                   <List.Item>
// // // //                     <Card
// // // //                       hoverable
// // // //                       actions={[
// // // //                         <Button type="link" onClick={() => { setSelectedResult(result); setIsResultModalVisible(true); }}>
// // // //                           <EyeOutlined /> See Detailed Results
// // // //                         </Button>
// // // //                       ]}
// // // //                     >
// // // //                       <Meta
// // // //                         title={result.quizTitle}
// // // //                         description={
// // // //                           <>
// // // //                             <Text>Attempted on: {result.attemptDate}</Text>
// // // //                             <Progress
// // // //                               percent={Math.round((result.score / result.totalQuestions) * 100)}
// // // //                               format={() => `${result.score}/${result.totalQuestions}`}
// // // //                             />
// // // //                           </>
// // // //                         }
// // // //                       />
// // // //                     </Card>
// // // //                   </List.Item>
// // // //                 )}
// // // //               />

// // // //               {error && <Text type="danger" style={{ marginTop: '20px' }}>{error}</Text>}

// // // //               <Modal
// // // //                 title={`Detailed Quiz Results: ${selectedResult?.quizTitle}`}
// // // //                 visible={isResultModalVisible}
// // // //                 onCancel={() => setIsResultModalVisible(false)}
// // // //                 footer={null}
// // // //                 width={800}
// // // //               >
// // // //                 {selectedResult && (
// // // //                   <div>
// // // //                     <Row gutter={[16, 16]}>
// // // //                       <Col span={12}>
// // // //                         <Statistic title="Score" value={selectedResult.score} suffix={`/ ${selectedResult.totalQuestions}`} />
// // // //                       </Col>
// // // //                       <Col span={12}>
// // // //                         <Statistic title="Percentage" value={Math.round((selectedResult.score / selectedResult.totalQuestions) * 100)} suffix="%" />
// // // //                       </Col>
// // // //                     </Row>
// // // //                     <Text type="secondary" style={{ display: 'block', marginBottom: '20px' }}>Attempted on: {selectedResult.attemptDate}</Text>
// // // //                     <List
// // // //                       itemLayout="vertical"
// // // //                       dataSource={selectedResult.answers}
// // // //                       renderItem={(answer, index) => (
// // // //                         <List.Item>
// // // //                           <Card
// // // //                             style={{
// // // //                               marginBottom: '10px',
// // // //                               backgroundColor: answer.isCorrect ? '#f6ffed' : '#fff1f0',
// // // //                               borderColor: answer.isCorrect ? '#b7eb8f' : '#ffa39e'
// // // //                             }}
// // // //                           >
// // // //                             <Title level={5}>{`Question ${index + 1}: ${answer.question}`}</Title>
// // // //                             <Text style={{ display: 'block' }}>Your answer: {answer.userAnswer}</Text>
// // // //                             {!answer.isCorrect && <Text type="success" style={{ display: 'block' }}>Correct answer: {answer.correctAnswer}</Text>}
// // // //                           </Card>
// // // //                         </List.Item>
// // // //                       )}
// // // //                     />
// // // //                   </div>
// // // //                 )}
// // // //               </Modal>
// // // //             </Spin>
// // // //           </Content>
// // // //         </Layout>
// // // //       </Layout>
// // // //     </Layout>
// // // //   );
// // // // }

// // // // import React, { useState, useEffect } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { auth, db } from '../../firebase/firebase';
// // // // import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
// // // // import { Layout, Menu, Button, Card, Avatar, Input, Modal, List, Typography, message, Row, Col, Spin, Statistic, Progress } from 'antd';
// // // // import { UserOutlined, LogoutOutlined, ClockCircleOutlined, EyeOutlined, BookOutlined, TrophyOutlined } from '@ant-design/icons';

// // // // const { Header, Content, Sider } = Layout;
// // // // const { Meta } = Card;
// // // // const { Title, Text, Paragraph } = Typography;

// // // // export default function StudentDashboard() {
// // // //   const [quizzes, setQuizzes] = useState([]);
// // // //   const [quizResults, setQuizResults] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [accessCode, setAccessCode] = useState('');
// // // //   const [error, setError] = useState('');
// // // //   const [studentName, setStudentName] = useState('');
// // // //   const [selectedResult, setSelectedResult] = useState(null);
// // // //   const [isResultModalVisible, setIsResultModalVisible] = useState(false);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     fetchQuizzes();
// // // //     fetchQuizResults();
// // // //     fetchStudentName();
// // // //   }, []);

// // // //   const fetchQuizzes = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const userDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
// // // //       const userData = userDoc.docs[0].data();
// // // //       const teacherEmail = userData.teacherEmail;

// // // //       const teacherDoc = await getDocs(query(collection(db, 'users'), where('email', '==', teacherEmail)));
// // // //       const teacherId = teacherDoc.docs[0].id;

// // // //       const q = query(collection(db, 'quizzes'), where('teacherId', '==', teacherId), where('locked', '==', false));
// // // //       const querySnapshot = await getDocs(q);
// // // //       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // //       setQuizzes(quizzesData);
// // // //     } catch (error) {
// // // //       console.error("Error fetching quizzes:", error);
// // // //       setError("Failed to load quizzes. Please try again later.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const fetchQuizResults = async () => {
// // // //     try {
// // // //       const q = query(collection(db, 'quizResults'), where('studentId', '==', auth.currentUser.uid));
// // // //       const querySnapshot = await getDocs(q);
// // // //       const resultsData = await Promise.all(querySnapshot.docs.map(async (doc) => {
// // // //         const resultData = doc.data();
// // // //         const quizDoc = await getDoc(doc(db, 'quizzes', resultData.quizId));
// // // //         const quizData = quizDoc.data();
// // // //         return {
// // // //           id: doc.id,
// // // //           quizId: resultData.quizId,
// // // //           quizTitle: quizData?.title || 'Unknown Quiz',
// // // //           score: resultData.score,
// // // //           totalQuestions: resultData.totalQuestions,
// // // //           answers: resultData.answers,
// // // //           attemptDate: resultData.attemptDate.toDate().toLocaleString(),
// // // //         };
// // // //       }));
// // // //       setQuizResults(resultsData);
// // // //     } catch (error) {
// // // //       console.error("Error fetching quiz results:", error);
// // // //       setError("Failed to load quiz results. Please try again later.");
// // // //     }
// // // //   };

// // // //   const fetchStudentName = async () => {
// // // //     const studentDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
// // // //     if (!studentDoc.empty) {
// // // //       setStudentName(studentDoc.docs[0].data().name);
// // // //     }
// // // //   };

// // // //   const handleAccessCodeSubmit = (quizId) => {
// // // //     const quiz = quizzes.find(q => q.id === quizId);
// // // //     if (quiz.accessCode === accessCode) {
// // // //       setError('');
// // // //       navigate(`/take-quiz/${quizId}`);
// // // //     } else {
// // // //       message.error('Invalid access code');
// // // //     }
// // // //   };

// // // //   const isQuizAttempted = (quizId) => {
// // // //     return quizResults.some(result => result.quizId === quizId);
// // // //   };

// // // //   const handleLogout = () => {
// // // //     auth.signOut();
// // // //     navigate('/login');
// // // //   };

// // // //   return (
// // // //     <Layout className="min-h-screen">
// // // //       {/* <Header className="px-4 bg-gradient-to-r from-green-500 to-blue-500"> */}
// // // //       <Header className="px-4 bg-gradient-to-r  text-white bg-indigo-600 hover:bg-indigo-700 ">
// // // //         <Row justify="space-between" align="middle">
// // // //           <Col>
// // // //             <div className="flex items-center">
// // // //               <Avatar icon={<UserOutlined />} className="mr-2 bg-white text-green-500" />
// // // //               <Title level={4} className="m-0 text-white">Welcome, {studentName}</Title>
// // // //             </div>
// // // //           </Col>
// // // //           <Col>
// // // //             <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout} className="bg-white text-black border-white hover:bg-green-100 hover:border-green-100">
// // // //               Logout
// // // //             </Button>
// // // //           </Col>
// // // //         </Row>
// // // //       </Header>
// // // //       <Layout>
// // // //         <Sider width={200} className="bg-gray-100" breakpoint="lg" collapsedWidth="0">
// // // //           <Menu
// // // //             mode="inline"
// // // //             defaultSelectedKeys={['1']}
// // // //             className="h-full border-r-0"
// // // //           >
// // // //             <Menu.Item key="1" icon={<BookOutlined />}>Available Quizzes</Menu.Item>
// // // //             <Menu.Item key="2" icon={<TrophyOutlined />}>Quiz Results</Menu.Item>
// // // //           </Menu>
// // // //         </Sider>
// // // //         <Layout className="p-6">
// // // //           <Content
// // // //             className="bg-white rounded-lg shadow-md"
// // // //           >
// // // //             <Spin spinning={loading}>
// // // //               <div className="p-6">
// // // //                 <Row gutter={[16, 16]} className="mb-6">
// // // //                   <Col xs={24} sm={12} md={8} lg={6}>
// // // //                     <Statistic title="Available Quizzes" value={quizzes.length} className="bg-blue-50 p-4 rounded-lg" />
// // // //                   </Col>
// // // //                   <Col xs={24} sm={12} md={8} lg={6}>
// // // //                     <Statistic title="Completed Quizzes" value={quizResults.length} className="bg-green-50 p-4 rounded-lg" />
// // // //                   </Col>
// // // //                 </Row>

// // // //                 <Title level={2} className="mb-4">Available Quizzes</Title>
// // // //                 <List
// // // //                   grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
// // // //                   dataSource={quizzes}
// // // //                   renderItem={quiz => (
// // // //                     <List.Item>
// // // //                       <Card
// // // //                         hoverable
// // // //                         className="shadow-sm transition-all duration-300 hover:shadow-lg"
// // // //                         title={<span className="text-lg font-semibold">{quiz.title}</span>}
// // // //                         extra={quiz.timeLimit && <Text className="text-blue-500"><ClockCircleOutlined /> {quiz.timeLimit} min</Text>}
// // // //                       >
// // // //                         <Meta
// // // //                           description={
// // // //                             <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">{quiz.description}</Paragraph>
// // // //                           }
// // // //                         />
// // // //                         {isQuizAttempted(quiz.id) ? (
// // // //                           <Text type="warning" className="block mt-4">You have already attempted this quiz</Text>
// // // //                         ) : quiz.accessCode ? (
// // // //                           <div className="mt-4">
// // // //                             <Input
// // // //                               placeholder="Enter access code"
// // // //                               value={accessCode}
// // // //                               onChange={(e) => setAccessCode(e.target.value)}
// // // //                               className="mb-2"
// // // //                             />
// // // //                             <Button type="primary" onClick={() => handleAccessCodeSubmit(quiz.id)} className="w-full text-white bg-indigo-600 hover:bg-indigo-700 ">
// // // //                               Submit Access Code
// // // //                             </Button>
// // // //                           </div>
// // // //                         ) : (
// // // //                           <Button type="primary" onClick={() => navigate(`/take-quiz/${quiz.id}`)} className="w-full mt-4  text-white bg-indigo-600 hover:bg-indigo-700 ">
// // // //                             Take Quiz
// // // //                           </Button>
// // // //                         )}
// // // //                       </Card>
// // // //                     </List.Item>
// // // //                   )}
// // // //                 />

// // // //                 <Title level={2} className="mt-8 mb-4">Your Quiz Results</Title>
// // // //                 <List
// // // //                   grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
// // // //                   dataSource={quizResults}
// // // //                   renderItem={result => (
// // // //                     <List.Item>
// // // //                       <Card
// // // //                         hoverable
// // // //                         className="shadow-sm transition-all duration-300 hover:shadow-lg"
// // // //                         actions={[
// // // //                           <Button type="link" onClick={() => { setSelectedResult(result); setIsResultModalVisible(true); }}>
// // // //                             <EyeOutlined /> See Detailed Results
// // // //                           </Button>
// // // //                         ]}
// // // //                       >
// // // //                         <Meta
// // // //                           title={<span className="text-lg font-semibold">{result.quizTitle}</span>}
// // // //                           description={
// // // //                             <>
// // // //                               <Text className="block text-gray-600 mb-2">Attempted on: {result.attemptDate}</Text>
// // // //                               <Progress
// // // //                                 percent={Math.round((result.score / result.totalQuestions) * 100)}
// // // //                                 format={() => `${result.score}/${result.totalQuestions}`}
// // // //                                 strokeColor={{
// // // //                                   '0%': '#108ee9',
// // // //                                   '100%': '#87d068',
// // // //                                 }}
// // // //                               />
// // // //                             </>
// // // //                           }
// // // //                         />
// // // //                       </Card>
// // // //                     </List.Item>
// // // //                   )}
// // // //                 />

// // // //                 {error && <Text type="danger" className="mt-4 block">{error}</Text>}

// // // //                 <Modal
// // // //                   title={`Detailed Quiz Results: ${selectedResult?.quizTitle}`}
// // // //                   visible={isResultModalVisible}
// // // //                   onCancel={() => setIsResultModalVisible(false)}
// // // //                   footer={null}
// // // //                   width={800}
// // // //                   className="rounded-lg overflow-hidden"
// // // //                 >
// // // //                   {selectedResult && (
// // // //                     <div>
// // // //                       <Row gutter={[16, 16]} className="mb-6">
// // // //                         <Col span={12}>
// // // //                           <Statistic title="Score" value={selectedResult.score} suffix={`/ ${selectedResult.totalQuestions}`} className="bg-blue-50 p-4 rounded-lg" />
// // // //                         </Col>
// // // //                         <Col span={12}>
// // // //                           <Statistic title="Percentage" value={Math.round((selectedResult.score / selectedResult.totalQuestions) * 100)} suffix="%" className="bg-green-50 p-4 rounded-lg" />
// // // //                         </Col>
// // // //                       </Row>
// // // //                       <Text type="secondary" className="block mb-4">Attempted on: {selectedResult.attemptDate}</Text>
// // // //                       <List
// // // //                         itemLayout="vertical"
// // // //                         dataSource={selectedResult.answers}
// // // //                         renderItem={(answer, index) => (
// // // //                           <List.Item>
// // // //                             <Card
// // // //                               className={`mb-4 ${answer.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
// // // //                             >
// // // //                               <Title level={5} className="mb-2">{`Question ${index + 1}: ${answer.question}`}</Title>
// // // //                               <Text className="block mb-1">Your answer: {answer.userAnswer}</Text>
// // // //                               {!answer.isCorrect && <Text type="success" className="block">Correct answer: {answer.correctAnswer}</Text>}
// // // //                             </Card>
// // // //                           </List.Item>
// // // //                         )}
// // // //                       />
// // // //                     </div>
// // // //                   )}
// // // //                 </Modal>
// // // //               </div>
// // // //             </Spin>
// // // //           </Content>
// // // //         </Layout>
// // // //       </Layout>
// // // //     </Layout>
// // // //   );
// // // // }

// // // // import React, { useState, useEffect } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { auth, db } from '../../firebase/firebase';
// // // // import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
// // // // import { Layout, Menu, Button, Card, Avatar, Input, Modal, List, Typography, message, Row, Col, Spin, Statistic, Progress, Tag } from 'antd';
// // // // import { UserOutlined, LogoutOutlined, ClockCircleOutlined, EyeOutlined, BookOutlined, TrophyOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

// // // // const { Header, Content, Sider } = Layout;
// // // // const { Meta } = Card;
// // // // const { Title, Text, Paragraph } = Typography;

// // // // export default function StudentDashboard() {
// // // //   const [quizzes, setQuizzes] = useState([]);
// // // //   const [quizResults, setQuizResults] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [accessCode, setAccessCode] = useState('');
// // // //   const [error, setError] = useState('');
// // // //   const [studentName, setStudentName] = useState('');
// // // //   const [selectedResult, setSelectedResult] = useState(null);
// // // //   const [isResultModalVisible, setIsResultModalVisible] = useState(false);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     fetchQuizzes();
// // // //     fetchQuizResults();
// // // //     fetchStudentName();
// // // //   }, []);

// // // //   const fetchQuizzes = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const userDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
// // // //       const userData = userDoc.docs[0].data();
// // // //       const teacherEmail = userData.teacherEmail;

// // // //       const teacherDoc = await getDocs(query(collection(db, 'users'), where('email', '==', teacherEmail)));
// // // //       const teacherId = teacherDoc.docs[0].id;

// // // //       const q = query(collection(db, 'quizzes'), where('teacherId', '==', teacherId), where('locked', '==', false));
// // // //       const querySnapshot = await getDocs(q);
// // // //       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // //       setQuizzes(quizzesData);
// // // //     } catch (error) {
// // // //       console.error("Error fetching quizzes:", error);
// // // //       setError("Failed to load quizzes. Please try again later.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const fetchQuizResults = async () => {
// // // //     try {
// // // //       const q = query(collection(db, 'quizResults'), where('studentId', '==', auth.currentUser.uid));
// // // //       const querySnapshot = await getDocs(q);
// // // //       const resultsData = await Promise.all(querySnapshot.docs.map(async (doc) => {
// // // //         const resultData = doc.data();
// // // //         const quizDoc = await getDoc(doc(db, 'quizzes', resultData.quizId));
// // // //         const quizData = quizDoc.data();
// // // //         return {
// // // //           id: doc.id,
// // // //           quizId: resultData.quizId,
// // // //           quizTitle: quizData?.title || 'Unknown Quiz',
// // // //           score: resultData.score,
// // // //           totalQuestions: resultData.totalQuestions,
// // // //           answers: resultData.answers,
// // // //           attemptDate: resultData.attemptDate.toDate().toLocaleString(),
// // // //         };
// // // //       }));
// // // //       setQuizResults(resultsData);
// // // //     } catch (error) {
// // // //       console.error("Error fetching quiz results:", error);
// // // //       setError("Failed to load quiz results. Please try again later.");
// // // //     }
// // // //   };

// // // //   const fetchStudentName = async () => {
// // // //     const studentDoc = await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
// // // //     if (!studentDoc.empty) {
// // // //       setStudentName(studentDoc.docs[0].data().name);
// // // //     }
// // // //   };

// // // //   const handleAccessCodeSubmit = (quizId) => {
// // // //     const quiz = quizzes.find(q => q.id === quizId);
// // // //     if (quiz.accessCode === accessCode) {
// // // //       setError('');
// // // //       navigate(`/take-quiz/${quizId}`);
// // // //     } else {
// // // //       message.error('Invalid access code');
// // // //     }
// // // //   };

// // // //   const isQuizAttempted = (quizId) => {
// // // //     return quizResults.some(result => result.quizId === quizId);
// // // //   };

// // // //   const getQuizResult = (quizId) => {
// // // //     return quizResults.find(result => result.quizId === quizId);
// // // //   };

// // // //   const handleLogout = () => {
// // // //     auth.signOut();
// // // //     navigate('/login');
// // // //   };

// // // //   return (
// // // //     <Layout className="min-h-screen">
// // // //       <Header className="px-4 bg-gradient-to-r text-white bg-indigo-600 hover:bg-indigo-700">
// // // //         <Row justify="space-between" align="middle">
// // // //           <Col>
// // // //             <div className="flex items-center">
// // // //               <Avatar icon={<UserOutlined />} className="mr-2 bg-white text-indigo-600" />
// // // //               <Title level={4} className="m-0 text-white">Welcome, {studentName}</Title>
// // // //             </div>
// // // //           </Col>
// // // //           <Col>
// // // //             <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout} className="bg-white text-indigo-600 border-white hover:bg-indigo-100 hover:border-indigo-100">
// // // //               Logout
// // // //             </Button>
// // // //           </Col>
// // // //         </Row>
// // // //       </Header>
// // // //       <Layout>
// // // //         <Sider width={200} className="bg-gray-100" breakpoint="lg" collapsedWidth="0">
// // // //           <Menu
// // // //             mode="inline"
// // // //             defaultSelectedKeys={['1']}
// // // //             className="h-full border-r-0"
// // // //           >
// // // //             <Menu.Item key="1" icon={<BookOutlined />}>Available Quizzes</Menu.Item>
// // // //             <Menu.Item key="2" icon={<TrophyOutlined />}>Quiz Results</Menu.Item>
// // // //           </Menu>
// // // //         </Sider>
// // // //         <Layout className="p-6">
// // // //           <Content
// // // //             className="bg-white rounded-lg shadow-md"
// // // //           >
// // // //             <Spin spinning={loading}>
// // // //               <div className="p-6">
// // // //                 <Row gutter={[16, 16]} className="mb-6">
// // // //                   <Col xs={24} sm={12} md={8} lg={6}>
// // // //                     <Statistic title="Available Quizzes" value={quizzes.length} className="bg-blue-50 p-4 rounded-lg" />
// // // //                   </Col>
// // // //                   <Col xs={24} sm={12} md={8} lg={6}>
// // // //                     <Statistic title="Completed Quizzes" value={quizResults.length} className="bg-green-50 p-4 rounded-lg" />
// // // //                   </Col>
// // // //                 </Row>

// // // //                 <Title level={2} className="mb-4">Available Quizzes</Title>
// // // //                 <List
// // // //                   grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
// // // //                   dataSource={quizzes}
// // // //                   renderItem={quiz => (
// // // //                     <List.Item>
// // // //                       <Card
// // // //                         hoverable
// // // //                         className="shadow-sm transition-all duration-300 hover:shadow-lg"
// // // //                         title={<span className="text-lg font-semibold">{quiz.title}</span>}
// // // //                         extra={quiz.timeLimit && <Text className="text-blue-500"><ClockCircleOutlined /> {quiz.timeLimit} min</Text>}
// // // //                       >
// // // //                         <Meta
// // // //                           description={
// // // //                             <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">{quiz.description}</Paragraph>
// // // //                           }
// // // //                         />
// // // //                         {isQuizAttempted(quiz.id) ? (
// // // //                           <div className="mt-4">
// // // //                             <Tag color="green" icon={<CheckCircleOutlined />}>Completed</Tag>
// // // //                             <Button
// // // //                               type="primary"
// // // //                               onClick={() => { setSelectedResult(getQuizResult(quiz.id)); setIsResultModalVisible(true); }}
// // // //                               className="w-full mt-2 text-white bg-indigo-600 hover:bg-indigo-700"
// // // //                             >
// // // //                               View Results
// // // //                             </Button>
// // // //                           </div>
// // // //                         ) : quiz.accessCode ? (
// // // //                           <div className="mt-4">
// // // //                             <Input
// // // //                               placeholder="Enter access code"
// // // //                               value={accessCode}
// // // //                               onChange={(e) => setAccessCode(e.target.value)}
// // // //                               className="mb-2"
// // // //                             />
// // // //                             <Button type="primary" onClick={() => handleAccessCodeSubmit(quiz.id)} className="w-full text-white bg-indigo-600 hover:bg-indigo-700">
// // // //                               Submit Access Code
// // // //                             </Button>
// // // //                           </div>
// // // //                         ) : (
// // // //                           <Button type="primary" onClick={() => navigate(`/take-quiz/${quiz.id}`)} className="w-full mt-4 text-white bg-indigo-600 hover:bg-indigo-700">
// // // //                             Take Quiz
// // // //                           </Button>
// // // //                         )}
// // // //                       </Card>
// // // //                     </List.Item>
// // // //                   )}
// // // //                 />

// // // //                 <Title level={2} className="mt-8 mb-4">Your Quiz Results</Title>
// // // //                 <List
// // // //                   grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
// // // //                   dataSource={quizResults}
// // // //                   renderItem={result => (
// // // //                     <List.Item>
// // // //                       <Card
// // // //                         hoverable
// // // //                         className="shadow-sm transition-all duration-300 hover:shadow-lg"
// // // //                         actions={[
// // // //                           <Button type="link" onClick={() => { setSelectedResult(result); setIsResultModalVisible(true); }}>
// // // //                             <EyeOutlined /> See Detailed Results
// // // //                           </Button>
// // // //                         ]}
// // // //                       >
// // // //                         <Meta
// // // //                           title={<span className="text-lg font-semibold">{result.quizTitle}</span>}
// // // //                           description={
// // // //                             <>
// // // //                               <Text className="block text-gray-600 mb-2">Attempted on: {result.attemptDate}</Text>
// // // //                               <Progress
// // // //                                 percent={Math.round((result.score / result.totalQuestions) * 100)}
// // // //                                 format={() => `${result.score}/${result.totalQuestions}`}
// // // //                                 strokeColor={{
// // // //                                   '0%': '#108ee9',
// // // //                                   '100%': '#87d068',
// // // //                                 }}
// // // //                               />
// // // //                             </>
// // // //                           }
// // // //                         />
// // // //                       </Card>
// // // //                     </List.Item>
// // // //                   )}
// // // //                 />

// // // //                 {error && <Text type="danger" className="mt-4 block">{error}</Text>}

// // // //                 <Modal
// // // //                   title={`Detailed Quiz Results: ${selectedResult?.quizTitle}`}
// // // //                   visible={isResultModalVisible}
// // // //                   onCancel={() => setIsResultModalVisible(false)}
// // // //                   footer={null}
// // // //                   width={800}
// // // //                   className="rounded-lg overflow-hidden"
// // // //                 >
// // // //                   {selectedResult && (
// // // //                     <div>
// // // //                       <Row gutter={[16, 16]} className="mb-6">
// // // //                         <Col span={12}>
// // // //                           <Statistic title="Score" value={selectedResult.score} suffix={`/ ${selectedResult.totalQuestions}`} className="bg-blue-50 p-4 rounded-lg" />
// // // //                         </Col>
// // // //                         <Col span={12}>
// // // //                           <Statistic title="Percentage" value={Math.round((selectedResult.score / selectedResult.totalQuestions) * 100)} suffix="%" className="bg-green-50 p-4 rounded-lg" />
// // // //                         </Col>
// // // //                       </Row>
// // // //                       <Text type="secondary" className="block mb-4">Attempted on: {selectedResult.attemptDate}</Text>
// // // //                       <List
// // // //                         itemLayout="vertical"
// // // //                         dataSource={selectedResult.answers}
// // // //                         renderItem={(answer, index) => (
// // // //                           <List.Item>
// // // //                             <Card
// // // //                               className={`mb-4 ${answer.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
// // // //                             >
// // // //                               <Title level={5} className="mb-2">
// // // //                                 {answer.isCorrect ? (
// // // //                                   <CheckCircleOutlined className="text-green-500 mr-2" />
// // // //                                 ) : (
// // // //                                   <CloseCircleOutlined className="text-red-500 mr-2" />
// // // //                                 )}
// // // //                                 {`Question ${index + 1}: ${answer.question}`}
// // // //                               </Title>
// // // //                               <Text className="block mb-1">Your answer: {answer.userAnswer}</Text>
// // // //                               {!answer.isCorrect && <Text type="success" className="block">Correct answer: {answer.correctAnswer}</Text>}
// // // //                             </Card>
// // // //                           </List.Item>
// // // //                         )}
// // // //                       />
// // // //                     </div>
// // // //                   )}
// // // //                 </Modal>
// // // //               </div>
// // // //             </Spin>
// // // //           </Content>
// // // //         </Layout>
// // // //       </Layout>
// // // //     </Layout>
// // // //   );
// // // // }

// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { auth, db } from "../../firebase/firebase";
// // // import {
// // //   collection,
// // //   query,
// // //   where,
// // //   getDocs,
// // //   doc,
// // //   getDoc,
// // // } from "firebase/firestore";
// // // import {
// // //   Layout,
// // //   Menu,
// // //   Button,
// // //   Card,
// // //   Avatar,
// // //   Input,
// // //   Modal,
// // //   List,
// // //   Typography,
// // //   message,
// // //   Row,
// // //   Col,
// // //   Spin,
// // //   Statistic,
// // //   Progress,
// // //   Tag,
// // //   Tabs,
// // // } from "antd";
// // // import {
// // //   UserOutlined,
// // //   LogoutOutlined,
// // //   ClockCircleOutlined,
// // //   EyeOutlined,
// // //   BookOutlined,
// // //   TrophyOutlined,
// // //   CheckCircleOutlined,
// // //   CloseCircleOutlined,
// // // } from "@ant-design/icons";

// // // const { Header, Content } = Layout;
// // // const { Meta } = Card;
// // // const { Title, Text, Paragraph } = Typography;
// // // const { TabPane } = Tabs;

// // // export default function StudentDashboard() {
// // //   const [quizzes, setQuizzes] = useState([]);
// // //   const [quizResults, setQuizResults] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [accessCode, setAccessCode] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [studentName, setStudentName] = useState("");
// // //   const [studentPassword, setStudentPassword] = useState("");
// // //   const [studentEmail, setStudentEmail] = useState("");
// // //   const [studentAvatar, setStudentAvatar] = useState("");
// // //   const [selectedResult, setSelectedResult] = useState(null);
// // //   const [isResultModalVisible, setIsResultModalVisible] = useState(false);
// // //   const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     fetchQuizzes();
// // //     fetchQuizResults();
// // //     fetchStudentInfo();
// // //   }, []);

// // //   const fetchQuizzes = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const userDoc = await getDocs(
// // //         query(
// // //           collection(db, "users"),
// // //           where("email", "==", auth.currentUser.email)
// // //         )
// // //       );
// // //       const userData = userDoc.docs[0].data();
// // //       const teacherEmail = userData.teacherEmail;

// // //       const teacherDoc = await getDocs(
// // //         query(collection(db, "users"), where("email", "==", teacherEmail))
// // //       );
// // //       const teacherId = teacherDoc.docs[0].id;

// // //       const q = query(
// // //         collection(db, "quizzes"),
// // //         where("teacherId", "==", teacherId),
// // //         where("locked", "==", false)
// // //       );
// // //       const querySnapshot = await getDocs(q);
// // //       const quizzesData = querySnapshot.docs.map((doc) => ({
// // //         id: doc.id,
// // //         ...doc.data(),
// // //       }));
// // //       setQuizzes(quizzesData);
// // //     } catch (error) {
// // //       console.error("Error fetching quizzes:", error);
// // //       setError("Failed to load quizzes. Please try again later.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const fetchQuizResults = async () => {
// // //     try {
// // //       const q = query(
// // //         collection(db, "quizResults"),
// // //         where("studentId", "==", auth.currentUser.uid)
// // //       );
// // //       const querySnapshot = await getDocs(q);
// // //       const resultsData = await Promise.all(
// // //         querySnapshot.docs.map(async (doc) => {
// // //           const resultData = doc.data();
// // //           const quizDoc = await getDoc(doc(db, "quizzes", resultData.quizId));
// // //           const quizData = quizDoc.data();
// // //           return {
// // //             id: doc.id,
// // //             quizId: resultData.quizId,
// // //             quizTitle: quizData?.title || "Unknown Quiz",
// // //             score: resultData.score,
// // //             totalQuestions: resultData.totalQuestions,
// // //             answers: resultData.answers,
// // //             attemptDate: resultData.attemptDate.toDate().toLocaleString(),
// // //           };
// // //         })
// // //       );
// // //       setQuizResults(resultsData);
// // //     } catch (error) {
// // //       console.error("Error fetching quiz results:", error);
// // //       setError("Failed to load quiz results. Please try again later.");
// // //     }
// // //   };

// // //   const fetchStudentInfo = async () => {
// // //     const studentDoc = await getDocs(
// // //       query(
// // //         collection(db, "users"),
// // //         where("email", "==", auth.currentUser.email)
// // //       )
// // //     );
// // //     if (!studentDoc.empty) {
// // //       const studentData = studentDoc.docs[0].data();
// // //       setStudentName(studentData.name);
// // //       setStudentEmail(studentData.email);
// // //       setStudentPassword(studentData.password);
// // //       setStudentAvatar(studentData.name.charAt(0)); // First letter of student's name
// // //     }
// // //   };

// // //   const handleAccessCodeSubmit = (quizId) => {
// // //     const quiz = quizzes.find((q) => q.id === quizId);
// // //     if (quiz.accessCode === accessCode) {
// // //       setError("");
// // //       navigate(`/take-quiz/${quizId}`);
// // //     } else {
// // //       message.error("Invalid access code");
// // //     }
// // //   };

// // //   const isQuizAttempted = (quizId) => {
// // //     return quizResults.some((result) => result.quizId === quizId);
// // //   };

// // //   const getQuizResult = (quizId) => {
// // //     return quizResults.find((result) => result.quizId === quizId);
// // //   };

// // //   const handleLogout = () => {
// // //     auth.signOut();
// // //     navigate("/login");
// // //   };

// // //   const handleProfileClick = () => {
// // //     setIsProfileModalVisible(true);
// // //   };

// // //   return (
// // //     <Layout className="min-h-screen">
// // //       <Header className="px-4 bg-gradient-to-r text-white bg-indigo-600 hover:bg-indigo-700">
// // //         <Row justify="space-between" align="middle">
// // //           <Col>
// // //             <div className="flex items-center">
// // //               {/* Avatar with first letter of student's name */}
// // //               <Avatar
// // //                 className="mr-2 bg-white text-blue-600 cursor-pointer"
// // //                 onClick={handleProfileClick}
// // //               >
// // //                 {studentAvatar}{" "}
// // //                 {/* Assuming studentAvatar is the initial or image */}
// // //               </Avatar>

// // //               {/* Student Name Button */}
// // //               <Button
// // //                 type="link"
// // //                 onClick={handleProfileClick}
// // //                 className="text-white cursor-pointer"
// // //               >
// // //                 {studentName} {/* Display student's name */}
// // //               </Button>
// // //             </div>
// // //           </Col>
// // //           {/* <Col>
// // //             <div className="flex items-center">
// // //               <Avatar className="mr-2 bg-white text-indigo-600" onClick={handleProfileClick}>
// // //                 {studentAvatar}
// // //               </Avatar>
// // //               <Title level={4} onClick={handleProfileClick} className="m-0 text-white">{studentName}</Title>
// // //             </div>
// // //           </Col> */}
// // //           <Col>
// // //             <Button
// // //               type="primary"
// // //               icon={<LogoutOutlined />}
// // //               onClick={handleLogout}
// // //               className="bg-white text-indigo-600 border-white hover:bg-indigo-100 hover:border-indigo-100"
// // //             ></Button>
// // //           </Col>
// // //         </Row>
// // //       </Header>

// // //       <Layout>
// // //         <Content className="p-6 bg-white rounded-lg shadow-md">
// // //           <Spin spinning={loading}>
// // //             <Tabs defaultActiveKey="1" centered>
// // //               {/* Quizzes Tab */}
// // //               <TabPane tab="Available Quizzes" key="1">
// // //                 <Row gutter={[16, 16]} className="mb-6">
// // //                   <Col xs={24} sm={12} md={8} lg={6}>
// // //                     <Statistic
// // //                       title="Available Quizzes"
// // //                       value={quizzes.length}
// // //                       className="bg-blue-50 p-4 rounded-lg"
// // //                     />
// // //                   </Col>
// // //                   <Col xs={24} sm={12} md={8} lg={6}>
// // //                     <Statistic
// // //                       title="Completed Quizzes"
// // //                       value={quizResults.length}
// // //                       className="bg-green-50 p-4 rounded-lg"
// // //                     />
// // //                   </Col>
// // //                 </Row>

// // //                 <List
// // //                   grid={{
// // //                     gutter: 16,
// // //                     xs: 1,
// // //                     sm: 2,
// // //                     md: 2,
// // //                     lg: 3,
// // //                     xl: 3,
// // //                     xxl: 4,
// // //                   }}
// // //                   dataSource={quizzes}
// // //                   renderItem={(quiz) => (
// // //                     <List.Item>
// // //                       <Card
// // //                         hoverable
// // //                         className="shadow-sm transition-all duration-300 hover:shadow-lg"
// // //                         title={
// // //                           <span className="text-lg font-semibold">
// // //                             {quiz.title}
// // //                           </span>
// // //                         }
// // //                         extra={
// // //                           quiz.timeLimit && (
// // //                             <Text className="text-blue-500">
// // //                               <ClockCircleOutlined /> {quiz.timeLimit} min
// // //                             </Text>
// // //                           )
// // //                         }
// // //                       >
// // //                         <Meta
// // //                           description={
// // //                             <Paragraph
// // //                               ellipsis={{ rows: 2 }}
// // //                               className="text-gray-600"
// // //                             >
// // //                               {quiz.description}
// // //                             </Paragraph>
// // //                           }
// // //                         />
// // //                         {isQuizAttempted(quiz.id) ? (
// // //                           <div className="mt-4">
// // //                             <Tag color="green" icon={<CheckCircleOutlined />}>
// // //                               Completed
// // //                             </Tag>
// // //                             <Button
// // //                               type="primary"
// // //                               onClick={() => {
// // //                                 setSelectedResult(getQuizResult(quiz.id));
// // //                                 setIsResultModalVisible(true);
// // //                               }}
// // //                               className="w-full mt-2 text-white bg-indigo-600 hover:bg-indigo-700"
// // //                             >
// // //                               View Results
// // //                             </Button>
// // //                           </div>
// // //                         ) : quiz.accessCode ? (
// // //                           <div className="mt-4">
// // //                             <Input
// // //                               placeholder="Enter access code"
// // //                               value={accessCode}
// // //                               onChange={(e) => setAccessCode(e.target.value)}
// // //                               className="mb-2"
// // //                             />
// // //                             <Button
// // //                               type="primary"
// // //                               onClick={() => handleAccessCodeSubmit(quiz.id)}
// // //                               className="w-full text-white bg-indigo-600 hover:bg-indigo-700"
// // //                             >
// // //                               Submit Access Code
// // //                             </Button>
// // //                           </div>
// // //                         ) : (
// // //                           <Button
// // //                             type="primary"
// // //                             onClick={() => navigate(`/take-quiz/${quiz.id}`)}
// // //                             className="w-full mt-4 text-white bg-indigo-600 hover:bg-indigo-700"
// // //                           >
// // //                             Take Quiz
// // //                           </Button>
// // //                         )}
// // //                       </Card>
// // //                     </List.Item>
// // //                   )}
// // //                 />
// // //               </TabPane>

// // //               {/* Results Tab */}
// // //               <TabPane tab="Your Results" key="2">
// // //                 <List
// // //                   grid={{
// // //                     gutter: 16,
// // //                     xs: 1,
// // //                     sm: 2,
// // //                     md: 2,
// // //                     lg: 3,
// // //                     xl: 3,
// // //                     xxl: 4,
// // //                   }}
// // //                   dataSource={quizResults}
// // //                   renderItem={(result) => (
// // //                     <List.Item>
// // //                       <Card
// // //                         hoverable
// // //                         className="shadow-sm transition-all duration-300 hover:shadow-lg"
// // //                         actions={[
// // //                           <Button
// // //                             type="link"
// // //                             onClick={() => {
// // //                               setSelectedResult(result);
// // //                               setIsResultModalVisible(true);
// // //                             }}
// // //                           >
// // //                             <EyeOutlined /> See Detailed Results
// // //                           </Button>,
// // //                         ]}
// // //                       >
// // //                         <Meta
// // //                           title={
// // //                             <span className="text-lg font-semibold">
// // //                               {result.quizTitle}
// // //                             </span>
// // //                           }
// // //                           description={
// // //                             <>
// // //                               <Text className="block text-gray-600 mb-2">
// // //                                 Attempted on: {result.attemptDate}
// // //                               </Text>
// // //                               <Progress
// // //                                 percent={Math.round(
// // //                                   (result.score / result.totalQuestions) * 100
// // //                                 )}
// // //                                 format={() =>
// // //                                   `${result.score}/${result.totalQuestions}`
// // //                                 }
// // //                                 strokeColor={{
// // //                                   "0%": "#108ee9",
// // //                                   "100%": "#87d068",
// // //                                 }}
// // //                               />
// // //                             </>
// // //                           }
// // //                         />
// // //                       </Card>
// // //                     </List.Item>
// // //                   )}
// // //                 />
// // //               </TabPane>
// // //             </Tabs>

// // //             {error && (
// // //               <Text type="danger" className="mt-4 block">
// // //                 {error}
// // //               </Text>
// // //             )}

// // //             {/* Result Modal */}
// // //             <Modal
// // //               title={`Detailed Quiz Results: ${selectedResult?.quizTitle}`}
// // //               visible={isResultModalVisible}
// // //               onCancel={() => setIsResultModalVisible(false)}
// // //               footer={null}
// // //               width={800}
// // //               className="rounded-lg overflow-hidden"
// // //             >
// // //               {selectedResult && (
// // //                 <div>
// // //                   <Row gutter={[16, 16]} className="mb-6">
// // //                     <Col span={12}>
// // //                       <Statistic
// // //                         title="Score"
// // //                         value={selectedResult.score}
// // //                         suffix={`/ ${selectedResult.totalQuestions}`}
// // //                         className="bg-blue-50 p-4 rounded-lg"
// // //                       />
// // //                     </Col>
// // //                     <Col span={12}>
// // //                       <Statistic
// // //                         title="Percentage"
// // //                         value={Math.round(
// // //                           (selectedResult.score /
// // //                             selectedResult.totalQuestions) *
// // //                             100
// // //                         )}
// // //                         suffix="%"
// // //                         className="bg-green-50 p-4 rounded-lg"
// // //                       />
// // //                     </Col>
// // //                   </Row>
// // //                   <Text type="secondary" className="block mb-4">
// // //                     Attempted on: {selectedResult.attemptDate}
// // //                   </Text>
// // //                   <List
// // //                     itemLayout="vertical"
// // //                     dataSource={selectedResult.answers}
// // //                     renderItem={(answer, index) => (
// // //                       <List.Item>
// // //                         <Card
// // //                           className={`mb-4 ${
// // //                             answer.isCorrect
// // //                               ? "bg-green-50 border-green-200"
// // //                               : "bg-red-50 border-red-200"
// // //                           }`}
// // //                         >
// // //                           <Title level={5} className="mb-2">
// // //                             {answer.isCorrect ? (
// // //                               <CheckCircleOutlined className="text-green-500 mr-2" />
// // //                             ) : (
// // //                               <CloseCircleOutlined className="text-red-500 mr-2" />
// // //                             )}
// // //                             {`Question ${index + 1}: ${answer.question}`}
// // //                           </Title>
// // //                           <Text className="block mb-1">
// // //                             Your answer: {answer.userAnswer}
// // //                           </Text>
// // //                           {!answer.isCorrect && (
// // //                             <Text type="success" className="block">
// // //                               Correct answer: {answer.correctAnswer}
// // //                             </Text>
// // //                           )}
// // //                         </Card>
// // //                       </List.Item>
// // //                     )}
// // //                   />
// // //                 </div>
// // //               )}
// // //             </Modal>

// // //             {/* Profile Modal */}
// // //             <Modal
// // //               title="Student Profile"
// // //               visible={isProfileModalVisible}
// // //               onCancel={() => setIsProfileModalVisible(false)}
// // //               footer={null}
// // //             >
// // //               <div>
// // //                 <Title level={4}>Name: {studentName}</Title>
// // //                 <Text>Email: {studentEmail}</Text>
// // //                 <br />
// // //                 <Text>Password: {studentPassword}</Text>
// // //               </div>
// // //             </Modal>
// // //           </Spin>
// // //         </Content>
// // //       </Layout>
// // //     </Layout>
// // //   );
// // // }

// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { auth, db } from "../../firebase/firebase";
// // import {
// //   collection,
// //   query,
// //   where,
// //   getDocs,
// //   getDoc,
// //   doc,
// // } from "firebase/firestore";
// // import {
// //   Layout,
// //   Menu,
// //   Button,
// //   Card,
// //   Avatar,
// //   Input,
// //   Modal,
// //   List,
// //   Typography,
// //   message,
// //   Row,
// //   Col,
// //   Spin,
// //   Statistic,
// //   Progress,
// //   Tag,
// //   Tabs,
// // } from "antd";
// // import {
// //   UserOutlined,
// //   LogoutOutlined,
// //   ClockCircleOutlined,
// //   EyeOutlined,
// //   TrophyOutlined,
// //   CheckCircleOutlined,
// //   CloseCircleOutlined,
// // } from "@ant-design/icons";

// // const { Header, Content } = Layout;
// // const { Meta } = Card;
// // const { Title, Text, Paragraph } = Typography;
// // const { TabPane } = Tabs;

// // export default function StudentDashboard() {
// //   const [quizzes, setQuizzes] = useState([]);
// //   const [quizResults, setQuizResults] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [accessCode, setAccessCode] = useState("");
// //   const [error, setError] = useState("");
// //   const [studentName, setStudentName] = useState("");
// //   const [studentAvatar, setStudentAvatar] = useState("");
// //   const [selectedResult, setSelectedResult] = useState(null);
// //   const [isResultModalVisible, setIsResultModalVisible] = useState(false);
// //   const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchQuizzes();
// //     fetchQuizResults();
// //     fetchStudentInfo();
// //   }, []);

// //   // Fetch quizzes assigned by the teacher
// //   const fetchQuizzes = async () => {
// //     setLoading(true);
// //     try {
// //       const userDoc = await getDocs(
// //         query(
// //           collection(db, "users"),
// //           where("email", "==", auth.currentUser.email)
// //         )
// //       );
// //       const userData = userDoc.docs[0].data();
// //       const teacherEmail = userData.teacherEmail;

// //       const teacherDoc = await getDocs(
// //         query(collection(db, "users"), where("email", "==", teacherEmail))
// //       );
// //       const teacherId = teacherDoc.docs[0].id;

// //       const q = query(
// //         collection(db, "quizzes"),
// //         where("teacherId", "==", teacherId),
// //         where("locked", "==", false)
// //       );
// //       const querySnapshot = await getDocs(q);
// //       const quizzesData = querySnapshot.docs.map((doc) => ({
// //         id: doc.id,
// //         ...doc.data(),
// //       }));
// //       setQuizzes(quizzesData);
// //     } catch (error) {
// //       console.error("Error fetching quizzes:", error);
// //       setError("Failed to load quizzes. Please try again later.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Fetch student's quiz results
// //   const fetchQuizResults = async () => {
// //     try {
// //       const q = query(
// //         collection(db, "quizResults"),
// //         where("studentId", "==", auth.currentUser.uid)
// //       );
// //       const querySnapshot = await getDocs(q);
// //       const resultsData = querySnapshot.docs.map((doc) => {
// //         const resultData = doc.data();
// //         return {
// //           id: doc.id,
// //           quizId: resultData.quizId,
// //           score: resultData.score,
// //           totalQuestions: resultData.totalQuestions,
// //           attemptDate: resultData.attemptDate.toDate().toLocaleString(),
// //           answers: resultData.answers,
// //         };
// //       });
// //       setQuizResults(resultsData);
// //     } catch (error) {
// //       console.error("Error fetching quiz results:", error);
// //       setError("Failed to load quiz results. Please try again later.");
// //     }
// //   };

// //   // Fetch student info (name, avatar, etc.)
// //   const fetchStudentInfo = async () => {
// //     const studentDoc = await getDocs(
// //       query(
// //         collection(db, "users"),
// //         where("email", "==", auth.currentUser.email)
// //       )
// //     );
// //     if (!studentDoc.empty) {
// //       const studentData = studentDoc.docs[0].data();
// //       setStudentName(studentData.name);
// //       setStudentAvatar(studentData.name.charAt(0)); // Initials for avatar
// //     }
// //   };

// //   // Handle quiz access code submission
// //   const handleAccessCodeSubmit = (quizId) => {
// //     const quiz = quizzes.find((q) => q.id === quizId);
// //     if (quiz.accessCode === accessCode) {
// //       setError("");
// //       navigate(`/take-quiz/${quizId}`);
// //     } else {
// //       message.error("Invalid access code");
// //     }
// //   };

// //   // Handle student logout
// //   const handleLogout = () => {
// //     auth.signOut();
// //     navigate("/login");
// //   };

// //   // Show profile modal
// //   const handleProfileClick = () => {
// //     setIsProfileModalVisible(true);
// //   };

// //   // Show quiz result modal
// //   const handleViewResult = (result) => {
// //     setSelectedResult(result);
// //     setIsResultModalVisible(true);
// //   };

// //   return (
// //     <Layout className="min-h-screen">
// //       <Header className="px-4 bg-gradient-to-r text-white bg-indigo-600 hover:bg-indigo-700">
// //         <Row justify="space-between" align="middle">
// //           <Col>
// //             <div className="flex items-center">
// //               <Avatar
// //                 className="mr-2 bg-white text-blue-600 cursor-pointer"
// //                 onClick={handleProfileClick}
// //               >
// //                 {studentAvatar}
// //               </Avatar>
// //               <Button
// //                 type="link"
// //                 onClick={handleProfileClick}
// //                 className="text-white cursor-pointer"
// //               >
// //                 {studentName}
// //               </Button>
// //             </div>
// //           </Col>
// //           <Col>
// //             <Button
// //               type="primary"
// //               icon={<LogoutOutlined />}
// //               onClick={handleLogout}
// //               className="bg-white text-indigo-600 border-white hover:bg-indigo-100 hover:border-indigo-100"
// //             ></Button>
// //           </Col>
// //         </Row>
// //       </Header>

// //       <Layout>
// //         <Content className="p-6 bg-white rounded-lg shadow-md">
// //           <Spin spinning={loading}>
// //             <Tabs defaultActiveKey="1" centered>
// //               {/* Quizzes Tab */}
// //               <TabPane tab="Available Quizzes" key="1">
// //                 <Row gutter={[16, 16]} className="mb-6">
// //                   <Col xs={24} sm={12} md={8} lg={6}>
// //                     <Statistic
// //                       title="Available Quizzes"
// //                       value={quizzes.length}
// //                       className="bg-blue-50 p-4 rounded-lg"
// //                     />
// //                   </Col>
// //                   <Col xs={24} sm={12} md={8} lg={6}>
// //                     <Statistic
// //                       title="Completed Quizzes"
// //                       value={quizResults.length}
// //                       className="bg-green-50 p-4 rounded-lg"
// //                     />
// //                   </Col>
// //                 </Row>

// //                 <List
// //                   grid={{
// //                     gutter: 16,
// //                     xs: 1,
// //                     sm: 2,
// //                     md: 2,
// //                     lg: 3,
// //                     xl: 3,
// //                     xxl: 4,
// //                   }}
// //                   dataSource={quizzes}
// //                   renderItem={(quiz) => (
// //                     <List.Item>
// //                       <Card
// //                         hoverable
// //                         className="shadow-sm transition-all duration-300 hover:shadow-lg"
// //                         title={<span className="text-lg font-semibold">{quiz.title}</span>}
// //                         extra={
// //                           quiz.timeLimit && (
// //                             <Text className="text-blue-500">
// //                               <ClockCircleOutlined /> {quiz.timeLimit} min
// //                             </Text>
// //                           )
// //                         }
// //                       >
// //                         <Meta
// //                           description={
// //                             <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">
// //                               {quiz.description}
// //                             </Paragraph>
// //                           }
// //                         />
// //                         {quizResults.some((result) => result.quizId === quiz.id) ? (
// //                           <div className="mt-4">
// //                             <Tag color="green" icon={<CheckCircleOutlined />}>
// //                               Completed
// //                             </Tag>
// //                             <Button
// //                               type="primary"
// //                               onClick={() => handleViewResult(getQuizResult(quiz.id))}
// //                               className="w-full mt-2 text-white bg-indigo-600 hover:bg-indigo-700"
// //                             >
// //                               View Results
// //                             </Button>
// //                           </div>
// //                         ) : quiz.accessCode ? (
// //                           <div className="mt-4">
// //                             <Input
// //                               placeholder="Enter access code"
// //                               value={accessCode}
// //                               onChange={(e) => setAccessCode(e.target.value)}
// //                               className="mb-2"
// //                             />
// //                             <Button
// //                               type="primary"
// //                               onClick={() => handleAccessCodeSubmit(quiz.id)}
// //                               className="w-full text-white bg-indigo-600 hover:bg-indigo-700"
// //                             >
// //                               Submit Access Code
// //                             </Button>
// //                           </div>
// //                         ) : (
// //                           <Button
// //                             type="primary"
// //                             onClick={() => navigate(`/take-quiz/${quiz.id}`)}
// //                             className="w-full mt-4 text-white bg-indigo-600 hover:bg-indigo-700"
// //                           >
// //                             Take Quiz
// //                           </Button>
// //                         )}
// //                       </Card>
// //                     </List.Item>
// //                   )}
// //                 />
// //               </TabPane>

// //               {/* Results Tab */}
// //               <TabPane tab="Your Results" key="2">
// //                 {quizResults.length === 0 ? (
// //                   <div>No quiz results available.</div>
// //                 ) : (
// //                   <List
// //                     grid={{
// //                       gutter: 16,
// //                       xs: 1,
// //                       sm: 2,
// //                       md: 2,
// //                       lg: 3,
// //                       xl: 3,
// //                       xxl: 4,
// //                     }}
// //                     dataSource={quizResults}
// //                     renderItem={(result) => (
// //                       <List.Item>
// //                         <Card
// //                           hoverable
// //                           className="shadow-sm transition-all duration-300 hover:shadow-lg"
// //                           actions={[
// //                             <Button
// //                               type="link"
// //                               onClick={() => handleViewResult(result)}
// //                             >
// //                               <EyeOutlined /> See Detailed Results
// //                             </Button>,
// //                           ]}
// //                         >
// //                           <Meta
// //                             title={<span className="text-lg font-semibold">{result.quizId}</span>}
// //                             description={
// //                               <>
// //                                 <Text className="block text-gray-600 mb-2">
// //                                   Attempted on: {result.attemptDate}
// //                                 </Text>
// //                                 <Progress
// //                                   percent={Math.round((result.score / result.totalQuestions) * 100)}
// //                                   format={() => `${result.score}/${result.totalQuestions}`}
// //                                   strokeColor={{
// //                                     "0%": "#108ee9",
// //                                     "100%": "#87d068",
// //                                   }}
// //                                 />
// //                               </>
// //                             }
// //                           />
// //                         </Card>
// //                       </List.Item>
// //                     )}
// //                   />
// //                 )}
// //               </TabPane>
// //             </Tabs>
// //           </Spin>
// //         </Content>
// //       </Layout>

// //       {/* Result Modal */}
// //       <Modal
// //         visible={isResultModalVisible}
// //         onCancel={() => setIsResultModalVisible(false)}
// //         footer={null}
// //         title="Quiz Result Details"
// //       >
// //         {selectedResult && (
// //           <div>
// //             <Title level={4}>{selectedResult.quizId}</Title>
// //             <Text>Attempted on: {selectedResult.attemptDate}</Text>
// //             <Progress
// //               percent={Math.round(
// //                 (selectedResult.score / selectedResult.totalQuestions) * 100
// //               )}
// //               format={() => `${selectedResult.score}/${selectedResult.totalQuestions}`}
// //               strokeColor={{
// //                 "0%": "#108ee9",
// //                 "100%": "#87d068",
// //               }}
// //             />
// //             <div className="mt-4">
// //               <Title level={5}>Answers:</Title>
// //               {selectedResult.answers.map((answer, index) => (
// //                 <div key={index}>
// //                   <Text>
// //                     Q{index + 1}: {answer.question}
// //                   </Text>
// //                   <br />
// //                   <Text strong>{answer.userAnswer}</Text>
// //                   <Text
// //                     className={answer.isCorrect ? "text-green-600" : "text-red-600"}
// //                   >
// //                     {answer.isCorrect ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
// //                     {answer.isCorrect ? "Correct" : "Incorrect"}
// //                   </Text>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </Modal>

// //       {/* Profile Modal */}
// //       <Modal
// //         visible={isProfileModalVisible}
// //         onCancel={() => setIsProfileModalVisible(false)}
// //         footer={null}
// //         title="Profile"
// //       >
// //         <div className="text-center">
// //           <Avatar size={64}>{studentAvatar}</Avatar>
// //           <Title level={4}>{studentName}</Title>
// //         </div>
// //       </Modal>
// //     </Layout>
// //   );
// // }

// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { auth, db } from "../../firebase/firebase";
// // import {
// //   collection,
// //   query,
// //   where,
// //   getDocs,
// //   getDoc,
// //   doc,
// // } from "firebase/firestore";
// // import {
// //   Layout,
// //   Menu,
// //   Button,
// //   Card,
// //   Avatar,
// //   Input,
// //   Modal,
// //   List,
// //   Typography,
// //   message,
// //   Row,
// //   Col,
// //   Spin,
// //   Statistic,
// //   Progress,
// //   Tag,
// //   Tabs,
// //   Table,
// // } from "antd";
// // import {
// //   UserOutlined,
// //   LogoutOutlined,
// //   ClockCircleOutlined,
// //   EyeOutlined,
// //   TrophyOutlined,
// //   CheckCircleOutlined,
// //   CloseCircleOutlined,
// // } from "@ant-design/icons";

// // const { Header, Content } = Layout;
// // const { Meta } = Card;
// // const { Title, Text, Paragraph } = Typography;
// // const { TabPane } = Tabs;

// // export default function StudentDashboard() {
// //   const [quizzes, setQuizzes] = useState([]);
// //   const [quizResults, setQuizResults] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [accessCode, setAccessCode] = useState("");
// //   const [error, setError] = useState("");
// //   const [studentName, setStudentName] = useState("");
// //   const [studentAvatar, setStudentAvatar] = useState("");
// //   const [selectedResult, setSelectedResult] = useState(null);
// //   const [isResultModalVisible, setIsResultModalVisible] = useState(false);
// //   const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchQuizzes();
// //     fetchQuizResults();
// //     fetchStudentInfo();
// //   }, []);

// //   const fetchQuizzes = async () => {
// //     setLoading(true);
// //     try {
// //       const userDoc = await getDocs(
// //         query(
// //           collection(db, "users"),
// //           where("email", "==", auth.currentUser.email)
// //         )
// //       );
// //       const userData = userDoc.docs[0].data();
// //       const teacherEmail = userData.teacherEmail;

// //       const teacherDoc = await getDocs(
// //         query(collection(db, "users"), where("email", "==", teacherEmail))
// //       );
// //       const teacherId = teacherDoc.docs[0].id;

// //       const q = query(
// //         collection(db, "quizzes"),
// //         where("teacherId", "==", teacherId),
// //         where("locked", "==", false)
// //       );
// //       const querySnapshot = await getDocs(q);
// //       const quizzesData = querySnapshot.docs.map((doc) => ({
// //         id: doc.id,
// //         ...doc.data(),
// //       }));
// //       setQuizzes(quizzesData);
// //     } catch (error) {
// //       console.error("Error fetching quizzes:", error);
// //       setError("Failed to load quizzes. Please try again later.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchQuizResults = async () => {
// //     try {
// //       const q = query(
// //         collection(db, "allResults"),
// //         where("studentId", "==", auth.currentUser.uid)
// //       );
// //       const querySnapshot = await getDocs(q);
// //       const resultsData = querySnapshot.docs.map((doc) => ({
// //         id: doc.id,
// //         ...doc.data(),
// //       }));
// //       setQuizResults(resultsData);
// //     } catch (error) {
// //       console.error("Error fetching quiz results:", error);
// //       setError("Failed to load quiz results. Please try again later.");
// //     }
// //   };

// //   const fetchStudentInfo = async () => {
// //     const studentDoc = await getDocs(
// //       query(
// //         collection(db, "users"),
// //         where("email", "==", auth.currentUser.email)
// //       )
// //     );
// //     if (!studentDoc.empty) {
// //       const studentData = studentDoc.docs[0].data();
// //       setStudentName(studentData.name);
// //       setStudentAvatar(studentData.name.charAt(0));
// //     }
// //   };

// //   const handleAccessCodeSubmit = (quizId) => {
// //     const quiz = quizzes.find((q) => q.id === quizId);
// //     if (quiz.accessCode === accessCode) {
// //       setError("");
// //       navigate(`/take-quiz/${quizId}`);
// //     } else {
// //       message.error("Invalid access code");
// //     }
// //   };

// //   const handleLogout = () => {
// //     auth.signOut();
// //     navigate("/login");
// //   };

// //   const handleProfileClick = () => {
// //     setIsProfileModalVisible(true);
// //   };

// //   const handleViewResult = (result) => {
// //     setSelectedResult(result);
// //     setIsResultModalVisible(true);
// //   };

// //   const isQuizAttempted = (quizId) => {
// //     return quizResults.some((result) => result.quizId === quizId);
// //   };

// //   const getQuizResult = (quizId) => {
// //     return quizResults.find((result) => result.quizId === quizId);
// //   };

// //   const columns = [
// //     // {
// //     //   title: 'Quiz Title',
// //     //   dataIndex: 'quizId',
// //     //   key:
// //     {
// //       title: 'Quiz Title',
// //       dataIndex: 'quizId',
// //       key: 'quizId',
// //       render: (quizId) => {
// //         const quiz = quizzes.find(q => q.id === quizId);
// //         return quiz ? quiz.title : 'Unknown Quiz';
// //       },
// //     },
// //     {
// //       title: 'Score',
// //       dataIndex: 'score',
// //       key: 'score',
// //       render: (score, record) => `${score}/${record.totalQuestions}`,
// //     },
// //     {
// //       title: 'Percentage',
// //       dataIndex: 'percentage',
// //       key: 'percentage',
// //       render: (percentage) => `${percentage}%`,
// //     },
// //     {
// //       title: 'Submitted At',
// //       dataIndex: 'quizId',  // Use quizId as the lookup key for submittedAt in quizzes
// //       key: 'submittedAt',
// //       render: (quizId) => {
// //         const quizResult = quizResults.find(result => result.quizId === quizId);
// //         return quizResult && quizResult.submittedAt
// //           ? new Date(quizResult.submittedAt.toDate()).toLocaleString()
// //           : "N/A";
// //       },
// //     }
// // ,
// //     {
// //       title: 'Action',
// //       key: 'action',
// //       render: (_, record) => (
// //         <Button onClick={() => handleViewResult(record)}>View Details</Button>
// //       ),
// //     },
// //   ];

// //   return (
// //     <Layout className="min-h-screen">
// //       <Header className="px-4 bg-gradient-to-r text-white bg-indigo-600 hover:bg-indigo-700">
// //         <Row justify="space-between" align="middle">
// //           <Col>
// //             <div className="flex items-center">
// //               <Avatar
// //                 className="mr-2 bg-white text-blue-600 cursor-pointer"
// //                 onClick={handleProfileClick}
// //               >
// //                 {studentAvatar}
// //               </Avatar>
// //               <Button
// //                 type="link"
// //                 onClick={handleProfileClick}
// //                 className="text-white cursor-pointer"
// //               >
// //                 {studentName}
// //               </Button>
// //             </div>
// //           </Col>
// //           <Col>
// //             <Button
// //               type="primary"
// //               icon={<LogoutOutlined />}
// //               onClick={handleLogout}
// //               className="bg-white text-indigo-600 border-white hover:bg-indigo-100 hover:border-indigo-100"
// //             />
// //           </Col>
// //         </Row>
// //       </Header>

// //       <Layout>
// //         <Content className="p-6 bg-white rounded-lg shadow-md">
// //           <Spin spinning={loading}>
// //             <Tabs defaultActiveKey="1" centered>
// //               <TabPane tab="Available Quizzes" key="1">
// //                 <Row gutter={[16, 16]} className="mb-6">
// //                   <Col xs={24} sm={12} md={8} lg={6}>
// //                     <Statistic
// //                       title="Available Quizzes"
// //                       value={quizzes.length}
// //                       className="bg-blue-50 p-4 rounded-lg"
// //                     />
// //                   </Col>
// //                   <Col xs={24} sm={12} md={8} lg={6}>
// //                     <Statistic
// //                       title="Completed Quizzes"
// //                       value={quizResults.length}
// //                       className="bg-green-50 p-4 rounded-lg"
// //                     />
// //                   </Col>
// //                 </Row>

// //                 <List
// //                   grid={{
// //                     gutter: 16,
// //                     xs: 1,
// //                     sm: 2,
// //                     md: 2,
// //                     lg: 3,
// //                     xl: 3,
// //                     xxl: 4,
// //                   }}
// //                   dataSource={quizzes}
// //                   renderItem={(quiz) => (
// //                     <List.Item>
// //                       <Card
// //                         hoverable
// //                         className="shadow-sm transition-all duration-300 hover:shadow-lg"
// //                         title={<span className="text-lg font-semibold">{quiz.title}</span>}
// //                         extra={
// //                           quiz.timeLimit && (
// //                             <Text className="text-blue-500">
// //                               <ClockCircleOutlined /> {quiz.timeLimit} min
// //                             </Text>
// //                           )
// //                         }
// //                       >
// //                         <Meta
// //                           description={
// //                             <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">
// //                               {quiz.description}
// //                             </Paragraph>
// //                           }
// //                         />
// //                         {isQuizAttempted(quiz.id) ? (
// //                           <div className="mt-4">
// //                             <Tag color="green" icon={<CheckCircleOutlined />}>
// //                               Completed
// //                             </Tag>
// //                             <Button
// //                               type="primary"
// //                               // onClick={() => handleViewResult(getQuizResult(quiz.id))}
// //                               className="w-full mt-2 text-white bg-green-600 hover:bg-green-700"
// //                             >
// //                               Completed
// //                             </Button>
// //                           </div>
// //                         ) : quiz.accessCode ? (
// //                           <div className="mt-4">
// //                             <Input
// //                               placeholder="Enter access code"
// //                               value={accessCode}
// //                               onChange={(e) => setAccessCode(e.target.value)}
// //                               className="mb-2"
// //                             />
// //                             <Button
// //                               type="primary"
// //                               onClick={() => handleAccessCodeSubmit(quiz.id)}
// //                               className="w-full text-white bg-indigo-600 hover:bg-indigo-700"
// //                             >
// //                               Submit Access Code
// //                             </Button>
// //                           </div>
// //                         ) : (
// //                           <Button
// //                             type="primary"
// //                             onClick={() => navigate(`/take-quiz/${quiz.id}`)}
// //                             className="w-full mt-4 text-white bg-indigo-600 hover:bg-indigo-700"
// //                           >
// //                             Take Quiz
// //                           </Button>
// //                         )}
// //                       </Card>
// //                     </List.Item>
// //                   )}
// //                 />
// //               </TabPane>

// //               <TabPane tab="Your Results" key="2">
// //                 <Table
// //                   dataSource={quizResults}
// //                   columns={columns}
// //                   rowKey="id"
// //                   scroll={{ x: "100%" }}
// //                 />
// //               </TabPane>
// //             </Tabs>
// //           </Spin>
// //         </Content>
// //       </Layout>

// //       <Modal
// //         visible={isResultModalVisible}
// //         onCancel={() => setIsResultModalVisible(false)}
// //         footer={null}
// //         title="Quiz Result Details"
// //       >
// //         {selectedResult && (
// //           <div>
// //             <Title level={4}>{selectedResult.quizId}</Title>
// //             <Text>Submitted on: {selectedResult.submittedAt}</Text>
// //             <Progress
// //               percent={selectedResult.percentage}
// //               format={() => `${selectedResult.score}/${selectedResult.totalQuestions}`}
// //               strokeColor={{
// //                 "0%": "#108ee9",
// //                 "100%": "#87d068",
// //               }}
// //             />
// //             <div className="mt-4">
// //               <Title level={5}>Answers:</Title>
// //               {selectedResult.answers.map((answer, index) => (
// //                 <div key={index}>
// //                   <Text>
// //                     Q{index + 1}: {answer.question}
// //                   </Text>
// //                   <br />
// //                   <Text strong>{answer.userAnswer}</Text>
// //                   <Text
// //                     className={answer.isCorrect ? "text-green-600" : "text-red-600"}
// //                   >
// //                     {answer.isCorrect ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
// //                     {answer.isCorrect ? " Correct" : " Incorrect"}
// //                   </Text>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </Modal>

// //       <Modal
// //         visible={isProfileModalVisible}
// //         onCancel={() => setIsProfileModalVisible(false)}
// //         footer={null}
// //         title="Profile"
// //       >
// //         <div className="text-center">
// //           <Avatar size={64}>{studentAvatar}</Avatar>
// //           <Title level={4}>{studentName}</Title>
// //         </div>
// //       </Modal>
// //     </Layout>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { Layout, Button, Card, Avatar, Input, Modal, List, Typography, message, Row, Col, Spin, Statistic, Tag, Tabs, Table } from "antd";
// import { UserOutlined, LogoutOutlined, ClockCircleOutlined, PrinterOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
// import { jsPDF } from "jspdf";
// import 'jspdf-autotable'; // For creating tables in PDFs

// const { Title, Text } = Typography;
// const { TabPane } = Tabs;
// const { Header, Content } = Layout;

// export default function StudentDashboard() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [quizResults, setQuizResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [accessCode, setAccessCode] = useState("");
//   const [studentName, setStudentName] = useState("");
//   const [studentAvatar, setStudentAvatar] = useState("");
//   const [selectedResult, setSelectedResult] = useState(null);
//   const [isResultModalVisible, setIsResultModalVisible] = useState(false);
//   const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchQuizzes();
//     fetchQuizResults();
//     fetchStudentInfo();
//   }, []);

//   const fetchQuizzes = async () => {
//     setLoading(true);
//     try {
//       const userDoc = await getDocs(
//         query(collection(db, "users"), where("email", "==", auth.currentUser.email))
//       );
//       const userData = userDoc.docs[0].data();
//       const teacherEmail = userData.teacherEmail;

//       const teacherDoc = await getDocs(
//         query(collection(db, "users"), where("email", "==", teacherEmail))
//       );
//       const teacherId = teacherDoc.docs[0].id;

//       const q = query(collection(db, "quizzes"), where("teacherId", "==", teacherId), where("locked", "==", false));
//       const querySnapshot = await getDocs(q);
//       const quizzesData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setQuizzes(quizzesData);
//     } catch (error) {
//       console.error("Error fetching quizzes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchQuizResults = async () => {
//     try {
//       const q = query(
//         collection(db, "allResults"),
//         where("studentId", "==", auth.currentUser.uid)
//       );
//       const querySnapshot = await getDocs(q);
//       const resultsData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setQuizResults(resultsData);
//     } catch (error) {
//       console.error("Error fetching quiz results:", error);
//     }
//   };

//   const fetchStudentInfo = async () => {
//     const studentDoc = await getDocs(
//       query(collection(db, "users"), where("email", "==", auth.currentUser.email))
//     );
//     if (!studentDoc.empty) {
//       const studentData = studentDoc.docs[0].data();
//       setStudentName(studentData.name);
//       setStudentAvatar(studentData.name.charAt(0));
//     }
//   };

//   const handleAccessCodeSubmit = (quizId) => {
//     const quiz = quizzes.find((q) => q.id === quizId);
//     if (quiz.accessCode === accessCode) {
//       navigate(`/take-quiz/${quizId}`);
//     } else {
//       message.error("Invalid access code");
//     }
//   };

//   const handleLogout = () => {
//     auth.signOut();
//     navigate("/login");
//   };

//   const handleProfileClick = () => {
//     setIsProfileModalVisible(true);
//   };

//   const handleViewResult = (result) => {
//     console.log("resultssfsda",result)
//     setSelectedResult(result);
//     setIsResultModalVisible(true);
//   };
//   const handlePrintResult = () => {
//     if (!selectedResult) return;
//     const doc = new jsPDF();
//     const { quizTitle, score, totalQuestions, resultDetails, submittedAt } = selectedResult;

//     console.log(resultDetails); // Check this in the console to verify the data

//     doc.setFontSize(16);
//     doc.text(`Quiz Title: ${quizTitle}`, 10, 10);
//     doc.text(`Score: ${score}/${totalQuestions}`, 10, 20);
//     doc.text(`Time Taken: ${selectedResult.timeTaken} minutes`, 10, 30);
//     doc.text(`Submitted At: ${new Date(submittedAt).toLocaleString()}`, 10, 40);

//     const questionDetails = resultDetails.map((question) => [
//       question.questionId,
//       question.selectedAnswer,
//       question.correctAnswer,
//       question.isCorrect ? "Correct" : "Incorrect",
//     ]);

//     doc.autoTable({
//       startY: 50,
//       head: [["Question ID", "Your Answer", "Correct Answer", "Result"]],
//       body: questionDetails,
//     });

//     doc.save(`${quizTitle}_Result.pdf`);
//   };

//   const isQuizAttempted = (quizId) => {
//     return quizResults.some((result) => result.quizId === quizId);
//   };

//   const getQuizResult = (quizId) => {
//     return quizResults.find((result) => result.quizId === quizId);
//   };

//   const columns = [
//     {
//       title: 'Quiz Title',
//       dataIndex: 'quizId',
//       key: 'quizId',
//       render: (quizId) => {
//         const quiz = quizzes.find(q => q.id === quizId);
//         return quiz ? quiz.title : 'Unknown Quiz';
//       },
//     },
//     {
//       title: 'Score',
//       dataIndex: 'score',
//       key: 'score',
//       render: (score, record) => `${score}/${record.totalQuestions}`,
//     },
//     {
//       title: 'Percentage',
//       dataIndex: 'percentage',
//       key: 'percentage',
//       render: (percentage) => `${percentage}%`,
//     },
//     {
//       title: 'Submitted At',
//       dataIndex: 'quizId',
//       key: 'submittedAt',
//       render: (quizId) => {
//         const quizResult = quizResults.find(result => result.quizId === quizId);
//         return quizResult && quizResult.submittedAt
//           ? new Date(quizResult.submittedAt.toDate()).toLocaleString()
//           : "N/A";
//       },
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Button onClick={() => handleViewResult(record)}>View Details</Button>
//       ),
//     },
//   ];

//   return (
//     <Layout className="min-h-screen">
//       <Header className="px-4 bg-gradient-to-r text-white bg-indigo-600 hover:bg-indigo-700">
//         <Row justify="space-between" align="middle">
//           <Col>
//             <div className="flex items-center">
//               <Avatar className="mr-2 bg-white text-blue-600 cursor-pointer" onClick={handleProfileClick}>
//                 {studentAvatar}
//               </Avatar>
//               <Button type="link" onClick={handleProfileClick} className="text-white cursor-pointer">
//                 {studentName}
//               </Button>
//             </div>
//           </Col>
//           <Col>
//             <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout} className="bg-white text-indigo-600 border-white hover:bg-indigo-100 hover:border-indigo-100" />
//           </Col>
//         </Row>
//       </Header>

//       <Layout>
//         <Content className="p-6 bg-white rounded-lg shadow-md">
//           <Spin spinning={loading}>
//             <Tabs defaultActiveKey="1" centered>
//               <TabPane tab="Available Quizzes" key="1">
//                 <Row gutter={[16, 16]} className="mb-6">
//                   <Col xs={24} sm={12} md={8} lg={6}>
//                     <Statistic title="Available Quizzes" value={quizzes.length} className="bg-blue-50 p-4 rounded-lg" />
//                   </Col>
//                   <Col xs={24} sm={12} md={8} lg={6}>
//                     <Statistic title="Completed Quizzes" value={quizResults.length} className="bg-green-50 p-4 rounded-lg" />
//                   </Col>
//                 </Row>

//                 <List
//                   grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
//                   dataSource={quizzes}
//                   renderItem={(quiz) => (
//                     <List.Item>
//                       <Card hoverable className="shadow-sm transition-all duration-300 hover:shadow-lg" title={<span className="text-lg font-semibold">{quiz.title}</span>} extra={quiz.timeLimit && <Text className="text-blue-500"><ClockCircleOutlined /> {quiz.timeLimit} min</Text>}>
//                         <Text className="text-gray-600">{quiz.description}</Text>
//                         {isQuizAttempted(quiz.id) ? (
//                           <div className="mt-4">
//                             <Tag color="green">Completed</Tag>
//                             <Button onClick={() => handleViewResult(getQuizResult(quiz.id))}>View Result</Button>
//                           </div>
//                         ) : (
//                           <div className="mt-4">
//                             <Input
//                               placeholder="Enter Access Code"
//                               value={accessCode}
//                               onChange={(e) => setAccessCode(e.target.value)}
//                             />
//                             <Button type="primary" onClick={() => handleAccessCodeSubmit(quiz.id)}>Submit</Button>
//                           </div>
//                         )}
//                       </Card>
//                     </List.Item>
//                   )}
//                 />
//               </TabPane>

//               <TabPane tab="Quiz Results" key="2">
//                 <Table
//                   columns={columns}
//                   dataSource={quizResults}
//                   rowKey="id"
//                   pagination={false}
//                 />
//               </TabPane>
//             </Tabs>
//           </Spin>
//         </Content>
//       </Layout>
//       <Modal
//   title="Quiz Result Details"
//   visible={isResultModalVisible}
//   onCancel={() => setIsResultModalVisible(false)}
//   footer={[
//     <Button
//       key="download"
//       type="primary"
//       icon={<PrinterOutlined />}
//       onClick={handlePrintResult}
//     >
//       Download PDF
//     </Button>,
//     <Button key="close" onClick={() => setIsResultModalVisible(false)}>
//       Close
//     </Button>,
//   ]}
// >
//   {selectedResult ? (
//     <div>
//       <Title level={4}>{selectedResult.quizTitle}</Title>
//       <Text>
//         <strong>Your Score:</strong> {selectedResult.score}/{selectedResult.totalQuestions}
//       </Text>
//       <Text>
//         <strong>Time Taken:</strong> {selectedResult.timeTaken} minutes
//       </Text>
//       <List
//         dataSource={selectedResult.resultDetails}
//         renderItem={(question, index) => (
//           <List.Item key={index}>
//             <Row justify="space-between">
//               <Col span={18}>
//                 <Text>{`Question ID: ${question.questionId}`}</Text>
//               </Col>
//               <Col span={6}>
//                 <Text type={question.isCorrect ? "success" : "danger"}>
//                   {question.isCorrect ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
//                   {question.isCorrect ? "Correct" : "Incorrect"}
//                 </Text>
//               </Col>
//             </Row>
//             <Text><strong>Your Answer:</strong> {question.selectedAnswer}</Text>
//             <Text><strong>Correct Answer:</strong> {question.correctAnswer}</Text>
//           </List.Item>
//         )}
//       />
//     </div>
//   ) : (
//     <p>Loading...</p> // Optional loading state for when the result is not yet set
//   )}
// </Modal>
//     </Layout>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  Layout,
  Button,
  Card,
  Avatar,
  Input,
  Modal,
  List,
  Typography,
  message,
  Row,
  Col,
  Spin,
  Statistic,
  Tag,
  Tabs,
  Table,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
  PrinterOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For creating tables in PDFs

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Header, Content } = Layout;

export default function StudentDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessCode, setAccessCode] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentAvatar, setStudentAvatar] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
    fetchQuizResults();
    fetchStudentInfo();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const userDoc = await getDocs(
        query(
          collection(db, "users"),
          where("email", "==", auth.currentUser.email)
        )
      );
      const userData = userDoc.docs[0].data();

      const teacherEmail = userData.teacherEmail;

      const teacherDoc = await getDocs(
        query(collection(db, "users"), where("email", "==", teacherEmail))
      );
      const teacherId = teacherDoc.docs[0].id;

      const q = query(
        collection(db, "quizzes"),
        where("teacherId", "==", teacherId),
        where("locked", "==", false)
      );
      const querySnapshot = await getDocs(q);
      const quizzesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuizzes(quizzesData);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchQuizResults = async () => {
    try {
      const q = query(
        collection(db, "allResults"),
        where("studentId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const resultsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuizResults(resultsData);
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    }
  };

  const fetchStudentInfo = async () => {
    const studentDoc = await getDocs(
      query(
        collection(db, "users"),
        where("email", "==", auth.currentUser.email)
      )
    );
    if (!studentDoc.empty) {
      const studentData = studentDoc.docs[0].data();
      setStudentName(studentData.name);
      setStudentAvatar(studentData.name.charAt(0));
      setStudentEmail(studentData.email);
      setStudentPassword(studentData.password);
    }
  };

  const handleAccessCodeSubmit = (quizId) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (quiz.accessCode === accessCode) {
      navigate(`/take-quiz/${quizId}`);
    } else {
      message.error("Invalid access code");
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  const handleProfileClick = () => {
    setIsProfileModalVisible(true);
  };

  const handleViewResult = (result) => {
    setSelectedResult(result);
    setIsResultModalVisible(true);
  };

  const handlePrintResult = () => {
    if (!selectedResult) return;

    const doc = new jsPDF();
    const { quizTitle, score, totalQuestions, resultDetails, submittedAt } =
      selectedResult;

    // Set the document's title and general style
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Set text color to black

    // Title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255); // Blue color for the quiz title
    doc.text(`Quiz Title: ${quizTitle}`, 14, 20);

    // Score
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Reset text color to black
    doc.text(`Score: ${score}/${totalQuestions}`, 14, 30);

    // Time taken (commented out, but you can uncomment it if available)
    // doc.text(`Time Taken: ${selectedResult.timeTaken} minutes`, 14, 40);

    // Submitted At
    doc.text(`Submitted At: ${new Date(submittedAt).toLocaleString()}`, 14, 40);

    // Add some space
    doc.setLineWidth(0.5);
    doc.line(14, 45, 195, 45); // Draw a line separator

    // Table Heading
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // White text for the table header
    const tableColumnNames = [
      "Question No",
      "Question",
      "Your Answer",
      "Correct Answer",
      "Result",
    ];
    const tableColumnWidths = [20, 70, 30, 30, 20];

    // Styling for Table Headers
    doc.autoTable({
      startY: 50,
      head: [tableColumnNames],
      body: [],
      theme: "grid",
      styles: {
        fillColor: [0, 123, 255], // Blue color for header row
        textColor: [255, 255, 255], // White text color
        fontSize: 10,
        halign: "center", // Align the headers to the center
      },
      columnStyles: {
        0: { cellWidth: tableColumnWidths[0] },
        1: { cellWidth: tableColumnWidths[1] },
        2: { cellWidth: tableColumnWidths[2] },
        3: { cellWidth: tableColumnWidths[3] },
        4: { cellWidth: tableColumnWidths[4] },
      },
    });

    // Add result rows to the table
    const questionDetails = resultDetails.map((question) => [
      question.questionId,
      question.questionText,
      question.selectedAnswer,
      question.correctAnswer,
      question.isCorrect ? "Correct" : "Incorrect",
    ]);

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10, // Add some space between the header and rows
      body: questionDetails,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 4,
        halign: "center", 
      },
      columnStyles: {
        0: { cellWidth: tableColumnWidths[0] },
        1: { cellWidth: tableColumnWidths[1] },
        2: { cellWidth: tableColumnWidths[2] },
        3: { cellWidth: tableColumnWidths[3] },
        4: { cellWidth: tableColumnWidths[4] },
      },
    });
    doc.save(`${quizTitle}_Result.pdf`);
  };
  const isQuizAttempted = (quizId) => {
    return quizResults.some((result) => result.quizId === quizId);
  };

  const getQuizResult = (quizId) => {
    return quizResults.find((result) => result.quizId === quizId);
  };
  const sortedQuizResults = quizResults.sort((a, b) => {
    const dateA = a.submittedAt
      ? new Date(a.submittedAt.toDate())
      : new Date(0);
    const dateB = b.submittedAt
      ? new Date(b.submittedAt.toDate())
      : new Date(0);
    return dateB - dateA; // Sort in descending order (latest date first)
  });

  const columns = [
    {
      title: "Quiz Title",
      dataIndex: "quizId",
      key: "quizId",
      render: (quizId) => {
        const quiz = quizzes.find((q) => q.id === quizId);
        return quiz ? quiz.title : "Unknown Quiz";
      },
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (score, record) => `${score}/${record.totalQuestions}`,
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage) => `${percentage}%`,
    },
    {
      title: "Submitted At",
      dataIndex: "quizId",
      key: "submittedAt",
      render: (quizId) => {
        const quizResult = sortedQuizResults.find(
          (result) => result.quizId === quizId
        );
        return quizResult && quizResult.submittedAt
          ? new Date(quizResult.submittedAt.toDate()).toLocaleString()
          : "N/A";
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button>Under Construction</Button>
      ),
    },
  ];


  return (
    <Spin spinning={loading} tip="Loading...">
      <Layout className="min-h-screen">
        <Header className="px-4 bg-gradient-to-r text-white bg-indigo-600 hover:bg-indigo-700">
          <Row justify="space-between" align="middle">
            <Col>
              <div className="flex items-center">
                <Avatar
                  className="mr-2 bg-white text-blue-600 cursor-pointer"
                  onClick={handleProfileClick}
                >
                  {studentAvatar}
                </Avatar>
                <Button
                  type="link"
                  onClick={handleProfileClick}
                  className="text-white cursor-pointer"
                >
                  {studentName}
                </Button>
              </div>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                className="bg-white text-indigo-600 border-white hover:bg-indigo-100 hover:border-indigo-100"
              />
            </Col>
          </Row>
        </Header>

        <Layout>
          <Content className="p-6 bg-white rounded-lg shadow-md">
            {/* <Spin spinning={loading}> */}
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Available Quizzes" key="1">
                <Row gutter={[16, 16]} className="mb-6">
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Statistic
                      title="Available Quizzes"
                      value={quizzes.length}
                      className="bg-blue-50 p-4 rounded-lg"
                    />
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Statistic
                      title="Completed Quizzes"
                      value={quizResults.length}
                      className="bg-green-50 p-4 rounded-lg"
                    />
                  </Col>
                </Row>
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 3,
                    xl: 3,
                    xxl: 4,
                  }}
                  dataSource={quizzes}
                  renderItem={(quiz) => (
                    <List.Item>
                      <Card
                        hoverable
                        className="shadow-sm transition-all duration-300 hover:shadow-lg"
                        title={
                          <span className="text-lg font-semibold">
                            {quiz.title}
                          </span>
                        }
                      >
                        <p>{quiz.description}</p>
                        <div className="mt-3">
                          {/* Conditionally render based on if the quiz has been attempted */}
                          {isQuizAttempted(quiz.id) ? (
                            <span className="text-green-800 bg-green-300 p-2 w-full text-sm font-semibold">
                              Completed
                            </span>
                          ) : (
                            <>
                              <Input.Search
                                placeholder="Enter access code"
                                onSearch={() => handleAccessCodeSubmit(quiz.id)}
                                onChange={(e) => setAccessCode(e.target.value)}
                              />
                              <Button
                                type="primary"
                                onClick={() => handleAccessCodeSubmit(quiz.id)}
                                disabled={isQuizAttempted(quiz.id)}
                                className="mt-2 w-full"
                                block
                              >
                                {isQuizAttempted(quiz.id)
                                  ? "Already Attempted"
                                  : "Start Quiz"}
                              </Button>
                            </>
                          )}
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              <TabPane tab="Quiz Results" key="2">
                <Table
                  columns={columns}
                  dataSource={quizResults}
                  pagination={false}
                  rowKey="id"
                  scroll={{ x: 800 }}
                />
              </TabPane>
            </Tabs>
            {/* </Spin> */}
          </Content>
        </Layout>

        <Modal
          title="Quiz Result Details"
          visible={isResultModalVisible}
          onCancel={() => setIsResultModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsResultModalVisible(false)}>
              Close
            </Button>,
            <Button
              key="print"
              // icon={<PrinterOutlined />}
              icon={<DownloadOutlined />}
              onClick={handlePrintResult}
              type="primary"
            ></Button>,
          ]}
        >
          {selectedResult && (
            <div>
              {/* Quiz Title and Result Information */}
              <Row gutter={[16, 24]} className="mb-6">
                <Col span={24}>
                  <p style={{ fontSize: 18, fontWeight: 600 }}>
                    <strong>Quiz Title:</strong> {selectedResult.quizTitle}
                  </p>
                </Col>
                <Col xs={12} sm={8} md={6}>
                  <p>
                    <strong>Score:</strong> {selectedResult.score}/
                    {selectedResult.totalQuestions}
                  </p>
                </Col>
                <Col xs={12} sm={8} md={6}>
                  <p>
                    <strong>Percentage:</strong> {selectedResult.percentage}%
                  </p>
                </Col>
                <Col xs={24} sm={8} md={6}>
                  <p>
                    <strong>Submitted At:</strong>{" "}
                    {new Date(
                      selectedResult.submittedAt.toDate()
                    ).toLocaleString()}
                  </p>
                </Col>
              </Row>

              {/* Result Details Table */}
              <Row>
                <Col span={24}>
                  <Table
                    columns={[
                      {
                        title: "Q:No",
                        dataIndex: "questionId",
                        key: "questionId",
                        align: "center",
                        render: (questionId) => (
                          <strong>{questionId.split("_")[1]}</strong>
                        ),
                        width: 100,
                      },
                      {
                        title: "Question",
                        dataIndex: "questionText",
                        key: "questionText",
                        render: (text) => <span>{text}</span>,
                      },
                      {
                        title: "Your Answer",
                        dataIndex: "selectedAnswer",
                        key: "selectedAnswer",
                        render: (text) => (
                          <Tag color={text === "Correct" ? "green" : "volcano"}>
                            {text}
                          </Tag>
                        ),
                      },
                      {
                        title: "Correct Answer",
                        dataIndex: "correctAnswer",
                        key: "correctAnswer",
                        render: (text) => <strong>{text}</strong>,
                      },
                      {
                        title: "Result",
                        dataIndex: "isCorrect",
                        key: "isCorrect",
                        render: (isCorrect) => (
                          <Tag color={isCorrect ? "green" : "red"}>
                            {isCorrect ? "Correct" : "Incorrect"}
                          </Tag>
                        ),
                        align: "center",
                        width: 150,
                      },
                    ]}
                    dataSource={selectedResult.resultDetails}
                    pagination={false}
                    rowKey="questionId"
                    bordered
                    scroll={{ x: 800 }} // Horizontal scroll for small screens
                    size="middle" // Set size to "middle" for a more compact table
                    rowClassName="table-row"
                    className="result-table"
                  />
                </Col>
              </Row>
            </div>
          )}
        </Modal>
        <Modal
          visible={isProfileModalVisible}
          onCancel={() => setIsProfileModalVisible(false)}
          footer={null}
          title="Profile"
        >
          <div className="text-center">
            <Avatar size={64}>{studentAvatar}</Avatar>
            <Title level={4}>{studentName}</Title>
            <Text>Email: {studentEmail}</Text>
            <br />
            <Text>Password: {studentPassword}</Text>
          </div>
        </Modal>
      </Layout>
    </Spin>
  );
}
