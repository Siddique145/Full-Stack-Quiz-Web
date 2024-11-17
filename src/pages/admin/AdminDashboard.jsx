// // import React, { useState, useEffect } from 'react';
// // import { auth, db } from '../../firebase/firebase';
// // import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// // export default function AdminDashboard() {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       const q = query(collection(db, 'users'), where('role', 'in', ['teacher', 'student']));
// //       const querySnapshot = await getDocs(q);
// //       const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //       setUsers(usersData);
// //       setLoading(false);
// //     };

// //     fetchUsers();
// //   }, []);

// //   const handleRoleChange = async (userId, newRole) => {
// //     await updateDoc(doc(db, 'users', userId), { role: newRole });
// //     setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
// //   };

// //   const handleDeleteUser = async (userId) => {
// //     await deleteDoc(doc(db, 'users', userId));
// //     setUsers(users.filter(user => user.id !== userId));
// //   };

// //   if (loading) {
// //     return <div className="text-center mt-8">Loading...</div>;
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
// //       <div className="bg-white shadow-md rounded my-6">
// //         <table className="min-w-full table-auto">
// //           <thead>
// //             <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
// //               <th className="py-3 px-6 text-left">Name</th>
// //               <th className="py-3 px-6 text-left">Email</th>
// //               <th className="py-3 px-6 text-center">Role</th>
// //               <th className="py-3 px-6 text-center">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="text-gray-600 text-sm font-light">
// //             {users.map(user => (
// //               <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
// //                 <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
// //                 <td className="py-3 px-6 text-left">{user.email}</td>
// //                 <td className="py-3 px-6 text-center">
// //                   <select
// //                     value={user.role}
// //                     onChange={(e) => handleRoleChange(user.id, e.target.value)}
// //                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
// //                   >
// //                     <option value="student">Student</option>
// //                     <option value="teacher">Teacher</option>
// //                   </select>
// //                 </td>
// //                 <td className="py-3 px-6 text-center">
// //                   <button
// //                     onClick={() => handleDeleteUser(user.id)}
// //                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
// //                   >
// //                     Delete
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }



















// //uper code is the perfect code









// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebase';
// import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newTeacher, setNewTeacher] = useState({ name: '', email: '', password: '' });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     const q = query(collection(db, 'users'), where('role', 'in', ['teacher', 'student']));
//     const querySnapshot = await getDocs(q);
//     const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setUsers(usersData);
//     setLoading(false);
//   };

//   const handleRoleChange = async (userId, newRole) => {
//     await updateDoc(doc(db, 'users', userId), { role: newRole });
//     fetchUsers();
//   };

//   const handleDeleteUser = async (userId) => {
//     await deleteDoc(doc(db, 'users', userId));
//     fetchUsers();
//   };

//   const handleAddTeacher = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, newTeacher.email, newTeacher.password);
//       const user = userCredential.user;

//       await setDoc(doc(db, 'users', user.uid), {
//         name: newTeacher.name,
//         email: newTeacher.email,
//         role: 'teacher',
//       });

//       setNewTeacher({ name: '', email: '', password: '' });
//       fetchUsers();
//     } catch (error) {
//       setError('Failed to add teacher');
//       console.error(error);
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//       <Link to="/teacher" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
//         Go to Teacher Dashboard
//       </Link>
//       <div className="bg-white shadow-md rounded my-6">
//         <h2 className="text-2xl font-bold p-4">Add New Teacher</h2>
//         <form onSubmit={handleAddTeacher} className="p-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={newTeacher.name}
//             onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
//             className="mb-2 p-2 border rounded w-full"
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={newTeacher.email}
//             onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
//             className="mb-2 p-2 border rounded w-full"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={newTeacher.password}
//             onChange={(e) => setNewTeacher({...newTeacher, password: e.target.value})}
//             className="mb-2 p-2 border rounded w-full"
//             required
//           />
//           <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//             Add Teacher
//           </button>
//         </form>
//         {error && <p className="text-red-500 p-4">{error}</p>}
//       </div>
//       <div className="bg-white shadow-md rounded my-6">
//         <table className="min-w-full table-auto">
//           <thead>
//             <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//               <th className="py-3 px-6 text-left">Name</th>
//               <th className="py-3 px-6 text-left">Email</th>
//               <th className="py-3 px-6 text-center">Role</th>
//               <th className="py-3 px-6 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-600 text-sm font-light">
//             {users.map(user => (
//               <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
//                 <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
//                 <td className="py-3 px-6 text-left">{user.email}</td>
//                 <td className="py-3 px-6 text-center">
//                   <select
//                     value={user.role}
//                     onChange={(e) => handleRoleChange(user.id, e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                   >
//                     <option value="student">Student</option>
//                     <option value="teacher">Teacher</option>
//                   </select>
//                 </td>
//                 <td className="py-3 px-6 text-center">
//                   <button
//                     onClick={() => handleDeleteUser(user.id)}
//                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }













import React, { useState, useEffect } from "react"
import { auth, db } from "../../firebase/firebase"
import {
  collection,
  query,
  where,
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
import { Button, Input, Select, Table, Tabs, Alert, Card, Modal } from "antd" // Use Modal here
import { AlertCircle, Loader2 } from "lucide-react"

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  })
  const [error, setError] = useState("")
  const [studentsOfTeacher, setStudentsOfTeacher] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

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
      fetchUsers()
    } catch (error) {
      console.error("Error updating role:", error)
      setError("Failed to update role")
    }
  }

  const handleDeleteUser = async (userId, email) => {
    try {
      await signInWithEmailAndPassword(auth, email, "temporaryPassword")
      await deleteUser(auth.currentUser)

      await deleteDoc(doc(db, "users", userId))

      const coursesQuery = query(
        collection(db, "courses"),
        where("teacherId", "==", userId)
      )
      const coursesSnapshot = await getDocs(coursesQuery)
      coursesSnapshot.forEach(async doc => {
        await deleteDoc(doc.ref)
      })

      const assignmentsQuery = query(
        collection(db, "assignments"),
        where("studentId", "==", userId)
      )
      const assignmentsSnapshot = await getDocs(assignmentsQuery)
      assignmentsSnapshot.forEach(async doc => {
        await deleteDoc(doc.ref)
      })

      fetchUsers()
    } catch (error) {
      console.error("Error deleting user:", error)
      setError("Failed to delete user")
    }
  }

  const handleAddUser = async e => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      )
      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: serverTimestamp()
      })

      setNewUser({ name: "", email: "", password: "", role: "student" })
      fetchUsers()
    } catch (error) {
      console.error("Error adding user:", error)
      setError("Failed to add user")
    }
  }

  const showModal = (user) => {
    setCurrentUser(user)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setCurrentUser(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          className="mb-6"
        />
      )}
      <Tabs defaultActiveKey="1" className="w-full">
        <Tabs.TabPane tab="Manage Users" key="1">
          <Card title="User Management" extra={<Button type="primary">Add User</Button>}>
            <Table
              dataSource={users}
              columns={[
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
                  render: (text, record) => (
                    <>
                      <Button type="link" onClick={() => showModal(record)}>Details</Button>
                      <Button
                        type="danger"
                        onClick={() => handleDeleteUser(record.id, record.email)}
                      >
                        Delete
                      </Button>
                    </>
                  )
                }
              ]}
            />
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Add New User" key="2">
          <Card title="Add New User">
            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <Input
                  placeholder="Name"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <Select
                  value={newUser.role}
                  onChange={value => setNewUser({ ...newUser, role: value })}
                >
                  <Select.Option value="student">Student</Select.Option>
                  <Select.Option value="teacher">Teacher</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                </Select>
              </div>
              <Button type="primary" htmlType="submit">Add User</Button>
            </form>
          </Card>
        </Tabs.TabPane>
      </Tabs>

      {/* Modal for user details */}
      {currentUser && (
        <Modal
          title="User Details"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          <p><strong>Name:</strong> {currentUser.name}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Role:</strong> {currentUser.role}</p>
          <p><strong>Signed Up:</strong> {currentUser.createdAt?.toDate().toLocaleString() || "N/A"}</p>
        </Modal>
      )}
    </div>
  )
}
