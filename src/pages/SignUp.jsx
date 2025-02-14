import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/client";
import styled from "styled-components";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async e => {
    e.preventDefault();
    try {
      await supabase.auth.signUp({ email, password });
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/sign-in");
    } catch (error) {
      alert(error.message);
      console.error("회원가입 오류 :", error);
    }
  };

  return (
    <>
      <h2>create account</h2>
      <SignupBox>
        <form onSubmit={handleSignup}>
          <label>아이디</label>
          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">가입</button>
        </form>
      </SignupBox>
    </>
  );
};

export default SignUp;

const SignupBox = styled.div`
  background-color: lightgrey;
  padding: 60px 40px;
  margin-bottom: 60px;
  gap: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

