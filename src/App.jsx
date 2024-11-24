





// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import TeacherDashboard from './pages/teacher/TeacherDashboard';
// import StudentDashboard from './pages/student/StudentDashboard';
// import QuizCreation from './pages/teacher/QuizCreation';
// import QuizTaking from './pages/teacher/QuizTaking';
// import QuizResults from './pages/teacher/QuizResults';
// import NotFound from './pages/Notfound';

// const PrivateRoute = ({ element, allowedRoles }) => {
//   const { currentUser, userData } = useAuth();
  
//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(userData?.role)) {
//     return <Navigate to="/" />;
//   }

//   return element;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login/>} />
//           <Route path="/signup" element={<Signup/>} />
//           <Route 
//             path="/admin" 
//             element={
//               <PrivateRoute 
//                 element={<AdminDashboard/>} 
//                 allowedRoles={['admin']} 
//               />
//             } 
//           />
//           <Route 
//             path="/teacher" 
//             element={
//               <PrivateRoute 
//                 element={<TeacherDashboard/>} 
//                 allowedRoles={['admin', 'teacher']} 
//               />
//             } 
//           />
//           <Route 
//             path="/student" 
//             element={
//               <PrivateRoute 
//                 element={<StudentDashboard/>} 
//                 allowedRoles={['student']} 
//               />
//             } 
//           />
//           <Route 
//             path="/create-quiz" 
//             element={
//               <PrivateRoute 
//                 element={<QuizCreation/>} 
//                 allowedRoles={['admin', 'teacher']} 
//               />
//             } 
//           />
//           <Route 
//             path="/take-quiz/:quizId" 
//             element={
//               <PrivateRoute 
//                 element={<QuizTaking/>} 
//                 allowedRoles={['student']} 
//               />
//             } 
//           />
//           <Route 
//             path="/results/:quizId" 
//             element={
//               <PrivateRoute 
//                 element={<QuizResults/>} 
//                 allowedRoles={['admin', 'teacher']} 
//               />
//             } 
//           />
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="*" element={<NotFound/>} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;










// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { Spin } from 'antd'; // Import Spin from Ant Design
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import TeacherDashboard from './pages/teacher/TeacherDashboard';
// import StudentDashboard from './pages/student/StudentDashboard';
// import QuizCreation from './pages/teacher/QuizCreation';
// import QuizTaking from './pages/teacher/QuizTaking';
// import QuizResults from './pages/teacher/QuizResults';
// import NotFound from './pages/Notfound';
// import { Analytics } from "@vercel/analytics/react";

// const PrivateRoute = ({ element, allowedRoles }) => {
//   const { currentUser, userData } = useAuth();

//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(userData?.role)) {
//     return <Navigate to="/" />;
//   }

//   return element;
// };

// function App() {
//   const [loading, setLoading] = useState(true); // Loading state

//   // Simulate data fetching or real data fetching
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Simulate a delay (e.g., API call or Firebase data fetch)
//         setTimeout(() => {
//           setLoading(false); // Set loading to false after data is fetched
//         }, 2000); // Simulate 2-second loading time
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <Spin  tip="Loading..." />
//       </div>
//     );
//   }

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route
//             path="/admin"
//             element={
//               <PrivateRoute element={<AdminDashboard />} allowedRoles={['admin']} />
//             }
//           />
//           <Route
//             path="/teacher"
//             element={
//               <PrivateRoute element={<TeacherDashboard />} allowedRoles={['admin', 'teacher']} />
//             }
//           />
//           <Route
//             path="/student"
//             element={
//               <PrivateRoute element={<StudentDashboard />} allowedRoles={['student']} />
//             }
//           />
//           <Route
//             path="/create-quiz"
//             element={
//               <PrivateRoute element={<QuizCreation />} allowedRoles={['admin', 'teacher']} />
//             }
//           />
//           <Route
//             path="/take-quiz/:quizId"
//             element={
//               <PrivateRoute element={<QuizTaking />} allowedRoles={['student']} />
//             }
//           />
//           <Route
//             path="/results/:quizId"
//             element={
//               <PrivateRoute element={<QuizResults />} allowedRoles={['admin', 'teacher']} />
//             }
//           />
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;








import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Spin } from 'antd'; // Import Spin from Ant Design
import { LoadingOutlined } from '@ant-design/icons';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import QuizCreation from './pages/teacher/QuizCreation';
import QuizTaking from './pages/teacher/QuizTaking';
import QuizResults from './pages/teacher/QuizResults';
import NotFound from './pages/Notfound';
import { Analytics } from "@vercel/analytics/react"; // Vercel Analytics

const PrivateRoute = ({ element, allowedRoles }) => {
  const { currentUser, userData } = useAuth();

  // If no user is logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If user's role doesn't match allowed roles, redirect to home page
  if (allowedRoles && !allowedRoles.includes(userData?.role)) {
    return <Navigate to="/" />;
  }

  return element;
};

function App() {
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate data fetching or real data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a delay (e.g., API call or Firebase data fetch)
        setTimeout(() => {
          setLoading(false); // Set loading to false after data is fetched
        }, 2000); // Simulate 2-second loading time
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="centered-container">
      <Spin indicator={<LoadingOutlined spin />} />
    </div>
      // <div className="loading-container">
      //   <Spin tip="Loading..." />
      // </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <Analytics /> {/* Place Analytics at the root to track page views */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes with Role-based Access */}
          <Route
            path="/admin"
            element={<PrivateRoute element={<AdminDashboard />} allowedRoles={['admin']} />}
          />
          <Route
            path="/teacher"
            element={<PrivateRoute element={<TeacherDashboard />} allowedRoles={['admin', 'teacher']} />}
          />
          <Route
            path="/student"
            element={<PrivateRoute element={<StudentDashboard />} allowedRoles={['student']} />}
          />
          <Route
            path="/create-quiz"
            element={<PrivateRoute element={<QuizCreation />} allowedRoles={['admin', 'teacher']} />}
          />
          <Route
            path="/take-quiz/:quizId"
            element={<PrivateRoute element={<QuizTaking />} allowedRoles={['student']} />}
          />
          <Route
            path="/results/:quizId"
            element={<PrivateRoute element={<QuizResults />} allowedRoles={['admin', 'teacher']} />}
          />
          
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
