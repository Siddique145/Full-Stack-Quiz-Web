// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase/firebase";
// import {
//   doc,
//   getDoc,
//   setDoc,
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
//   const [isAnswered, setIsAnswered] = useState(false); // Flag to prevent multiple answers
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
//       const resultDocRef = await addDoc(
//         collection(db, "allResults", quizId, "resultDetails"),
//         resultData
//       );
//       console.log(
//         "Answer detail stored in Firestore with ID:",
//         resultDocRef.id
//       );
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
//       console.log(
//         "Quiz result saved in allResults with ID:",
//         allResultDocRef.id
//       );

//       // Update the quiz document with the student's result
//       await updateDoc(doc(db, "quizzes", quizId), {
//         results: arrayUnion(resultData),
//       });

//       // Fetch the user's name from the Firestore 'users' collection using auth.currentUser.uid
//       const userDocRef = doc(db, "users", auth.currentUser.uid);
//       const userDocSnapshot = await getDoc(userDocRef);
//       let userName = "Unknown Student"; // Default name if not found

//       if (userDocSnapshot.exists()) {
//         const userData = userDocSnapshot.data();
//         userName = userData.name || userName; // Get name if exists, else fallback to default
//       }

//       // Save the result in the 'wholeStudentResults' collection under the quizId document
//       const studentResult = {
//         studentId: auth.currentUser.uid,
//         name: userName, // Set name from Firestore
//         score,
//         percentage,
//         resultDetails: resultData.resultDetails,
//         submittedAt: new Date(),
//       };

//       const studentResultsDocRef = doc(db, "wholeStudentResults", quizId);
//       const studentResultsDoc = await getDoc(studentResultsDocRef);

//       if (studentResultsDoc.exists()) {
//         // If document exists, update the array
//         await updateDoc(studentResultsDocRef, {
//           studentsResults: arrayUnion(studentResult),
//         });
//       } else {
//         // If the document doesn't exist, create it
//         await setDoc(studentResultsDocRef, {
//           studentsResults: [studentResult],
//         });
//       }

//       // Update the user's attemptedQuizzes field to prevent retaking the quiz
//       await updateDoc(doc(db, "users", auth.currentUser.uid), {
//         [`attemptedQuizzes.${quizId}`]: true,
//       });

//       navigate(`/student`, {
//         state: { score, percentage },
//       });
//     } catch (err) {
//       setError("Error submitting quiz");
//       console.error("Error submitting quiz:", err);
//     } finally {
//       setSubmitting(false);
//     }
//   };
//   // const submitQuiz = async () => {
//   //   setSubmitting(true);
//   //   const score = userAnswers.reduce((total, answer, index) => {
//   //     return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
//   //   }, 0);
//   //   const percentage = (score / quiz.questions.length) * 100;

//   //   const resultData = {
//   //     studentId: auth.currentUser.uid,
//   //     quizId,
//   //     score,
//   //     totalQuestions: quiz.questions.length,
//   //     percentage,
//   //     attempted,
//   //     submittedAt: new Date(),
//   //     resultDetails: quiz.questions.map((question, index) => ({
//   //       questionId: question.id || `question_${index + 1}`,
//   //       questionText: question.question,
//   //       options: question.options,
//   //       selectedAnswer: question.options[userAnswers[index]] || "",
//   //       correctAnswer: question.options[question.correctAnswer],
//   //       isCorrect: userAnswers[index] === question.correctAnswer,
//   //     })),
//   //   };

//   //   try {
//   //     // Add complete quiz result data with detailed answer breakdown to Firestore
//   //     const allResultDocRef = await addDoc(collection(db, "allResults"), resultData);
//   //     console.log("Quiz result saved in allResults with ID:", allResultDocRef.id);

//   //     // Update the quiz document with the student's result
//   //     await updateDoc(doc(db, 'quizzes', quizId), {
//   //       results: arrayUnion(resultData),
//   //     });

//   //     // Save the result in the 'wholeStudentResults' collection under the quizId document
//   //     const studentResult = {
//   //       studentId: auth.currentUser.uid,
//   //       name: auth.currentUser.displayName, // Assuming the student name is available in Firebase Auth
//   //       score,
//   //       percentage,
//   //       resultDetails: resultData.resultDetails,
//   //       submittedAt: new Date(),
//   //     };

//   //     const studentResultsDocRef = doc(db, 'wholeStudentResults', quizId);
//   //     const studentResultsDoc = await getDoc(studentResultsDocRef);

//   //     if (studentResultsDoc.exists()) {
//   //       // If document exists, update the array
//   //       await updateDoc(studentResultsDocRef, {
//   //         studentsResults: arrayUnion(studentResult),
//   //       });
//   //     } else {
//   //       // If the document doesn't exist, create it
//   //       await setDoc(studentResultsDocRef, {
//   //         studentsResults: [studentResult],
//   //       });
//   //     }

//   //     // Update the user's attemptedQuizzes field to prevent retaking the quiz
//   //     await updateDoc(doc(db, "users", auth.currentUser.uid), {
//   //       [`attemptedQuizzes.${quizId}`]: true,
//   //     });

//   //     navigate(`/student`, {
//   //       state: { score, percentage },
//   //     });
//   //   } catch (err) {
//   //     setError("Error submitting quiz");
//   //     console.error("Error submitting quiz:", err);
//   //   } finally {
//   //     setSubmitting(false);
//   //   }
//   // };
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

















import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { auth, db } from "../../firebase/firebase"
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc
} from "firebase/firestore"
import { Button, Progress, Radio, Space } from "antd"
import { ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons"

export default function QuizTaking() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [attempted, setAttempted] = useState(0)
  const [timeLeft, setTimeLeft] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [hasAttempted, setHasAttempted] = useState(false)

  useEffect(() => {
    // Fullscreen on load
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Error entering fullscreen mode:", err)
      })
    }

    // Redirect to home if user changes tab
    const handleVisibilityChange = () => {
      if (document.hidden) {
        navigate("/student")
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Fetch quiz data
    const fetchQuiz = async () => {
      try {
        const quizDoc = await getDoc(doc(db, "quizzes", quizId))
        if (quizDoc.exists()) {
          const quizData = quizDoc.data()
          setQuiz(quizData)
          setTimeLeft(quizData.questions[0].timer) // Initialize timer from first question

          // Check if user has already attempted the quiz
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid))
          if (userDoc.exists()) {
            const attemptedQuizzes = userDoc.data().attemptedQuizzes || {}
            setHasAttempted(attemptedQuizzes[quizId] === true)
          }
        } else {
          setError("Quiz not found")
        }
      } catch (err) {
        setError("Error fetching quiz")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuiz()

    // Cleanup listeners and exit fullscreen when unmounting
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.error("Error exiting fullscreen mode:", err)
        })
      }
    }
  }, [quizId, navigate])

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion() // Automatically move to the next question when time is up
    }
    const timer =
      timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const handleAnswer = answerIndex => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = async () => {
    await storeAnswerDetail(selectedAnswer)
    setUserAnswers([...userAnswers, selectedAnswer])
    setAttempted(attempted + 1)

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(quiz.questions[currentQuestion + 1].timer)
      setSelectedAnswer(null)
    } else {
      submitQuiz()
    }
  }

  const storeAnswerDetail = async answerIndex => {
    try {
      const question = quiz.questions[currentQuestion]
      const isCorrect = answerIndex === question.correctAnswer
      const resultData = {
        studentId: auth.currentUser.uid,
        quizId,
        currentQuestionId: question.id || `question_${currentQuestion + 1}`,
        selectedAnswer:
          answerIndex !== null ? question.options[answerIndex] : "",
        correctAnswer: question.options[question.correctAnswer] || "",
        isCorrect,
        submittedAt: new Date()
      }
      const resultDocRef = await addDoc(
        collection(db, "allResults", quizId, "resultDetails"),
        resultData
      )
      console.log("Answer detail stored in Firestore with ID:", resultDocRef.id)
    } catch (err) {
      console.error("Error storing answer detail:", err)
    }
  }

  const submitQuiz = async () => {
    setSubmitting(true)
    const finalUserAnswers = [...userAnswers, selectedAnswer]
    const score = finalUserAnswers.reduce((total, answer, index) => {
      return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0)
    }, 0)
    const percentage = (score / quiz.questions.length) * 100

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
        selectedAnswer:
          finalUserAnswers[index] !== null
            ? question.options[finalUserAnswers[index]]
            : "",
        correctAnswer: question.options[question.correctAnswer],
        isCorrect: finalUserAnswers[index] === question.correctAnswer
      }))
    }

    try {
      // Add complete quiz result data with detailed answer breakdown to Firestore
      const allResultDocRef = await addDoc(
        collection(db, "allResults"),
        resultData
      )
      console.log(
        "Quiz result saved in allResults with ID:",
        allResultDocRef.id
      )

      // Update the quiz document with the student's result
      await updateDoc(doc(db, "quizzes", quizId), {
        results: arrayUnion(resultData)
      })

      // Fetch the user's name from the Firestore 'users' collection using auth.currentUser.uid
      const userDocRef = doc(db, "users", auth.currentUser.uid)
      const userDocSnapshot = await getDoc(userDocRef)
      let userName = "Unknown Student" // Default name if not found

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data()
        userName = userData.name || userName // Get name if exists, else fallback to default
      }

      // Save the result in the 'wholeStudentResults' collection under the quizId document
      const studentResult = {
        studentId: auth.currentUser.uid,
        name: userName, // Set name from Firestore
        score,
        percentage,
        resultDetails: resultData.resultDetails,
        submittedAt: new Date()
      }

      const studentResultsDocRef = doc(db, "wholeStudentResults", quizId)
      const studentResultsDoc = await getDoc(studentResultsDocRef)

      if (studentResultsDoc.exists()) {
        // If document exists, update the array
        await updateDoc(studentResultsDocRef, {
          studentsResults: arrayUnion(studentResult)
        })
      } else {
        // If the document doesn't exist, create it
        await setDoc(studentResultsDocRef, {
          studentsResults: [studentResult]
        })
      }

      // Update the user's attemptedQuizzes field to prevent retaking the quiz
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        [`attemptedQuizzes.${quizId}`]: true
      })

      navigate(`/student`, {
        state: { score, percentage }
      })
    } catch (err) {
      setError("Error submitting quiz")
      console.error("Error submitting quiz:", err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoBack = () => {
    navigate("/student")
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  if (error)
    return <div className="text-center text-red-500 text-xl">{error}</div>

  if (hasAttempted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-xl font-semibold text-gray-700">
          <h2>You have already attempted this quiz!</h2>
          <p className="mt-4">You cannot retake this quiz.</p>
        </div>
        <div className="mt-6 text-center">
          <Button type="primary" onClick={handleGoBack} size="large">
            Go Back to Quiz List
          </Button>
        </div>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          {quiz.title}
        </h1>
        <div className="mb-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <div className="flex items-center">
            <ClockCircleOutlined className="mr-2 text-blue-500" />
            <span className="text-lg font-semibold text-blue-500">
              {timeLeft}s
            </span>
          </div>
        </div>
        <Progress
          percent={(currentQuestion / quiz.questions.length) * 100}
          showInfo={false}
          status="active"
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068"
          }}
        />
        <h2 className="text-xl font-semibold my-4 text-gray-800">
          {question.question}
        </h2>
        <Radio.Group
          onChange={e => handleAnswer(e.target.value)}
          value={selectedAnswer}
          className="w-full"
        >
          <Space direction="vertical" className="w-full">
            {question.options.map((option, index) => (
              <Radio
                key={index}
                value={index}
                className="w-full p-3 my-2 border border-gray-300 rounded-lg hover:bg-blue-50 transition duration-300"
              >
                {option}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        <div className="mt-6 flex justify-between items-center">
          {currentQuestion < quiz.questions.length - 1 ? (
            <Button
              type="primary"
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              size="large"
              icon={<CheckCircleOutlined />}
            >
              Next Question
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={submitQuiz}
              loading={submitting}
              size="large"
              icon={<CheckCircleOutlined />}
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
