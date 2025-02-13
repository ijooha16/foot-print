const SignUp = () => {
  return (
    <div>
      <h2>회원가입 페이지</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
