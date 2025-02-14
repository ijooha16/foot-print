import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/client";
import styled from "styled-components";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSignup = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const { error: userError } = await supabase
        .from("users")
        .insert({ id: authData.user.id, nickname });

      if (userError) throw userError;

      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/sign-in");
    } catch (error) {
      alert(error.message);
      console.error("회원가입 오류 :", error);
    }
  };

  console.log(nickname);

  return (
    <>
      <h1>create account</h1>
      <h4>가입을 통해 친구들과 여행 게시글을 공유해보세요!</h4>
      <SignupBox>
        <form
          onSubmit={handleSignup}
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <input
            type="email"
            value={email}
            placeholder="email"
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
          <input
            type="password"
            value={confirmPassword}
            placeholder="confirm password"
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <input
            type="text"
            value={nickname}
            placeholder="nickname"
            onChange={e => setNickname(e.target.value)}
            required
          />
        </form>
        <button type="submit">가입</button>
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
