import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/client";
// import styled from "styled-components";
import {
  ContentsBox,
  StBtn,
  LoginTxt,
  FormBox,
  SignupBtn,
} from "../shared/styleGuide";

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
      let user = await supabase.auth.getUserIdentities();
      console.log(user.data.identities[0].id);
      sessionStorage.setItem("id", user.data.identities[0].id);
      navigate("/");
    } catch (error) {
      alert(error.message);
      console.error("로그인 오류", error);
    }
  };

  const navigateToSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <ContentsBox>
      <LoginTxt>Log-In</LoginTxt>
      <FormBox onSubmit={handleSignin}>
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
        <StBtn type="submit">로그인</StBtn>
      </FormBox>
      <SignupBtn onClick={navigateToSignUp}>회원가입</SignupBtn>
    </ContentsBox>
  );
};

export default SignIn;
