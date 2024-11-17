// // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // // // // // // import { auth, db } from '../../firebase/firebase';
// // // // // // // // // // // import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// // // // // // // // // // // export default function QuizTaking() {
// // // // // // // // // // //   const { quizId } = useParams();
// // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // //   const [quiz, setQuiz] = useState(null);
// // // // // // // // // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // // // // // // // // //   const [userAnswers, setUserAnswers] = useState([]);
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [error, setError] = useState(null);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const fetchQuiz = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
// // // // // // // // // // //         if (quizDoc.exists()) {
// // // // // // // // // // //           setQuiz(quizDoc.data());
// // // // // // // // // // //         } else {
// // // // // // // // // // //           setError('Quiz not found');
// // // // // // // // // // //         }
// // // // // // // // // // //       } catch (err) {
// // // // // // // // // // //         setError('Error fetching quiz');
// // // // // // // // // // //         console.error(err);
// // // // // // // // // // //       } finally {
// // // // // // // // // // //         setLoading(false);
// // // // // // // // // // //       }
// // // // // // // // // // //     };

// // // // // // // // // // //     fetchQuiz();
// // // // // // // // // // //   }, [quizId]);

// // // // // // // // // // //   const handleAnswer = (answerIndex) => {
// // // // // // // // // // //     setUserAnswers([...userAnswers, answerIndex]);
// // // // // // // // // // //     if (currentQuestion < quiz.questions.length - 1) {
// // // // // // // // // // //       setCurrentQuestion(currentQuestion + 1);
// // // // // // // // // // //     } else {
// // // // // // // // // // //       submitQuiz();
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const submitQuiz = async () => {
// // // // // // // // // // //     const score = userAnswers.reduce((total, answer, index) => {
// // // // // // // // // // //       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// // // // // // // // // // //     }, 0);

// // // // // // // // // // //     const percentage = (score / quiz.questions.length) * 100;

// // // // // // // // // // //     try {
// // // // // // // // // // //       await updateDoc(doc(db, 'quizzes', quizId), {
// // // // // // // // // // //         results: arrayUnion({
// // // // // // // // // // //           studentId: auth.currentUser.uid,
// // // // // // // // // // //           score: score,
// // // // // // // // // // //           totalQuestions: quiz.questions.length,
// // // // // // // // // // //           percentage: percentage,
// // // // // // // // // // //           submittedAt: new Date()
// // // // // // // // // // //         })
// // // // // // // // // // //       });
// // // // // // // // // // //       navigate('/student', { state: { quizCompleted: true, score, totalQuestions: quiz.questions.length } });
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       setError('Error submitting quiz');
// // // // // // // // // // //       console.error(err);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   if (loading) {
// // // // // // // // // // //     return <div className="text-center mt-8">Loading...</div>;
// // // // // // // // // // //   }

// // // // // // // // // // //   if (error) {
// // // // // // // // // // //     return <div className="text-center mt-8 text-red-600">{error}</div>;
// // // // // // // // // // //   }

// // // // // // // // // // //   const question = quiz.questions[currentQuestion];

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="container mx-auto px-4 py-8">
// // // // // // // // // // //       <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
// // // // // // // // // // //       <div className="bg-white shadow-md rounded-lg p-6">
// // // // // // // // // // //         <div className="mb-4">
// // // // // // // // // // //           <span className="text-lg font-semibold">Question {currentQuestion + 1} of {quiz.questions.length}</span>
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
// // // // // // // // // // //         <div className="space-y-2">
// // // // // // // // // // //           {question.options.map((option, index) => (
// // // // // // // // // // //             <button
// // // // // // // // // // //               key={index}
// // // // // // // // // // //               onClick={() => handleAnswer(index)}
// // // // // // // // // // //               className="w-full text-left p-2 rounded bg-gray-100 hover:bg-gray-200 transition duration-150 ease-in-out"
// // // // // // // // // // //             >
// // // // // // // // // // //               {option}
// // // // // // // // // // //             </button>
// // // // // // // // // // //           ))}
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // // // // // import { auth, db } from '../../firebase/firebase';
// // // // // // // // // // import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// // // // // // // // // // export default function QuizTaking() {
// // // // // // // // // //   const { quizId } = useParams();
// // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // //   const [quiz, setQuiz] = useState(null);
// // // // // // // // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // // // // // // // //   const [userAnswers, setUserAnswers] = useState([]);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [error, setError] = useState(null);
// // // // // // // // // //   const [hasAttempted, setHasAttempted] = useState(false); // Track if the user has attempted the quiz

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const fetchQuiz = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
// // // // // // // // // //         if (quizDoc.exists()) {
// // // // // // // // // //           setQuiz(quizDoc.data());

// // // // // // // // // //           // Check if the student has already attempted this quiz
// // // // // // // // // //           const quizData = quizDoc.data();
// // // // // // // // // //           const userAttempts = quizData.results || [];
// // // // // // // // // //           const userHasAttempted = userAttempts.some(result => result.studentId === auth.currentUser.uid);

// // // // // // // // // //           setHasAttempted(userHasAttempted);
// // // // // // // // // //         } else {
// // // // // // // // // //           setError('Quiz not found');
// // // // // // // // // //         }
// // // // // // // // // //       } catch (err) {
// // // // // // // // // //         setError('Error fetching quiz');
// // // // // // // // // //         console.error(err);
// // // // // // // // // //       } finally {
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       }
// // // // // // // // // //     };

// // // // // // // // // //     fetchQuiz();
// // // // // // // // // //   }, [quizId]);

// // // // // // // // // //   const handleAnswer = (answerIndex) => {
// // // // // // // // // //     setUserAnswers([...userAnswers, answerIndex]);
// // // // // // // // // //     if (currentQuestion < quiz.questions.length - 1) {
// // // // // // // // // //       setCurrentQuestion(currentQuestion + 1);
// // // // // // // // // //     } else {
// // // // // // // // // //       submitQuiz();
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const submitQuiz = async () => {
// // // // // // // // // //     // Calculate the score
// // // // // // // // // //     const score = userAnswers.reduce((total, answer, index) => {
// // // // // // // // // //       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// // // // // // // // // //     }, 0);

// // // // // // // // // //     const percentage = (score / quiz.questions.length) * 100;

// // // // // // // // // //     // Correctly access the student's name from Firebase Auth
// // // // // // // // // //     const studentName = auth.currentUser.displayName ; //  Fallback to 'Anonymous' if displayName is not available

// // // // // // // // // //     // Prepare result data with detailed answers
// // // // // // // // // //     const resultData = {
// // // // // // // // // //       studentName: studentName,  // Use the correct displayName
// // // // // // // // // //       studentId: auth.currentUser.uid,
// // // // // // // // // //       score: score,
// // // // // // // // // //       totalQuestions: quiz.questions.length,
// // // // // // // // // //       percentage: percentage,
// // // // // // // // // //       answers: userAnswers.map((answerIndex, index) => ({
// // // // // // // // // //         questionId: quiz.questions[index].id,
// // // // // // // // // //         selectedAnswer: quiz.questions[index].options[answerIndex],
// // // // // // // // // //         correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer],
// // // // // // // // // //         isCorrect: answerIndex === quiz.questions[index].correctAnswer,
// // // // // // // // // //       })),
// // // // // // // // // //       submittedAt: new Date(),
// // // // // // // // // //     };

// // // // // // // // // //     try {
// // // // // // // // // //       // Update quiz document with the student's result
// // // // // // // // // //       await updateDoc(doc(db, 'quizzes', quizId), {
// // // // // // // // // //         results: arrayUnion(resultData),
// // // // // // // // // //       });
// // // // // // // // // //       // Navigate to results page
// // // // // // // // // //       navigate('/student', { state: { quizCompleted: true, score, totalQuestions: quiz.questions.length, percentage } });
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       setError('Error submitting quiz');
// // // // // // // // // //       console.error(err);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleGoBack = () => {
// // // // // // // // // //     // Go back to the quiz route or quiz list
// // // // // // // // // //     navigate('/student');
// // // // // // // // // //   };

// // // // // // // // // //   if (loading) {
// // // // // // // // // //     return <div className="text-center mt-8">Loading...</div>;
// // // // // // // // // //   }

// // // // // // // // // //   if (error) {
// // // // // // // // // //     return <div className="text-center mt-8 text-red-600">{error}</div>;
// // // // // // // // // //   }

// // // // // // // // // //   if (hasAttempted) {
// // // // // // // // // //     return (
// // // // // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // // // // //         <div className="text-center text-xl font-semibold text-gray-700">
// // // // // // // // // //           <h2>You have already attempted this quiz!</h2>
// // // // // // // // // //           <p className="mt-4">You cannot retake this quiz.</p>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="mt-6 text-center">
// // // // // // // // // //           <button
// // // // // // // // // //             onClick={handleGoBack}
// // // // // // // // // //             className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-150 ease-in-out"
// // // // // // // // // //           >
// // // // // // // // // //             Go Back to Quiz
// // // // // // // // // //           </button>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     );
// // // // // // // // // //   }

// // // // // // // // // //   const question = quiz.questions[currentQuestion];

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="container mx-auto px-4 py-8">
// // // // // // // // // //       <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
// // // // // // // // // //       <div className="bg-white shadow-md rounded-lg p-6">
// // // // // // // // // //         <div className="mb-4">
// // // // // // // // // //           <span className="text-lg font-semibold">Question {currentQuestion + 1} of {quiz.questions.length}</span>
// // // // // // // // // //         </div>
// // // // // // // // // //         <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
// // // // // // // // // //         <div className="space-y-2">
// // // // // // // // // //           {question.options.map((option, index) => (
// // // // // // // // // //             <button
// // // // // // // // // //               key={index}
// // // // // // // // // //               onClick={() => handleAnswer(index)}
// // // // // // // // // //               className="w-full text-left p-2 rounded bg-gray-100 hover:bg-gray-200 transition duration-150 ease-in-out"
// // // // // // // // // //             >
// // // // // // // // // //               {option}
// // // // // // // // // //             </button>
// // // // // // // // // //           ))}
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // // // // import { auth, db } from '../../firebase/firebase';
// // // // // // // // // import { doc, getDoc, updateDoc, arrayUnion, collection, addDoc } from 'firebase/firestore';

// // // // // // // // // export default function QuizTaking() {
// // // // // // // // //   const { quizId } = useParams();
// // // // // // // // //   const navigate = useNavigate();
// // // // // // // // //   const [quiz, setQuiz] = useState(null);
// // // // // // // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // // // // // // //   const [userAnswers, setUserAnswers] = useState([]);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [error, setError] = useState(null);
// // // // // // // // //   const [hasAttempted, setHasAttempted] = useState(false);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchQuiz = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
// // // // // // // // //         if (quizDoc.exists()) {
// // // // // // // // //           setQuiz(quizDoc.data());

// // // // // // // // //           // Check if the student has already attempted this quiz
// // // // // // // // //           const quizData = quizDoc.data();
// // // // // // // // //           const userAttempts = quizData.results || [];
// // // // // // // // //           const userHasAttempted = userAttempts.some(result => result.studentId === auth.currentUser.uid);

// // // // // // // // //           // Check user's attempted status in their profile as well
// // // // // // // // //           const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
// // // // // // // // //           if (userDoc.exists()) {
// // // // // // // // //             const attemptedQuizzes = userDoc.data().attemptedQuizzes || {};
// // // // // // // // //             setHasAttempted(userHasAttempted || attemptedQuizzes[quizId] === true);
// // // // // // // // //           }
// // // // // // // // //         } else {
// // // // // // // // //           setError('Quiz not found');
// // // // // // // // //         }
// // // // // // // // //       } catch (err) {
// // // // // // // // //         setError('Error fetching quiz');
// // // // // // // // //         console.error(err);
// // // // // // // // //       } finally {
// // // // // // // // //         setLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchQuiz();
// // // // // // // // //   }, [quizId]);

// // // // // // // // //   const handleAnswer = (answerIndex) => {
// // // // // // // // //     setUserAnswers([...userAnswers, answerIndex]);
// // // // // // // // //     if (currentQuestion < quiz.questions.length - 1) {
// // // // // // // // //       setCurrentQuestion(currentQuestion + 1);
// // // // // // // // //     } else {
// // // // // // // // //       submitQuiz();
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const submitQuiz = async () => {
// // // // // // // // //     const score = userAnswers.reduce((total, answer, index) => {
// // // // // // // // //       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// // // // // // // // //     }, 0);
// // // // // // // // //     const percentage = (score / quiz.questions.length) * 100;
// // // // // // // // //     const studentName = auth.currentUser.displayName || 'Anonymous';

// // // // // // // // //     const resultData = {
// // // // // // // // //       studentName: studentName,
// // // // // // // // //       studentId: auth.currentUser.uid,
// // // // // // // // //       score: score,
// // // // // // // // //       totalQuestions: quiz.questions.length,
// // // // // // // // //       percentage: percentage,
// // // // // // // // //       answers: userAnswers.map((answerIndex, index) => ({
// // // // // // // // //         questionId: quiz.questions[index].id,
// // // // // // // // //         selectedAnswer: quiz.questions[index].options[answerIndex],
// // // // // // // // //         correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer],
// // // // // // // // //         isCorrect: answerIndex === quiz.questions[index].correctAnswer,
// // // // // // // // //       })),
// // // // // // // // //       submittedAt: new Date(),
// // // // // // // // //     };

// // // // // // // // //     try {
// // // // // // // // //       // Update quiz document with the student's result
// // // // // // // // //       await updateDoc(doc(db, 'quizzes', quizId), {
// // // // // // // // //         results: arrayUnion(resultData),
// // // // // // // // //       });

// // // // // // // // //       // Add result to the allResults collection for easier data access and analysis
// // // // // // // // //       await addDoc(collection(db, 'allResults'), {
// // // // // // // // //         quizId: quizId,
// // // // // // // // //         ...resultData,
// // // // // // // // //       });

// // // // // // // // //       // Update the user's attempted status in their profile
// // // // // // // // //       await updateDoc(doc(db, 'users', auth.currentUser.uid), {
// // // // // // // // //         [`attemptedQuizzes.${quizId}`]: true,
// // // // // // // // //       });

// // // // // // // // //       navigate('/student', {
// // // // // // // // //         state: {
// // // // // // // // //           quizCompleted: true,
// // // // // // // // //           score,
// // // // // // // // //           totalQuestions: quiz.questions.length,
// // // // // // // // //           percentage,
// // // // // // // // //         },
// // // // // // // // //       });
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setError('Error submitting quiz');
// // // // // // // // //       console.error(err);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleGoBack = () => {
// // // // // // // // //     navigate('/student');
// // // // // // // // //   };

// // // // // // // // //   if (loading) {
// // // // // // // // //     return <div className="text-center mt-8">Loading...</div>;
// // // // // // // // //   }

// // // // // // // // //   if (error) {
// // // // // // // // //     return <div className="text-center mt-8 text-red-600">{error}</div>;
// // // // // // // // //   }

// // // // // // // // //   if (hasAttempted) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // // // //         <div className="text-center text-xl font-semibold text-gray-700">
// // // // // // // // //           <h2>You have already attempted this quiz!</h2>
// // // // // // // // //           <p className="mt-4">You cannot retake this quiz.</p>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="mt-6 text-center">
// // // // // // // // //           <button
// // // // // // // // //             onClick={handleGoBack}
// // // // // // // // //             className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-150 ease-in-out"
// // // // // // // // //           >
// // // // // // // // //             Go Back to Quiz
// // // // // // // // //           </button>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   const question = quiz.questions[currentQuestion];

// // // // // // // // //   return (
// // // // // // // // //     <div className="container mx-auto px-4 py-8">
// // // // // // // // //       <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
// // // // // // // // //       <div className="bg-white shadow-md rounded-lg p-6">
// // // // // // // // //         <div className="mb-4">
// // // // // // // // //           <span className="text-lg font-semibold">Question {currentQuestion + 1} of {quiz.questions.length}</span>
// // // // // // // // //         </div>
// // // // // // // // //         <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
// // // // // // // // //         <div className="space-y-2">
// // // // // // // // //           {question.options.map((option, index) => (
// // // // // // // // //             <button
// // // // // // // // //               key={index}
// // // // // // // // //               onClick={() => handleAnswer(index)}
// // // // // // // // //               className="w-full text-left p-2 rounded bg-gray-100 hover:bg-gray-200 transition duration-150 ease-in-out"
// // // // // // // // //             >
// // // // // // // // //               {option}
// // // // // // // // //             </button>
// // // // // // // // //           ))}
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // // // import { auth, db } from '../../firebase/firebase';
// // // // // // // // import { doc, getDoc, updateDoc, arrayUnion, collection, addDoc } from 'firebase/firestore';

// // // // // // // // export default function QuizTaking() {
// // // // // // // //   const { quizId } = useParams();
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const [quiz, setQuiz] = useState(null);
// // // // // // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // // // // // //   const [userAnswers, setUserAnswers] = useState([]);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [error, setError] = useState(null);
// // // // // // // //   const [hasAttempted, setHasAttempted] = useState(false);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchQuiz = async () => {
// // // // // // // //       try {
// // // // // // // //         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
// // // // // // // //         if (quizDoc.exists()) {
// // // // // // // //           setQuiz(quizDoc.data());

// // // // // // // //           // Check if the student has already attempted this quiz
// // // // // // // //           const quizData = quizDoc.data();
// // // // // // // //           const userAttempts = quizData.results || [];
// // // // // // // //           const userHasAttempted = userAttempts.some(result => result.studentId === auth.currentUser.uid);

// // // // // // // //           // Check user's attempted status in their profile as well
// // // // // // // //           const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
// // // // // // // //           if (userDoc.exists()) {
// // // // // // // //             const attemptedQuizzes = userDoc.data().attemptedQuizzes || {};
// // // // // // // //             setHasAttempted(userHasAttempted || attemptedQuizzes[quizId] === true);
// // // // // // // //           }
// // // // // // // //         } else {
// // // // // // // //           setError('Quiz not found');
// // // // // // // //         }
// // // // // // // //       } catch (err) {
// // // // // // // //         setError('Error fetching quiz');
// // // // // // // //         console.error(err);
// // // // // // // //       } finally {
// // // // // // // //         setLoading(false);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchQuiz();
// // // // // // // //   }, [quizId]);

// // // // // // // //   const handleAnswer = (answerIndex) => {
// // // // // // // //     setUserAnswers([...userAnswers, answerIndex]);
// // // // // // // //     if (currentQuestion < quiz.questions.length - 1) {
// // // // // // // //       setCurrentQuestion(currentQuestion + 1);
// // // // // // // //     } else {
// // // // // // // //       submitQuiz();
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // const submitQuiz = async () => {
// // // // // // // //   //   const score = userAnswers.reduce((total, answer, index) => {
// // // // // // // //   //     return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// // // // // // // //   //   }, 0);
// // // // // // // //   //   const percentage = (score / quiz.questions.length) * 100;
// // // // // // // //   //   const studentName = auth.currentUser.displayName || 'Anonymous';

// // // // // // // //   //   const resultData = {
// // // // // // // //   //     studentName: studentName,
// // // // // // // //   //     studentId: auth.currentUser.uid,
// // // // // // // //   //     score: score,
// // // // // // // //   //     totalQuestions: quiz.questions.length,
// // // // // // // //   //     percentage: percentage,
// // // // // // // //   //     answers: userAnswers.map((answerIndex, index) => ({
// // // // // // // //   //       questionId: quiz.questions[index].id,
// // // // // // // //   //       selectedAnswer: quiz.questions[index].options[answerIndex],
// // // // // // // //   //       correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer],
// // // // // // // //   //       isCorrect: answerIndex === quiz.questions[index].correctAnswer,
// // // // // // // //   //     })),
// // // // // // // //   //     submittedAt: new Date(),
// // // // // // // //   //   };

// // // // // // // //   //   try {
// // // // // // // //   //     // Add result to the allResults collection for easier data access and analysis
// // // // // // // //   //     const allResultDocRef = await addDoc(collection(db, 'allResults'), {
// // // // // // // //   //       quizId: quizId,
// // // // // // // //   //       ...resultData,
// // // // // // // //   //     });

// // // // // // // //   //     // Update quiz document with the student's result
// // // // // // // //   //     await updateDoc(doc(db, 'quizzes', quizId), {
// // // // // // // //   //       results: arrayUnion(resultData),
// // // // // // // //   //     });

// // // // // // // //   //     // Add result reference to the user's attemptedQuizzes field
// // // // // // // //   //     await updateDoc(doc(db, 'users', auth.currentUser.uid), {
// // // // // // // //   //       [`attemptedQuizzes.${quizId}`]: {
// // // // // // // //   //         attempted: true,
// // // // // // // //   //         resultId: allResultDocRef.id,  // Add the result document ID here
// // // // // // // //   //       },
// // // // // // // //   //     });

// // // // // // // //   //     navigate('/student', {
// // // // // // // //   //       state: {
// // // // // // // //   //         quizCompleted: true,
// // // // // // // //   //         score,
// // // // // // // //   //         totalQuestions: quiz.questions.length,
// // // // // // // //   //         percentage,
// // // // // // // //   //       },
// // // // // // // //   //     });
// // // // // // // //   //   } catch (err) {
// // // // // // // //   //     setError('Error submitting quiz');
// // // // // // // //   //     console.error(err);
// // // // // // // //   //   }
// // // // // // // //   // };
// // // // // // // //   const submitQuiz = async () => {
// // // // // // // //     const score = userAnswers.reduce((total, answer, index) => {
// // // // // // // //       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// // // // // // // //     }, 0);
// // // // // // // //     const percentage = (score / quiz.questions.length) * 100;
// // // // // // // //     const studentName = auth.currentUser.displayName || 'Anonymous';

// // // // // // // //     const resultData = {
// // // // // // // //       studentName: studentName,
// // // // // // // //       studentId: auth.currentUser.uid,
// // // // // // // //       score: score,
// // // // // // // //       totalQuestions: quiz.questions.length,
// // // // // // // //       percentage: percentage,
// // // // // // // //       answers: userAnswers.map((answerIndex, index) => ({
// // // // // // // //         questionId: quiz.questions[index].id || `question_${index + 1}`,
// // // // // // // //         selectedAnswer: quiz.questions[index].options[answerIndex] || '',
// // // // // // // //         correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer] || '',
// // // // // // // //         isCorrect: answerIndex === quiz.questions[index].correctAnswer,
// // // // // // // //       })),
// // // // // // // //       submittedAt: new Date(),
// // // // // // // //     };

// // // // // // // //     try {
// // // // // // // //       // Add result to the allResults collection for easier data access and analysis
// // // // // // // //       const allResultDocRef = await addDoc(collection(db, 'allResults'), {
// // // // // // // //         quizId: quizId,
// // // // // // // //         ...resultData,
// // // // // // // //       });

// // // // // // // //       // Update quiz document with the student's result
// // // // // // // //       await updateDoc(doc(db, 'quizzes', quizId), {
// // // // // // // //         results: arrayUnion(resultData),
// // // // // // // //       });

// // // // // // // //       // Add result reference to the user's attemptedQuizzes field
// // // // // // // //       await updateDoc(doc(db, 'users', auth.currentUser.uid), {
// // // // // // // //         [`attemptedQuizzes.${quizId}`]: {
// // // // // // // //           attempted: true,
// // // // // // // //           resultId: allResultDocRef.id,
// // // // // // // //         },
// // // // // // // //       });

// // // // // // // //       navigate('/student', {
// // // // // // // //         state: {
// // // // // // // //           quizCompleted: true,
// // // // // // // //           score,
// // // // // // // //           totalQuestions: quiz.questions.length,
// // // // // // // //           percentage,
// // // // // // // //         },
// // // // // // // //       });
// // // // // // // //     } catch (err) {
// // // // // // // //       setError('Error submitting quiz');
// // // // // // // //       console.error(err);
// // // // // // // //     }
// // // // // // // //   };
// // // // // // // //   const handleGoBack = () => {
// // // // // // // //     navigate('/student');
// // // // // // // //   };

// // // // // // // //   if (loading) {
// // // // // // // //     return <div className="text-center mt-8">Loading...</div>;
// // // // // // // //   }

// // // // // // // //   if (error) {
// // // // // // // //     return <div className="text-center mt-8 text-red-600">{error}</div>;
// // // // // // // //   }

// // // // // // // //   if (hasAttempted) {
// // // // // // // //     return (
// // // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // // //         <div className="text-center text-xl font-semibold text-gray-700">
// // // // // // // //           <h2>You have already attempted this quiz!</h2>
// // // // // // // //           <p className="mt-4">You cannot retake this quiz.</p>
// // // // // // // //         </div>
// // // // // // // //         <div className="mt-6 text-center">
// // // // // // // //           <button
// // // // // // // //             onClick={handleGoBack}
// // // // // // // //             className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-150 ease-in-out"
// // // // // // // //           >
// // // // // // // //             Go Back to Quiz
// // // // // // // //           </button>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   const question = quiz.questions[currentQuestion];

// // // // // // // //   return (
// // // // // // // //     <div className="container mx-auto px-4 py-8">
// // // // // // // //       <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
// // // // // // // //       <div className="bg-white shadow-md rounded-lg p-6">
// // // // // // // //         <div className="mb-4">
// // // // // // // //           <span className="text-lg font-semibold">Question {currentQuestion + 1} of {quiz.questions.length}</span>
// // // // // // // //         </div>
// // // // // // // //         <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
// // // // // // // //         <div className="space-y-2">
// // // // // // // //           {question.options.map((option, index) => (
// // // // // // // //             <button
// // // // // // // //               key={index}
// // // // // // // //               onClick={() => handleAnswer(index)}
// // // // // // // //               className="w-full text-left p-2 rounded bg-gray-100 hover:bg-gray-200 transition duration-150 ease-in-out"
// // // // // // // //             >
// // // // // // // //               {option}
// // // // // // // //             </button>
// // // // // // // //           ))}
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // // // import { auth, db } from "../../firebase/firebase";
// // // // // // // import { doc, getDoc, updateDoc, arrayUnion, collection, addDoc } from "firebase/firestore";

// // // // // // // export default function QuizTaking() {
// // // // // // //   const { quizId } = useParams();
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const [quiz, setQuiz] = useState(null);
// // // // // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // // // // //   const [userAnswers, setUserAnswers] = useState([]);
// // // // // // //   const [timeLeft, setTimeLeft] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [error, setError] = useState(null);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchQuiz = async () => {
// // // // // // //       try {
// // // // // // //         const quizDoc = await getDoc(doc(db, "quizzes", quizId));
// // // // // // //         if (quizDoc.exists()) {
// // // // // // //           setQuiz(quizDoc.data());
// // // // // // //           setTimeLeft(quizDoc.data().questions[0].timer); // Set initial timer
// // // // // // //         } else {
// // // // // // //           setError("Quiz not found");
// // // // // // //         }
// // // // // // //       } catch (err) {
// // // // // // //         setError("Error fetching quiz");
// // // // // // //         console.error(err);
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };
// // // // // // //     fetchQuiz();
// // // // // // //   }, [quizId]);

// // // // // // //   useEffect(() => {
// // // // // // //     if (timeLeft === 0) {
// // // // // // //       handleAnswer(null); // Move to the next question when time runs out
// // // // // // //     }
// // // // // // //     const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
// // // // // // //     return () => clearInterval(timer);
// // // // // // //   }, [timeLeft]);

// // // // // // //   const handleAnswer = (answerIndex) => {
// // // // // // //     setUserAnswers([...userAnswers, answerIndex]);
// // // // // // //     if (currentQuestion < quiz.questions.length - 1) {
// // // // // // //       setCurrentQuestion(currentQuestion + 1);
// // // // // // //       setTimeLeft(quiz.questions[currentQuestion + 1].timer);
// // // // // // //     } else {
// // // // // // //       submitQuiz();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const submitQuiz = async () => {
// // // // // // //     const score = userAnswers.reduce((total, answer, index) => {
// // // // // // //       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// // // // // // //     }, 0);
// // // // // // //     const percentage = (score / quiz.questions.length) * 100;

// // // // // // //     const resultData = {
// // // // // // //       studentId: auth.currentUser.uid,
// // // // // // //       score,
// // // // // // //       totalQuestions: quiz.questions.length,
// // // // // // //       percentage,
// // // // // // //       answers: userAnswers.map((answerIndex, index) => ({
// // // // // // //         questionId: quiz.questions[index].id || `question_${index + 1}`,
// // // // // // //         selectedAnswer: quiz.questions[index].options[answerIndex] || "",
// // // // // // //         correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer] || "",
// // // // // // //         isCorrect: answerIndex === quiz.questions[index].correctAnswer,
// // // // // // //       })),
// // // // // // //       submittedAt: new Date(),
// // // // // // //     };

// // // // // // //     try {
// // // // // // //       const allResultDocRef = await addDoc(collection(db, "allResults"), { quizId, ...resultData });
// // // // // // //       await updateDoc(doc(db, "quizzes", quizId), { studentResults: arrayUnion(allResultDocRef.id) });
// // // // // // //       navigate(`/student/quiz-completed/${quizId}`, { state: { score, percentage } });
// // // // // // //     } catch (err) {
// // // // // // //       setError("Error submitting quiz");
// // // // // // //       console.error(err);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   if (loading) return <p>Loading...</p>;
// // // // // // //   if (error) return <p>{error}</p>;

// // // // // // //   return (
// // // // // // //     <div>
// // // // // // //       <h1 className="text-2xl font-bold">{quiz.title}</h1>
// // // // // // //       <p className="text-gray-700">{quiz.description}</p>
// // // // // // //       <div className="mt-8">
// // // // // // //         <h2 className="text-xl font-semibold mb-4">{quiz.questions[currentQuestion].question}</h2>
// // // // // // //         <div>
// // // // // // //           {quiz.questions[currentQuestion].options.map((option, index) => (
// // // // // // //             <button
// // // // // // //               key={index}
// // // // // // //               onClick={() => handleAnswer(index)}
// // // // // // //               className="block w-full bg-blue-500 text-white py-2 px-4 mb-2 rounded"
// // // // // // //             >
// // // // // // //               {option}
// // // // // // //             </button>
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //         <p className="text-right text-red-600 font-bold">Time Left: {timeLeft}s</p>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // // import { auth, db } from "../../firebase/firebase";
// // // // // // import { doc, getDoc, updateDoc, arrayUnion, collection, addDoc } from "firebase/firestore";

// // // // // // export default function QuizTaking() {
// // // // // //   const { quizId } = useParams();
// // // // // //   const navigate = useNavigate();
// // // // // //   const [quiz, setQuiz] = useState(null);
// // // // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // // // //   const [userAnswers, setUserAnswers] = useState([]);
// // // // // //   const [timeLeft, setTimeLeft] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     // Attempt to make the page full screen when the component mounts
// // // // // //     if (document.documentElement.requestFullscreen) {
// // // // // //       document.documentElement.requestFullscreen().catch((err) => {
// // // // // //         console.error("Error entering fullscreen mode:", err);
// // // // // //       });
// // // // // //     }

// // // // // //     // Event listener for page visibility change
// // // // // //     const handleVisibilityChange = () => {
// // // // // //       if (document.hidden) {
// // // // // //         // Redirect to home page if the user tries to navigate away
// // // // // //         navigate("/student");
// // // // // //       }
// // // // // //     };
// // // // // //     document.addEventListener("visibilitychange", handleVisibilityChange);

// // // // // //     const fetchQuiz = async () => {
// // // // // //       try {
// // // // // //         const quizDoc = await getDoc(doc(db, "quizzes", quizId));
// // // // // //         if (quizDoc.exists()) {
// // // // // //           setQuiz(quizDoc.data());
// // // // // //           setTimeLeft(quizDoc.data().questions[0].timer); // Set initial timer
// // // // // //         } else {
// // // // // //           setError("Quiz not found");
// // // // // //         }
// // // // // //       } catch (err) {
// // // // // //         setError("Error fetching quiz");
// // // // // //         console.error(err);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchQuiz();

// // // // // //     return () => {
// // // // // //       document.removeEventListener("visibilitychange", handleVisibilityChange);
// // // // // //       // Exit fullscreen when the component unmounts
// // // // // //       if (document.exitFullscreen) {
// // // // // //         document.exitFullscreen().catch((err) => {
// // // // // //           console.error("Error exiting fullscreen mode:", err);
// // // // // //         });
// // // // // //       }
// // // // // //     };
// // // // // //   }, [quizId, navigate]);

// // // // // //   useEffect(() => {
// // // // // //     if (timeLeft === 0) {
// // // // // //       handleAnswer(null); // Move to the next question when time runs out
// // // // // //     }
// // // // // //     const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
// // // // // //     return () => clearInterval(timer);
// // // // // //   }, [timeLeft]);

// // // // // //   const handleAnswer = (answerIndex) => {
// // // // // //     setUserAnswers([...userAnswers, answerIndex]);
// // // // // //     if (currentQuestion < quiz.questions.length - 1) {
// // // // // //       setCurrentQuestion(currentQuestion + 1);
// // // // // //       setTimeLeft(quiz.questions[currentQuestion + 1].timer);
// // // // // //     } else {
// // // // // //       submitQuiz();
// // // // // //     }
// // // // // //   };

// // // // // //   const submitQuiz = async () => {
// // // // // //     const score = userAnswers.reduce((total, answer, index) => {
// // // // // //       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// // // // // //     }, 0);
// // // // // //     const percentage = (score / quiz.questions.length) * 100;

// // // // // //     const resultData = {
// // // // // //       studentId: auth.currentUser.uid,
// // // // // //       score,
// // // // // //       totalQuestions: quiz.questions.length,
// // // // // //       percentage,
// // // // // //       answers: userAnswers.map((answerIndex, index) => ({
// // // // // //         questionId: quiz.questions[index].id || `question_${index + 1}`,
// // // // // //         selectedAnswer: quiz.questions[index].options[answerIndex] || "",
// // // // // //         correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer] || "",
// // // // // //         isCorrect: answerIndex === quiz.questions[index].correctAnswer,
// // // // // //       })),
// // // // // //       submittedAt: new Date(),
// // // // // //     };

// // // // // //     try {
// // // // // //       const allResultDocRef = await addDoc(collection(db, "allResults"), { quizId, ...resultData });
// // // // // //       await updateDoc(doc(db, "quizzes", quizId), { studentResults: arrayUnion(allResultDocRef.id) });
// // // // // //       navigate(`/student/quiz-completed/${quizId}`, { state: { score, percentage } });
// // // // // //     } catch (err) {
// // // // // //       setError("Error submitting quiz");
// // // // // //       console.error(err);
// // // // // //     }
// // // // // //   };

// // // // // //   if (loading) return <p>Loading...</p>;
// // // // // //   if (error) return <p>{error}</p>;

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <h1 className="text-2xl font-bold">{quiz.title}</h1>
// // // // // //       <p className="text-gray-700">{quiz.description}</p>
// // // // // //       <div className="mt-8">
// // // // // //         <h2 className="text-xl font-semibold mb-4">{quiz.questions[currentQuestion].question}</h2>
// // // // // //         <div>
// // // // // //           {quiz.questions[currentQuestion].options.map((option, index) => (
// // // // // //             <button
// // // // // //               key={index}
// // // // // //               onClick={() => handleAnswer(index)}
// // // // // //               className="block w-full bg-blue-500 text-white py-2 px-4 mb-2 rounded"
// // // // // //             >
// // // // // //               {option}
// // // // // //             </button>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //         <p className="text-right text-red-600 font-bold">Time Left: {timeLeft}s</p>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // import React, { useState, useEffect } from "react";
// // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // import { auth, db } from "../../firebase/firebase";
// // // // // import { doc, getDoc, updateDoc, arrayUnion, collection, addDoc } from "firebase/firestore";

// // // // // export default function QuizTaking() {
// // // // //   const { quizId } = useParams();
// // // // //   const navigate = useNavigate();
// // // // //   const [quiz, setQuiz] = useState(null);
// // // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // // //   const [userAnswers, setUserAnswers] = useState([]);
// // // // //   const [attempted, setAttempted] = useState(0);
// // // // //   const [timeLeft, setTimeLeft] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);

// // // // //   useEffect(() => {
// // // // //     // Enter full screen on load
// // // // //     if (document.documentElement.requestFullscreen) {
// // // // //       document.documentElement.requestFullscreen().catch((err) => {
// // // // //         console.error("Error entering fullscreen mode:", err);
// // // // //       });
// // // // //     }

// // // // //     // Redirect to home page if user changes tab
// // // // //     const handleVisibilityChange = () => {
// // // // //       if (document.hidden) {
// // // // //         navigate("/");
// // // // //       }
// // // // //     };
// // // // //     document.addEventListener("visibilitychange", handleVisibilityChange);

// // // // //     // Fetch quiz data from Firestore
// // // // //     const fetchQuiz = async () => {
// // // // //       try {
// // // // //         const quizDoc = await getDoc(doc(db, "quizzes", quizId));
// // // // //         if (quizDoc.exists()) {
// // // // //           setQuiz(quizDoc.data());
// // // // //           setTimeLeft(quizDoc.data().questions[0].timer); // Set initial timer
// // // // //         } else {
// // // // //           setError("Quiz not found");
// // // // //         }
// // // // //       } catch (err) {
// // // // //         setError("Error fetching quiz");
// // // // //         console.error(err);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchQuiz();

// // // // //     // Clean up event listeners and fullscreen on unmount
// // // // //     return () => {
// // // // //       document.removeEventListener("visibilitychange", handleVisibilityChange);
// // // // //       if (document.exitFullscreen) {
// // // // //         document.exitFullscreen().catch((err) => {
// // // // //           console.error("Error exiting fullscreen mode:", err);
// // // // //         });
// // // // //       }
// // // // //     };
// // // // //   }, [quizId, navigate]);

// // // // //   useEffect(() => {
// // // // //     if (timeLeft === 0) {
// // // // //       handleAnswer(null); // Move to the next question when time runs out
// // // // //     }
// // // // //     const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
// // // // //     return () => clearInterval(timer);
// // // // //   }, [timeLeft]);

// // // // //   const handleAnswer = (answerIndex) => {
// // // // //     setUserAnswers([...userAnswers, answerIndex]);
// // // // //     setAttempted(attempted + 1);
// // // // //     if (currentQuestion < quiz.questions.length - 1) {
// // // // //       setCurrentQuestion(currentQuestion + 1);
// // // // //       setTimeLeft(quiz.questions[currentQuestion + 1].timer);
// // // // //     } else {
// // // // //       submitQuiz();
// // // // //     }
// // // // //   };

// // // // //   const submitQuiz = async () => {
// // // // //     const score = userAnswers.reduce((total, answer, index) => {
// // // // //       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// // // // //     }, 0);
// // // // //     const percentage = (score / quiz.questions.length) * 100;

// // // // //     const resultData = {
// // // // //       studentId: auth.currentUser.uid,
// // // // //       score,
// // // // //       totalQuestions: quiz.questions.length,
// // // // //       percentage,
// // // // //       attempted,
// // // // //       answers: userAnswers.map((answerIndex, index) => ({
// // // // //         questionId: quiz.questions[index].id || `question_${index + 1}`,
// // // // //         selectedAnswer: quiz.questions[index].options[answerIndex] || "",
// // // // //         correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer] || "",
// // // // //         isCorrect: answerIndex === quiz.questions[index].correctAnswer,
// // // // //       })),
// // // // //       submittedAt: new Date(),
// // // // //     };

// // // // //     try {
// // // // //       const allResultDocRef = await addDoc(collection(db, "allResults"), { quizId, ...resultData });
// // // // //       await updateDoc(doc(db, "quizzes", quizId), { studentResults: arrayUnion(allResultDocRef.id) });
// // // // //       navigate(`/student/quiz-completed/${quizId}`, { state: { score, percentage } });
// // // // //     } catch (err) {
// // // // //       setError("Error submitting quiz");
// // // // //       console.error(err);
// // // // //     }
// // // // //   };

// // // // //   if (loading) return <p>Loading...</p>;
// // // // //   if (error) return <p>{error}</p>;

// // // // //   return (
// // // // //     <div>
// // // // //       <h1 className="text-2xl font-bold">{quiz.title}</h1>
// // // // //       <p className="text-gray-700">{quiz.description}</p>
// // // // //       <div className="mt-8">
// // // // //         <h2 className="text-xl font-semibold mb-4">{quiz.questions[currentQuestion].question}</h2>
// // // // //         <div>
// // // // //           {quiz.questions[currentQuestion].options.map((option, index) => (
// // // // //             <button
// // // // //               key={index}
// // // // //               onClick={() => handleAnswer(index)}
// // // // //               className="block w-full bg-blue-500 text-white py-2 px-4 mb-2 rounded"
// // // // //             >
// // // // //               {option}
// // // // //             </button>
// // // // //           ))}
// // // // //         </div>
// // // // //         <p className="text-right text-red-600 font-bold">Time Left: {timeLeft}s</p>
// // // // //         <p className="text-right text-green-600">Attempted: {attempted}/{quiz.questions.length}</p>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import React, { useState, useEffect } from "react";
// // // // import { useParams, useNavigate } from "react-router-dom";
// // // // import { auth, db } from "../../firebase/firebase";
// // // // import { doc, getDoc, updateDoc, arrayUnion, collection, addDoc } from "firebase/firestore";

// // // // export default function QuizTaking() {
// // // //   const { quizId } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const [quiz, setQuiz] = useState(null);
// // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // //   const [userAnswers, setUserAnswers] = useState([]);
// // // //   const [attempted, setAttempted] = useState(0);
// // // //   const [timeLeft, setTimeLeft] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [submitting, setSubmitting] = useState(false);
// // // //   const [error, setError] = useState(null);
// // // //   const [isAnswered, setIsAnswered] = useState(false);

// // // //   useEffect(() => {
// // // //     // Enter full screen on load
// // // //     if (document.documentElement.requestFullscreen) {
// // // //       document.documentElement.requestFullscreen().catch((err) => {
// // // //         console.error("Error entering fullscreen mode:", err);
// // // //       });
// // // //     }

// // // //     // Redirect to home page if user changes tab
// // // //     const handleVisibilityChange = () => {
// // // //       if (document.hidden) {
// // // //         navigate("/");
// // // //       }
// // // //     };
// // // //     document.addEventListener("visibilitychange", handleVisibilityChange);

// // // //     // Fetch quiz data from Firestore
// // // //     const fetchQuiz = async () => {
// // // //       try {
// // // //         const quizDoc = await getDoc(doc(db, "quizzes", quizId));
// // // //         if (quizDoc.exists()) {
// // // //           setQuiz(quizDoc.data());
// // // //           setTimeLeft(quizDoc.data().questions[0].timer); // Set initial timer
// // // //         } else {
// // // //           setError("Quiz not found");
// // // //         }
// // // //       } catch (err) {
// // // //         setError("Error fetching quiz");
// // // //         console.error(err);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchQuiz();

// // // //     // Clean up event listeners and fullscreen on unmount
// // // //     return () => {
// // // //       document.removeEventListener("visibilitychange", handleVisibilityChange);
// // // //       if (document.exitFullscreen) {
// // // //         document.exitFullscreen().catch((err) => {
// // // //           console.error("Error exiting fullscreen mode:", err);
// // // //         });
// // // //       }
// // // //     };
// // // //   }, [quizId, navigate]);

// // // //   useEffect(() => {
// // // //     if (timeLeft === 0) {
// // // //       handleAnswer(null); // Move to the next question when time runs out
// // // //     }
// // // //     const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
// // // //     return () => clearInterval(timer);
// // // //   }, [timeLeft]);

// // // //   const handleAnswer = (answerIndex) => {
// // // //     if (isAnswered) return; // Prevent double answering
// // // //     setUserAnswers([...userAnswers, answerIndex]);
// // // //     setAttempted(attempted + 1);
// // // //     setIsAnswered(true); // Disable answering until question changes
// // // //     setTimeout(() => setIsAnswered(false), 500); // Re-enable after a short delay

// // // //     if (currentQuestion < quiz.questions.length - 1) {
// // // //       setCurrentQuestion(currentQuestion + 1);
// // // //       setTimeLeft(quiz.questions[currentQuestion + 1].timer);
// // // //     } else {
// // // //       submitQuiz();
// // // //     }
// // // //   };

// // // //   const submitQuiz = async () => {
// // // //     setSubmitting(true);
// // // //     const score = userAnswers.reduce((total, answer, index) => {
// // // //       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// // // //     }, 0);
// // // //     const percentage = (score / quiz.questions.length) * 100;

// // // //     const resultData = {
// // // //       studentId: auth.currentUser.uid,
// // // //       score,
// // // //       totalQuestions: quiz.questions.length,
// // // //       percentage,
// // // //       attempted,
// // // //       answers: userAnswers.map((answerIndex, index) => ({
// // // //         questionId: quiz.questions[index].id || `question_${index + 1}`,
// // // //         selectedAnswer: quiz.questions[index].options[answerIndex] || "",
// // // //         correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer] || "",
// // // //         isCorrect: answerIndex === quiz.questions[index].correctAnswer,
// // // //       })),
// // // //       submittedAt: new Date(),
// // // //     };

// // // //     try {
// // // //       const allResultDocRef = await addDoc(collection(db, "allResults"), { quizId, ...resultData });
// // // //       await updateDoc(doc(db, "quizzes", quizId), { studentResults: arrayUnion(allResultDocRef.id) });
// // // //       navigate(`/student/quiz-completed/${quizId}`, { state: { score, percentage } });
// // // //     } catch (err) {
// // // //       setError("Error submitting quiz");
// // // //       console.error(err);
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   if (loading) return <p>Loading...</p>;
// // // //   if (error) return <p>{error}</p>;

// // // //   return (
// // // //     <div className="p-6 bg-white min-h-screen flex flex-col justify-center items-center">
// // // //       <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
// // // //       <p className="text-gray-600 mb-4">{quiz.description}</p>
// // // //       <div className="w-full max-w-md">
// // // //         <h2 className="text-xl font-semibold mb-4">
// // // //           {currentQuestion + 1}. {quiz.questions[currentQuestion].question}
// // // //         </h2>
// // // //         <div>
// // // //           {quiz.questions[currentQuestion].options.map((option, index) => (
// // // //             <button
// // // //               key={index}
// // // //               onClick={() => handleAnswer(index)}
// // // //               disabled={isAnswered} // Disable button if already answered
// // // //               className={`block w-full py-2 px-4 mb-2 rounded ${
// // // //                 isAnswered ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
// // // //               } text-white`}
// // // //             >
// // // //               {option}
// // // //             </button>
// // // //           ))}
// // // //         </div>
// // // //         <p className="text-right text-red-600 font-bold">Time Left: {timeLeft}s</p>
// // // //         <p className="text-right text-green-600">Attempted: {attempted}/{quiz.questions.length}</p>
// // // //       </div>
// // // //       {submitting && <p className="mt-4 text-lg text-blue-600">Submitting your answers...</p>}
// // // //     </div>
// // // //   );
// // // // }

// // // import React, { useState, useEffect } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { auth, db } from "../../firebase/firebase";
// // // import { doc, getDoc, updateDoc, arrayUnion, collection, addDoc } from "firebase/firestore";

// // // export default function QuizTaking() {
// // //   const { quizId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [quiz, setQuiz] = useState(null);
// // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // //   const [userAnswers, setUserAnswers] = useState([]);
// // //   const [attempted, setAttempted] = useState(0);
// // //   const [timeLeft, setTimeLeft] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [isAnswered, setIsAnswered] = useState(false);

// // //   useEffect(() => {
// // //     // Enter full screen on load
// // //     if (document.documentElement.requestFullscreen) {
// // //       document.documentElement.requestFullscreen().catch((err) => {
// // //         console.error("Error entering fullscreen mode:", err);
// // //       });
// // //     }

// // //     // Redirect to home page if user changes tab
// // //     const handleVisibilityChange = () => {
// // //       if (document.hidden) {
// // //         navigate("/student");
// // //       }
// // //     };
// // //     document.addEventListener("visibilitychange", handleVisibilityChange);

// // //     // Fetch quiz data from Firestore
// // //     const fetchQuiz = async () => {
// // //       try {
// // //         const quizDoc = await getDoc(doc(db, "quizzes", quizId));
// // //         if (quizDoc.exists()) {
// // //           setQuiz(quizDoc.data());
// // //           setTimeLeft(quizDoc.data().questions[0].timer); // Set initial timer
// // //         } else {
// // //           setError("Quiz not found");
// // //         }
// // //       } catch (err) {
// // //         setError("Error fetching quiz");
// // //         console.error(err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchQuiz();

// // //     // Clean up event listeners and fullscreen on unmount
// // //     return () => {
// // //       document.removeEventListener("visibilitychange", handleVisibilityChange);
// // //       if (document.exitFullscreen) {
// // //         document.exitFullscreen().catch((err) => {
// // //           console.error("Error exiting fullscreen mode:", err);
// // //         });
// // //       }
// // //     };
// // //   }, [quizId, navigate]);

// // //   useEffect(() => {
// // //     if (timeLeft === 0) {
// // //       handleAnswer(null); // Move to the next question when time runs out
// // //     }
// // //     const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
// // //     return () => clearInterval(timer);
// // //   }, [timeLeft]);

// // //   const handleAnswer = async (answerIndex) => {
// // //     if (isAnswered) return; // Prevent double answering
// // //     setUserAnswers([...userAnswers, answerIndex]);
// // //     setAttempted(attempted + 1);
// // //     setIsAnswered(true); // Disable answering until question changes
// // //     setTimeout(() => setIsAnswered(false), 500); // Re-enable after a short delay

// // //     // Create a detailed result for this question
// // //     await storeAnswerDetail(answerIndex);

// // //     if (currentQuestion < quiz.questions.length - 1) {
// // //       setCurrentQuestion(currentQuestion + 1);
// // //       setTimeLeft(quiz.questions[currentQuestion + 1].timer);
// // //     } else {
// // //       submitQuiz();
// // //     }
// // //   };

// // //   const storeAnswerDetail = async (answerIndex) => {
// // //     try {
// // //       const question = quiz.questions[currentQuestion];
// // //       const isCorrect = answerIndex === question.correctAnswer;
// // //       const resultData = {
// // //         studentId: auth.currentUser.uid,
// // //         quizId: quizId,
// // //         currentQuestionId: question.id || `question_${currentQuestion + 1}`,
// // //         selectedAnswer: question.options[answerIndex] || "",
// // //         correctAnswer: question.options[question.correctAnswer] || "",
// // //         isCorrect,
// // //         submittedAt: new Date(),
// // //       };

// // //       // Store the answer details in Firestore in the "resultDetails" collection
// // //       await addDoc(collection(db, "resultDetails"), resultData);
// // //     } catch (err) {
// // //       console.error("Error storing answer detail:", err);
// // //     }
// // //   };

// // //   const submitQuiz = async () => {
// // //     setSubmitting(true);
// // //     const score = userAnswers.reduce((total, answer, index) => {
// // //       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// // //     }, 0);
// // //     const percentage = (score / quiz.questions.length) * 100;

// // //     const resultData = {
// // //       studentId: auth.currentUser.uid,
// // //       score,
// // //       totalQuestions: quiz.questions.length,
// // //       percentage,
// // //       attempted,
// // //       answers: userAnswers.map((answerIndex, index) => ({
// // //         questionId: quiz.questions[index].id || `question_${index + 1}`,
// // //         selectedAnswer: quiz.questions[index].options[answerIndex] || "",
// // //         correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer] || "",
// // //         isCorrect: answerIndex === quiz.questions[index].correctAnswer,
// // //       })),
// // //       submittedAt: new Date(),
// // //     };

// // //     try {
// // //       const allResultDocRef = await addDoc(collection(db, "allResults"), { quizId, ...resultData });
// // //       await updateDoc(doc(db, "quizzes", quizId), { studentResults: arrayUnion(allResultDocRef.id) });
// // //       navigate(`/student/quiz-completed/${quizId}`, { state: { score, percentage } });
// // //     } catch (err) {
// // //       setError("Error submitting quiz");
// // //       console.error(err);
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   if (loading) return <p>Loading...</p>;
// // //   if (error) return <p>{error}</p>;

// // //   return (
// // //     <div className="p-6 bg-white min-h-screen flex flex-col justify-center items-center">
// // //       <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
// // //       <p className="text-gray-600 mb-4">{quiz.description}</p>
// // //       <div className="w-full max-w-md">
// // //         <h2 className="text-xl font-semibold mb-4">
// // //           {currentQuestion + 1}. {quiz.questions[currentQuestion].question}
// // //         </h2>
// // //         <div>
// // //           {quiz.questions[currentQuestion].options.map((option, index) => (
// // //             <button
// // //               key={index}
// // //               onClick={() => handleAnswer(index)}
// // //               disabled={isAnswered} // Disable button if already answered
// // //               className={`block w-full py-2 px-4 mb-2 rounded ${
// // //                 isAnswered ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
// // //               } text-white`}
// // //             >
// // //               {option}
// // //             </button>
// // //           ))}
// // //         </div>
// // //         <p className="text-right text-red-600 font-bold">Time Left: {timeLeft}s</p>
// // //         <p className="text-right text-green-600">Attempted: {attempted}/{quiz.questions.length}</p>
// // //       </div>
// // //       {submitting && <p className="mt-4 text-lg text-blue-600">Submitting your answers...</p>}
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { auth, db } from "../../firebase/firebase";
// // import {
// //   doc,
// //   getDoc,
// //   updateDoc,
// //   arrayUnion,
// //   collection,
// //   addDoc,
// // } from "firebase/firestore";

// // export default function QuizTaking() {
// //   const { quizId } = useParams();
// //   const navigate = useNavigate();
// //   const [quiz, setQuiz] = useState(null);
// //   const [currentQuestion, setCurrentQuestion] = useState(0);
// //   const [userAnswers, setUserAnswers] = useState([]);
// //   const [attempted, setAttempted] = useState(0);
// //   const [timeLeft, setTimeLeft] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [isAnswered, setIsAnswered] = useState(false);

// //   useEffect(() => {
// //     // Enter full screen on load
// //     if (document.documentElement.requestFullscreen) {
// //       document.documentElement.requestFullscreen().catch((err) => {
// //         console.error("Error entering fullscreen mode:", err);
// //       });
// //     }

// //     // Redirect to home page if user changes tab
// //     const handleVisibilityChange = () => {
// //       if (document.hidden) {
// //         navigate("/student");
// //       }
// //     };
// //     document.addEventListener("visibilitychange", handleVisibilityChange);

// //     // Fetch quiz data from Firestore
// //     const fetchQuiz = async () => {
// //       try {
// //         const quizDoc = await getDoc(doc(db, "quizzes", quizId));
// //         if (quizDoc.exists()) {
// //           setQuiz(quizDoc.data());
// //           setTimeLeft(quizDoc.data().questions[0].timer); // Set initial timer
// //         } else {
// //           setError("Quiz not found");
// //         }
// //       } catch (err) {
// //         setError("Error fetching quiz");
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchQuiz();

// //     // Clean up event listeners and fullscreen on unmount
// //     return () => {
// //       document.removeEventListener("visibilitychange", handleVisibilityChange);
// //       if (document.exitFullscreen) {
// //         document.exitFullscreen().catch((err) => {
// //           console.error("Error exiting fullscreen mode:", err);
// //         });
// //       }
// //     };
// //   }, [quizId, navigate]);

// //   useEffect(() => {
// //     if (timeLeft === 0) {
// //       handleAnswer(null); // Move to the next question when time runs out
// //     }
// //     const timer =
// //       timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
// //     return () => clearInterval(timer);
// //   }, [timeLeft]);

// //   const handleAnswer = async (answerIndex) => {
// //     if (isAnswered) return; // Prevent double answering
// //     setUserAnswers([...userAnswers, answerIndex]);
// //     setAttempted(attempted + 1);
// //     setIsAnswered(true); // Disable answering until question changes
// //     setTimeout(() => setIsAnswered(false), 500); // Re-enable after a short delay

// //     // Create a detailed result for this question
// //     await storeAnswerDetail(answerIndex);

// //     if (currentQuestion < quiz.questions.length - 1) {
// //       setCurrentQuestion(currentQuestion + 1);
// //       setTimeLeft(quiz.questions[currentQuestion + 1].timer);
// //     } else {
// //       submitQuiz();
// //     }
// //   };

// //   const storeAnswerDetail = async (answerIndex) => {
// //     try {
// //       const question = quiz.questions[currentQuestion];
// //       const isCorrect = answerIndex === question.correctAnswer;
// //       const resultData = {
// //         studentId: auth.currentUser.uid,
// //         quizId: quizId,
// //         currentQuestionId: question.id || `question_${currentQuestion + 1}`,
// //         selectedAnswer: question.options[answerIndex] || "",
// //         correctAnswer: question.options[question.correctAnswer] || "",
// //         isCorrect,
// //         submittedAt: new Date(),
// //       };

// //       // Store the answer details in Firestore inside the resultDetails subcollection
// //       const resultDocRef = await addDoc(
// //         collection(db, "allResults", quizId, "resultDetails"),
// //         resultData
// //       );
// //       console.log(
// //         "Answer detail stored in Firestore with ID:",
// //         resultDocRef.id
// //       );
// //     } catch (err) {
// //       console.error("Error storing answer detail:", err);
// //     }
// //   };

// //   // const submitQuiz = async () => {
// //   //   setSubmitting(true);
// //   //   const score = userAnswers.reduce((total, answer, index) => {
// //   //     return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// //   //   }, 0);
// //   //   const percentage = (score / quiz.questions.length) * 100;

// //   //   const resultData = {
// //   //     studentId: auth.currentUser.uid,
// //   //     score,
// //   //     totalQuestions: quiz.questions.length,
// //   //     percentage,
// //   //     attempted,
// //   //     answers: userAnswers.map((answerIndex, index) => ({
// //   //       questionId: quiz.questions[index].id || `question_${index + 1}`,
// //   //       selectedAnswer: quiz.questions[index].options[answerIndex] || "",
// //   //       correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer] || "",
// //   //       isCorrect: answerIndex === quiz.questions[index].correctAnswer,
// //   //     })),
// //   //     submittedAt: new Date(),
// //   //   };

// //   //   try {
// //   //     // Add result data to the allResults collection
// //   //     const allResultDocRef = await addDoc(collection(db, "allResults"), { quizId, ...resultData });

// //   //     // Update the quiz document with the reference to the result
// //   //     await updateDoc(doc(db, "quizzes", quizId), { studentResults: arrayUnion(allResultDocRef.id) });

// //   //     navigate(`/student/quiz-completed/${quizId}`, { state: { score, percentage } });
// //   //   } catch (err) {
// //   //     setError("Error submitting quiz");
// //   //     console.error(err);
// //   //   } finally {
// //   //     setSubmitting(false);
// //   //   }
// //   // };

// //   // const submitQuiz = async () => {
// //   //   setSubmitting(true);
// //   //   const score = userAnswers.reduce((total, answer, index) => {
// //   //     return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// //   //   }, 0);
// //   //   const percentage = (score / quiz.questions.length) * 100;

// //   //   const resultData = {
// //   //     studentId: auth.currentUser.uid,
// //   //     score,
// //   //     totalQuestions: quiz.questions.length,
// //   //     percentage,
// //   //     attempted,
// //   //     submittedAt: new Date(),
// //   //     resultDetails: userAnswers.map((answerIndex, index) => ({
// //   //       questionId: quiz.questions[index].id || `question_${index + 1}`,
// //   //       selectedAnswer: quiz.questions[index].options[answerIndex] || "",
// //   //       correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer] || "",
// //   //       isCorrect: answerIndex === quiz.questions[index].correctAnswer,
// //   //     })),
// //   //   };

// //   //   try {
// //   //     // Add result data to the allResults collection with resultDetails
// //   //     const allResultDocRef = await addDoc(collection(db, "allResults"), { quizId, ...resultData });

// //   //     // Update the quiz document with the reference to the result
// //   //     await updateDoc(doc(db, "quizzes", quizId), {
// //   //       studentResults: arrayUnion(allResultDocRef.id),
// //   //     });

// //   //     // Navigate to the quiz completion page
// //   //     navigate(`/student/quiz-completed/${quizId}`, { state: { score, percentage } });
// //   //   } catch (err) {
// //   //     setError("Error submitting quiz");
// //   //     console.error(err);
// //   //   } finally {
// //   //     setSubmitting(false);
// //   //   }
// //   // };

// //   const submitQuiz = async () => {
// //     setSubmitting(true);
// //     const score = userAnswers.reduce((total, answer, index) => {
// //       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// //     }, 0);
// //     const percentage = (score / quiz.questions.length) * 100;

// //     const resultData = {
// //       studentId: auth.currentUser.uid,
// //       quizId,
// //       score,
// //       totalQuestions: quiz.questions.length,
// //       percentage,
// //       attempted,
// //       submittedAt: new Date(),
// //       resultDetails: quiz.questions.map((question, index) => ({
// //         questionId: question.id || `question_${index + 1}`,
// //         questionText: question.question,
// //         options: question.options,
// //         selectedAnswer: question.options[userAnswers[index]] || "",
// //         correctAnswer: question.options[question.correctAnswer],
// //         isCorrect: userAnswers[index] === question.correctAnswer,
// //       })),
// //     };

// //     try {
// //       // Add complete quiz result data with detailed answer breakdown to Firestore
// //       const allResultDocRef = await addDoc(
// //         collection(db, "allResults"),
// //         resultData
// //       );

// //       // Update the quiz document to reference this result
// //       await updateDoc(doc(db, "quizzes", quizId), {
// //         studentResults: arrayUnion(allResultDocRef.id),
// //       });

// //       // Navigate to the quiz completion page
// //       navigate(`/student/quiz-completed/${quizId}`, {
// //         state: { score, percentage },
// //       });
// //     } catch (err) {
// //       setError("Error submitting quiz");
// //       console.error(err);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p>{error}</p>;

// //   return (
// //     <div className="p-6 bg-white min-h-screen flex flex-col justify-center items-center">
// //       <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
// //       <p className="text-gray-600 mb-4">{quiz.description}</p>
// //       <div className="w-full max-w-md">
// //         <h2 className="text-xl font-semibold mb-4">
// //           {currentQuestion + 1}. {quiz.questions[currentQuestion].question}
// //         </h2>
// //         <div>
// //           {quiz.questions[currentQuestion].options.map((option, index) => (
// //             <button
// //               key={index}
// //               onClick={() => handleAnswer(index)}
// //               disabled={isAnswered} // Disable button if already answered
// //               className={`block w-full py-2 px-4 mb-2 rounded ${
// //                 isAnswered ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
// //               } text-white`}
// //             >
// //               {option}
// //             </button>
// //           ))}
// //         </div>
// //         <p className="text-right text-red-600 font-bold">
// //           Time Left: {timeLeft}s
// //         </p>
// //         <p className="text-right text-green-600">
// //           Attempted: {attempted}/{quiz.questions.length}
// //         </p>
// //       </div>
// //       {submitting && (
// //         <p className="mt-4 text-lg text-blue-600">Submitting your answers...</p>
// //       )}
// //     </div>
// //   );
// // }







// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase/firebase";
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   collection,
//   addDoc,
// } from "firebase/firestore";

// export default function QuizTaking() {
//   const { quizId } = useParams();
//   const navigate = useNavigate();
//   const [quiz, setQuiz] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [attempted, setAttempted] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [hasAttempted, setHasAttempted] = useState(false);

//   useEffect(() => {
//     // Fullscreen on load
//     if (document.documentElement.requestFullscreen) {
//       document.documentElement.requestFullscreen().catch((err) => {
//         console.error("Error entering fullscreen mode:", err);
//       });
//     }

//     // Redirect to home if user changes tab
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         navigate("/student");
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     // Fetch quiz data
//     const fetchQuiz = async () => {
//       try {
//         const quizDoc = await getDoc(doc(db, "quizzes", quizId));
//         if (quizDoc.exists()) {
//           const quizData = quizDoc.data();
//           setQuiz(quizData);
//           setTimeLeft(quizData.questions[0].timer); // Initialize timer from first question

//           // Check if user has already attempted the quiz
//           const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
//           if (userDoc.exists()) {
//             const attemptedQuizzes = userDoc.data().attemptedQuizzes || {};
//             setHasAttempted(attemptedQuizzes[quizId] === true);
//           }
//         } else {
//           setError("Quiz not found");
//         }
//       } catch (err) {
//         setError("Error fetching quiz");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuiz();

//     // Cleanup listeners and exit fullscreen when unmounting
//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       if (document.exitFullscreen) {
//         document.exitFullscreen().catch((err) => {
//           console.error("Error exiting fullscreen mode:", err);
//         });
//       }
//     };
//   }, [quizId, navigate]);

//   useEffect(() => {
//     if (timeLeft === 0) {
//       handleAnswer(null); // Automatically move to the next question when time is up
//     }
//     const timer =
//       timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const handleAnswer = async (answerIndex) => {
//     if (isAnswered) return; // Prevent double answering
//     setUserAnswers([...userAnswers, answerIndex]);
//     setAttempted(attempted + 1);
//     setIsAnswered(true); // Disable further answering for the current question

//     // Store the answer detail in Firestore
//     await storeAnswerDetail(answerIndex);

//     if (currentQuestion < quiz.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setTimeLeft(quiz.questions[currentQuestion + 1].timer); // Set new timer for next question
//     } else {
//       submitQuiz(); // Submit the quiz if it's the last question
//     }

//     setTimeout(() => setIsAnswered(false), 500); // Re-enable after short delay
//   };

//   const storeAnswerDetail = async (answerIndex) => {
//     try {
//       const question = quiz.questions[currentQuestion];
//       const isCorrect = answerIndex === question.correctAnswer;
//       const resultData = {
//         studentId: auth.currentUser.uid,
//         quizId,
//         currentQuestionId: question.id || `question_${currentQuestion + 1}`,
//         selectedAnswer: question.options[answerIndex] || "",
//         correctAnswer: question.options[question.correctAnswer] || "",
//         isCorrect,
//         submittedAt: new Date(),
//       };

//       // Store the answer detail in Firestore inside resultDetails subcollection
//       const resultDocRef = await addDoc(
//         collection(db, "allResults", quizId, "resultDetails"),
//         resultData
//       );
//       console.log("Answer detail stored in Firestore with ID:", resultDocRef.id);
//     } catch (err) {
//       console.error("Error storing answer detail:", err);
//     }
//   };

//   const submitQuiz = async () => {
//     setSubmitting(true);
//     const score = userAnswers.reduce((total, answer, index) => {
//       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
//     }, 0);
//     const percentage = (score / quiz.questions.length) * 100;

//     const resultData = {
//       studentId: auth.currentUser.uid,
//       quizId,
//       score,
//       totalQuestions: quiz.questions.length,
//       percentage,
//       attempted,
//       submittedAt: new Date(),
//       resultDetails: quiz.questions.map((question, index) => ({
//         questionId: question.id || `question_${index + 1}`,
//         questionText: question.question,
//         options: question.options,
//         selectedAnswer: question.options[userAnswers[index]] || "",
//         correctAnswer: question.options[question.correctAnswer],
//         isCorrect: userAnswers[index] === question.correctAnswer,
//       })),
//     };

//     try {
//       // Add complete quiz result data with detailed answer breakdown to Firestore
//       const allResultDocRef = await addDoc(
//         collection(db, "allResults"),
//         resultData
//       );

//       // Update the quiz document to reference this result
//       await updateDoc(doc(db, "quizzes", quizId), {
//         studentResults: arrayUnion(allResultDocRef.id),
//       });

//       // Update the user's attemptedQuizzes field to prevent retaking the quiz
//       await updateDoc(doc(db, "users", auth.currentUser.uid), {
//         [`attemptedQuizzes.${quizId}`]: true,
//       });

//       navigate(`/student`, {
//         state: { score, percentage },
//       });
//     } catch (err) {
//       setError("Error submitting quiz");
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleGoBack = () => {
//     navigate("/student");
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   if (hasAttempted) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center text-xl font-semibold text-gray-700">
//           <h2>You have already attempted this quiz!</h2>
//           <p className="mt-4">You cannot retake this quiz.</p>
//         </div>
//         <div className="mt-6 text-center">
//           <button
//             onClick={handleGoBack}
//             className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-150 ease-in-out"
//           >
//             Go Back to Quiz
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const question = quiz.questions[currentQuestion];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <div className="mb-4">
//           <span className="text-lg font-semibold">
//             Question {currentQuestion + 1} of {quiz.questions.length}
//           </span>
//         </div>
//         <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
//         <div className="space-y-2">
//           {question.options.map((option, index) => (
//             <button
//               key={index}
//               onClick={() => handleAnswer(index)}
//               disabled={isAnswered}
//               className={`w-full text-left p-2 rounded ${
//                 isAnswered ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//               } text-white`}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//         <div className="mt-4 text-center">
//           <span className="text-lg font-semibold">{timeLeft}s remaining</span>
//         </div>
//         <div className="mt-6 text-center">
//           {submitting ? (
//             <p>Submitting...</p>
//           ) : (
//             <button
//               onClick={submitQuiz}
//               className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition duration-150 ease-in-out"
//             >
//               Submit Quiz
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }













import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc,
} from "firebase/firestore";

export default function QuizTaking() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [attempted, setAttempted] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);  // Flag to prevent multiple answers
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    // Fullscreen on load
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error entering fullscreen mode:", err);
      });
    }

    // Redirect to home if user changes tab
    const handleVisibilityChange = () => {
      if (document.hidden) {
        navigate("/student");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Fetch quiz data
    const fetchQuiz = async () => {
      try {
        const quizDoc = await getDoc(doc(db, "quizzes", quizId));
        if (quizDoc.exists()) {
          const quizData = quizDoc.data();
          setQuiz(quizData);
          setTimeLeft(quizData.questions[0].timer); // Initialize timer from first question

          // Check if user has already attempted the quiz
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
          if (userDoc.exists()) {
            const attemptedQuizzes = userDoc.data().attemptedQuizzes || {};
            setHasAttempted(attemptedQuizzes[quizId] === true);
          }
        } else {
          setError("Quiz not found");
        }
      } catch (err) {
        setError("Error fetching quiz");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();

    // Cleanup listeners and exit fullscreen when unmounting
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.error("Error exiting fullscreen mode:", err);
        });
      }
    };
  }, [quizId, navigate]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswer(null); // Automatically move to the next question when time is up
    }
    const timer =
      timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = async (answerIndex) => {
    if (isAnswered) return; // Prevent double answering
    setUserAnswers([...userAnswers, answerIndex]);
    setAttempted(attempted + 1);
    setIsAnswered(true); // Disable further answering for the current question

    // Store the answer detail in Firestore
    await storeAnswerDetail(answerIndex);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(quiz.questions[currentQuestion + 1].timer); // Set new timer for next question
    } else {
      submitQuiz(); // Submit the quiz if it's the last question
    }

    setTimeout(() => setIsAnswered(false), 500); // Re-enable after short delay
  };
const storeAnswerDetail = async (answerIndex) => {
  try {
    const question = quiz.questions[currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer;
    const resultData = {
      studentId: auth.currentUser.uid,
      quizId,
      currentQuestionId: question.id || `question_${currentQuestion + 1}`,
      selectedAnswer: question.options[answerIndex] || "",
      correctAnswer: question.options[question.correctAnswer] || "",
      isCorrect,
      submittedAt: new Date(),
    };

    // Store the answer detail in Firestore inside resultDetails subcollection
    // Save answer data under the quizId
    const resultDocRef = await addDoc(
      collection(db, "allResults", quizId, "resultDetails"),
      resultData
    );
    console.log("Answer detail stored in Firestore with ID:", resultDocRef.id);
  } catch (err) {
    console.error("Error storing answer detail:", err);
  }
};

const submitQuiz = async () => {
  setSubmitting(true);
  const score = userAnswers.reduce((total, answer, index) => {
    return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
  }, 0);
  const percentage = (score / quiz.questions.length) * 100;

  const resultData = {
    studentId: auth.currentUser.uid,
    quizId,
    score,
    totalQuestions: quiz.questions.length,
    percentage,
    attempted,
    submittedAt: new Date(),
    resultDetails: quiz.questions.map((question, index) => ({
      questionId: question.id || `question_${index + 1}`,
      questionText: question.question,
      options: question.options,
      selectedAnswer: question.options[userAnswers[index]] || "",
      correctAnswer: question.options[question.correctAnswer],
      isCorrect: userAnswers[index] === question.correctAnswer,
    })),
  };

  try {
    // Add complete quiz result data with detailed answer breakdown to Firestore
    const allResultDocRef = await addDoc(
      collection(db, "allResults"),
      resultData
    );
    console.log("Quiz result saved in allResults with ID:", allResultDocRef.id);

    // Update quiz document with the student's result
    await updateDoc(doc(db, 'quizzes', quizId), {
      results: arrayUnion(resultData),
    });

    // Now, save each user's result in the resultDetails subcollection of the quiz document
    await addDoc(collection(db, 'allResults', quizId, 'resultDetails'), {
      studentId: auth.currentUser.uid,
      score,
      resultDetails: resultData.resultDetails,
      submittedAt: new Date(),
    });

    // Update the user's attemptedQuizzes field to prevent retaking the quiz
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      [`attemptedQuizzes.${quizId}`]: true,
    });

    navigate(`/student`, {
      state: { score, percentage },
    });
  } catch (err) {
    setError("Error submitting quiz");
    console.error(err);
  } finally {
    setSubmitting(false);
  }
};

  // const storeAnswerDetail = async (answerIndex) => {
  //   try {
  //     const question = quiz.questions[currentQuestion];
  //     const isCorrect = answerIndex === question.correctAnswer;
  //     const resultData = {
  //       studentId: auth.currentUser.uid,
  //       quizId,
  //       currentQuestionId: question.id || `question_${currentQuestion + 1}`,
  //       selectedAnswer: question.options[answerIndex] || "",
  //       correctAnswer: question.options[question.correctAnswer] || "",
  //       isCorrect,
  //       submittedAt: new Date(),
  //     };

  //     // Store the answer detail in Firestore inside resultDetails subcollection
  //     // const resultDocRef = await addDoc(
  //     //   collection(db, "allResults", quizId, "resultDetails"),
  //     //   resultData
  //     // );
  //     console.log("Answer detail stored in Firestore with ID:", resultDocRef.id);
  //   } catch (err) {
  //     console.error("Error storing answer detail:", err);
  //   }
  // };

  // const submitQuiz = async () => {
  //   setSubmitting(true);
  //   const score = userAnswers.reduce((total, answer, index) => {
  //     return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
  //   }, 0);
  //   const percentage = (score / quiz.questions.length) * 100;

  //   const resultData = {
  //     studentId: auth.currentUser.uid,
  //     quizId,
  //     score,
  //     totalQuestions: quiz.questions.length,
  //     percentage,
  //     attempted,
  //     submittedAt: new Date(),
  //     resultDetails: quiz.questions.map((question, index) => ({
  //       questionId: question.id || `question_${index + 1}`,
  //       questionText: question.question,
  //       options: question.options,
  //       selectedAnswer: question.options[userAnswers[index]] || "",
  //       correctAnswer: question.options[question.correctAnswer],
  //       isCorrect: userAnswers[index] === question.correctAnswer,
  //     })),
  //   };

  //   try {
  //     // Add complete quiz result data with detailed answer breakdown to Firestore
  //     const allResultDocRef = await addDoc(
  //       collection(db, "allResults"),
  //       resultData
  //     );

  //         // Update quiz document with the student's result
  //     await updateDoc(doc(db, 'quizzes', quizId), {
  //       results: arrayUnion(resultData),
  //     });

  //     // Add result to the allResults collection for easier data access and analysis
  //     await addDoc(collection(db, 'allResults'), {
  //       quizId: quizId,
  //       ...resultData,
  //     });
  //     // // Update the quiz document to reference this result
  //     // await updateDoc(doc(db, "quizzes", quizId), {
  //     //   studentResults: arrayUnion(allResultDocRef.id),
  //     // });

  //     // Update the user's attemptedQuizzes field to prevent retaking the quiz
  //     await updateDoc(doc(db, "users", auth.currentUser.uid), {
  //       [`attemptedQuizzes.${quizId}`]: true,
  //     });

  //     navigate(`/student`, {
  //       state: { score, percentage },
  //     });
  //   } catch (err) {
  //     setError("Error submitting quiz");
  //     console.error(err);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleGoBack = () => {
    navigate("/student");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (hasAttempted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-xl font-semibold text-gray-700">
          <h2>You have already attempted this quiz!</h2>
          <p className="mt-4">You cannot retake this quiz.</p>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleGoBack}
            className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Go Back to Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <span className="text-lg font-semibold">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`w-full text-left p-2 rounded ${
                isAnswered ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-4 text-center">
          <span className="text-lg font-semibold">{timeLeft}s remaining</span>
        </div>
        <div className="mt-6 text-center">
          {submitting ? (
            <p>Submitting...</p>
          ) : (
            <button
              onClick={submitQuiz}
              className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition duration-150 ease-in-out"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
