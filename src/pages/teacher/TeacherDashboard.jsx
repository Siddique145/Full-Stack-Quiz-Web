import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  Layout,
  Button,
  Card,
  Avatar,
  Input,
  Modal,
  Form,
  InputNumber,
  List,
  Typography,
  message,
  Row,
  Col,
  Spin,
  Statistic,
  Tabs,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  ShareAltOutlined,
  BookOutlined,
  TeamOutlined,
} from "@ant-design/icons";
// import { QRCode } from "antd";
import Swal from "sweetalert2"; // Import SweetAlert2

const { Header, Content } = Layout;
const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [teacherName, setTeacherName] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherAvatar, setTeacherAvatar] = useState("");
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTeacherModalVisible, setIsTeacherModalVisible] = useState(false); // for teacher profile modal
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
    fetchStudents();
    fetchTeacherInfo();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "quizzes"),
        where("teacherId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const quizzesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuizzes(quizzesData);
    } catch (error) {
      message.error("Failed to fetch quizzes");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("teacherEmail", "==", auth.currentUser.email)
      );
      const querySnapshot = await getDocs(q);
      const studentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsData);
    } catch (error) {
      message.error("Failed to fetch students");
    }
  };

  const fetchTeacherInfo = async () => {
    try {
      const teacherDoc = await getDocs(
        query(
          collection(db, "users"),
          where("email", "==", auth.currentUser.email)
        )
      );
      if (!teacherDoc.empty) {
        const teacher = teacherDoc.docs[0].data();
        setTeacherName(teacher.name);
        setTeacherEmail(teacher.email);
        setTeacherPassword(teacher.password);

        setTeacherAvatar(teacher.name.charAt(0)); // Only first letter of teacher's name
      }
    } catch (error) {
      message.error("Failed to fetch teacher information");
    }
  };

  const generateShareableLink = (quizId) => {
    return `${window.location.origin}/take-quiz/${quizId}`;
  };

  const toggleQuizLock = async (quizId, currentLockState) => {
    try {
      await updateDoc(doc(db, "quizzes", quizId), {
        locked: !currentLockState,
      });
      fetchQuizzes();
      message.success(
        `Quiz ${currentLockState ? "unlocked" : "locked"} successfully`
      );
    } catch (error) {
      message.error("Failed to update quiz lock status");
    }
  };

  // const generateAccessCode = async (quizId) => {
  //   try {
  //     const accessCode = Math.random()
  //       .toString(36)
  //       .substring(2, 8)
  //       .toUpperCase();
  //     await updateDoc(doc(db, "quizzes", quizId), { accessCode });
  //     fetchQuizzes();
  //     message.success("Access code generated successfully");
  //   } catch (error) {
  //     message.error("Failed to generate access code");
  //   }
  // };

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
  //   navigate('/login');
  // };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setIsEditModalVisible(true);
  };

  const handleUpdateQuiz = async (values) => {
    if (editingQuiz) {
      try {
        await updateDoc(doc(db, "quizzes", editingQuiz.id), values);
        setIsEditModalVisible(false);
        fetchQuizzes();
        message.success("Quiz updated successfully");
      } catch (error) {
        message.error("Failed to update quiz");
      }
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this quiz?",
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          await deleteDoc(doc(db, "quizzes", quizId));
          fetchQuizzes();
          message.success("Quiz deleted successfully");
        } catch (error) {
          message.error("Failed to delete quiz");
        }
      },
    });
  };

  const handleDisableStudent = async (studentId) => {
    try {
      await updateDoc(doc(db, "users", studentId), { disabled: true });
      message.success("Student disabled successfully");
      fetchStudents();
    } catch (error) {
      message.error("Failed to disable student");
    }
  };

  const handleDeleteStudent = async (studentId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this student?",
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          await deleteDoc(doc(db, "users", studentId));
          fetchStudents();
          message.success("Student deleted successfully");
        } catch (error) {
          message.error("Failed to delete student");
        }
      },
    });
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout className="min-h-screen bg-black">
      <Header className="px-4 bg-gradient-to-r text-white bg-purple-600 hover:bg-purple-700">
        <Row justify="space-between" align="middle">
          <Col>
            <div className="flex items-center">
              {/* Avatar with first letter of teacher's name */}
              <Avatar
                className="mr-2 bg-white text-purple-600"
                onClick={() => setIsTeacherModalVisible(true)}
              >
                {teacherAvatar}
              </Avatar>
              <Button
                type="link"
                onClick={() => setIsTeacherModalVisible(true)}
                className="text-white"
              >
                {teacherName}
              </Button>
            </div>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="bg-white text-purple-600 border-white hover:bg-purple-100 hover:border-purple-100"
            ></Button>
          </Col>
        </Row>
      </Header>

      <Layout>
        <Content className="p-6">
          <Spin spinning={loading}>
            <Tabs defaultActiveKey="1" className="w-full">
              {/* Quizzes Tab */}
              <TabPane tab="Quizzes" key="1">
                <Row gutter={[16, 16]} className="mb-6">
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Statistic
                      title="Total Quizzes"
                      value={quizzes.length}
                      className="bg-purple-50 p-4 rounded-lg"
                    />
                  </Col>
                </Row>

                <Title level={2} className="mb-4">
                  Your Quizzes
                </Title>
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
                        actions={[
                          <ShareAltOutlined
                            key="share"
                            onClick={() => {
                              setSelectedQuiz(quiz);
                              setIsShareModalVisible(true);
                            }}
                          />,
                          <Button
                            type="link"
                            onClick={() => navigate(`/results/${quiz.id}`)}
                          >
                            C-R
                          </Button>,
                          quiz.locked ? (
                            <LockOutlined
                              key="unlock"
                              onClick={() =>
                                toggleQuizLock(quiz.id, quiz.locked)
                              }
                            />
                          ) : (
                            <UnlockOutlined
                              key="unlock"
                              onClick={() =>
                                toggleQuizLock(quiz.id, quiz.locked)
                              }
                            />
                          ),
                          // <Button
                          //   type="link"
                          //   onClick={() => generateAccessCode(quiz.id)}
                          // >
                          //   G-c
                          // </Button>,
                          <EditOutlined
                            key="edit"
                            onClick={() => handleEditQuiz(quiz)}
                          />,
                          <DeleteOutlined
                            key="delete"
                            onClick={() => handleDeleteQuiz(quiz.id)}
                          />,
                        ]}
                      >
                        <Meta
                          title={
                            <span className="text-lg font-semibold">
                              {quiz.title}
                            </span>
                          }
                          description={
                            <>
                              <Paragraph
                                ellipsis={{ rows: 2 }}
                                className="text-gray-600"
                              >
                                {quiz.description}
                              </Paragraph>
                              <Text className="block mt-2">
                                Time Limit: {quiz.timeLimit || "Not set"}{" "}
                                minutes
                              </Text>
                              {/* {quiz.accessCode && (
                                // <Text className="block mt-1 text-green-600">
                                //   Access Code: {quiz.accessCode}
                                // </Text>
                              )} */}
                            </>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              {/* Students Tab */}
              <TabPane tab={`Students (${filteredStudents.length})`} key="2">
                <Input
                  placeholder="Search Students"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />

                {/* Display total students count */}
                <Statistic
                  title="Total Students"
                  value={filteredStudents.length}
                  className="mb-4 text-lg font-semibold"
                />

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
                  dataSource={filteredStudents}
                  renderItem={(student) => (
                    <List.Item>
                      <Card
                        hoverable
                        className="shadow-sm transition-all duration-300 hover:shadow-lg"
                      >
                        <Meta
                          avatar={
                            <Avatar
                              icon={<UserOutlined />}
                              className="bg-purple-100 text-purple-600"
                            />
                          }
                          title={
                            <span className="text-lg font-semibold">
                              {student.name}
                            </span>
                          }
                          description={
                            <>
                              <Text className="block text-gray-600">
                                Email: {student.email}
                              </Text>
                              <Text className="block text-red-600">
                                Password: {student.password}
                              </Text>
                              <Text className="block text-gray-600">
                                School: {student.school}
                              </Text>
                              <Text className="block text-gray-600">
                                Class: {student.class}
                              </Text>
                              <Text className="block text-gray-600">
                                Parent Ph: {student.parentPhone}
                              </Text>
                              <Text className="block text-gray-600">
                                Student Ph: {student.phone}
                              </Text>
                              {student.disabled && (
                                <Text className="block text-red-600">
                                  Disabled
                                </Text>
                              )}
                              <Button
                                type="link"
                                onClick={() => handleDisableStudent(student.id)}
                              >
                                Disable
                              </Button>
                              <Button
                                type="link"
                                onClick={() => handleDeleteStudent(student.id)}
                              >
                                Delete
                              </Button>
                            </>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              {/*               
              <TabPane tab="Students" key="2">
                <Input
                  placeholder="Search Students"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
                  dataSource={filteredStudents}
                  renderItem={student => (
                    <List.Item>
                      <Card hoverable className="shadow-sm transition-all duration-300 hover:shadow-lg">
                        <Meta
                          avatar={<Avatar icon={<UserOutlined />} className="bg-purple-100 text-purple-600" />}
                          title={<span className="text-lg font-semibold">{student.name}</span>}
                          description={
                            <>
                              <Text className="block text-gray-600">Email: {student.email}</Text>
                              <Text className="block text-red-600">Password: {student.password}</Text>
                              <Text className="block text-gray-600">School: {student.school}</Text>
                              <Text className="block text-gray-600">Class: {student.class}</Text>
                              <Text className="block text-gray-600">Parent Ph: {student.parentPhone}</Text>
                              <Text className="block text-gray-600">Student Ph: {student.phone}</Text>
                              {student.disabled && (
                                <Text className="block text-red-600">Disabled</Text>
                              )}
                              <Button type="link" onClick={() => handleDisableStudent(student.id)}>Disable</Button>
                              <Button type="link" onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
                            </>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane> */}
            </Tabs>
          </Spin>

          {/* Floating Plus Icon for adding quiz */}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            shape="circle"
            size="large"
            className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 shadow-lg"
            onClick={() => navigate("/create-quiz")}
          />
        </Content>
      </Layout>

      {/* Teacher Profile Modal */}
      <Modal
        title="Teacher Profile"
        visible={isTeacherModalVisible}
        onCancel={() => setIsTeacherModalVisible(false)}
        footer={null}
        className="rounded-lg overflow-hidden"
      >
        <p>
          <strong>Name:</strong> {teacherName}
        </p>
        <p>
          <strong>Email:</strong> {teacherEmail}
        </p>
        {/* <p><strong>Password:</strong> {teacherPassword}</p> */}
      </Modal>

      {/* Share Modal */}
      <Modal
        title="Shareable Link and QR Code"
        visible={isShareModalVisible}
        onCancel={() => setIsShareModalVisible(false)}
        footer={null}
        className="rounded-lg overflow-hidden"
      >
        {selectedQuiz && (
          <>
            <Input.TextArea
              value={generateShareableLink(selectedQuiz.id)}
              readOnly
              autoSize
              className="mb-4"
            />
            <div className="flex justify-center">
              <QRCode value={generateShareableLink(selectedQuiz.id)} />
            </div>
          </>
        )}
      </Modal>

      {/* Edit Quiz Modal */}
      <Modal
        title="Edit Quiz"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        className="rounded-lg overflow-hidden"
      >
        {editingQuiz && (
          <Form
            initialValues={editingQuiz}
            onFinish={handleUpdateQuiz}
            layout="vertical"
          >
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="timeLimit" label="Time Limit (minutes)">
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-purple-600 hover:bg-purple-700"
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Layout>
  );
}
