import styled from "styled-components";

const SigninLoginBtn = () => {
  return (
    <StBtnFlex>
      <StBtnMain>메인컬러버튼</StBtnMain>
      <StBtnSub3>서브컬러3버튼</StBtnSub3>
    </StBtnFlex>
  );
};

export default SigninLoginBtn;

const StBtnFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 30px 0;
`;

// 버튼메인컬러
const StBtnMain = styled.button`
  padding: 10px 14px;
  background: #0062ff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  color: #fff;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background: #003899;
    cursor: pointer;
  }
`;
//버튼 서브컬러3
const StBtnSub3 = styled.button`
  padding: 10px 14px;
  background: #f17173;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  color: #fff;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background: #d05b5d;
    cursor: pointer;
  }
`;
