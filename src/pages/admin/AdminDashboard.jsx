

// import React, { useState, useEffect } from "react"
// import { auth, db } from "../../firebase/firebase"
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   updateDoc,
//   deleteDoc,
//   setDoc,
//   serverTimestamp
// } from "firebase/firestore"
// import {
//   createUserWithEmailAndPassword,
//   deleteUser,
//   signInWithEmailAndPassword
// } from "firebase/auth"
// import { Button, Input, Select, Table, Tabs, Alert, Card, Modal } from "antd" // Use Modal here
// import { AlertCircle, Loader2 } from "lucide-react"

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [newUser, setNewUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student"
//   })
//   const [error, setError] = useState("")
//   const [studentsOfTeacher, setStudentsOfTeacher] = useState([])
//   const [isModalVisible, setIsModalVisible] = useState(false)
//   const [currentUser, setCurrentUser] = useState(null)

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   const fetchUsers = async () => {
//     try {
//       const q = query(collection(db, "users"))
//       const querySnapshot = await getDocs(q)
//       const usersData = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }))
//       setUsers(usersData)
//       setLoading(false)
//     } catch (error) {
//       console.error("Error fetching users:", error)
//       setError("Failed to fetch users")
//       setLoading(false)
//     }
//   }

//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       await updateDoc(doc(db, "users", userId), { role: newRole })
//       fetchUsers()
//     } catch (error) {
//       console.error("Error updating role:", error)
//       setError("Failed to update role")
//     }
//   }

//   const handleDeleteUser = async (userId, email) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, "temporaryPassword")
//       await deleteUser(auth.currentUser)

//       await deleteDoc(doc(db, "users", userId))

//       const coursesQuery = query(
//         collection(db, "courses"),
//         where("teacherId", "==", userId)
//       )
//       const coursesSnapshot = await getDocs(coursesQuery)
//       coursesSnapshot.forEach(async doc => {
//         await deleteDoc(doc.ref)
//       })

//       const assignmentsQuery = query(
//         collection(db, "assignments"),
//         where("studentId", "==", userId)
//       )
//       const assignmentsSnapshot = await getDocs(assignmentsQuery)
//       assignmentsSnapshot.forEach(async doc => {
//         await deleteDoc(doc.ref)
//       })

//       fetchUsers()
//     } catch (error) {
//       console.error("Error deleting user:", error)
//       setError("Failed to delete user")
//     }
//   }

//   const handleAddUser = async e => {
//     e.preventDefault()
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         newUser.email,
//         newUser.password
//       )
//       const user = userCredential.user

//       await setDoc(doc(db, "users", user.uid), {
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role,
//         createdAt: serverTimestamp()
//       })

//       setNewUser({ name: "", email: "", password: "", role: "student" })
//       fetchUsers()
//     } catch (error) {
//       console.error("Error adding user:", error)
//       setError("Failed to add user")
//     }
//   }

//   const showModal = (user) => {
//     setCurrentUser(user)
//     setIsModalVisible(true)
//   }

//   const handleCancel = () => {
//     setIsModalVisible(false)
//     setCurrentUser(null)
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="mr-2 h-16 w-16 animate-spin" />
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
//       {error && (
//         <Alert
//           message="Error"
//           description={error}
//           type="error"
//           className="mb-6"
//         />
//       )}
//       <Tabs defaultActiveKey="1" className="w-full">
//         <Tabs.TabPane tab="Manage Users" key="1">
//           <Card title="User Management" extra={<Button type="primary">Add User</Button>}>
//             <Table
//               dataSource={users}
//               columns={[
//                 {
//                   title: "Name",
//                   dataIndex: "name",
//                   key: "name"
//                 },
//                 {
//                   title: "Email",
//                   dataIndex: "email",
//                   key: "email"
//                 },
//                 {
//                   title: "Role",
//                   dataIndex: "role",
//                   key: "role",
//                   render: (text, record) => (
//                     <Select
//                       value={text}
//                       onChange={value => handleRoleChange(record.id, value)}
//                     >
//                       <Select.Option value="student">Student</Select.Option>
//                       <Select.Option value="teacher">Teacher</Select.Option>
//                       <Select.Option value="admin">Admin</Select.Option>
//                     </Select>
//                   )
//                 },
//                 {
//                   title: "Actions",
//                   key: "actions",
//                   render: (text, record) => (
//                     <>
//                       <Button type="link" onClick={() => showModal(record)}>Details</Button>
//                       <Button
//                         type="danger"
//                         onClick={() => handleDeleteUser(record.id, record.email)}
//                       >
//                         Delete
//                       </Button>
//                     </>
//                   )
//                 }
//               ]}
//             />
//           </Card>
//         </Tabs.TabPane>
//         <Tabs.TabPane tab="Add New User" key="2">
//           <Card title="Add New User">
//             <form onSubmit={handleAddUser}>
//               <div className="mb-4">
//                 <Input
//                   placeholder="Name"
//                   value={newUser.name}
//                   onChange={e => setNewUser({ ...newUser, name: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <Input
//                   type="email"
//                   placeholder="Email"
//                   value={newUser.email}
//                   onChange={e => setNewUser({ ...newUser, email: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <Input
//                   type="password"
//                   placeholder="Password"
//                   value={newUser.password}
//                   onChange={e => setNewUser({ ...newUser, password: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <Select
//                   value={newUser.role}
//                   onChange={value => setNewUser({ ...newUser, role: value })}
//                 >
//                   <Select.Option value="student">Student</Select.Option>
//                   <Select.Option value="teacher">Teacher</Select.Option>
//                   <Select.Option value="admin">Admin</Select.Option>
//                 </Select>
//               </div>
//               <Button type="primary" htmlType="submit">Add User</Button>
//             </form>
//           </Card>
//         </Tabs.TabPane>
//       </Tabs>

//       {/* Modal for user details */}
//       {currentUser && (
//         <Modal
//           title="User Details"
//           visible={isModalVisible}
//           onCancel={handleCancel}
//           footer={[
//             <Button key="back" onClick={handleCancel}>
//               Close
//             </Button>,
//           ]}
//         >
//           <p><strong>Name:</strong> {currentUser.name}</p>
//           <p><strong>Email:</strong> {currentUser.email}</p>
//           <p><strong>Role:</strong> {currentUser.role}</p>
//           <p><strong>Signed Up:</strong> {currentUser.createdAt?.toDate().toLocaleString() || "N/A"}</p>
//         </Modal>
//       )}
//     </div>
//   )
// }







import React, { useState, useEffect } from "react"
import { auth, db } from "../../firebase/firebase"
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword
} from "firebase/auth"
import {
  Button,
  Input,
  Select,
  Table,
  Tabs,
  Alert,
  Card,
  Modal,
  Form,
  message,
  Popconfirm,
  Typography
} from "antd"
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons"

const { Title, Text } = Typography
const { TabPane } = Tabs

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const q = query(collection(db, "users"))
      const querySnapshot = await getDocs(q)
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setUsers(usersData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching users:", error)
      setError("Failed to fetch users")
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateDoc(doc(db, "users", userId), { role: newRole })
      message.success("User role updated successfully")
      fetchUsers()
    } catch (error) {
      console.error("Error updating role:", error)
      message.error("Failed to update user role")
    }
  }

  const handleDeleteUser = async (userId, email) => {
    try {
      await signInWithEmailAndPassword(auth, email, "temporaryPassword")
      await deleteUser(auth.currentUser)
      await deleteDoc(doc(db, "users", userId))
      message.success("User deleted successfully")
      fetchUsers()
    } catch (error) {
      console.error("Error deleting user:", error)
      message.error("Failed to delete user")
    }
  }

  const handleAddUser = async values => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        name: values.name,
        email: values.email,
        role: values.role,
        createdAt: serverTimestamp()
      })

      message.success("User added successfully")
      form.resetFields()
      fetchUsers()
    } catch (error) {
      console.error("Error adding user:", error)
      message.error("Failed to add user")
    }
  }

  const showModal = user => {
    setCurrentUser(user)
    setIsModalVisible(true)
    form.setFieldsValue(user)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setCurrentUser(null)
    form.resetFields()
  }

  const handleUpdateUser = async values => {
    try {
      await updateDoc(doc(db, "users", currentUser.id), values)
      message.success("User updated successfully")
      setIsModalVisible(false)
      fetchUsers()
    } catch (error) {
      console.error("Error updating user:", error)
      message.error("Failed to update user")
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => (
        <Select
          value={text}
          onChange={value => handleRoleChange(record.id, value)}
          className="w-full"
        >
          <Select.Option value="student">Student</Select.Option>
          <Select.Option value="teacher">Teacher</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id, record.email)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2} className="mb-6">
        Admin Dashboard
      </Title>
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-6"
        />
      )}
      <Tabs defaultActiveKey="1" className="w-full">
        <TabPane tab="Manage Users" key="1">
          <Card title="User Management" className="mb-6">
            <Table
              dataSource={users}
              columns={columns}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              className="w-full"
            />
          </Card>
        </TabPane>
        <TabPane tab="Add New User" key="2">
          <Card title="Add New User">
            <Form form={form} onFinish={handleAddUser} layout="vertical">
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input the name!" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input the email!" },
                  { type: "email", message: "Please enter a valid email!" }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input the password!" }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select placeholder="Select a role">
                  <Select.Option value="student">Student</Select.Option>
                  <Select.Option value="teacher">Teacher</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Add User
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title="Edit User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdateUser} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select>
              <Select.Option value="student">Student</Select.Option>
              <Select.Option value="teacher">Teacher</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Update User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
