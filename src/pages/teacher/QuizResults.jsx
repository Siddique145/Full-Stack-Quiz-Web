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
} from "@ant-design/icons";
import { Button } from "antd";
import { jsPDF } from "jspdf";

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

        // Fetch results from wholeStudentResults collection
        const resultsDoc = await getDoc(doc(db, "wholeStudentResults", quizId));
        if (!resultsDoc.exists()) {
          setError("No results found for this quiz");
          return;
        }
        const resultsData = resultsDoc.data();

        // Process and sort the results
        const processedResults = resultsData.studentsResults.map((result) => ({
          ...result,
          submittedAt: result.submittedAt?.toDate(), // Convert Firestore Timestamp to Date
        }));

        const sortedResults = processedResults.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return b.percentage - a.percentage;
        });

        setQuizResults(sortedResults);
      } catch (err) {
        setError("Error fetching quiz data: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const generatePDF = (result) => {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("Quiz Result", 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Student: ${result.name || "Unknown"}`, 20, 30);
    pdf.text(`Quiz: ${quizDetails?.title || "Unknown Quiz"}`, 20, 40);
    pdf.text(
      `Score: ${result.score} / ${quizDetails?.questions?.length || "Unknown"}`,
      20,
      50
    );
    pdf.text(`Percentage: ${result.percentage?.toFixed(2) || 0}%`, 20, 60);
    pdf.text(
      `Submitted At: ${result.submittedAt?.toLocaleString() || "Unknown"}`,
      20,
      70
    );

    // Add detailed results
    pdf.text("Detailed Results:", 20, 90);
    if (result.resultDetails && Array.isArray(result.resultDetails)) {
      result.resultDetails.forEach((detail, index) => {
        const yPos = 100 + index * 30;
        pdf.text(
          `Question ${index + 1}: ${detail.questionText || "Unknown Question"}`,
          20,
          yPos
        );
        pdf.text(
          `Your Answer: ${detail.selectedAnswer || "Not answered"}`,
          30,
          yPos + 10
        );
        pdf.text(
          `Correct Answer: ${detail.correctAnswer || "Unknown"}`,
          30,
          yPos + 20
        );
      });
    } else {
      pdf.text("No detailed results available", 20, 100);
    }

    pdf.save(`${result.name || "Unknown"}_quiz_result.pdf`);
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
                    key={result.studentId || index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-2 px-4 border-b">
                      {awardIcon} {awardText}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {result.name || "Unknown"}
                    </td>
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
                      {result.submittedAt?.toLocaleString() || "Unknown"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Button
                        onClick={() => generatePDF(result)}
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
