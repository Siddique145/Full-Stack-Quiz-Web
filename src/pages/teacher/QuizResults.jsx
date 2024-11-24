// // // import React, { useState, useEffect } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { db } from "../../firebase/firebase";
// // // import { doc, getDoc } from "firebase/firestore";
// // // import {
// // //   ArrowLeftOutlined,
// // //   TrophyFilled,
// // //   GoldFilled,
// // //   StarFilled,
// // //   FileTextOutlined,
// // // } from "@ant-design/icons";
// // // import { Button } from "antd";
// // // import { jsPDF } from "jspdf";

// // // export default function QuizResults() {
// // //   const { quizId } = useParams();
// // //   const [quizDetails, setQuizDetails] = useState(null);
// // //   const [quizResults, setQuizResults] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchQuizData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         if (!quizId) {
// // //           setError("Quiz ID is missing");
// // //           return;
// // //         }

// // //         // Fetch quiz details
// // //         const quizDoc = await getDoc(doc(db, "quizzes", quizId));
// // //         if (!quizDoc.exists()) {
// // //           setError("Quiz not found");
// // //           return;
// // //         }
// // //         const quizData = quizDoc.data();
// // //         setQuizDetails(quizData);

// // //         // Fetch results from wholeStudentResults collection
// // //         const resultsDoc = await getDoc(doc(db, "wholeStudentResults", quizId));
// // //         if (!resultsDoc.exists()) {
// // //           setError("No results found for this quiz");
// // //           return;
// // //         }
// // //         const resultsData = resultsDoc.data();

// // //         // Process and sort the results
// // //         const processedResults = resultsData.studentsResults.map((result) => ({
// // //           ...result,
// // //           submittedAt: result.submittedAt?.toDate(), // Convert Firestore Timestamp to Date
// // //         }));

// // //         const sortedResults = processedResults.sort((a, b) => {
// // //           if (b.score !== a.score) return b.score - a.score;
// // //           return b.percentage - a.percentage;
// // //         });

// // //         setQuizResults(sortedResults);
// // //       } catch (err) {
// // //         setError("Error fetching quiz data: " + err.message);
// // //         console.error(err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchQuizData();
// // //   }, [quizId]);

// // //   const generatePDF = (result) => {
// // //     const pdf = new jsPDF();
// // //     pdf.setFontSize(18);
// // //     pdf.text("Quiz Result", 20, 20);
// // //     pdf.setFontSize(12);
// // //     pdf.text(`Student: ${result.name || "Unknown"}`, 20, 30);
// // //     pdf.text(`Quiz: ${quizDetails?.title || "Unknown Quiz"}`, 20, 40);
// // //     pdf.text(
// // //       `Score: ${result.score} / ${quizDetails?.questions?.length || "Unknown"}`,
// // //       20,
// // //       50
// // //     );
// // //     pdf.text(`Percentage: ${result.percentage?.toFixed(2) || 0}%`, 20, 60);
// // //     pdf.text(
// // //       `Submitted At: ${result.submittedAt?.toLocaleString() || "Unknown"}`,
// // //       20,
// // //       70
// // //     );

// // //     // Add detailed results
// // //     pdf.text("Detailed Results:", 20, 90);
// // //     if (result.resultDetails && Array.isArray(result.resultDetails)) {
// // //       result.resultDetails.forEach((detail, index) => {
// // //         const yPos = 100 + index * 30;
// // //         pdf.text(
// // //           `Question ${index + 1}: ${detail.questionText || "Unknown Question"}`,
// // //           20,
// // //           yPos
// // //         );
// // //         pdf.text(
// // //           `Your Answer: ${detail.selectedAnswer || "Not answered"}`,
// // //           30,
// // //           yPos + 10
// // //         );
// // //         pdf.text(
// // //           `Correct Answer: ${detail.correctAnswer || "Unknown"}`,
// // //           30,
// // //           yPos + 20
// // //         );
// // //       });
// // //     } else {
// // //       pdf.text("No detailed results available", 20, 100);
// // //     }

// // //     pdf.save(`${result.name || "Unknown"}_quiz_result.pdf`);
// // //   };

// // //   if (loading) {
// // //     return <div className="text-center mt-8">Loading...</div>;
// // //   }

// // //   if (error) {
// // //     return <div className="text-center mt-8 text-red-600">{error}</div>;
// // //   }

// // //   return (
// // //     <div className="container mx-auto px-4 py-8">
// // //       <Button
// // //         onClick={() => navigate("/teacher")}
// // //         className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
// // //       >
// // //         <ArrowLeftOutlined className="mr-2" />
// // //         Back
// // //       </Button>

// // //       <h1 className="text-3xl font-bold mb-6">
// // //         Quiz Results: {quizDetails?.title || "Unknown Quiz"}
// // //       </h1>
// // //       {quizResults.length > 0 ? (
// // //         <div className="overflow-x-auto">
// // //           <table className="min-w-full bg-white">
// // //             <thead className="bg-gray-100">
// // //               <tr>
// // //                 <th className="py-2 px-4 border-b text-left">Rank</th>
// // //                 <th className="py-2 px-4 border-b text-left">Student Name</th>
// // //                 <th className="py-2 px-4 border-b text-left">Score</th>
// // //                 <th className="py-2 px-4 border-b text-left">Percentage</th>
// // //                 <th className="py-2 px-4 border-b text-left">Submitted At</th>
// // //                 <th className="py-2 px-4 border-b text-left">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {quizResults.map((result, index) => {
// // //                 let awardIcon;
// // //                 let awardText = "";
// // //                 const isFail = (result.percentage || 0) < 30;

// // //                 if (
// // //                   index === 0 ||
// // //                   (index > 0 &&
// // //                     result.score === quizResults[0].score &&
// // //                     result.percentage === quizResults[0].percentage)
// // //                 ) {
// // //                   awardIcon = <TrophyFilled style={{ color: "#FFD700" }} />;
// // //                   awardText = "1st";
// // //                 } else if (
// // //                   index === 1 ||
// // //                   (index > 1 &&
// // //                     result.score === quizResults[1].score &&
// // //                     result.percentage === quizResults[1].percentage)
// // //                 ) {
// // //                   awardIcon = <GoldFilled style={{ color: "#C0C0C0" }} />;
// // //                   awardText = "2nd";
// // //                 } else if (
// // //                   index === 2 ||
// // //                   (index > 2 &&
// // //                     result.score === quizResults[2].score &&
// // //                     result.percentage === quizResults[2].percentage)
// // //                 ) {
// // //                   awardIcon = <StarFilled style={{ color: "#CD7F32" }} />;
// // //                   awardText = "3rd";
// // //                 }

// // //                 return (
// // //                   <tr
// // //                     key={result.studentId || index}
// // //                     className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
// // //                   >
// // //                     <td className="py-2 px-4 border-b">
// // //                       {awardIcon} {awardText}
// // //                     </td>
// // //                     <td className="py-2 px-4 border-b">
// // //                       {result.name || "Unknown"}
// // //                     </td>
// // //                     <td className="py-2 px-4 border-b">
// // //                       {result.score || 0} /{" "}
// // //                       {quizDetails?.questions?.length || "Unknown"}
// // //                     </td>
// // //                     <td className="py-2 px-4 border-b">
// // //                       {isFail
// // //                         ? "Fail"
// // //                         : `${(result.percentage || 0).toFixed(2)}%`}
// // //                     </td>
// // //                     <td className="py-2 px-4 border-b">
// // //                       {result.submittedAt?.toLocaleString() || "Unknown"}
// // //                     </td>
// // //                     <td className="py-2 px-4 border-b">
// // //                       <Button
// // //                         onClick={() => generatePDF(result)}
// // //                         className="flex items-center text-blue-500 hover:text-blue-700"
// // //                       >
// // //                         <FileTextOutlined className="mr-2" />
// // //                         Generate PDF
// // //                       </Button>
// // //                     </td>
// // //                   </tr>
// // //                 );
// // //               })}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       ) : (
// // //         <p className="text-center mt-4">
// // //           No results available for this quiz yet.
// // //         </p>
// // //       )}
// // //     </div>
// // //   );
// // // }












// // import React, { useState, useEffect } from "react"
// // import { useParams, useNavigate } from "react-router-dom"
// // import { db } from "../../firebase/firebase"
// // import { doc, getDoc } from "firebase/firestore"
// // import {
// //   ArrowLeftOutlined,
// //   TrophyFilled,
// //   GoldFilled,
// //   StarFilled,
// //   FileTextOutlined,
// //   LoadingOutlined
// // } from "@ant-design/icons"
// // import { Button, Table, Tag, Spin, message } from "antd"
// // import { jsPDF } from "jspdf"
// // import "jspdf-autotable"

// // export default function QuizResults() {
// //   const { quizId } = useParams()
// //   const [quizDetails, setQuizDetails] = useState(null)
// //   const [quizResults, setQuizResults] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState(null)

// //   const navigate = useNavigate()

// //   useEffect(() => {
// //     const fetchQuizData = async () => {
// //       setLoading(true)
// //       try {
// //         if (!quizId) {
// //           throw new Error("Quiz ID is missing")
// //         }

// //         // Fetch quiz details
// //         const quizDoc = await getDoc(doc(db, "quizzes", quizId))
// //         if (!quizDoc.exists()) {
// //           throw new Error("Quiz not found")
// //         }
// //         const quizData = quizDoc.data()
// //         setQuizDetails(quizData)

// //         // Fetch results from wholeStudentResults collection
// //         const resultsDoc = await getDoc(doc(db, "wholeStudentResults", quizId))
// //         if (!resultsDoc.exists()) {
// //           throw new Error("No results found for this quiz")
// //         }
// //         const resultsData = resultsDoc.data()

// //         // Process and sort the results
// //         const processedResults = resultsData.studentsResults.map(
// //           (result, index) => ({
// //             ...result,
// //             key: index,
// //             submittedAt: result.submittedAt?.toDate() // Convert Firestore Timestamp to Date
// //           })
// //         )

// //         const sortedResults = processedResults.sort((a, b) => {
// //           if (b.score !== a.score) return b.score - a.score
// //           return b.percentage - a.percentage
// //         })

// //         setQuizResults(sortedResults)
// //       } catch (err) {
// //         setError(err.message)
// //         message.error(err.message)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchQuizData()
// //   }, [quizId])

// //   const generatePDF = result => {
// //     const pdf = new jsPDF()

// //     // Add logo or header image
// //     // pdf.addImage(logoUrl, 'PNG', 10, 10, 40, 40);

// //     // Set up styles
// //     pdf.setFont("helvetica", "bold")
// //     pdf.setFontSize(20)
// //     pdf.setTextColor(44, 62, 80) // Dark blue color

// //     // Title
// //     pdf.text("Quiz Result Certificate", 105, 30, { align: "center" })

// //     pdf.setFont("helvetica", "normal")
// //     pdf.setFontSize(12)
// //     pdf.setTextColor(52, 73, 94) // Slightly lighter blue

// //     // Student info
// //     pdf.text(`Student: ${result.name || "Unknown"}`, 20, 50)
// //     pdf.text(`Quiz: ${quizDetails?.title || "Unknown Quiz"}`, 20, 60)
// //     pdf.text(
// //       `Score: ${result.score} / ${quizDetails?.questions?.length || "Unknown"}`,
// //       20,
// //       70
// //     )
// //     pdf.text(`Percentage: ${result.percentage?.toFixed(2) || 0}%`, 20, 80)
// //     pdf.text(
// //       `Submitted At: ${result.submittedAt?.toLocaleString() || "Unknown"}`,
// //       20,
// //       90
// //     )

// //     // Add detailed results
// //     pdf.setFontSize(14)
// //     pdf.setFont("helvetica", "bold")
// //     pdf.text("Detailed Results:", 20, 110)

// //     if (result.resultDetails && Array.isArray(result.resultDetails)) {
// //       const tableData = result.resultDetails.map((detail, index) => [
// //         index + 1,
// //         detail.questionText || "Unknown Question",
// //         detail.selectedAnswer || "Not answered",
// //         detail.correctAnswer || "Unknown",
// //         detail.isCorrect ? "Correct" : "Incorrect"
// //       ])

// //       pdf.autoTable({
// //         startY: 120,
// //         head: [["#", "Question", "Your Answer", "Correct Answer", "Result"]],
// //         body: tableData,
// //         theme: "striped",
// //         headStyles: { fillColor: [41, 128, 185], textColor: 255 },
// //         alternateRowStyles: { fillColor: [235, 245, 251] }
// //       })
// //     } else {
// //       pdf.text("No detailed results available", 20, 120)
// //     }

// //     // Add footer
// //     const pageCount = pdf.internal.getNumberOfPages()
// //     for (let i = 1; i <= pageCount; i++) {
// //       pdf.setPage(i)
// //       pdf.setFontSize(10)
// //       pdf.setTextColor(149, 165, 166)
// //       pdf.text(
// //         `Page ${i} of ${pageCount}`,
// //         pdf.internal.pageSize.width - 30,
// //         pdf.internal.pageSize.height - 10
// //       )
// //     }

// //     pdf.save(`${result.name || "Unknown"}_quiz_result.pdf`)
// //   }

// //   const columns = [
// //     {
// //       title: "Rank",
// //       key: "rank",
// //       render: (_, __, index) => {
// //         let awardIcon
// //         let awardText = ""

// //         if (
// //           index === 0 ||
// //           (index > 0 &&
// //             quizResults[index].score === quizResults[0].score &&
// //             quizResults[index].percentage === quizResults[0].percentage)
// //         ) {
// //           awardIcon = <TrophyFilled style={{ color: "#FFD700" }} />
// //           awardText = "1st"
// //         } else if (
// //           index === 1 ||
// //           (index > 1 &&
// //             quizResults[index].score === quizResults[1].score &&
// //             quizResults[index].percentage === quizResults[1].percentage)
// //         ) {
// //           awardIcon = <GoldFilled style={{ color: "#C0C0C0" }} />
// //           awardText = "2nd"
// //         } else if (
// //           index === 2 ||
// //           (index > 2 &&
// //             quizResults[index].score === quizResults[2].score &&
// //             quizResults[index].percentage === quizResults[2].percentage)
// //         ) {
// //           awardIcon = <StarFilled style={{ color: "#CD7F32" }} />
// //           awardText = "3rd"
// //         }

// //         return (
// //           <span className="flex items-center">
// //             {awardIcon} <span className="ml-2">{awardText || index + 1}</span>
// //           </span>
// //         )
// //       }
// //     },
// //     {
// //       title: "Student Name",
// //       dataIndex: "name",
// //       key: "name",
// //       render: name => name || "Unknown"
// //     },
// //     {
// //       title: "Score",
// //       dataIndex: "score",
// //       key: "score",
// //       render: score =>
// //         `${score || 0} / ${quizDetails?.questions?.length || "Unknown"}`
// //     },
// //     {
// //       title: "Percentage",
// //       dataIndex: "percentage",
// //       key: "percentage",
// //       render: percentage => {
// //         const value = percentage || 0
// //         let color = value >= 70 ? "green" : value >= 40 ? "orange" : "red"
// //         return <Tag color={color}>{`${value.toFixed(2)}%`}</Tag>
// //       }
// //     },
// //     {
// //       title: "Submitted At",
// //       dataIndex: "submittedAt",
// //       key: "submittedAt",
// //       render: date => date?.toLocaleString() || "Unknown"
// //     },
// //     {
// //       title: "Actions",
// //       key: "actions",
// //       render: (_, record) => (
// //         <Button
// //           onClick={() => generatePDF(record)}
// //           icon={<FileTextOutlined />}
// //           type="primary"
// //           ghost
// //         >
// //           Generate PDF
// //         </Button>
// //       )
// //     }
// //   ]

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
// //       </div>
// //     )
// //   }

// //   if (error) {
// //     return (
// //       <div className="text-center mt-8 text-red-600">
// //         <h2 className="text-2xl font-bold mb-4">Error</h2>
// //         <p>{error}</p>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <div className="mb-6 flex justify-between items-center">
// //         <Button
// //           onClick={() => navigate("/teacher")}
// //           icon={<ArrowLeftOutlined />}
// //           size="large"
// //         >
// //           Back
// //         </Button>
// //         <h1 className="text-3xl font-bold text-center flex-grow">
// //           Quiz Results: {quizDetails?.title || "Unknown Quiz"}
// //         </h1>
// //       </div>

// //       {quizResults.length > 0 ? (
// //         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
// //           <Table
// //             columns={columns}
// //             dataSource={quizResults}
// //             pagination={{
// //               pageSize: 10,
// //               showSizeChanger: true,
// //               showQuickJumper: true
// //             }}
// //             scroll={{ x: true }}
// //             className="w-full"
// //           />
// //         </div>
// //       ) : (
// //         <div className="text-center mt-4 p-8 bg-white rounded-lg shadow-lg">
// //           <p className="text-xl text-gray-600">
// //             No results available for this quiz yet.
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }









// import React, { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { db } from "../../firebase/firebase"
// import { doc, getDoc } from "firebase/firestore"
// import {
//   ArrowLeftOutlined,
//   TrophyFilled,
//   GoldFilled,
//   StarFilled,
//   FileTextOutlined,
//   LoadingOutlined
// } from "@ant-design/icons"
// import { Button, Table, Tag, Spin, message } from "antd"
// import { jsPDF } from "jspdf"
// import "jspdf-autotable"
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

// export default function QuizResults() {
//   const { quizId } = useParams()
//   const [quizDetails, setQuizDetails] = useState(null)
//   const [quizResults, setQuizResults] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       setLoading(true)
//       try {
//         if (!quizId) {
//           throw new Error("Quiz ID is missing")
//         }

//         // Fetch quiz details
//         const quizDoc = await getDoc(doc(db, "quizzes", quizId))
//         if (!quizDoc.exists()) {
//           throw new Error("Quiz not found")
//         }
//         const quizData = quizDoc.data()
//         setQuizDetails(quizData)

//         // Fetch results from wholeStudentResults collection
//         const resultsDoc = await getDoc(doc(db, "wholeStudentResults", quizId))
//         if (!resultsDoc.exists()) {
//           throw new Error("No results found for this quiz")
//         }
//         const resultsData = resultsDoc.data()

//         // Process and sort the results
//         const processedResults = resultsData.studentsResults.map(
//           (result, index) => ({
//             ...result,
//             key: index,
//             submittedAt: result.submittedAt?.toDate() // Convert Firestore Timestamp to Date
//           })
//         )

//         const sortedResults = processedResults.sort((a, b) => {
//           if (b.score !== a.score) return b.score - a.score
//           return b.percentage - a.percentage
//         })

//         setQuizResults(sortedResults)
//       } catch (err) {
//         setError(err.message)
//         message.error(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchQuizData()
//   }, [quizId])

//   const generatePDF = async (result) => {
//     const pdf = new jsPDF()

//     // Set up styles
//     pdf.setFont("helvetica", "bold")
//     pdf.setFontSize(20)
//     pdf.setTextColor(44, 62, 80) // Dark blue color

//     // Title
//     pdf.text("Quiz Result Certificate", 105, 30, { align: "center" })

//     pdf.setFont("helvetica", "normal")
//     pdf.setFontSize(12)
//     pdf.setTextColor(52, 73, 94) // Slightly lighter blue

//     // Student info
//     pdf.text(`Student: ${result.name || "Unknown"}`, 20, 50)
//     pdf.text(`Quiz: ${quizDetails?.title || "Unknown Quiz"}`, 20, 60)
//     pdf.text(
//       `Score: ${result.score} / ${quizDetails?.questions?.length || "Unknown"}`,
//       20,
//       70
//     )
//     pdf.text(`Percentage: ${result.percentage?.toFixed(2) || 0}%`, 20, 80)
//     pdf.text(
//       `Submitted At: ${result.submittedAt?.toLocaleString() || "Unknown"}`,
//       20,
//       90
//     )

//     // Add detailed results
//     pdf.setFontSize(14)
//     pdf.setFont("helvetica", "bold")
//     pdf.text("Detailed Results:", 20, 110)

//     if (result.resultDetails && Array.isArray(result.resultDetails)) {
//       const tableData = result.resultDetails.map((detail, index) => [
//         index + 1,
//         detail.questionText || "Unknown Question",
//         detail.selectedAnswer || "Not answered",
//         detail.correctAnswer || "Unknown",
//         detail.isCorrect ? "Correct" : "Incorrect"
//       ])

//       pdf.autoTable({
//         startY: 120,
//         head: [["#", "Question", "Your Answer", "Correct Answer", "Result"]],
//         body: tableData,
//         theme: "striped",
//         headStyles: { fillColor: [41, 128, 185], textColor: 255 },
//         alternateRowStyles: { fillColor: [235, 245, 251] }
//       })
//     } else {
//       pdf.text("No detailed results available", 20, 120)
//     }

//     // Create Blob from PDF
//     const pdfBlob = pdf.output("blob")

//     // Upload the Blob to Firebase Storage
//     const storage = getStorage()
//     const storageRef = ref(storage, `quiz_results/${result.name}_${result.score}.pdf`)
//     const uploadTask = uploadBytesResumable(storageRef, pdfBlob)

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // You can handle progress here (optional)
//       },
//       (error) => {
//         console.error("Error uploading PDF:", error)
//       },
//       async () => {
//         // Get the download URL for the uploaded file
//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

//         // Send the download link to the parent via WhatsApp
//         const parentPhone = result.parentPhone || "defaultPhoneNumber" // Ensure parentPhone is fetched from Firestore
//         const message = `Here is the quiz result for ${result.name}: ${downloadURL}`
//         const whatsappUrl = `https://wa.me/${parentPhone}?text=${encodeURIComponent(message)}`

//         // Open WhatsApp in a new window (will trigger a share)
//         window.open(whatsappUrl, "_blank")
//       }
//     )
//   }

//   const columns = [
//     {
//       title: "Rank",
//       key: "rank",
//       render: (_, __, index) => {
//         let awardIcon
//         let awardText = ""

//         if (
//           index === 0 ||
//           (index > 0 &&
//             quizResults[index].score === quizResults[0].score &&
//             quizResults[index].percentage === quizResults[0].percentage)
//         ) {
//           awardIcon = <TrophyFilled style={{ color: "#FFD700" }} />
//           awardText = "1st"
//         } else if (
//           index === 1 ||
//           (index > 1 &&
//             quizResults[index].score === quizResults[1].score &&
//             quizResults[index].percentage === quizResults[1].percentage)
//         ) {
//           awardIcon = <GoldFilled style={{ color: "#C0C0C0" }} />
//           awardText = "2nd"
//         } else if (
//           index === 2 ||
//           (index > 2 &&
//             quizResults[index].score === quizResults[2].score &&
//             quizResults[index].percentage === quizResults[2].percentage)
//         ) {
//           awardIcon = <StarFilled style={{ color: "#CD7F32" }} />
//           awardText = "3rd"
//         }

//         return (
//           <span className="flex items-center">
//             {awardIcon} <span className="ml-2">{awardText || index + 1}</span>
//           </span>
//         )
//       }
//     },
//     {
//       title: "Student Name",
//       dataIndex: "name",
//       key: "name",
//       render: name => name || "Unknown"
//     },
//     {
//       title: "Score",
//       dataIndex: "score",
//       key: "score",
//       render: score =>
//         `${score || 0} / ${quizDetails?.questions?.length || "Unknown"}`
//     },
//     {
//       title: "Percentage",
//       dataIndex: "percentage",
//       key: "percentage",
//       render: percentage => {
//         const value = percentage || 0
//         let color = value >= 70 ? "green" : value >= 40 ? "orange" : "red"
//         return <Tag color={color}>{`${value.toFixed(2)}%`}</Tag>
//       }
//     },
//     {
//       title: "Submitted At",
//       dataIndex: "submittedAt",
//       key: "submittedAt",
//       render: date => date?.toLocaleString() || "Unknown"
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Button
//           onClick={() => generatePDF(record)}
//           icon={<FileTextOutlined />}
//           type="primary"
//           ghost
//         >
//           Generate & Share PDF
//         </Button>
//       )
//     }
//   ]

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="text-center mt-8 text-red-600">
//         <h2 className="text-2xl font-bold mb-4">Error</h2>
//         <p>{error}</p>
//       </div>
//     )
//   }

//   return (
//     <div className="p-4">
//       <Button
//         icon={<ArrowLeftOutlined />}
//         onClick={() => navigate(-1)}
//         type="link"
//       >
//         Back to Quizzes
//       </Button>

//       <div className="my-4">
//         <h1 className="text-3xl font-bold">{quizDetails?.title}</h1>
//         <p>{quizDetails?.description}</p>
//       </div>

//       <Table
//         dataSource={quizResults}
//         columns={columns}
//         pagination={false}
//         bordered
//       />
//     </div>
//   )
// }




// import React, { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { db } from "../../firebase/firebase"
// import { doc, getDoc } from "firebase/firestore"
// import {
//   ArrowLeftOutlined,
//   TrophyFilled,
//   GoldFilled,
//   StarFilled,
//   FileTextOutlined,
//   LoadingOutlined
// } from "@ant-design/icons"
// import { Button, Table, Tag, Spin, message } from "antd"
// import { jsPDF } from "jspdf"
// import "jspdf-autotable"
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

// export default function QuizResults() {
//   const { quizId } = useParams()
//   const [quizDetails, setQuizDetails] = useState(null)
//   const [quizResults, setQuizResults] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       setLoading(true)
//       try {
//         if (!quizId) {
//           throw new Error("Quiz ID is missing")
//         }

//         // Fetch quiz details
//         const quizDoc = await getDoc(doc(db, "quizzes", quizId))
//         if (!quizDoc.exists()) {
//           throw new Error("Quiz not found")
//         }
//         const quizData = quizDoc.data()
//         setQuizDetails(quizData)

//         // Fetch results from wholeStudentResults collection
//         const resultsDoc = await getDoc(doc(db, "wholeStudentResults", quizId))
//         if (!resultsDoc.exists()) {
//           throw new Error("No results found for this quiz")
//         }
//         const resultsData = resultsDoc.data()

//         // Process and sort the results
//         const processedResults = resultsData.studentsResults.map(
//           (result, index) => ({
//             ...result,
//             key: index,
//             submittedAt: result.submittedAt?.toDate() // Convert Firestore Timestamp to Date
//           })
//         )

//         const sortedResults = processedResults.sort((a, b) => {
//           if (b.score !== a.score) return b.score - a.score
//           return b.percentage - a.percentage
//         })

//         setQuizResults(sortedResults)
//       } catch (err) {
//         setError(err.message)
//         message.error(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchQuizData()
//   }, [quizId])

//   const generatePDF = async (result) => {
//     const pdf = new jsPDF()

//     // Set up styles
//     pdf.setFont("helvetica", "bold")
//     pdf.setFontSize(20)
//     pdf.setTextColor(44, 62, 80) // Dark blue color

//     // Title
//     pdf.text("Quiz Result Certificate", 105, 30, { align: "center" })

//     pdf.setFont("helvetica", "normal")
//     pdf.setFontSize(12)
//     pdf.setTextColor(52, 73, 94) // Slightly lighter blue

//     // Student info
//     pdf.text(`Student: ${result.name || "Unknown"}`, 20, 50)
//     pdf.text(`Quiz: ${quizDetails?.title || "Unknown Quiz"}`, 20, 60)
//     pdf.text(
//       `Score: ${result.score} / ${quizDetails?.questions?.length || "Unknown"}`,
//       20,
//       70
//     )
//     pdf.text(`Percentage: ${result.percentage?.toFixed(2) || 0}%`, 20, 80)
//     pdf.text(
//       `Submitted At: ${result.submittedAt?.toLocaleString() || "Unknown"}`,
//       20,
//       90
//     )

//     // Add detailed results
//     pdf.setFontSize(14)
//     pdf.setFont("helvetica", "bold")
//     pdf.text("Detailed Results:", 20, 110)

//     if (result.resultDetails && Array.isArray(result.resultDetails)) {
//       const tableData = result.resultDetails.map((detail, index) => [
//         index + 1,
//         detail.questionText || "Unknown Question",
//         detail.selectedAnswer || "Not answered",
//         detail.correctAnswer || "Unknown",
//         detail.isCorrect ? "Correct" : "Incorrect"
//       ])

//       pdf.autoTable({
//         startY: 120,
//         head: [["#", "Question", "Your Answer", "Correct Answer", "Result"]],
//         body: tableData,
//         theme: "striped",
//         headStyles: { fillColor: [41, 128, 185], textColor: 255 },
//         alternateRowStyles: { fillColor: [235, 245, 251] }
//       })
//     } else {
//       pdf.text("No detailed results available", 20, 120)
//     }

//     // Create Blob from PDF
//     const pdfBlob = pdf.output("blob")

//     // Upload the Blob to Firebase Storage
//     const storage = getStorage()
//     const storageRef = ref(storage, `quiz_results/${result.name}_${result.score}.pdf`)
//     const uploadTask = uploadBytesResumable(storageRef, pdfBlob)

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // You can handle progress here (optional)
//       },
//       (error) => {
//         console.error("Error uploading PDF:", error)
//       },
//       async () => {
//         // Get the download URL for the uploaded file
//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

//         // Send the download link to the parent via WhatsApp
//         const parentPhone = result.parentPhone || "defaultPhoneNumber" // Ensure parentPhone is fetched from Firestore
//         const message = `Here is the quiz result for ${result.name}: ${downloadURL}`

//         const whatsappUrl = `whatsapp://send?phone=${parentPhone}&text=${encodeURIComponent(message)}`

//         // Check if WhatsApp is installed and share directly
//         if (navigator.userAgent.match(/android|iphone|ipod|ipad/i)) {
//           window.location.href = whatsappUrl // Opens WhatsApp if installed
//         } else {
//           message.error('WhatsApp is not installed on your device!')
//         }
//       }
//     )
//   }

//   const columns = [
//     {
//       title: "Rank",
//       key: "rank",
//       render: (_, __, index) => {
//         let awardIcon
//         let awardText = ""

//         if (
//           index === 0 ||
//           (index > 0 &&
//             quizResults[index].score === quizResults[0].score &&
//             quizResults[index].percentage === quizResults[0].percentage)
//         ) {
//           awardIcon = <TrophyFilled style={{ color: "#FFD700" }} />
//           awardText = "1st"
//         } else if (
//           index === 1 ||
//           (index > 1 &&
//             quizResults[index].score === quizResults[1].score &&
//             quizResults[index].percentage === quizResults[1].percentage)
//         ) {
//           awardIcon = <GoldFilled style={{ color: "#C0C0C0" }} />
//           awardText = "2nd"
//         } else if (
//           index === 2 ||
//           (index > 2 &&
//             quizResults[index].score === quizResults[2].score &&
//             quizResults[index].percentage === quizResults[2].percentage)
//         ) {
//           awardIcon = <StarFilled style={{ color: "#CD7F32" }} />
//           awardText = "3rd"
//         }

//         return (
//           <span className="flex items-center">
//             {awardIcon} <span className="ml-2">{awardText || index + 1}</span>
//           </span>
//         )
//       }
//     },
//     {
//       title: "Student Name",
//       dataIndex: "name",
//       key: "name",
//       render: name => name || "Unknown"
//     },
//     {
//       title: "Score",
//       dataIndex: "score",
//       key: "score",
//       render: score =>
//         `${score || 0} / ${quizDetails?.questions?.length || "Unknown"}`
//     },
//     {
//       title: "Percentage",
//       dataIndex: "percentage",
//       key: "percentage",
//       render: percentage => {
//         const value = percentage || 0
//         let color = value >= 70 ? "green" : value >= 40 ? "orange" : "red"
//         return <Tag color={color}>{`${value.toFixed(2)}%`}</Tag>
//       }
//     },
//     {
//       title: "Submitted At",
//       dataIndex: "submittedAt",
//       key: "submittedAt",
//       render: date => date?.toLocaleString() || "Unknown"
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Button
//           onClick={() => generatePDF(record)}
//           icon={<FileTextOutlined />}
//           type="primary"
//           ghost
//         >
//           Generate PDF
//         </Button>
//       )
//     }
//   ]

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="text-center mt-8 text-red-600">
//         <h2 className="text-2xl font-bold mb-4">Error</h2>
//         <p>{error}</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <Button
//         icon={<ArrowLeftOutlined />}
//         onClick={() => navigate("/quizzes")}
//         className="mb-4"
//       >
//         Back to Quizzes
//       </Button>
//       <h2 className="text-center text-3xl font-bold mb-8">
//         Results for {quizDetails?.title || "Unknown Quiz"}
//       </h2>
//       <Table columns={columns} dataSource={quizResults} pagination={false} />
//     </div>
//   )
// }




// // upper code was working but not sharing to the whatsapp
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { db } from "../../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import {
//   ArrowLeftOutlined,
//   TrophyFilled,
//   GoldFilled,
//   StarFilled,
//   FileTextOutlined,
//   LoadingOutlined
// } from "@ant-design/icons";
// import { Button, Table, Tag, Spin, message } from "antd";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// export default function QuizResults() {
//   const { quizId } = useParams();
//   const [quizDetails, setQuizDetails] = useState(null);
//   const [quizResults, setQuizResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       setLoading(true);
//       try {
//         if (!quizId) {
//           throw new Error("Quiz ID is missing");
//         }

//         // Fetch quiz details
//         const quizDoc = await getDoc(doc(db, "quizzes", quizId));
//         if (!quizDoc.exists()) {
//           throw new Error("Quiz not found");
//         }
//         const quizData = quizDoc.data();
//         setQuizDetails(quizData);

//         // Fetch results from wholeStudentResults collection
//         const resultsDoc = await getDoc(doc(db, "wholeStudentResults", quizId));
//         if (!resultsDoc.exists()) {
//           throw new Error("No results found for this quiz");
//         }
//         const resultsData = resultsDoc.data();

//         // Process and sort the results
//         const processedResults = resultsData.studentsResults.map(
//           (result, index) => ({
//             ...result,
//             key: index,
//             submittedAt: result.submittedAt?.toDate() // Convert Firestore Timestamp to Date
//           })
//         );

//         const sortedResults = processedResults.sort((a, b) => {
//           if (b.score !== a.score) return b.score - a.score;
//           return b.percentage - a.percentage;
//         });

//         setQuizResults(sortedResults);
//       } catch (err) {
//         setError(err.message);
//         message.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuizData();
//   }, [quizId]);

//   const checkIfPDFExists = async (result) => {
//     const storage = getStorage();
//     const fileRef = ref(storage, `quiz_results/${result.name}_${result.score}.pdf`);

//     try {
//       const file = await getDownloadURL(fileRef); // Try to fetch the URL of the PDF
//       return file; // If the file exists, return the URL
//     } catch (error) {
//       return null; // If the file doesn't exist, return null
//     }
//   };

//   const generatePDF = async (result) => {
//     const pdf = new jsPDF();

//     // Set up styles
//     pdf.setFont("helvetica", "bold");
//     pdf.setFontSize(20);
//     pdf.setTextColor(44, 62, 80); // Dark blue color

//     // Title
//     pdf.text("Quiz Result Certificate", 105, 30, { align: "center" });

//     pdf.setFont("helvetica", "normal");
//     pdf.setFontSize(12);
//     pdf.setTextColor(52, 73, 94); // Slightly lighter blue

//     // Student info
//     pdf.text(`Student: ${result.name || "Unknown"}`, 20, 50);
//     pdf.text(`Quiz: ${quizDetails?.title || "Unknown Quiz"}`, 20, 60);
//     pdf.text(
//       `Score: ${result.score} / ${quizDetails?.questions?.length || "Unknown"}`,
//       20,
//       70
//     );
//     pdf.text(`Percentage: ${result.percentage?.toFixed(2) || 0}%`, 20, 80);
//     pdf.text(
//       `Submitted At: ${result.submittedAt?.toLocaleString() || "Unknown"}`,
//       20,
//       90
//     );

//     // Add detailed results
//     pdf.setFontSize(14);
//     pdf.setFont("helvetica", "bold");
//     pdf.text("Detailed Results:", 20, 110);

//     if (result.resultDetails && Array.isArray(result.resultDetails)) {
//       const tableData = result.resultDetails.map((detail, index) => [
//         index + 1,
//         detail.questionText || "Unknown Question",
//         detail.selectedAnswer || "Not answered",
//         detail.correctAnswer || "Unknown",
//         detail.isCorrect ? "Correct" : "Incorrect"
//       ]);

//       pdf.autoTable({
//         startY: 120,
//         head: [["#", "Question", "Your Answer", "Correct Answer", "Result"]],
//         body: tableData,
//         theme: "striped",
//         headStyles: { fillColor: [41, 128, 185], textColor: 255 },
//         alternateRowStyles: { fillColor: [235, 245, 251] }
//       });
//     } else {
//       pdf.text("No detailed results available", 20, 120);
//     }

//     // Create Blob from PDF
//     const pdfBlob = pdf.output("blob");

//     // Upload the Blob to Firebase Storage
//     const storage = getStorage();
//     const storageRef = ref(storage, `quiz_results/${result.name}_${result.score}.pdf`);
//     const uploadTask = uploadBytesResumable(storageRef, pdfBlob);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Handle progress if necessary
//       },
//       (error) => {
//         console.error("Error uploading PDF:", error);
//         message.error("Failed to upload PDF");
//       },
//       async () => {
//         // Get the download URL for the uploaded file
//         try {
//           const downloadURL = await getDownloadURL(storageRef);

//           // Send the download link to the parent via WhatsApp
//           const parentPhone = result.parentPhone || "defaultPhoneNumber"; // Ensure parentPhone is fetched from Firestore
//           const messageContent = `Here is the quiz result for ${result.name}: ${downloadURL}`;

//           const whatsappUrl = `whatsapp://send?phone=${parentPhone}&text=${encodeURIComponent(messageContent)}`;

//           // Check if WhatsApp is installed and share directly
//           if (navigator.userAgent.match(/android|iphone|ipod|ipad/i)) {
//             window.location.href = whatsappUrl; // Opens WhatsApp if installed
//           } else {
//             message.error("WhatsApp is not installed on your device!");
//           }
//         } catch (error) {
//           console.error("Error getting download URL:", error);
//           message.error("Error generating the download link");
//         }
//       }
//     );
//   };

//   const columns = [
//     {
//       title: "Rank",
//       key: "rank",
//       render: (_, __, index) => {
//         let awardIcon;
//         let awardText = "";

//         if (
//           index === 0 ||
//           (index > 0 &&
//             quizResults[index].score === quizResults[0].score &&
//             quizResults[index].percentage === quizResults[0].percentage)
//         ) {
//           awardIcon = <TrophyFilled style={{ color: "#FFD700" }} />;
//           awardText = "1st";
//         } else if (
//           index === 1 ||
//           (index > 1 &&
//             quizResults[index].score === quizResults[1].score &&
//             quizResults[index].percentage === quizResults[1].percentage)
//         ) {
//           awardIcon = <GoldFilled style={{ color: "#C0C0C0" }} />;
//           awardText = "2nd";
//         } else if (
//           index === 2 ||
//           (index > 2 &&
//             quizResults[index].score === quizResults[2].score &&
//             quizResults[index].percentage === quizResults[2].percentage)
//         ) {
//           awardIcon = <StarFilled style={{ color: "#CD7F32" }} />;
//           awardText = "3rd";
//         }

//         return (
//           <span className="flex items-center">
//             {awardIcon} <span className="ml-2">{awardText || index + 1}</span>
//           </span>
//         );
//       }
//     },
//     {
//       title: "Student Name",
//       dataIndex: "name",
//       key: "name",
//       render: (name) => name || "Unknown"
//     },
//     {
//       title: "Score",
//       dataIndex: "score",
//       key: "score",
//       render: (score) => `${score || 0} / ${quizDetails?.questions?.length || "Unknown"}`
//     },
//     {
//       title: "Percentage",
//       dataIndex: "percentage",
//       key: "percentage",
//       render: (percentage) => {
//         const value = percentage || 0;
//         let color = value >= 70 ? "green" : value >= 40 ? "orange" : "red";
//         return <Tag color={color}>{`${value.toFixed(2)}%`}</Tag>;
//       }
//     },
//     {
//       title: "Submitted At",
//       dataIndex: "submittedAt",
//       key: "submittedAt",
//       render: (date) => date?.toLocaleString() || "Unknown"
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, result) => {
//         return (
//           <Button
//             icon={<FileTextOutlined />}
//             type="primary"
//             size="small"
//             onClick={() => generatePDF(result)}
//           >
//             Generate PDF
//           </Button>
//         );
//       }
//     }
//   ];

//   if (loading) {
//     return (
//       <div className="centered-container">
//         <Spin indicator={<LoadingOutlined spin />} />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="centered-container">
//         <span>{error}</span>
//       </div>
//     );
//   }

//   return (
//     <div className="quiz-results">
//       <Button
//         type="link"
//         icon={<ArrowLeftOutlined />}
//         onClick={() => navigate("/quizzes")}
//       >
//         Back to Quizzes
//       </Button>
//       <h1>{quizDetails?.title || "Quiz Results"}</h1>
//       <Table
//         columns={columns}
//         dataSource={quizResults}
//         pagination={false}
//         rowKey="key"
//       />
//     </div>
//   );
// }




//uper code was also perfect but silly mistake into the sahring the pdf to the number format +03107508919





import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  ArrowLeftOutlined,
  TrophyFilled,
  GoldFilled,
  StarFilled,
  FileTextOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { Button, Table, Tag, Spin, message } from "antd";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function QuizResults() {
  const { quizId } = useParams();
  const [quizDetails, setQuizDetails] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        if (!quizId) {
          throw new Error("Quiz ID is missing");
        }

        // Fetch quiz details
        const quizDoc = await getDoc(doc(db, "quizzes", quizId));
        if (!quizDoc.exists()) {
          throw new Error("Quiz not found");
        }
        const quizData = quizDoc.data();
        setQuizDetails(quizData);

        // Fetch results from wholeStudentResults collection
        const resultsDoc = await getDoc(doc(db, "wholeStudentResults", quizId));
        if (!resultsDoc.exists()) {
          throw new Error("No results found for this quiz");
        }
        const resultsData = resultsDoc.data();

        // Process and sort the results
        const processedResults = resultsData.studentsResults.map(
          (result, index) => ({
            ...result,
            key: index,
            submittedAt: result.submittedAt?.toDate() // Convert Firestore Timestamp to Date
          })
        );

        const sortedResults = processedResults.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return b.percentage - a.percentage;
        });

        setQuizResults(sortedResults);
      } catch (err) {
        setError(err.message);
        message.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const checkIfPDFExists = async (result) => {
    const storage = getStorage();
    const fileRef = ref(storage, `quiz_results/${result.name}_${result.score}.pdf`);

    try {
      const file = await getDownloadURL(fileRef); // Try to fetch the URL of the PDF
      return file; // If the file exists, return the URL
    } catch (error) {
      return null; // If the file doesn't exist, return null
    }
  };

  const generatePDF = async (result) => {
    const pdf = new jsPDF();

    // Set up styles
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(44, 62, 80); // Dark blue color

    // Title
    pdf.text("Quiz Result Certificate", 105, 30, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.setTextColor(52, 73, 94); // Slightly lighter blue

    // Student info
    pdf.text(`Student: ${result.name || "Unknown"}`, 20, 50);
    pdf.text(`Quiz: ${quizDetails?.title || "Unknown Quiz"}`, 20, 60);
    pdf.text(
      `Score: ${result.score} / ${quizDetails?.questions?.length || "Unknown"}`,
      20,
      70
    );
    pdf.text(`Percentage: ${result.percentage?.toFixed(2) || 0}%`, 20, 80);
    pdf.text(
      `Submitted At: ${result.submittedAt?.toLocaleString() || "Unknown"}`,
      20,
      90
    );

    // Add detailed results
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Detailed Results:", 20, 110);

    if (result.resultDetails && Array.isArray(result.resultDetails)) {
      const tableData = result.resultDetails.map((detail, index) => [
        index + 1,
        detail.questionText || "Unknown Question",
        detail.selectedAnswer || "Not answered",
        detail.correctAnswer || "Unknown",
        detail.isCorrect ? "Correct" : "Incorrect"
      ]);

      pdf.autoTable({
        startY: 120,
        head: [["#", "Question", "Your Answer", "Correct Answer", "Result"]],
        body: tableData,
        theme: "striped",
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        alternateRowStyles: { fillColor: [235, 245, 251] }
      });
    } else {
      pdf.text("No detailed results available", 20, 120);
    }

    // Create Blob from PDF
    const pdfBlob = pdf.output("blob");

    // Upload the Blob to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `quiz_results/${result.name}_${result.score}.pdf`);
    const uploadTask = uploadBytesResumable(storageRef, pdfBlob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress if necessary
      },
      (error) => {
        console.error("Error uploading PDF:", error);
        message.error("Failed to upload PDF");
      },
      async () => {
        // Get the download URL for the uploaded file
        try {
          const downloadURL = await getDownloadURL(storageRef);

          // Format the parent's phone number to match the WhatsApp requirements
          let parentPhone = result.parentPhone || "03007508919"; // Default to a placeholder if not available

          // Ensure the phone number starts with +92 and removes any leading 0
          if (parentPhone.startsWith("0")) {
            parentPhone = `+92${parentPhone.substring(1)}`;
          } else if (!parentPhone.startsWith("+92")) {
            parentPhone = `+92${parentPhone}`;
          }

          const messageContent = `Here is the quiz result for ${result.name}: ${downloadURL}`;

          const whatsappUrl = `whatsapp://send?phone=${parentPhone}&text=${encodeURIComponent(messageContent)}`;

          // Check if WhatsApp is installed and share directly
          if (navigator.userAgent.match(/android|iphone|ipod|ipad/i)) {
            window.location.href = whatsappUrl; // Opens WhatsApp if installed
          } else {
            message.error("WhatsApp is not installed on your device!");
          }
        } catch (error) {
          console.error("Error getting download URL:", error);
          message.error("Error generating the download link");
        }
      }
    );
  };

  const columns = [
    {
      title: "Rank",
      key: "rank",
      render: (_, __, index) => {
        let awardIcon;
        let awardText = "";

        if (
          index === 0 ||
          (index > 0 &&
            quizResults[index].score === quizResults[0].score &&
            quizResults[index].percentage === quizResults[0].percentage)
        ) {
          awardIcon = <TrophyFilled style={{ color: "#FFD700" }} />;
          awardText = "1st";
        } else if (
          index === 1 ||
          (index > 1 &&
            quizResults[index].score === quizResults[1].score &&
            quizResults[index].percentage === quizResults[1].percentage)
        ) {
          awardIcon = <GoldFilled style={{ color: "#C0C0C0" }} />;
          awardText = "2nd";
        } else if (
          index === 2 ||
          (index > 2 &&
            quizResults[index].score === quizResults[2].score &&
            quizResults[index].percentage === quizResults[2].percentage)
        ) {
          awardIcon = <StarFilled style={{ color: "#CD7F32" }} />;
          awardText = "3rd";
        }

        return (
          <span className="flex items-center">
            {awardIcon} <span className="ml-2">{awardText || index + 1}</span>
          </span>
        );
      }
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
      render: (name) => name || "Unknown"
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (score) => `${score || 0} / ${quizDetails?.questions?.length || "Unknown"}`
    },
    {
      title: "Percentage",
      key: "percentage",
      render: (text, result) => (
        <span>{result.percentage ? `${result.percentage.toFixed(2)}%` : "N/A"}</span>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, result) => {
        return (
          <Button
            icon={<FileTextOutlined />}
            type="primary"
            size="small"
            onClick={() => generatePDF(result)}
          >
            Generate PDF
          </Button>
        );
      }
    }
  ];

  if (loading) {
    return (
      <div className="centered-container">
        <Spin indicator={<LoadingOutlined spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered-container">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="quiz-results">
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/quizzes")}
      >
        Back to Quizzes
      </Button>
      <h1>{quizDetails?.title || "Quiz Results"}</h1>
      <Table
        columns={columns}
        dataSource={quizResults}
        pagination={false}
        rowKey="key"
      />
    </div>
  );
}
