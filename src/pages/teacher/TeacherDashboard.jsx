// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import QRCode from 'qrcode.react';

// export default function TeacherDashboard() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       const q = query(collection(db, 'quizzes'), where('teacherId', '==', auth.currentUser.uid));
//       const querySnapshot = await getDocs(q);
//       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setQuizzes(quizzesData);
//       setLoading(false);
//     };

//     fetchQuizzes();
//   }, []);

//   const generateShareableLink = (quizId) => {
//     return `${window.location.origin}/take-quiz/${quizId}`;
//   };

//   if (loading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
//       <Link
//         to="/create-quiz"
//         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
//       >
//         Create New Quiz
//       </Link>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//         {quizzes.map(quiz => (
//           <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
//             <p className="text-gray-600 mb-4">{quiz.description}</p>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setSelectedQuiz(quiz)}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Share
//               </button>
//               <Link
//                 to={`/results/${quiz.id}`}
//                 className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 View Results
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//       {selectedQuiz && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//             <div className="mt-3 text-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">Shareable Link and QR Code</h3>
//               <div className="mt-2 px-7 py-3">
//                 <p className="text-sm text-gray-500">
//                   {generateShareableLink(selectedQuiz.id)}
//                 </p>
//                 <div className="mt-4 flex justify-center">
//                   <QRCode value={generateShareableLink(selectedQuiz.id)} />
//                 </div>
//               </div>
//               <div className="items-center px-4 py-3">
//                 <button
//                   id="ok-btn"
//                   className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   onClick={() => setSelectedQuiz(null)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }








// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// // import { QRCode } from 'qrcode.react';  // Fixed import
// import { QRCode } from 'antd';


// export default function TeacherDashboard() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       const q = query(collection(db, 'quizzes'), where('teacherId', '==', auth.currentUser.uid));
//       const querySnapshot = await getDocs(q);
//       const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setQuizzes(quizzesData);
//       setLoading(false);
//     };

//     fetchQuizzes();
//   }, []);

//   const generateShareableLink = (quizId) => {
//     return `${window.location.origin}/take-quiz/${quizId}`;
//   };

//   if (loading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
//       <Link
//         to="/create-quiz"
//         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
//       >
//         Create New Quiz
//       </Link>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//         {quizzes.map(quiz => (
//           <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
//             <p className="text-gray-600 mb-4">{quiz.description}</p>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setSelectedQuiz(quiz)}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Share
//               </button>
//               <Link
//                 to={`/results/${quiz.id}`}
//                 className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 View Results
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//       {selectedQuiz && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//             <div className="mt-3 text-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">Shareable Link and QR Code</h3>
//               <div className="mt-2 px-7 py-3">
//                 <p className="text-sm text-gray-500">
//                   {generateShareableLink(selectedQuiz.id)}
//                 </p>
//                 <div className="mt-4 flex justify-center">
//                   <QRCode value={generateShareableLink(selectedQuiz.id)} />
//                 </div>
//               </div>
//               <div className="items-center px-4 py-3">
//                 <button
//                   id="ok-btn"
//                   className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   onClick={() => setSelectedQuiz(null)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { QRCode } from 'antd'; // Correct import for Ant Design QRCode

export default function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Fetch quizzes on component mount
  useEffect(() => {
    const fetchQuizzes = async () => {
      const q = query(collection(db, 'quizzes'), where('teacherId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuizzes(quizzesData);
      setLoading(false);
    };

    fetchQuizzes();
  }, []);

  // Generate the shareable link for a quiz
  const generateShareableLink = (quizId) => {
    return `${window.location.origin}/take-quiz/${quizId}`;
  };

  // Show loading state while fetching quizzes
  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
      <Link
        to="/create-quiz"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
      >
        Create New Quiz
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* Render each quiz */}
        {quizzes.map(quiz => (
          <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedQuiz(quiz)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Share
              </button>
              <Link
                to={`/results/${quiz.id}`}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                View Results
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for QR code */}
      {selectedQuiz && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Shareable Link and QR Code</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  {generateShareableLink(selectedQuiz.id)}
                </p>
                <div className="mt-4 flex justify-center">
                  {/* Ant Design QRCode component */}
                  <QRCode value={generateShareableLink(selectedQuiz.id)} size={128} />
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setSelectedQuiz(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
