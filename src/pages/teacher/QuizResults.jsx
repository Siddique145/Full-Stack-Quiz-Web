// // // import React, { useState, useEffect } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import { db } from '../../firebase/firebase';
// // // import { doc, getDoc } from 'firebase/firestore';

// // // export default function QuizResults() {
// // //   const { quizId } = useParams();
// // //   const [quizResults, setQuizResults] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchResults = async () => {
// // //       try {
// // //         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
// // //         if (quizDoc.exists()) {
// // //           setQuizResults(quizDoc.data());
// // //         } else {
// // //           setError('Quiz not found');
// // //         }
// // //       } catch (err) {
// // //         setError('Error fetching quiz results');
// // //         console.error(err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchResults();
// // //   }, [quizId]);

// // //   if (loading) {
// // //     return <div className="text-center mt-8">Loading...</div>;
// // //   }

// // //   if (error) {
// // //     return <div className="text-center mt-8 text-red-600">{error}</div>;
// // //   }

// // //   return (
// // //     <div className="container mx-auto px-4 py-8">
// // //       <h1 className="text-3xl font-bold mb-6">Quiz Results: {quizResults.title}</h1>
// // //       {quizResults.results && quizResults.results.length > 0 ? (
// // //         <div className="overflow-x-auto">
// // //           <table className="min-w-full bg-white">
// // //             <thead className="bg-gray-100">
// // //               <tr>
// // //                 <th className="py-2 px-4 border-b text-left">Student ID</th>
// // //                 <th className="py-2 px-4 border-b text-left">Score</th>
// // //                 <th className="py-2 px-4 border-b text-left">Percentage</th>
// // //                 <th className="py-2 px-4 border-b text-left">Submitted At</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {quizResults.results.map((result, index) => (
// // //                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
// // //                   <td className="py-2 px-4 border-b">{result.studentId}</td>
// // //                   <td className="py-2 px-4 border-b">{result.score} / {result.totalQuestions}</td>
// // //                   <td className="py-2 px-4 border-b">{result.percentage.toFixed(2)}%</td>
// // //                   <td className="py-2 px-4 border-b">{new Date(result.submittedAt.toDate()).toLocaleString()}</td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       ) : (
// // //         <p className="text-center mt-4">No results available for this quiz yet.</p>
// // //       )}
// // //     </div>
// // //   );
// // // }















// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { db } from '../../firebase/firebase';
// // import { doc, getDoc } from 'firebase/firestore';

// // export default function QuizResults() {
// //   const { quizId } = useParams();
// //   const [quizResults, setQuizResults] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchResults = async () => {
// //       try {
// //         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
// //         if (quizDoc.exists()) {
// //           setQuizResults(quizDoc.data());
// //         } else {
// //           setError('Quiz not found');
// //         }
// //       } catch (err) {
// //         setError('Error fetching quiz results');
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchResults();
// //   }, [quizId]);

// //   if (loading) {
// //     return <div className="text-center mt-8">Loading...</div>;
// //   }

// //   if (error) {
// //     return <div className="text-center mt-8 text-red-600">{error}</div>;
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <h1 className="text-3xl font-bold mb-6">Quiz Results: {quizResults.title}</h1>
// //       {quizResults.results && quizResults.results.length > 0 ? (
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full bg-white">
// //             <thead className="bg-gray-100">
// //               <tr>
// //                 <th className="py-2 px-4 border-b text-left">Student Name</th>
// //                 <th className="py-2 px-4 border-b text-left">Student ID</th>
// //                 <th className="py-2 px-4 border-b text-left">Score</th>
// //                 <th className="py-2 px-4 border-b text-left">Percentage</th>
// //                 <th className="py-2 px-4 border-b text-left">Submitted At</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {quizResults.results.map((result, index) => (
// //                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
// //                   <td className="py-2 px-4 border-b">{result.studentName}</td> {/* Displaying student's name */}
// //                   <td className="py-2 px-4 border-b">{result.studentId}</td>
// //                   <td className="py-2 px-4 border-b">{result.score} / {result.totalQuestions}</td>
// //                   <td className="py-2 px-4 border-b">{result.percentage.toFixed(2)}%</td>
// //                   <td className="py-2 px-4 border-b">{new Date(result.submittedAt.toDate()).toLocaleString()}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       ) : (
// //         <p className="text-center mt-4">No results available for this quiz yet.</p>
// //       )}
// //     </div>
// //   );
// // }









// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { db } from '../../firebase/firebase';
// import { doc, getDoc } from 'firebase/firestore';

// export default function QuizResults() {
//   const { quizId } = useParams();
//   const [quizResults, setQuizResults] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [studentsData, setStudentsData] = useState({}); // To store the student names by ID

//   // Fetch quiz results and student names
//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
//         if (quizDoc.exists()) {
//           setQuizResults(quizDoc.data());

//           // Fetch students' names from the 'users' collection based on the studentId in quizResults
//           const results = quizDoc.data().results;
//           const studentIds = results.map(result => result.studentId);
          
//           const studentPromises = studentIds.map(async studentId => {
//             const studentDoc = await getDoc(doc(db, 'users', studentId));
//             return { studentId, studentName: studentDoc.exists() ? studentDoc.data().name : 'Unknown' };
//           });

//           // Once all students' names are fetched, set them in the state
//           const students = await Promise.all(studentPromises);
//           const studentMap = students.reduce((acc, { studentId, studentName }) => {
//             acc[studentId] = studentName;
//             return acc;
//           }, {});

//           setStudentsData(studentMap);
//         } else {
//           setError('Quiz not found');
//         }
//       } catch (err) {
//         setError('Error fetching quiz results');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, [quizId]);

//   if (loading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-8 text-red-600">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Quiz Results: {quizResults.title}</h1>
//       {quizResults.results && quizResults.results.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 border-b text-left">Student Name</th>
//                 <th className="py-2 px-4 border-b text-left">Student ID</th>
//                 <th className="py-2 px-4 border-b text-left">Score</th>
//                 <th className="py-2 px-4 border-b text-left">Percentage</th>
//                 <th className="py-2 px-4 border-b text-left">Submitted At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {quizResults.results.map((result, index) => {
//                 const studentName = studentsData[result.studentId] || 'Loading...';
//                 return (
//                   <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="py-2 px-4 border-b">{studentName}</td> {/* Displaying student's name */}
//                     <td className="py-2 px-4 border-b">{result.studentId}</td>
//                     <td className="py-2 px-4 border-b">{result.score} / {result.totalQuestions}</td>
//                     <td className="py-2 px-4 border-b">{result.percentage.toFixed(2)}%</td>
//                     <td className="py-2 px-4 border-b">{new Date(result.submittedAt.toDate()).toLocaleString()}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center mt-4">No results available for this quiz yet.</p>
//       )}
//     </div>
//   );
// }
// // 








// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
// import { db } from '../../firebase/firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import { ArrowLeftOutlined, TrophyFilled, GoldFilled, StarFilled } from '@ant-design/icons'; // Correct icons

// export default function QuizResults() {
//   const { quizId } = useParams();
//   const [quizResults, setQuizResults] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [studentsData, setStudentsData] = useState({}); // To store the student names by ID

//   const navigate = useNavigate(); // Initialize the navigate hook

//   // Fetch quiz results and student names
//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
//         if (quizDoc.exists()) {
//           setQuizResults(quizDoc.data());

//           // Fetch students' names from the 'users' collection based on the studentId in quizResults
//           const results = quizDoc.data().results;
//           const studentIds = results.map(result => result.studentId);
          
//           const studentPromises = studentIds.map(async studentId => {
//             const studentDoc = await getDoc(doc(db, 'users', studentId));
//             return { studentId, studentName: studentDoc.exists() ? studentDoc.data().name : 'Unknown' };
//           });

//           // Once all students' names are fetched, set them in the state
//           const students = await Promise.all(studentPromises);
//           const studentMap = students.reduce((acc, { studentId, studentName }) => {
//             acc[studentId] = studentName;
//             return acc;
//           }, {});

//           setStudentsData(studentMap);
//         } else {
//           setError('Quiz not found');
//         }
//       } catch (err) {
//         setError('Error fetching quiz results');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, [quizId]);

//   if (loading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-8 text-red-600">{error}</div>;
//   }

//   // Sort the results by score in descending order
//   const sortedResults = quizResults.results.sort((a, b) => b.score - a.score);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back button with the Ant Design Back Arrow icon */}
//       <button 
//         onClick={() => navigate('/teacher')} 
//         className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
//       >
//         <ArrowLeftOutlined className="mr-2" /> {/* Ant Design Back Arrow icon */}
//         Back
//       </button>

//       <h1 className="text-3xl font-bold mb-6">Quiz Results: {quizResults.title}</h1>
//       {sortedResults && sortedResults.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 border-b text-left">Award</th>
//                 <th className="py-2 px-4 border-b text-left">Student Name</th>
//                 <th className="py-2 px-4 border-b text-left">Score</th>
//                 <th className="py-2 px-4 border-b text-left">Percentage</th>
//                 <th className="py-2 px-4 border-b text-left">Submitted At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedResults.map((result, index) => {
//                 const studentName = studentsData[result.studentId] || 'Loading...';
//                 let awardIcon;
//                 let awardText = ''; // Award text for 1st, 2nd, 3rd place
//                 let isFail = result.percentage < 30; // Check if the student has failed (score < 30%)

//                 // Assign icons and text based on the rank
//                 if (index === 0) {
//                   awardIcon = <TrophyFilled style={{ color: '#FFD700' }} />;
//                   awardText = '1st';
//                 } else if (index === 1) {
//                   awardIcon = <GoldFilled style={{ color: '#FFD700' }} />;
//                   awardText = '2nd';
//                 } else if (index === 2) {
//                   awardIcon = <StarFilled style={{ color: '#C0C0C0' }} />;
//                   awardText = '3rd';
//                 } else {
//                   awardIcon = <StarFilled style={{ color: '#CD7F32' }} />;
//                 }

//                 return (
//                   <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="py-2 px-4 border-b">
//                       {awardIcon} {awardText}
//                     </td> {/* Award Icon and Text */}
//                     <td className="py-2 px-4 border-b">{studentName}</td> {/* Displaying student's name */}
//                     <td className="py-2 px-4 border-b">{result.score} / {result.totalQuestions}</td>
//                     <td className="py-2 px-4 border-b">
//                       {isFail ? 'Fail' : `${result.percentage.toFixed(2)}%`}
//                     </td> {/* Displaying percentage or 'Fail' */}
//                     <td className="py-2 px-4 border-b">{new Date(result.submittedAt.toDate()).toLocaleString()}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center mt-4">No results available for this quiz yet.</p>
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeftOutlined, TrophyFilled, GoldFilled, StarFilled } from '@ant-design/icons';

export default function QuizResults() {
  const { quizId } = useParams();
  const [quizResults, setQuizResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentsData, setStudentsData] = useState({});

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
        if (quizDoc.exists()) {
          setQuizResults(quizDoc.data());

          const results = quizDoc.data().results || []; // Fallback to empty array if undefined
          const studentIds = results.map(result => result.studentId);

          const studentPromises = studentIds.map(async studentId => {
            const studentDoc = await getDoc(doc(db, 'users', studentId));
            return { studentId, studentName: studentDoc.exists() ? studentDoc.data().name : 'Unknown' };
          });

          const students = await Promise.all(studentPromises);
          const studentMap = students.reduce((acc, { studentId, studentName }) => {
            acc[studentId] = studentName;
            return acc;
          }, {});

          setStudentsData(studentMap);
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

  const sortedResults = quizResults.results.sort((a, b) => b.score - a.score);

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/teacher')} 
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
      >
        <ArrowLeftOutlined className="mr-2" />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Quiz Results: {quizResults.title}</h1>
      {sortedResults && sortedResults.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Award</th>
                <th className="py-2 px-4 border-b text-left">Student Name</th>
                <th className="py-2 px-4 border-b text-left">Score</th>
                <th className="py-2 px-4 border-b text-left">Percentage</th>
                <th className="py-2 px-4 border-b text-left">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((result, index) => {
                const studentName = studentsData[result.studentId] || 'Loading...';
                let awardIcon;
                let awardText = '';
                let isFail = result.percentage < 30;

                if (index === 0) {
                  awardIcon = <TrophyFilled style={{ color: '#FFD700' }} />;
                  awardText = '1st';
                } else if (index === 1) {
                  awardIcon = <GoldFilled style={{ color: '#FFD700' }} />;
                  awardText = '2nd';
                } else if (index === 2) {
                  awardIcon = <StarFilled style={{ color: '#C0C0C0' }} />;
                  awardText = '3rd';
                } else {
                  awardIcon = <StarFilled style={{ color: '#CD7F32' }} />;
                }

                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-4 border-b">
                      {awardIcon} {awardText}
                    </td>
                    <td className="py-2 px-4 border-b">{studentName}</td>
                    <td className="py-2 px-4 border-b">{result.score} / {result.totalQuestions}</td>
                    <td className="py-2 px-4 border-b">
                      {isFail ? 'Fail' : `${result.percentage.toFixed(2)}%`}
                    </td>
                    <td className="py-2 px-4 border-b">{new Date(result.submittedAt.toDate()).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-4">No results available for this quiz yet.</p>
      )}
    </div>
  );
}
