
// // import { BrowserRouter, Route, Routes } from "react-router-dom";
// // import Login from "./pages/Login";
// // import SignUp from "./pages/Signup";
// // import QuizHome from "./pages/QuizHome";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/login" element={<Login/>}></Route>
// //         <Route path="/" element={<SignUp/>}></Route>
// //         <Route path="/main" element={<QuizHome/>}></Route>
// //         {/* <Route path="/login" element={<Login />}></Route>
// //         {/* <Route path="/home" element={<Home />}></Route> */}
// //         {/* <Route path="/main" element={<MainPage />}></Route>
// //         <Route path="/main/footer" element={<MainPage />}></Route>
// //         <Route path="/products" element={<Products />}></Route>
// //         <Route path="/products/:id" element={<ProductsDetail/>}></Route>  */}
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;






// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// // import { AuthProvider } from './contexts/AuthContext';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import StudentDashboard from './pages/student/StudentDashboard';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import TeacherDashboard from './pages/teacher/TeacherDashboard';
// import QuizCreation from './pages/teacher/QuizCreation';
// import QuizTaking from './pages/teacher/QuizTaking';
// import QuizResult from './pages/teacher/QuizResults';
// // import AdminDashboard from './components/AdminDashboard';
// // import TeacherDashboard from './components/TeacherDashboard';
// // import StudentDashboard from './components/StudentDashboard';
// // import QuizCreation from './components/QuizCreation';
// // import QuizTaking from './components/QuizTaking';
// // import Results from './components/Results';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/admin" element={<AdminDashboard/>} />
//         <Route path="/teacher" element={<TeacherDashboard/>} />
//         <Route path="/student" element={<StudentDashboard/>} />
//         <Route path="/create-quiz" element={<QuizCreation/>} />
//         <Route path="/take-quiz/:quizId" element={<QuizTaking/>} />
//         <Route path="/results/:quizId" element={<QuizResult/>} /> 
        
//         {/* Redirect to "/" if no route matches */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




//uper code was perfect ok 
















import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
// import Login from './components/Login';
// import Signup from './components/Signup';
// import AdminDashboard from './components/AdminDashboard';
// import TeacherDashboard from './components/TeacherDashboard';
// import StudentDashboard from './components/StudentDashboard';
// import QuizCreation from './components/QuizCreation';
// import QuizTaking from './components/QuizTaking';
// import Results from './components/Results';
// import NotFound from './components/NotFound';

const PrivateRoute = ({ element, allowedRoles }) => {
  const { currentUser, userData } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userData?.role)) {
    return <Navigate to="/" />;
  }

  return element;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute 
                element={<AdminDashboard/>} 
                allowedRoles={['admin']} 
              />
            } 
          />
          <Route 
            path="/teacher" 
            element={
              <PrivateRoute 
                element={<TeacherDashboard/>} 
                allowedRoles={['admin', 'teacher']} 
              />
            } 
          />
          <Route 
            path="/student" 
            element={
              <PrivateRoute 
                element={<StudentDashboard/>} 
                allowedRoles={['student']} 
              />
            } 
          />
          <Route 
            path="/create-quiz" 
            element={
              <PrivateRoute 
                element={<QuizCreation/>} 
                allowedRoles={['admin', 'teacher']} 
              />
            } 
          />
          <Route 
            path="/take-quiz/:quizId" 
            element={
              <PrivateRoute 
                element={<QuizTaking/>} 
                allowedRoles={['student']} 
              />
            } 
          />
          <Route 
            path="/results/:quizId" 
            element={
              <PrivateRoute 
                element={<QuizResults/>} 
                allowedRoles={['admin', 'teacher']} 
              />
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;