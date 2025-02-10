import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  Layout,
  Button,
  Card,
  Avatar,
  Input,
  Modal,
  List,
  Typography,
  message,
  Row,
  Col,
  Spin,
  Statistic,
  Tag,
  Tabs,
  Table,
} from "antd";
import Swal from "sweetalert2"; // Import SweetAlert2
import {
  UserOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
  PrinterOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For creating tables in PDFs
import Hero from "../homepage/Hero";
import Footer from "../homepage/Footer";
import TopHeader from "../homepage/TopHeader";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Header, Content } = Layout;

export default function StudentDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [accessCode, setAccessCode] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentAvatar, setStudentAvatar] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
    fetchQuizResults();
    fetchStudentInfo();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const userDoc = await getDocs(
        query(
          collection(db, "users"),
          where("email", "==", auth.currentUser.email)
        )
      );
      const userData = userDoc.docs[0].data();

      const teacherEmail = userData.teacherEmail;

      const teacherDoc = await getDocs(
        query(collection(db, "users"), where("email", "==", teacherEmail))
      );
      const teacherId = teacherDoc.docs[0].id;

      const q = query(
        collection(db, "quizzes"),
        where("teacherId", "==", teacherId),
        where("locked", "==", false)
      );
      const querySnapshot = await getDocs(q);
      const quizzesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuizzes(quizzesData);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchQuizResults = async () => {
    try {
      const q = query(
        collection(db, "allResults"),
        where("studentId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const resultsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuizResults(resultsData);
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    }
  };

  const fetchStudentInfo = async () => {
    const studentDoc = await getDocs(
      query(
        collection(db, "users"),
        where("email", "==", auth.currentUser.email)
      )
    );
    if (!studentDoc.empty) {
      const studentData = studentDoc.docs[0].data();
      setStudentName(studentData.name);
      setStudentAvatar(studentData.name.charAt(0));
      setStudentEmail(studentData.email);
      setStudentPassword(studentData.password);
    }
  };

  // const handleAccessCodeSubmit = (quizId) => {
  //   const quiz = quizzes.find((q) => q.id === quizId);
  //   if (quiz.accessCode === accessCode) {
  //     navigate(`/take-quiz/${quizId}`);
  //   } else {
  //     message.error("Invalid access code");
  //   }
  // };
  const handleQuizStart = (quizId) => {
    navigate(`/take-quiz/${quizId}`);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Confirm Logout",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        auth.signOut();
        navigate("/login"); // Redirect to login page after logging out
        Swal.fire(
          "Logged out!",
          "You have been logged out successfully.",
          "success"
        );
      }
    });
  };
  // const handleLogout = () => {
  //   auth.signOut();
  //   navigate("/login");
  // };

  const handleProfileClick = () => {
    setIsProfileModalVisible(true);
  };

  const handleViewResult = (result) => {
    setSelectedResult(result);
    setIsResultModalVisible(true);
  };

  const handlePrintResult = () => {
    if (!selectedResult) return;

    const doc = new jsPDF();
    const { quizTitle, score, totalQuestions, resultDetails, submittedAt } =
      selectedResult;

    // Set the document's title and general style
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Set text color to black

    // Title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255); // purple color for the quiz title
    doc.text(`Quiz Title: ${quizTitle}`, 14, 20);

    // Score
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Reset text color to black
    doc.text(`Score: ${score}/${totalQuestions}`, 14, 30);

    // Time taken (commented out, but you can uncomment it if available)
    // doc.text(`Time Taken: ${selectedResult.timeTaken} minutes`, 14, 40);

    // Submitted At
    doc.text(`Submitted At: ${new Date(submittedAt).toLocaleString()}`, 14, 40);

    // Add some space
    doc.setLineWidth(0.5);
    doc.line(14, 45, 195, 45); // Draw a line separator

    // Table Heading
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // White text for the table header
    const tableColumnNames = [
      "Question No",
      "Question",
      "Your Answer",
      "Correct Answer",
      "Result",
    ];
    const tableColumnWidths = [20, 70, 30, 30, 20];

    // Styling for Table Headers
    doc.autoTable({
      startY: 50,
      head: [tableColumnNames],
      body: [],
      theme: "grid",
      styles: {
        fillColor: [0, 123, 255], // purple color for header row
        textColor: [255, 255, 255], // White text color
        fontSize: 10,
        halign: "center", // Align the headers to the center
      },
      columnStyles: {
        0: { cellWidth: tableColumnWidths[0] },
        1: { cellWidth: tableColumnWidths[1] },
        2: { cellWidth: tableColumnWidths[2] },
        3: { cellWidth: tableColumnWidths[3] },
        4: { cellWidth: tableColumnWidths[4] },
      },
    });

    // Add result rows to the table
    const questionDetails = resultDetails.map((question) => [
      question.questionId,
      question.questionText,
      question.selectedAnswer,
      question.correctAnswer,
      question.isCorrect ? "Correct" : "Incorrect",
    ]);

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10, // Add some space between the header and rows
      body: questionDetails,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 4,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: tableColumnWidths[0] },
        1: { cellWidth: tableColumnWidths[1] },
        2: { cellWidth: tableColumnWidths[2] },
        3: { cellWidth: tableColumnWidths[3] },
        4: { cellWidth: tableColumnWidths[4] },
      },
    });
    doc.save(`${quizTitle}_Result.pdf`);
  };
  const isQuizAttempted = (quizId) => {
    return quizResults.some((result) => result.quizId === quizId);
  };

  const getQuizResult = (quizId) => {
    return quizResults.find((result) => result.quizId === quizId);
  };
  const sortedQuizResults = quizResults.sort((a, b) => {
    const dateA = a.submittedAt
      ? new Date(a.submittedAt.toDate())
      : new Date(0);
    const dateB = b.submittedAt
      ? new Date(b.submittedAt.toDate())
      : new Date(0);
    return dateB - dateA; // Sort in descending order (latest date first)
  });

  const columns = [
    {
      title: "Quiz Title",
      dataIndex: "quizId",
      key: "quizId",
      render: (quizId) => {
        const quiz = quizzes.find((q) => q.id === quizId);
        return quiz ? quiz.title : "Unknown Quiz";
      },
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (score, record) => `${score}/${record.totalQuestions}`,
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage) => `${percentage}%`,
    },
    {
      title: "Submitted At",
      dataIndex: "quizId",
      key: "submittedAt",
      render: (quizId) => {
        const quizResult = sortedQuizResults.find(
          (result) => result.quizId === quizId
        );
        return quizResult && quizResult.submittedAt
          ? new Date(quizResult.submittedAt.toDate()).toLocaleString()
          : "N/A";
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleViewResult(record)}>View Details</Button>
      ),
    },
  ];

  return (
    <Spin spinning={loading} tip="Loading...">
      <Layout className="min-h-screen">
        <Header className="px-4 bg-gradient-to-r text-white bg-purple-600 hover:bg-purple-700">
          <Row justify="space-between" align="middle">
            <Col>
              <div className="flex items-center">
                <Avatar
                  className="mr-2 bg-white text-purple-600 cursor-pointer"
                  onClick={handleProfileClick}
                >
                  {studentAvatar}
                </Avatar>
                <Button
                  type="link"
                  onClick={handleProfileClick}
                  className="text-white cursor-pointer"
                >
                  {studentName}
                </Button>
              </div>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                className="bg-white text-purple-600 border-white hover:bg-purple-100 hover:border-100"
              />
            </Col>
          </Row>
        </Header>
        <TopHeader />
        <Layout>
          <Content className="p-6 bg-white rounded-lg shadow-md">
            {/* <Spin spinning={loading}> */}
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Available Quizzes" key="1">
                <Row gutter={[16, 16]} className="mb-6">
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Statistic
                      title="Available Quizzes"
                      value={quizzes.length}
                      className="bg-purple-50 p-4 rounded-lg"
                    />
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Statistic
                      title="Completed Quizzes"
                      value={quizResults.length}
                      className="bg-green-50 p-4 rounded-lg"
                    />
                  </Col>
                </Row>
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 3,
                    xl: 3,
                    xxl: 4,
                  }}
                  dataSource={quizzes}
                  renderItem={(quiz) => (
                    <List.Item>
                      <Card
                        hoverable
                        className="shadow-sm transition-all duration-300 hover:shadow-lg"
                        title={
                          <span className="text-lg font-semibold">
                            {quiz.title}
                          </span>
                        }
                      >
                        <p>{quiz.description}</p>
                        {/* <div className="mt-3">
                          Conditionally render based on if the quiz has been attempted
                          {isQuizAttempted(quiz.id) ? (
                            <span className="text-white bg-green-700 p-2 w-full text-sm font-semibold">
                              Completed
                            </span>
                          ) : (
                            <>
                              <Input.Search
                                placeholder="Enter access code"
                                onSearch={() => handleAccessCodeSubmit(quiz.id)}
                                onChange={(e) => setAccessCode(e.target.value)}
                              />
                              <Button
                                type="primary"
                                onClick={() => handleAccessCodeSubmit(quiz.id)}
                                disabled={isQuizAttempted(quiz.id)}
                                className="mt-2 w-full  bg-purple-600"
                                block
                              >
                                {isQuizAttempted(quiz.id)
                                  ? "Already Attempted"
                                  : "Start Quiz"}
                              </Button>
                            </>
                          )}
                        </div> */}

                        <div className="mt-3">
                          {/* Conditionally render based on if the quiz has been attempted */}
                          {isQuizAttempted(quiz.id) ? (
                            <span className="text-white bg-green-700 p-2 w-full text-sm font-semibold">
                              Completed
                            </span>
                          ) : (
                            <Button
                              type="primary"
                              onClick={() => handleQuizStart(quiz.id)} // Updated function
                              disabled={isQuizAttempted(quiz.id)}
                              className="mt-2 w-full bg-purple-600"
                              block
                            >
                              Start Quiz
                            </Button>
                          )}
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              <TabPane tab="Quiz Results" key="2">
                <Table
                  columns={columns}
                  dataSource={quizResults}
                  pagination={false}
                  rowKey="id"
                  scroll={{ x: 800 }}
                />
              </TabPane>
            </Tabs>
            {/* </Spin> */}
          </Content>
          <Footer />
        </Layout>

        <Modal
          title="Quiz Result Details"
          visible={isResultModalVisible}
          onCancel={() => setIsResultModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsResultModalVisible(false)}>
              Close
            </Button>,
            <Button
              key="print"
              // icon={<PrinterOutlined />}
              icon={<DownloadOutlined />}
              onClick={handlePrintResult}
              type="primary"
            ></Button>,
          ]}
        >
          {selectedResult && (
            <div>
              {/* Quiz Title and Result Information */}
              <Row gutter={[16, 24]} className="mb-6">
                <Col span={24}>
                  <p style={{ fontSize: 18, fontWeight: 600 }}>
                    <strong>Quiz Title:</strong> {selectedResult.quizTitle}
                  </p>
                </Col>
                <Col xs={12} sm={8} md={6}>
                  <p>
                    <strong>Score:</strong> {selectedResult.score}/
                    {selectedResult.totalQuestions}
                  </p>
                </Col>
                <Col xs={12} sm={8} md={6}>
                  <p>
                    <strong>Percentage:</strong> {selectedResult.percentage}%
                  </p>
                </Col>
                <Col xs={24} sm={8} md={6}>
                  <p>
                    <strong>Submitted At:</strong>{" "}
                    {new Date(
                      selectedResult.submittedAt.toDate()
                    ).toLocaleString()}
                  </p>
                </Col>
              </Row>

              {/* Result Details Table */}
              <Row>
                <Col span={24}>
                  <Table
                    columns={[
                      {
                        title: "Q:No",
                        dataIndex: "questionId",
                        key: "questionId",
                        align: "center",
                        render: (questionId) => (
                          <strong>{questionId.split("_")[1]}</strong>
                        ),
                        width: 100,
                      },
                      {
                        title: "Question",
                        dataIndex: "questionText",
                        key: "questionText",
                        render: (text) => <span>{text}</span>,
                      },
                      {
                        title: "Your Answer",
                        dataIndex: "selectedAnswer",
                        key: "selectedAnswer",
                        render: (text) => (
                          <Tag color={text === "Correct" ? "green" : "volcano"}>
                            {text}
                          </Tag>
                        ),
                      },
                      {
                        title: "Correct Answer",
                        dataIndex: "correctAnswer",
                        key: "correctAnswer",
                        render: (text) => <strong>{text}</strong>,
                      },
                      {
                        title: "Result",
                        dataIndex: "isCorrect",
                        key: "isCorrect",
                        render: (isCorrect) => (
                          <Tag color={isCorrect ? "green" : "red"}>
                            {isCorrect ? "Correct" : "Incorrect"}
                          </Tag>
                        ),
                        align: "center",
                        width: 150,
                      },
                    ]}
                    dataSource={selectedResult.resultDetails}
                    pagination={false}
                    rowKey="questionId"
                    bordered
                    scroll={{ x: 800 }} // Horizontal scroll for small screens
                    size="middle" // Set size to "middle" for a more compact table
                    rowClassName="table-row"
                    className="result-table"
                  />
                </Col>
              </Row>
            </div>
          )}
        </Modal>
        <Modal
          visible={isProfileModalVisible}
          onCancel={() => setIsProfileModalVisible(false)}
          footer={null}
          title="Profile"
        >
          <div className="text-center">
            <Avatar size={64}>{studentAvatar}</Avatar>
            <Title level={4}>{studentName}</Title>
            <Text>Email: {studentEmail}</Text>
            <br />
            {/* <Text>Password: {studentPassword}</Text> */}
          </div>
        </Modal>
      </Layout>
    </Spin>
  );
}
