// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useParams } from 'react-router-dom';
// // // // // import { db } from '../../firebase/firebase';
// // // // // import { doc, getDoc } from 'firebase/firestore';

// // // // // export default function QuizResults() {
// // // // //   const { quizId } = useParams();
// // // // //   const [quizResults, setQuizResults] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);

// // // // //   useEffect(() => {
// // // // //     const fetchResults = async () => {
// // // // //       try {
// // // // //         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
// // // // //         if (quizDoc.exists()) {
// // // // //           setQuizResults(quizDoc.data());
// // // // //         } else {
// // // // //           setError('Quiz not found');
// // // // //         }
// // // // //       } catch (err) {
// // // // //         setError('Error fetching quiz results');
// // // // //         console.error(err);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchResults();
// // // // //   }, [quizId]);

// // // // //   if (loading) {
// // // // //     return <div className="text-center mt-8">Loading...</div>;
// // // // //   }

// // // // //   if (error) {
// // // // //     return <div className="text-center mt-8 text-red-600">{error}</div>;
// // // // //   }

// // // // //   return (
// // // // //     <div className="container mx-auto px-4 py-8">
// // // // //       <h1 className="text-3xl font-bold mb-6">Quiz Results: {quizResults.title}</h1>
// // // // //       {quizResults.results && quizResults.results.length > 0 ? (
// // // // //         <div className="overflow-x-auto">
// // // // //           <table className="min-w-full bg-white">
// // // // //             <thead className="bg-gray-100">
// // // // //               <tr>
// // // // //                 <th className="py-2 px-4 border-b text-left">Student ID</th>
// // // // //                 <th className="py-2 px-4 border-b text-left">Score</th>
// // // // //                 <th className="py-2 px-4 border-b text-left">Percentage</th>
// // // // //                 <th className="py-2 px-4 border-b text-left">Submitted At</th>
// // // // //               </tr>
// // // // //             </thead>
// // // // //             <tbody>
// // // // //               {quizResults.results.map((result, index) => (
// // // // //                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
// // // // //                   <td className="py-2 px-4 border-b">{result.studentId}</td>
// // // // //                   <td className="py-2 px-4 border-b">{result.score} / {result.totalQuestions}</td>
// // // // //                   <td className="py-2 px-4 border-b">{result.percentage.toFixed(2)}%</td>
// // // // //                   <td className="py-2 px-4 border-b">{new Date(result.submittedAt.toDate()).toLocaleString()}</td>
// // // // //                 </tr>
// // // // //               ))}
// // // // //             </tbody>
// // // // //           </table>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <p className="text-center mt-4">No results available for this quiz yet.</p>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import React, { useState, useEffect } from 'react';
// // // // import { useParams } from 'react-router-dom';
// // // // import { db } from '../../firebase/firebase';
// // // // import { doc, getDoc } from 'firebase/firestore';

// // // // export default function QuizResults() {
// // // //   const { quizId } = useParams();
// // // //   const [quizResults, setQuizResults] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchResults = async () => {
// // // //       try {
// // // //         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
// // // //         if (quizDoc.exists()) {
// // // //           setQuizResults(quizDoc.data());
// // // //         } else {
// // // //           setError('Quiz not found');
// // // //         }
// // // //       } catch (err) {
// // // //         setError('Error fetching quiz results');
// // // //         console.error(err);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchResults();
// // // //   }, [quizId]);

// // // //   if (loading) {
// // // //     return <div className="text-center mt-8">Loading...</div>;
// // // //   }

// // // //   if (error) {
// // // //     return <div className="text-center mt-8 text-red-600">{error}</div>;
// // // //   }

// // // //   return (
// // // //     <div className="container mx-auto px-4 py-8">
// // // //       <h1 className="text-3xl font-bold mb-6">Quiz Results: {quizResults.title}</h1>
// // // //       {quizResults.results && quizResults.results.length > 0 ? (
// // // //         <div className="overflow-x-auto">
// // // //           <table className="min-w-full bg-white">
// // // //             <thead className="bg-gray-100">
// // // //               <tr>
// // // //                 <th className="py-2 px-4 border-b text-left">Student Name</th>
// // // //                 <th className="py-2 px-4 border-b text-left">Student ID</th>
// // // //                 <th className="py-2 px-4 border-b text-left">Score</th>
// // // //                 <th className="py-2 px-4 border-b text-left">Percentage</th>
// // // //                 <th className="py-2 px-4 border-b text-left">Submitted At</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {quizResults.results.map((result, index) => (
// // // //                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
// // // //                   <td className="py-2 px-4 border-b">{result.studentName}</td> {/* Displaying student's name */}
// // // //                   <td className="py-2 px-4 border-b">{result.studentId}</td>
// // // //                   <td className="py-2 px-4 border-b">{result.score} / {result.totalQuestions}</td>
// // // //                   <td className="py-2 px-4 border-b">{result.percentage.toFixed(2)}%</td>
// // // //                   <td className="py-2 px-4 border-b">{new Date(result.submittedAt.toDate()).toLocaleString()}</td>
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       ) : (
// // // //         <p className="text-center mt-4">No results available for this quiz yet.</p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // import React, { useState, useEffect } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import { db } from '../../firebase/firebase';
// // // import { doc, getDoc } from 'firebase/firestore';

// // // export default function QuizResults() {
// // //   const { quizId } = useParams();
// // //   const [quizResults, setQuizResults] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [studentsData, setStudentsData] = useState({}); // To store the student names by ID

// // //   // Fetch quiz results and student names
// // //   useEffect(() => {
// // //     const fetchResults = async () => {
// // //       try {
// // //         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
// // //         if (quizDoc.exists()) {
// // //           setQuizResults(quizDoc.data());

// // //           // Fetch students' names from the 'users' collection based on the studentId in quizResults
// // //           const results = quizDoc.data().results;
// // //           const studentIds = results.map(result => result.studentId);

// // //           const studentPromises = studentIds.map(async studentId => {
// // //             const studentDoc = await getDoc(doc(db, 'users', studentId));
// // //             return { studentId, studentName: studentDoc.exists() ? studentDoc.data().name : 'Unknown' };
// // //           });

// // //           // Once all students' names are fetched, set them in the state
// // //           const students = await Promise.all(studentPromises);
// // //           const studentMap = students.reduce((acc, { studentId, studentName }) => {
// // //             acc[studentId] = studentName;
// // //             return acc;
// // //           }, {});

// // //           setStudentsData(studentMap);
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
// // //                 <th className="py-2 px-4 border-b text-left">Student Name</th>
// // //                 <th className="py-2 px-4 border-b text-left">Student ID</th>
// // //                 <th className="py-2 px-4 border-b text-left">Score</th>
// // //                 <th className="py-2 px-4 border-b text-left">Percentage</th>
// // //                 <th className="py-2 px-4 border-b text-left">Submitted At</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {quizResults.results.map((result, index) => {
// // //                 const studentName = studentsData[result.studentId] || 'Loading...';
// // //                 return (
// // //                   <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
// // //                     <td className="py-2 px-4 border-b">{studentName}</td> {/* Displaying student's name */}
// // //                     <td className="py-2 px-4 border-b">{result.studentId}</td>
// // //                     <td className="py-2 px-4 border-b">{result.score} / {result.totalQuestions}</td>
// // //                     <td className="py-2 px-4 border-b">{result.percentage.toFixed(2)}%</td>
// // //                     <td className="py-2 px-4 border-b">{new Date(result.submittedAt.toDate()).toLocaleString()}</td>
// // //                   </tr>
// // //                 );
// // //               })}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       ) : (
// // //         <p className="text-center mt-4">No results available for this quiz yet.</p>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // // //

// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
// // import { db } from '../../firebase/firebase';
// // import { doc, getDoc } from 'firebase/firestore';
// // import { ArrowLeftOutlined, TrophyFilled, GoldFilled, StarFilled } from '@ant-design/icons'; // Correct icons

// // export default function QuizResults() {
// //   const { quizId } = useParams();
// //   const [quizResults, setQuizResults] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [studentsData, setStudentsData] = useState({}); // To store the student names by ID

// //   const navigate = useNavigate(); // Initialize the navigate hook

// //   // Fetch quiz results and student names
// //   useEffect(() => {
// //     const fetchResults = async () => {
// //       try {
// //         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
// //         if (quizDoc.exists()) {
// //           setQuizResults(quizDoc.data());

// //           // Fetch students' names from the 'users' collection based on the studentId in quizResults
// //           const results = quizDoc.data().results;
// //           const studentIds = results.map(result => result.studentId);

// //           const studentPromises = studentIds.map(async studentId => {
// //             const studentDoc = await getDoc(doc(db, 'users', studentId));
// //             return { studentId, studentName: studentDoc.exists() ? studentDoc.data().name : 'Unknown' };
// //           });

// //           // Once all students' names are fetched, set them in the state
// //           const students = await Promise.all(studentPromises);
// //           const studentMap = students.reduce((acc, { studentId, studentName }) => {
// //             acc[studentId] = studentName;
// //             return acc;
// //           }, {});

// //           setStudentsData(studentMap);
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

// //   // Sort the results by score in descending order
// //   const sortedResults = quizResults.results.sort((a, b) => b.score - a.score);

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       {/* Back button with the Ant Design Back Arrow icon */}
// //       <button
// //         onClick={() => navigate('/teacher')}
// //         className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
// //       >
// //         <ArrowLeftOutlined className="mr-2" /> {/* Ant Design Back Arrow icon */}
// //         Back
// //       </button>

// //       <h1 className="text-3xl font-bold mb-6">Quiz Results: {quizResults.title}</h1>
// //       {sortedResults && sortedResults.length > 0 ? (
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full bg-white">
// //             <thead className="bg-gray-100">
// //               <tr>
// //                 <th className="py-2 px-4 border-b text-left">Award</th>
// //                 <th className="py-2 px-4 border-b text-left">Student Name</th>
// //                 <th className="py-2 px-4 border-b text-left">Score</th>
// //                 <th className="py-2 px-4 border-b text-left">Percentage</th>
// //                 <th className="py-2 px-4 border-b text-left">Submitted At</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {sortedResults.map((result, index) => {
// //                 const studentName = studentsData[result.studentId] || 'Loading...';
// //                 let awardIcon;
// //                 let awardText = ''; // Award text for 1st, 2nd, 3rd place
// //                 let isFail = result.percentage < 30; // Check if the student has failed (score < 30%)

// //                 // Assign icons and text based on the rank
// //                 if (index === 0) {
// //                   awardIcon = <TrophyFilled style={{ color: '#FFD700' }} />;
// //                   awardText = '1st';
// //                 } else if (index === 1) {
// //                   awardIcon = <GoldFilled style={{ color: '#FFD700' }} />;
// //                   awardText = '2nd';
// //                 } else if (index === 2) {
// //                   awardIcon = <StarFilled style={{ color: '#C0C0C0' }} />;
// //                   awardText = '3rd';
// //                 } else {
// //                   awardIcon = <StarFilled style={{ color: '#CD7F32' }} />;
// //                 }

// //                 return (
// //                   <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
// //                     <td className="py-2 px-4 border-b">
// //                       {awardIcon} {awardText}
// //                     </td> {/* Award Icon and Text */}
// //                     <td className="py-2 px-4 border-b">{studentName}</td> {/* Displaying student's name */}
// //                     <td className="py-2 px-4 border-b">{result.score} / {result.totalQuestions}</td>
// //                     <td className="py-2 px-4 border-b">
// //                       {isFail ? 'Fail' : `${result.percentage.toFixed(2)}%`}
// //                     </td> {/* Displaying percentage or 'Fail' */}
// //                     <td className="py-2 px-4 border-b">{new Date(result.submittedAt.toDate()).toLocaleString()}</td>
// //                   </tr>
// //                 );
// //               })}
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
// import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
// import { db } from '../../firebase/firebase';
// import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
// import { ArrowLeftOutlined, TrophyFilled, GoldFilled, StarFilled } from '@ant-design/icons'; // Correct icons

// export default function QuizResults() {
//   const { quizId } = useParams(); // Get the quizId from the URL params
//   const [quizDetails, setQuizDetails] = useState(null);
//   const [quizResults, setQuizResults] = useState([]);
//   const [studentsData, setStudentsData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate(); // Initialize navigate for back button

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         // Fetch quiz details (title, etc.)
//         const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
//         if (!quizDoc.exists()) {
//           setError('Quiz not found');
//           return;
//         }
//         setQuizDetails(quizDoc.data());

//         // Fetch all results from the resultDetails subcollection for this quiz
//         const resultsQuerySnapshot = await getDocs(collection(doc(db, 'quizzes', quizId), 'resultDetails'));
//         const results = [];
//         resultsQuerySnapshot.forEach(doc => {
//           results.push(doc.data());
//         });
//         setQuizResults(results);

//         // Fetch student details (name) from the 'users' collection
//         const studentIds = results.map(result => result.studentId);
//         const studentPromises = studentIds.map(async (studentId) => {
//           const studentDoc = await getDoc(doc(db, 'users', studentId));
//           return {
//             studentId,
//             studentName: studentDoc.exists() ? studentDoc.data().name : 'Unknown',
//           };
//         });

//         const students = await Promise.all(studentPromises);
//         const studentMap = students.reduce((acc, { studentId, studentName }) => {
//           acc[studentId] = studentName;
//           return acc;
//         }, {});

//         setStudentsData(studentMap);

//       } catch (err) {
//         setError('Error fetching quiz data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuizData();
//   }, [quizId]);

//   if (loading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-8 text-red-600">{error}</div>;
//   }

//   // Sort quiz results by score (descending)
//   const sortedResults = quizResults.sort((a, b) => b.score - a.score);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back button with the Ant Design Back Arrow icon */}
//       <button
//         onClick={() => navigate('/teacher')}
//         className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
//       >
//         <ArrowLeftOutlined className="mr-2" />
//         Back
//       </button>

//       <h1 className="text-3xl font-bold mb-6">Quiz Results: {quizDetails.title}</h1>
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
//                     </td>
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



import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {
  ArrowLeftOutlined,
  TrophyFilled,
  GoldFilled,
  StarFilled,
  FileTextOutlined,
} from "@ant-design/icons";
import { Button } from 'antd'
import { jsPDF } from "jspdf";

export default function QuizResults() {
  const { quizId } = useParams();
  const [quizDetails, setQuizDetails] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [studentsData, setStudentsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        if (!quizId) {
          setError("Quiz ID is missing");
          return;
        }

        // Fetch quiz details
        const quizDoc = await getDoc(doc(db, "quizzes", quizId));
        if (!quizDoc.exists()) {
          setError("Quiz not found");
          return;
        }
        const quizData = quizDoc.data();
        setQuizDetails(quizData);

        // Fetch quiz results
        const results = quizData.results || [];
        const resultDetails = results.flatMap(
          (result) => result.resultDetails || []
        );

        // Sort results by score and percentage
        const sortedResults = resultDetails.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return b.percentage - a.percentage;
        });

        setQuizResults(sortedResults);

        // Fetch student data for all students who attempted the quiz
        const studentIds = sortedResults
          .map((result) => result.studentId)
          .filter(Boolean);
        if (studentIds.length > 0) {
          const studentsQuery = query(
            collection(db, "users"),
            where("__name__", "in", studentIds)
          );
          const studentsQuerySnapshot = await getDocs(studentsQuery);
          const studentMap = {};
          studentsQuerySnapshot.forEach((doc) => {
            studentMap[doc.id] = doc.data().name || "Unknown";
          });
          setStudentsData(studentMap);
        }
      } catch (err) {
        setError("Error fetching quiz data: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const generatePDF = (result, studentName) => {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("Quiz Result", 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Student: ${studentName}`, 20, 30);
    pdf.text(`Quiz: ${quizDetails?.title || "Unknown Quiz"}`, 20, 40);
    pdf.text(
      `Score: ${result.score} / ${quizDetails?.questions?.length || "Unknown"}`,
      20,
      50
    );
    pdf.text(`Percentage: ${result.percentage?.toFixed(2) || 0}%`, 20, 60);
    pdf.text(
      `Submitted At: ${
        result.submittedAt?.toDate().toLocaleString() || "Unknown"
      }`,
      20,
      70
    );

    // Add detailed results
    pdf.text("Detailed Results:", 20, 90);
    if (result.options && Array.isArray(result.options)) {
      result.options.forEach((option, index) => {
        const yPos = 100 + index * 30;
        pdf.text(
          `Question ${index + 1}: ${result.questionText || "Unknown Question"}`,
          20,
          yPos
        );
        pdf.text(
          `Your Answer: ${result.selectedAnswer || "Not answered"}`,
          30,
          yPos + 10
        );
        pdf.text(
          `Correct Answer: ${result.correctAnswer || "Unknown"}`,
          30,
          yPos + 20
        );
      });
    } else {
      pdf.text("No detailed results available", 20, 100);
    }

    pdf.save(`${studentName}_quiz_result.pdf`);
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        onClick={() => navigate("/teacher")}
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
      >
        <ArrowLeftOutlined className="mr-2" />
        Back
      </Button>

      <h1 className="text-3xl font-bold mb-6">
        Quiz Results: {quizDetails?.title || "Unknown Quiz"}
      </h1>
      {quizResults.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Rank</th>
                <th className="py-2 px-4 border-b text-left">Student Name</th>
                <th className="py-2 px-4 border-b text-left">Score</th>
                <th className="py-2 px-4 border-b text-left">Percentage</th>
                <th className="py-2 px-4 border-b text-left">Submitted At</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizResults.map((result, index) => {
                const studentName =
                  (result.studentId && studentsData[result.studentId]) ||
                  "Unknown";
                let awardIcon;
                let awardText = "";
                const isFail = (result.percentage || 0) < 30;

                if (
                  index === 0 ||
                  (index > 0 &&
                    result.score === quizResults[0].score &&
                    result.percentage === quizResults[0].percentage)
                ) {
                  awardIcon = <TrophyFilled style={{ color: "#FFD700" }} />;
                  awardText = "1st";
                } else if (
                  index === 1 ||
                  (index > 1 &&
                    result.score === quizResults[1].score &&
                    result.percentage === quizResults[1].percentage)
                ) {
                  awardIcon = <GoldFilled style={{ color: "#C0C0C0" }} />;
                  awardText = "2nd";
                } else if (
                  index === 2 ||
                  (index > 2 &&
                    result.score === quizResults[2].score &&
                    result.percentage === quizResults[2].percentage)
                ) {
                  awardIcon = <StarFilled style={{ color: "#CD7F32" }} />;
                  awardText = "3rd";
                }

                return (
                  <tr
                    key={result.questionId || index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-2 px-4 border-b">
                      {awardIcon} {awardText}
                    </td>
                    <td className="py-2 px-4 border-b">{studentName}</td>
                    <td className="py-2 px-4 border-b">
                      {result.score || 0} /{" "}
                      {quizDetails?.questions?.length || "Unknown"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {isFail
                        ? "Fail"
                        : `${(result.percentage || 0).toFixed(2)}%`}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {result.submittedAt?.toDate().toLocaleString() ||
                        "Unknown"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Button
                        onClick={() => generatePDF(result, studentName)}
                        className="flex items-center text-blue-500 hover:text-blue-700"
                      >
                        <FileTextOutlined className="mr-2" />
                        Generate PDF
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-4">
          No results available for this quiz yet.
        </p>
      )}
    </div>
  );
}

// 'use client'

// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { db } from '../../firebase/firebase'
// import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore'
// import { ArrowLeftIcon, TrophyIcon, FileTextIcon, DownloadIcon } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Table } from '@/components/ui/table'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
// import { jsPDF } from 'jspdf'
// import 'jspdf-autotable'

// export default function QuizResults() {
//   const { quizId } = useParams()
//   const [quizDetails, setQuizDetails] = useState(null)
//   const [quizResults, setQuizResults] = useState([])
//   const [studentsData, setStudentsData] = useState({})
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedResult, setSelectedResult] = useState(null)
//   const [isResultModalVisible, setIsResultModalVisible] = useState(false)

//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       setLoading(true)
//       try {
//         if (!quizId) {
//           setError('Quiz ID is missing')
//           return
//         }

//         // Fetch quiz details
//         const quizDoc = await getDoc(doc(db, 'quizzes', quizId))
//         if (!quizDoc.exists()) {
//           setError('Quiz not found')
//           return
//         }
//         const quizData = quizDoc.data()
//         setQuizDetails(quizData)

//         // Fetch all results for this quiz
//         const resultsQuery = query(collection(db, 'allResults'), where('quizId', '==', quizId))
//         const resultsSnapshot = await getDocs(resultsQuery)
//         const resultsData = resultsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

//         // Sort results by score and percentage
//         const sortedResults = resultsData.sort((a, b) => {
//           if (b.score !== a.score) return b.score - a.score
//           return b.percentage - a.percentage
//         })

//         setQuizResults(sortedResults)

//         // Fetch student data for all students who attempted the quiz
//         const studentIds = [...new Set(sortedResults.map(result => result.studentId))]
//         if (studentIds.length > 0) {
//           const studentsQuery = query(collection(db, 'users'), where('__name__', 'in', studentIds))
//           const studentsSnapshot = await getDocs(studentsQuery)
//           const studentMap = {}
//           studentsSnapshot.forEach(doc => {
//             studentMap[doc.id] = doc.data().name || 'Unknown'
//           })
//           setStudentsData(studentMap)
//         }
//       } catch (err) {
//         setError('Error fetching quiz data: ' + err.message)
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchQuizData()
//   }, [quizId])

//   const handleViewResult = (result) => {
//     setSelectedResult(result)
//     setIsResultModalVisible(true)
//   }

//   const generatePDF = (result) => {
//     const doc = new jsPDF()
//     doc.setFontSize(18)
//     doc.text('Quiz Result', 20, 20)
//     doc.setFontSize(12)
//     doc.text(`Student: ${studentsData[result.studentId] || 'Unknown'}`, 20, 30)
//     doc.text(`Quiz: ${quizDetails?.title || 'Unknown Quiz'}`, 20, 40)
//     doc.text(`Score: ${result.score} / ${result.totalQuestions}`, 20, 50)
//     doc.text(`Percentage: ${result.percentage.toFixed(2)}%`, 20, 60)
//     doc.text(`Submitted At: ${new Date(result.submittedAt.toDate()).toLocaleString()}`, 20, 70)

//     doc.autoTable({
//       startY: 80,
//       head: [['Question', 'Your Answer', 'Correct Answer', 'Result']],
//       body: result.resultDetails.map(detail => [
//         detail.questionText,
//         detail.selectedAnswer,
//         detail.correctAnswer,
//         detail.isCorrect ? 'Correct' : 'Incorrect'
//       ]),
//     })

//     doc.save(`${studentsData[result.studentId] || 'Unknown'}_quiz_result.pdf`)
//   }

//   if (loading) {
//     return <div className="text-center mt-8">Loading...</div>
//   }

//   if (error) {
//     return <div className="text-center mt-8 text-red-600">{error}</div>
//   }

//   const columns = [
//     {
//       accessorKey: 'rank',
//       header: 'Rank',
//       cell: ({ row }) => {
//         const index = row.index
//         if (index === 0) return <TrophyIcon className="text-yellow-400" />
//         if (index === 1) return <TrophyIcon className="text-gray-400" />
//         if (index === 2) return <TrophyIcon className="text-orange-400" />
//         return index + 1
//       },
//     },
//     {
//       accessorKey: 'studentName',
//       header: 'Student Name',
//       cell: ({ row }) => studentsData[row.original.studentId] || 'Unknown',
//     },
//     {
//       accessorKey: 'score',
//       header: 'Score',
//       cell: ({ row }) => `${row.original.score} / ${row.original.totalQuestions}`,
//     },
//     {
//       accessorKey: 'percentage',
//       header: 'Percentage',
//       cell: ({ row }) => `${row.original.percentage.toFixed(2)}%`,
//     },
//     {
//       accessorKey: 'submittedAt',
//       header: 'Submitted At',
//       cell: ({ row }) => new Date(row.original.submittedAt.toDate()).toLocaleString(),
//     },
//     {
//       id: 'actions',
//       cell: ({ row }) => (
//         <Button onClick={() => handleViewResult(row.original)}>
//           <FileTextIcon className="mr-2 h-4 w-4" /> View Details
//         </Button>
//       ),
//     },
//   ]

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Button
//         onClick={() => navigate('/teacher')}
//         className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
//       >
//         <ArrowLeftIcon className="mr-2 h-4 w-4" />
//         Back
//       </Button>

//       <h1 className="text-3xl font-bold mb-6">Quiz Results: {quizDetails?.title || 'Unknown Quiz'}</h1>

//       {quizResults.length > 0 ? (
//         <Table columns={columns} data={quizResults} />
//       ) : (
//         <p className="text-center mt-4">No results available for this quiz yet.</p>
//       )}

//       <Dialog open={isResultModalVisible} onOpenChange={setIsResultModalVisible}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Quiz Result Details</DialogTitle>
//           </DialogHeader>
//           {selectedResult && (
//             <div>
//               <p><strong>Student:</strong> {studentsData[selectedResult.studentId] || 'Unknown'}</p>
//               <p><strong>Score:</strong> {selectedResult.score} / {selectedResult.totalQuestions}</p>
//               <p><strong>Percentage:</strong> {selectedResult.percentage.toFixed(2)}%</p>
//               <p><strong>Submitted At:</strong> {new Date(selectedResult.submittedAt.toDate()).toLocaleString()}</p>

//               <Table
//                 columns={[
//                   { accessorKey: 'questionText', header: 'Question' },
//                   { accessorKey: 'selectedAnswer', header: 'Your Answer' },
//                   { accessorKey: 'correctAnswer', header: 'Correct Answer' },
//                   {
//                     accessorKey: 'isCorrect',
//                     header: 'Result',
//                     cell: ({ row }) => row.original.isCorrect ? 'Correct' : 'Incorrect'
//                   },
//                 ]}
//                 data={selectedResult.resultDetails}
//               />
//             </div>
//           )}
//           <DialogFooter>
//             <Button onClick={() => setIsResultModalVisible(false)}>Close</Button>
//             <Button onClick={() => generatePDF(selectedResult)}>
//               <DownloadIcon className="mr-2 h-4 w-4" /> Download PDF
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
