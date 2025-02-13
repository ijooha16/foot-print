import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider.jsx";
import { useContext } from "react";

import Home from "../pages/Home.jsx";
import MyPage from "../pages/MyPage.jsx";
import Posting from "../pages/Posting.jsx";
import SignIn from "../pages/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";

const Router = () => {
  const { isLogin } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* 예시 */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isLogin ? <Home /> : <SignIn />} />
        <Route path="/signup" element={isLogin ? <Home /> : <SignUp />} />
        {/* 예시 */}

        <Route path="/" element={<Home />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
