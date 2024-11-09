import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function QuizTaking() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
        if (quizDoc.exists()) {
          setQuiz(quizDoc.data());
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

    try {
      await updateDoc(doc(db, 'quizzes', quizId), {
        results: arrayUnion({
          studentId: auth.currentUser.uid,
          score: score,
          totalQuestions: quiz.questions.length,
          percentage: percentage,
          submittedAt: new Date()
        })
      });
      navigate('/student', { state: { quizCompleted: true, score, totalQuestions: quiz.questions.length } });
    } catch (err) {
      setError('Error submitting quiz');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
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