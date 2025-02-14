import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h2>로그인 페이지</h2>
      <form>
        <label>아이디</label>
        <input
          type="email"
          value={email}
          placeholder="아이디"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>비밀번호</label>
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
      <button>회원가입</button>
    </div>
  );
};

export default SignIn;
