import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/client";
import styled from "styled-components";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async e => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      alert("로그인 되었습니다.");
      navigate("/");
    } catch (error) {
      alert("로그인 오류");
      console.log(error.message);
    }
  };

  const navigateToSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <>
      <h1>Log-In</h1>
      <SigninBox>
        <form onSubmit={handleSignin}>
          <input
            type="email"
            value={email}
            placeholder="아이디"
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">로그인</button>
        </form>
        <h4>회원이 아니신가요?</h4>
        <button onClick={navigateToSignUp}>회원가입</button>
      </SigninBox>
    </>
  );
};

export default SignIn;

const SigninBox = styled.div`
  background-color: rgb(0, 94, 255);
  padding: 60px 40px;
  margin-bottom: 60px;
  gap: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
