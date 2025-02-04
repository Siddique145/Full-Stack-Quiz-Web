// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../../firebase/firebase';
// import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const q = query(collection(db, 'users'), where('role', 'in', ['teacher', 'student']));
//       const querySnapshot = await getDocs(q);
//       const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setUsers(usersData);
//       setLoading(false);
//     };

//     fetchUsers();
//   }, []);

//   const handleRoleChange = async (userId, newRole) => {
//     await updateDoc(doc(db, 'users', userId), { role: newRole });
//     setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
//   };

//   const handleDeleteUser = async (userId) => {
//     await deleteDoc(doc(db, 'users', userId));
//     setUsers(users.filter(user => user.id !== userId));
//   };

//   if (loading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
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



















//uper code is the perfect code









import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const q = query(collection(db, 'users'), where('role', 'in', ['teacher', 'student']));
    const querySnapshot = await getDocs(q);
    const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(usersData);
    setLoading(false);
  };

  const handleRoleChange = async (userId, newRole) => {
    await updateDoc(doc(db, 'users', userId), { role: newRole });
    fetchUsers();
  };

  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(db, 'users', userId));
    fetchUsers();
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, newTeacher.email, newTeacher.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: newTeacher.name,
        email: newTeacher.email,
        role: 'teacher',
      });

      setNewTeacher({ name: '', email: '', password: '' });
      fetchUsers();
    } catch (error) {
      setError('Failed to add teacher');
      console.error(error);
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
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Link to="/teacher" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Go to Teacher Dashboard
      </Link>
      <div className="bg-white shadow-md rounded my-6">
        <h2 className="text-2xl font-bold p-4">Add New Teacher</h2>
        <form onSubmit={handleAddTeacher} className="p-4">
          <input
            type="text"
            placeholder="Name"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newTeacher.email}
            onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newTeacher.password}
            onChange={(e) => setNewTeacher({...newTeacher, password: e.target.value})}
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add Teacher
          </button>
        </form>
        {error && <p className="text-red-500 p-4">{error}</p>}
      </div>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-center">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
