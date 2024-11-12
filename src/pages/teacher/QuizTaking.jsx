// // // import React, { useState, useEffect } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import { auth, db } from '../../firebase/firebase';
// // // import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// // // export default function QuizTaking() {
// // //   const { quizId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [quiz, setQuiz] = useState(null);
// // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // //   const [userAnswers, setUserAnswers] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchQuiz = async () => {
// // //       try {
// // //         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
// // //         if (quizDoc.exists()) {
// // //           setQuiz(quizDoc.data());
// // //         } else {
// // //           setError('Quiz not found');
// // //         }
// // //       } catch (err) {
// // //         setError('Error fetching quiz');
// // //         console.error(err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchQuiz();
// // //   }, [quizId]);

// // //   const handleAnswer = (answerIndex) => {
// // //     setUserAnswers([...userAnswers, answerIndex]);
// // //     if (currentQuestion < quiz.questions.length - 1) {
// // //       setCurrentQuestion(currentQuestion + 1);
// // //     } else {
// // //       submitQuiz();
// // //     }
// // //   };

// // //   const submitQuiz = async () => {
// // //     const score = userAnswers.reduce((total, answer, index) => {
// // //       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// // //     }, 0);

// // //     const percentage = (score / quiz.questions.length) * 100;

// // //     try {
// // //       await updateDoc(doc(db, 'quizzes', quizId), {
// // //         results: arrayUnion({
// // //           studentId: auth.currentUser.uid,
// // //           score: score,
// // //           totalQuestions: quiz.questions.length,
// // //           percentage: percentage,
// // //           submittedAt: new Date()
// // //         })
// // //       });
// // //       navigate('/student', { state: { quizCompleted: true, score, totalQuestions: quiz.questions.length } });
// // //     } catch (err) {
// // //       setError('Error submitting quiz');
// // //       console.error(err);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return <div className="text-center mt-8">Loading...</div>;
// // //   }

// // //   if (error) {
// // //     return <div className="text-center mt-8 text-red-600">{error}</div>;
// // //   }

// // //   const question = quiz.questions[currentQuestion];

// // //   return (
// // //     <div className="container mx-auto px-4 py-8">
// // //       <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
// // //       <div className="bg-white shadow-md rounded-lg p-6">
// // //         <div className="mb-4">
// // //           <span className="text-lg font-semibold">Question {currentQuestion + 1} of {quiz.questions.length}</span>
// // //         </div>
// // //         <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
// // //         <div className="space-y-2">
// // //           {question.options.map((option, index) => (
// // //             <button
// // //               key={index}
// // //               onClick={() => handleAnswer(index)}
// // //               className="w-full text-left p-2 rounded bg-gray-100 hover:bg-gray-200 transition duration-150 ease-in-out"
// // //             >
// // //               {option}
// // //             </button>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }









// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { auth, db } from '../../firebase/firebase';
// // import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// // export default function QuizTaking() {
// //   const { quizId } = useParams();
// //   const navigate = useNavigate();
// //   const [quiz, setQuiz] = useState(null);
// //   const [currentQuestion, setCurrentQuestion] = useState(0);
// //   const [userAnswers, setUserAnswers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [hasAttempted, setHasAttempted] = useState(false); // Track if the user has attempted the quiz

// //   useEffect(() => {
// //     const fetchQuiz = async () => {
// //       try {
// //         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
// //         if (quizDoc.exists()) {
// //           setQuiz(quizDoc.data());

// //           // Check if the student has already attempted this quiz
// //           const quizData = quizDoc.data();
// //           const userAttempts = quizData.results || [];
// //           const userHasAttempted = userAttempts.some(result => result.studentId === auth.currentUser.uid);

// //           setHasAttempted(userHasAttempted);
// //         } else {
// //           setError('Quiz not found');
// //         }
// //       } catch (err) {
// //         setError('Error fetching quiz');
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchQuiz();
// //   }, [quizId]);

// //   const handleAnswer = (answerIndex) => {
// //     setUserAnswers([...userAnswers, answerIndex]);
// //     if (currentQuestion < quiz.questions.length - 1) {
// //       setCurrentQuestion(currentQuestion + 1);
// //     } else {
// //       submitQuiz();
// //     }
// //   };

// //   const submitQuiz = async () => {
// //     // Calculate the score
// //     const score = userAnswers.reduce((total, answer, index) => {
// //       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
// //     }, 0);

// //     const percentage = (score / quiz.questions.length) * 100;

// //     // Correctly access the student's name from Firebase Auth
// //     const studentName = auth.currentUser.displayName ; //  Fallback to 'Anonymous' if displayName is not available

// //     // Prepare result data with detailed answers
// //     const resultData = {
// //       studentName: studentName,  // Use the correct displayName
// //       studentId: auth.currentUser.uid,
// //       score: score,
// //       totalQuestions: quiz.questions.length,
// //       percentage: percentage,
// //       answers: userAnswers.map((answerIndex, index) => ({
// //         questionId: quiz.questions[index].id,
// //         selectedAnswer: quiz.questions[index].options[answerIndex],
// //         correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer],
// //         isCorrect: answerIndex === quiz.questions[index].correctAnswer,
// //       })),
// //       submittedAt: new Date(),
// //     };

// //     try {
// //       // Update quiz document with the student's result
// //       await updateDoc(doc(db, 'quizzes', quizId), {
// //         results: arrayUnion(resultData),
// //       });
// //       // Navigate to results page
// //       navigate('/student', { state: { quizCompleted: true, score, totalQuestions: quiz.questions.length, percentage } });
// //     } catch (err) {
// //       setError('Error submitting quiz');
// //       console.error(err);
// //     }
// //   };

// //   const handleGoBack = () => {
// //     // Go back to the quiz route or quiz list
// //     navigate('/student');
// //   };

// //   if (loading) {
// //     return <div className="text-center mt-8">Loading...</div>;
// //   }

// //   if (error) {
// //     return <div className="text-center mt-8 text-red-600">{error}</div>;
// //   }

// //   if (hasAttempted) {
// //     return (
// //       <div className="container mx-auto px-4 py-8">
// //         <div className="text-center text-xl font-semibold text-gray-700">
// //           <h2>You have already attempted this quiz!</h2>
// //           <p className="mt-4">You cannot retake this quiz.</p>
// //         </div>
// //         <div className="mt-6 text-center">
// //           <button
// //             onClick={handleGoBack}
// //             className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-150 ease-in-out"
// //           >
// //             Go Back to Quiz
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const question = quiz.questions[currentQuestion];

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
// //       <div className="bg-white shadow-md rounded-lg p-6">
// //         <div className="mb-4">
// //           <span className="text-lg font-semibold">Question {currentQuestion + 1} of {quiz.questions.length}</span>
// //         </div>
// //         <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
// //         <div className="space-y-2">
// //           {question.options.map((option, index) => (
// //             <button
// //               key={index}
// //               onClick={() => handleAnswer(index)}
// //               className="w-full text-left p-2 rounded bg-gray-100 hover:bg-gray-200 transition duration-150 ease-in-out"
// //             >
// //               {option}
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

















// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebase';
// import { doc, getDoc, updateDoc, arrayUnion, collection, addDoc } from 'firebase/firestore';

// export default function QuizTaking() {
//   const { quizId } = useParams();
//   const navigate = useNavigate();
//   const [quiz, setQuiz] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hasAttempted, setHasAttempted] = useState(false);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
//         if (quizDoc.exists()) {
//           setQuiz(quizDoc.data());

//           // Check if the student has already attempted this quiz
//           const quizData = quizDoc.data();
//           const userAttempts = quizData.results || [];
//           const userHasAttempted = userAttempts.some(result => result.studentId === auth.currentUser.uid);
          
//           // Check user's attempted status in their profile as well
//           const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
//           if (userDoc.exists()) {
//             const attemptedQuizzes = userDoc.data().attemptedQuizzes || {};
//             setHasAttempted(userHasAttempted || attemptedQuizzes[quizId] === true);
//           }
//         } else {
//           setError('Quiz not found');
//         }
//       } catch (err) {
//         setError('Error fetching quiz');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuiz();
//   }, [quizId]);

//   const handleAnswer = (answerIndex) => {
//     setUserAnswers([...userAnswers, answerIndex]);
//     if (currentQuestion < quiz.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       submitQuiz();
//     }
//   };

//   const submitQuiz = async () => {
//     const score = userAnswers.reduce((total, answer, index) => {
//       return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
//     }, 0);
//     const percentage = (score / quiz.questions.length) * 100;
//     const studentName = auth.currentUser.displayName || 'Anonymous';

//     const resultData = {
//       studentName: studentName,
//       studentId: auth.currentUser.uid,
//       score: score,
//       totalQuestions: quiz.questions.length,
//       percentage: percentage,
//       answers: userAnswers.map((answerIndex, index) => ({
//         questionId: quiz.questions[index].id,
//         selectedAnswer: quiz.questions[index].options[answerIndex],
//         correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer],
//         isCorrect: answerIndex === quiz.questions[index].correctAnswer,
//       })),
//       submittedAt: new Date(),
//     };

//     try {
//       // Update quiz document with the student's result
//       await updateDoc(doc(db, 'quizzes', quizId), {
//         results: arrayUnion(resultData),
//       });

//       // Add result to the allResults collection for easier data access and analysis
//       await addDoc(collection(db, 'allResults'), {
//         quizId: quizId,
//         ...resultData,
//       });

//       // Update the user's attempted status in their profile
//       await updateDoc(doc(db, 'users', auth.currentUser.uid), {
//         [`attemptedQuizzes.${quizId}`]: true,
//       });

//       navigate('/student', {
//         state: {
//           quizCompleted: true,
//           score,
//           totalQuestions: quiz.questions.length,
//           percentage,
//         },
//       });
//     } catch (err) {
//       setError('Error submitting quiz');
//       console.error(err);
//     }
//   };

//   const handleGoBack = () => {
//     navigate('/student');
//   };

//   if (loading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-8 text-red-600">{error}</div>;
//   }

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
//           <span className="text-lg font-semibold">Question {currentQuestion + 1} of {quiz.questions.length}</span>
//         </div>
//         <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
//         <div className="space-y-2">
//           {question.options.map((option, index) => (
//             <button
//               key={index}
//               onClick={() => handleAnswer(index)}
//               className="w-full text-left p-2 rounded bg-gray-100 hover:bg-gray-200 transition duration-150 ease-in-out"
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc, updateDoc, arrayUnion, collection, addDoc } from 'firebase/firestore';

export default function QuizTaking() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
        if (quizDoc.exists()) {
          setQuiz(quizDoc.data());

          // Check if the student has already attempted this quiz
          const quizData = quizDoc.data();
          const userAttempts = quizData.results || [];
          const userHasAttempted = userAttempts.some(result => result.studentId === auth.currentUser.uid);
          
          // Check user's attempted status in their profile as well
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            const attemptedQuizzes = userDoc.data().attemptedQuizzes || {};
            setHasAttempted(userHasAttempted || attemptedQuizzes[quizId] === true);
          }
        } else {
          setError('Quiz not found');
        }
      } catch (err) {
        setError('Error fetching quiz');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswer = (answerIndex) => {
    setUserAnswers([...userAnswers, answerIndex]);
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    const score = userAnswers.reduce((total, answer, index) => {
      return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = (score / quiz.questions.length) * 100;
    const studentName = auth.currentUser.displayName || 'Anonymous';

    const resultData = {
      studentName: studentName,
      studentId: auth.currentUser.uid,
      score: score,
      totalQuestions: quiz.questions.length,
      percentage: percentage,
      answers: userAnswers.map((answerIndex, index) => ({
        questionId: quiz.questions[index].id,
        selectedAnswer: quiz.questions[index].options[answerIndex],
        correctAnswer: quiz.questions[index].options[quiz.questions[index].correctAnswer],
        isCorrect: answerIndex === quiz.questions[index].correctAnswer,
      })),
      submittedAt: new Date(),
    };

    try {
      // Add result to the allResults collection for easier data access and analysis
      const allResultDocRef = await addDoc(collection(db, 'allResults'), {
        quizId: quizId,
        ...resultData,
      });

      // Update quiz document with the student's result
      await updateDoc(doc(db, 'quizzes', quizId), {
        results: arrayUnion(resultData),
      });

      // Add result reference to the user's attemptedQuizzes field
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        [`attemptedQuizzes.${quizId}`]: {
          attempted: true,
          resultId: allResultDocRef.id,  // Add the result document ID here
        },
      });

      navigate('/student', {
        state: {
          quizCompleted: true,
          score,
          totalQuestions: quiz.questions.length,
          percentage,
        },
      });
    } catch (err) {
      setError('Error submitting quiz');
      console.error(err);
    }
  };

  const handleGoBack = () => {
    navigate('/student');
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

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
          <span className="text-lg font-semibold">Question {currentQuestion + 1} of {quiz.questions.length}</span>
        </div>
        <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-2 rounded bg-gray-100 hover:bg-gray-200 transition duration-150 ease-in-out"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
