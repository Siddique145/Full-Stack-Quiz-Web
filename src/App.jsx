
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import QuizHome from "./pages/QuizHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<SignUp/>}></Route>
        <Route path="/main" element={<QuizHome/>}></Route>
        {/* <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/home" element={<Home />}></Route> */}
        {/* <Route path="/main" element={<MainPage />}></Route>
        <Route path="/main/footer" element={<MainPage />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:id" element={<ProductsDetail/>}></Route>  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
