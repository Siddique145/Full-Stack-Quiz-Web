// // "use client"
// import React from "react"
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer
// } from "@react-pdf/renderer"

// // Define styles for PDF
// const styles = StyleSheet.create({
//   page: { padding: 30 },
//   title: { fontSize: 24, marginBottom: 10 },
//   subtitle: { fontSize: 18, marginBottom: 10 },
//   text: { fontSize: 12, marginBottom: 5 },
//   questionSection: { marginBottom: 15 },
//   optionSection: { marginLeft: 10 }
// })

// export default function QuizPDFGenerator({ quizData }) {
//   return (
//     <PDFViewer style={{ width: "100%", height: "100vh" }}>
//       <Document>
//         <Page size="A4" style={styles.page}>
//           <View>
//             <Text style={styles.title}>Quiz Result Report</Text>
//             <Text style={styles.text}>Quiz ID: {quizData.quizId}</Text>
//             <Text style={styles.text}>Student ID: {quizData.studentId}</Text>
//             <Text style={styles.text}>
//               Submitted At: {quizData.submittedAt}
//             </Text>
//             <Text style={styles.text}>
//               Score: {quizData.score}/{quizData.totalQuestions}
//             </Text>
//             <Text style={styles.text}>Percentage: {quizData.percentage}%</Text>

//             <Text style={styles.subtitle}>Questions and Answers</Text>
//             {quizData.resultDetails.map((question, index) => (
//               <View key={question.questionId} style={styles.questionSection}>
//                 <Text style={styles.text}>
//                   {index + 1}. {question.questionText}
//                 </Text>
//                 <View style={styles.optionSection}>
//                   {question.options.map((option, optionIndex) => (
//                     <Text key={optionIndex} style={styles.text}>
//                       {String.fromCharCode(97 + optionIndex)}. {option}
//                       {option === question.selectedAnswer && " (Selected)"}
//                       {option === question.correctAnswer && " (Correct)"}
//                     </Text>
//                   ))}
//                 </View>
//                 <Text style={styles.text}>
//                   Your Answer: {question.selectedAnswer || "Not answered"}
//                 </Text>
//                 <Text style={styles.text}>
//                   Correct Answer: {question.correctAnswer}
//                 </Text>
//                 <Text style={styles.text}>
//                   Result: {question.isCorrect ? "Correct" : "Incorrect"}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </Page>
//       </Document>
//     </PDFViewer>
//   )
// }


















import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer
} from "@react-pdf/renderer";

// Define styles for PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
  questionSection: { marginBottom: 15 },
  optionSection: { marginLeft: 10 }
});

export default function QuizPDFGenerator({ quizData }) {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text style={styles.title}>Quiz Result Report</Text>
            <Text style={styles.text}>Quiz ID: {quizData.quizId}</Text>
            <Text style={styles.text}>Student ID: {quizData.studentId}</Text>
            <Text style={styles.text}>
              Submitted At: {quizData.submittedAt}
            </Text>
            <Text style={styles.text}>
              Score: {quizData.score}/{quizData.totalQuestions}
            </Text>
            <Text style={styles.text}>Percentage: {quizData.percentage}%</Text>

            <Text style={styles.subtitle}>Questions and Answers</Text>
            {quizData.resultDetails.map((question, index) => (
              <View key={question.questionId} style={styles.questionSection}>
                <Text style={styles.text}>
                  {index + 1}. {question.questionText}
                </Text>
                <View style={styles.optionSection}>
                  {question.options.map((option, optionIndex) => (
                    <Text key={optionIndex} style={styles.text}>
                      {String.fromCharCode(97 + optionIndex)}. {option}
                      {option === question.selectedAnswer && " (Selected)"}
                      {option === question.correctAnswer && " (Correct)"}
                    </Text>
                  ))}
                </View>
                <Text style={styles.text}>
                  Your Answer: {question.selectedAnswer || "Not answered"}
                </Text>
                <Text style={styles.text}>
                  Correct Answer: {question.correctAnswer}
                </Text>
                <Text style={styles.text}>
                  Result: {question.isCorrect ? "Correct" : "Incorrect"}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
