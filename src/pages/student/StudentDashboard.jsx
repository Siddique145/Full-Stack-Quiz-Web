import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function StudentDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const q = query(collection(db, 'quizzes'));
      const querySnapshot = await getDocs(q);
      const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuizzes(quizzesData);
      setLoading(false);
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <Link
              to={`/take-quiz/${quiz.id}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Take Quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}