
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
// import SignUp from "./pages/Signup";
// import QuizHome from "./pages/QuizHome";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login/>}></Route>
//         <Route path="/" element={<SignUp/>}></Route>
//         <Route path="/main" element={<QuizHome/>}></Route>
//         {/* <Route path="/login" element={<Login />}></Route>
//         {/* <Route path="/home" element={<Home />}></Route> */}
//         {/* <Route path="/main" element={<MainPage />}></Route>
//         <Route path="/main/footer" element={<MainPage />}></Route>
//         <Route path="/products" element={<Products />}></Route>
//         <Route path="/products/:id" element={<ProductsDetail/>}></Route>  */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;






import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/student/StudentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import QuizCreation from './pages/teacher/QuizCreation';
import QuizTaking from './pages/teacher/QuizTaking';
import QuizResult from './pages/teacher/QuizResults';
// import AdminDashboard from './components/AdminDashboard';
// import TeacherDashboard from './components/TeacherDashboard';
// import StudentDashboard from './components/StudentDashboard';
// import QuizCreation from './components/QuizCreation';
// import QuizTaking from './components/QuizTaking';
// import Results from './components/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/teacher" element={<TeacherDashboard/>} />
        <Route path="/student" element={<StudentDashboard/>} />
        <Route path="/create-quiz" element={<QuizCreation/>} />
        <Route path="/take-quiz/:quizId" element={<QuizTaking/>} />
        <Route path="/results/:quizId" element={<QuizResult/>} /> 
        
        {/* Redirect to "/" if no route matches */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
