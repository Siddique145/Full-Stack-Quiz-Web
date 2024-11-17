// // // import React, { useState } from 'react';
// // // import { useHistory } from 'react-router-dom';
// // // import { auth, db } from '../../firebase/firebase';
// // // import { collection, addDoc } from 'firebase/firestore';

// // // function QuizCreation() {
// // //   const [title, setTitle] = useState('');
// // //   const [description, setDescription] = useState('');
// // //   const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
// // //   const history = useHistory();

// // //   const handleAddQuestion = () => {
// // //     setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
// // //   };

// // //   const handleQuestionChange = (index, field, value) => {
// // //     const newQuestions = [...questions];
// // //     if (field === 'question') {
// // //       newQuestions[index].question = value;
// // //     } else if (field.startsWith('option')) {
// // //       const optionIndex = parseInt(field.split('-')[1]);
// // //       newQuestions[index].options[optionIndex] = value;
// // //     } else if (field === 'correctAnswer') {
// // //       newQuestions[index].correctAnswer = parseInt(value);
// // //     }
// // //     setQuestions(newQuestions);
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       await addDoc(collection(db, 'quizzes'), {
// // //         title,
// // //         description,
// // //         questions,
// // //         teacherId: auth.currentUser.uid,
// // //         createdAt: new Date()
// // //       });
// // //       history.push('/teacher');
// // //     } catch (error) {
// // //       console.error('Error adding quiz: ', error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="container mx-auto px-4 py-8">
// // //       <h1 className="text-3xl font-bold mb-6">Create a New Quiz</h1>
// // //       <form onSubmit={handleSubmit} className="space-y-6">
// // //         <div>
// // //           <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
// // //           <input
// // //             type="text"
// // //             id="title"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             required
// // //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // //           />
// // //         </div>
// // //         <div>
// // //           <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
// // //           <textarea
// // //             id="description"
// // //             value={description}
// // //             onChange={(e) => setDescription(e.target.value)}
// // //             required
// // //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // //           ></textarea>
// // //         </div>
// // //         {questions.map((question, index) => (
// // //           <div key={index} className="border p-4 rounded">
// // //             <h3 className="text-lg font-semibold mb-2">Question {index + 1}</h3>
// // //             <input
// // //               type="text"
// // //               value={question.question}
// // //               onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
// // //               placeholder="Enter question"
// // //               required
// // //               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // //             />
// // //             {question.options.map((option, optionIndex) => (
// // //               <div key={optionIndex} className="mt-2">
// // //                 <input
// // //                   type="text"
// // //                   value={option}
// // //                   onChange={(e) => handleQuestionChange(index, `option-${optionIndex}`, e.target.value)}
// // //                   placeholder={`Option ${optionIndex + 1}`}
// // //                   required
// // //                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // //                 />
// // //               </div>
// // //             ))}
// // //             <div className="mt-2">
// // //               <label htmlFor={`correctAnswer-${index}`} className="block text-sm font-medium text-gray-700">Correct Answer</label>
// // //               <select
// // //                 id={`correctAnswer-${index}`}
// // //                 value={question.correctAnswer}
// // //                 onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
// // //                 required
// // //                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
// // //               >
// // //                 {question.options.map((_, optionIndex) => (
// // //                   <option key={optionIndex} value={optionIndex}>Option {optionIndex + 1}</option>
// // //                 ))}
// // //               </select>
// // //             </div>
// // //           </div>
// // //         ))}
// // //         <button
// // //           type="button"
// // //           onClick={handleAddQuestion}
// // //           className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
// // //         >
// // //           Add Question
// // //         </button>
// // //         <div>
// // //           <button
// // //             type="submit"
// // //             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
// // //           >
// // //             Create Quiz
// // //           </button>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // }
// // // export default QuizCreation

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
// // import { auth, db } from "../../firebase/firebase";
// // import { collection, addDoc } from "firebase/firestore";

// // function QuizCreation() {
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [questions, setQuestions] = useState([
// //     { question: "", options: ["", "", "", ""], correctAnswer: 0 },
// //   ]);
// //   const navigate = useNavigate(); // Use the navigate hook

// //   const handleAddQuestion = () => {
// //     setQuestions([
// //       ...questions,
// //       { question: "", options: ["", "", "", ""], correctAnswer: 0 },
// //     ]);
// //   };

// //   const handleQuestionChange = (index, field, value) => {
// //     const newQuestions = [...questions];
// //     if (field === "question") {
// //       newQuestions[index].question = value;
// //     } else if (field.startsWith("option")) {
// //       const optionIndex = parseInt(field.split("-")[1]);
// //       newQuestions[index].options[optionIndex] = value;
// //     } else if (field === "correctAnswer") {
// //       newQuestions[index].correctAnswer = parseInt(value);
// //     }
// //     setQuestions(newQuestions);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await addDoc(collection(db, "quizzes"), {
// //         title,
// //         description,
// //         questions,
// //         teacherId: auth.currentUser.uid,
// //         createdAt: new Date(),
// //       });
// //       navigate("/teacher"); // Replace history.push with navigate
// //     } catch (error) {
// //       console.error("Error adding quiz: ", error);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <h1 className="text-3xl font-bold mb-6">Create a New Quiz</h1>
// //       <form onSubmit={handleSubmit} className="space-y-6">
// //         <div>
// //           <label
// //             htmlFor="title"
// //             className="block text-sm font-medium text-gray-700"
// //           >
// //             Title
// //           </label>
// //           <input
// //             type="text"
// //             id="title"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             required
// //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //           />
// //         </div>
// //         <div>
// //           <label
// //             htmlFor="description"
// //             className="block text-sm font-medium text-gray-700"
// //           >
// //             Description
// //           </label>
// //           <textarea
// //             id="description"
// //             value={description}
// //             onChange={(e) => setDescription(e.target.value)}
// //             required
// //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //           ></textarea>
// //         </div>
// //         {questions.map((question, index) => (
// //           <div key={index} className="border p-4 rounded">
// //             <h3 className="text-lg font-semibold mb-2">Question {index + 1}</h3>
// //             <input
// //               type="text"
// //               value={question.question}
// //               onChange={(e) =>
// //                 handleQuestionChange(index, "question", e.target.value)
// //               }
// //               placeholder="Enter question"
// //               required
// //               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //             />
// //             {question.options.map((option, optionIndex) => (
// //               <div key={optionIndex} className="mt-2">
// //                 <input
// //                   type="text"
// //                   value={option}
// //                   onChange={(e) =>
// //                     handleQuestionChange(
// //                       index,
// //                       `option-${optionIndex}`,
// //                       e.target.value
// //                     )
// //                   }
// //                   placeholder={`Option ${optionIndex + 1}`}
// //                   required
// //                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                 />
// //               </div>
// //             ))}
// //             <div className="mt-2">
// //               <label
// //                 htmlFor={`correctAnswer-${index}`}
// //                 className="block text-sm font-medium text-gray-700"
// //               >
// //                 Correct Answer
// //               </label>
// //               <select
// //                 id={`correctAnswer-${index}`}
// //                 value={question.correctAnswer}
// //                 onChange={(e) =>
// //                   handleQuestionChange(index, "correctAnswer", e.target.value)
// //                 }
// //                 required
// //                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
// //               >
// //                 {question.options.map((_, optionIndex) => (
// //                   <option key={optionIndex} value={optionIndex}>
// //                     Option {optionIndex + 1}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>
// //         ))}
// //         <button
// //           type="button"
// //           onClick={handleAddQuestion}
// //           className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
// //         >
// //           Add Question
// //         </button>
// //         <div>
// //           <button
// //             type="submit"
// //             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
// //           >
// //             Create Quiz
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default QuizCreation














// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
// import { auth, db } from "../../firebase/firebase";
// import { collection, addDoc } from "firebase/firestore";
// // import {  } from '@ant-design/icons'; // Import Cancel icon from Ant Design
// import { CloseOutlined } from '@ant-design/icons';

// function QuizCreation() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [questions, setQuestions] = useState([
//     { question: "", options: ["", "", "", ""], correctAnswer: 0 },
//   ]);
//   const navigate = useNavigate(); // Use the navigate hook

//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       { question: "", options: ["", "", "", ""], correctAnswer: 0 },
//     ]);
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const newQuestions = [...questions];
//     if (field === "question") {
//       newQuestions[index].question = value;
//     } else if (field.startsWith("option")) {
//       const optionIndex = parseInt(field.split("-")[1]);
//       newQuestions[index].options[optionIndex] = value;
//     } else if (field === "correctAnswer") {
//       newQuestions[index].correctAnswer = parseInt(value);
//     }
//     setQuestions(newQuestions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, "quizzes"), {
//         title,
//         description,
//         questions,
//         teacherId: auth.currentUser.uid,
//         createdAt: new Date(),
//       });
//       navigate("/teacher"); // Navigate to the teacher's page after quiz creation
//     } catch (error) {
//       console.error("Error adding quiz: ", error);
//     }
//   };

//   // Handle navigation back to the teacher's page on Cancel
//   const handleCancel = () => {
//     navigate("/teacher");
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Create a New Quiz</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label
//             htmlFor="title"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           ></textarea>
//         </div>
//         {questions.map((question, index) => (
//           <div key={index} className="border p-4 rounded">
//             <h3 className="text-lg font-semibold mb-2">Question {index + 1}</h3>
//             <input
//               type="text"
//               value={question.question}
//               onChange={(e) =>
//                 handleQuestionChange(index, "question", e.target.value)
//               }
//               placeholder="Enter question"
//               required
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//             {question.options.map((option, optionIndex) => (
//               <div key={optionIndex} className="mt-2">
//                 <input
//                   type="text"
//                   value={option}
//                   onChange={(e) =>
//                     handleQuestionChange(
//                       index,
//                       `option-${optionIndex}`,
//                       e.target.value
//                     )
//                   }
//                   placeholder={`Option ${optionIndex + 1}`}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             ))}
//             <div className="mt-2">
//               <label
//                 htmlFor={`correctAnswer-${index}`}
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Correct Answer
//               </label>
//               <select
//                 id={`correctAnswer-${index}`}
//                 value={question.correctAnswer}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "correctAnswer", e.target.value)
//                 }
//                 required
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//               >
//                 {question.options.map((_, optionIndex) => (
//                   <option key={optionIndex} value={optionIndex}>
//                     Option {optionIndex + 1}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddQuestion}
//           className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Add Question
//         </button>
//         <div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Create Quiz
//           </button>
//         </div>
//       </form>

//       {/* Floating Cancel Button */}
//       <button
//         onClick={handleCancel}
//         className="fixed bottom-4 left-4 bg-red-500 hover:bg-red-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
//       >
//         {/* <ArrowLeftOutlined className="text-xl" /> */}
//         <CloseOutlined className="text-xl"  />
//       </button>
//     </div>
//   );
// }

// export default QuizCreation;
























import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { CloseOutlined } from '@ant-design/icons';

function QuizCreation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0, timer: 30 },
  ]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: 0, timer: 30 }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "question") {
      newQuestions[index].question = value;
    } else if (field.startsWith("option")) {
      const optionIndex = parseInt(field.split("-")[1]);
      newQuestions[index].options[optionIndex] = value;
    } else if (field === "correctAnswer") {
      newQuestions[index].correctAnswer = parseInt(value);
    } else if (field === "timer") {
      newQuestions[index].timer = parseInt(value);
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "quizzes"), {
        title,
        description,
        questions,
        teacherId: auth.currentUser.uid,
        createdAt: new Date(),
      });
      navigate("/teacher");
    } catch (error) {
      console.error("Error adding quiz: ", error);
    }
  };

  const handleCancel = () => {
    navigate("/teacher");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border rounded-md py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border rounded-md py-2 px-3"
          ></textarea>
        </div>
        {questions.map((question, index) => (
          <div key={index} className="border p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Question {index + 1}</h3>
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
              placeholder="Enter question"
              required
              className="mt-1 block w-full border rounded-md py-2 px-3"
            />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mt-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleQuestionChange(index, `option-${optionIndex}`, e.target.value)}
                  placeholder={`Option ${optionIndex + 1}`}
                  required
                  className="mt-1 block w-full border rounded-md py-2 px-3"
                />
              </div>
            ))}
            <div className="mt-2">
              <label htmlFor={`correctAnswer-${index}`} className="block text-sm font-medium text-gray-700">Correct Answer</label>
              <select
                id={`correctAnswer-${index}`}
                value={question.correctAnswer}
                onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md"
              >
                {question.options.map((_, optionIndex) => (
                  <option key={optionIndex} value={optionIndex}>Option {optionIndex + 1}</option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <label htmlFor={`timer-${index}`} className="block text-sm font-medium text-gray-700">Timer (seconds)</label>
              <input
                type="number"
                id={`timer-${index}`}
                value={question.timer}
                onChange={(e) => handleQuestionChange(index, "timer", e.target.value)}
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion} className="mt-4 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">Add Question</button>
        <div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">Create Quiz</button>
        </div>
      </form>

      <button onClick={handleCancel} className="fixed bottom-4 left-4 bg-red-500 hover:bg-red-700 text-white p-3 rounded-full">
        <CloseOutlined className="text-xl" />
      </button>
    </div>
  );
}

export default QuizCreation;
