import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function QuizResult() {
  const { quizId } = useParams();
  const [quizResults, setQuizResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
        if (quizDoc.exists()) {
          setQuizResults(quizDoc.data());
        } else {
          setError('Quiz not found');
        }
      } catch (err) {
        setError('Error fetching quiz results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Quiz Results: {quizResults.title}</h1>
      {quizResults.results && quizResults.results.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Student ID</th>
                <th className="py-2 px-4 border-b text-left">Score</th>
                <th className="py-2 px-4 border-b text-left">Percentage</th>
                <th className="py-2 px-4 border-b text-left">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {quizResults.results.map((result, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4 border-b">{result.studentId}</td>
                  <td className="py-2 px-4 border-b">{result.score} / {result.totalQuestions}</td>
                  <td className="py-2 px-4 border-b">{result.percentage.toFixed(2)}%</td>
                  <td className="py-2 px-4 border-b">{new Date(result.submittedAt.toDate()).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-4">No results available for this quiz yet.</p>
      )}
    </div>
  );
}