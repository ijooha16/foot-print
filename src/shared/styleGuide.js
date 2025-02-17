import styled from "styled-components";

export const ContentsBox = styled.div`
  width: ${props => (props.modal ? "920px" : "800px")};
  padding: 60px 40px;
  margin-bottom: 60px;
  gap: 40px;
  border: none;
  border-radius: 60px;
  background-color: white;
  color: #121212;

  display: flex;
  flex-direction: ${props => props.direction || "column"};
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    max-width: 100%;
    width: 100%;
    > * {
      width: 100%;
      max-width: 100%;
    }
  }
`;

export const StBtn = styled.button`
  margin: 30px auto;
  width: 100px;
  height: 46px;
  padding: 12px 14px;
  background: #0062ff;
  border: none;
  border-radius: 23px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background: #0057e3;
    cursor: pointer;
  }
`;

export const LoginTxt = styled.h1`
  font-weight: 700;
  font-size: 20px;
  color: #121212;
  text-align: center;
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    margin: 10px 0;
    padding: 20px 24px;

    width: 220px;
    height: 40px;
    border: 2px solid #dedede;
    border-radius: 12px;

    &:hover {
      outline: 2px solid #cee0ff;
    }
  }

  button {
    margin-top: 30px;
  }
`;

export const SignupBtn = styled.button`
  border: none;
  background-color: transparent;
  color: #8b8b8b;
  cursor: pointer;
`;
