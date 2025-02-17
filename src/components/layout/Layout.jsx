import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SearchInput } from "../SearchInput";
import { AuthContext } from "../../context/AuthProvider";

const Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isSignin, setIsSignin } = useContext(AuthContext);

  //로그인 상태 확인

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1); // 100px 이상이면 true, 아니면 false
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 로그아웃
  const handleLogout = () => {
    sessionStorage.clear();
    setIsSignin(false);
  };

  // console.log("로그아웃", getSession);
  return (
    <>
      <HeaderContainer scrolled={scrolled}>
        <SearchInput />
        <Logo scrolled={scrolled} href="/">
          FootPrint
        </Logo>
        {isSignin ? (
          <>
            <StMyBtnContainer>
              <Link
                to={"/my-page"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <StBtn>마이페이지</StBtn>
              </Link>
              <StBtn
                onClick={() => {
                  handleLogout();
                  alert("로그아웃 되었습니다.");
                }}
              >
                로그아웃
              </StBtn>
            </StMyBtnContainer>
          </>
        ) : (
          <Link
            to={"/sign-in"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <StMyBtnContainer>
              <StBtn>로그인 / 회원가입</StBtn>
            </StMyBtnContainer>
          </Link>
        )}
      </HeaderContainer>
      <ContentsContainer>
        <Outlet />
      </ContentsContainer>
      <FooterContainer>
        <Link to="/">FootPrint</Link>
        <p>10조 여행보내조</p>
        <ul>
          <li>윤주하 : 영어이름 Judy</li>
          <li>김진채 : 커피, 우유를 못 먹어요☕️🥛💦</li>
          <li>문정빈 : 아침마다 새벽수영</li>
          <li>민정현 : 하루에 커피 3잔</li>
          <li>강혜린 : 마라탕쳐돌이</li>
        </ul>
        <p>© 2025 FootPrint. All rights reserved.</p>
      </FooterContainer>
    </>
  );
};

export default Layout;
//푸터
const FooterContainer = styled.footer`
  padding: 30px 60px;
  background: #cee0ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  ul {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      line-height: 2;
      text-align: center;
      display: flex;
      align-items: center;
      opacity: 50%;

      &::before,
      &::after {
        content: "";
        width: 5px;
        height: 5px;
        background: #999;
        border-radius: 100%;
        display: block;
        margin: 0 10px;
      }
    }
  }

  a {
    font-size: 30px;
    font-weight: 800;
    color: #fff;
    text-decoration: none;
  }
  p {
    color: #005eff;
  }
  p:last-child {
    font-size: 12px;
    color: #fff;
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  margin-top: ${props => (props.scrolled ? "140px" : "300px")};
  /* margin-left: calc((100vw - 920px) / 2);
  margin-right: calc((100vw - 920px) / 2); */
  transition: all 0.5s ease-in-out;
`;

const HeaderContainer = styled.div`
  width: 100vw;
  height: ${props => (props.scrolled ? "140px" : "300px")};
  position: fixed;
  box-sizing: border-box;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  background-color: white;
  box-shadow: ${props =>
    props.scrolled ? "0px 4px 30px rgba(0, 0, 0, 0.1)" : "none"};
  transition: all 0.5s ease-in-out;
  z-index: 2;
  @media (max-width: 800px) {
    flex-direction: column;
    padding: 20px;
    height: fit-content;
    gap: 20px;

    form {
      margin: 0;
    }
    div {
      width: 100%;
      justify-content: center;
    }
  }
`;

const Logo = styled.a`
  font-size: ${props => (props.scrolled ? "42px" : "62px")};
  font-weight: 800;
  color: #0062ff;
  text-decoration: none;
  transition: all 0.5s ease-in-out;
`;

const StBtn = styled.button`
  padding: 0 16px;
  cursor: pointer;
  text-align: right;
  border-radius: 30px;
  color: #8b8b8b;
  background: transparent;
  overflow: hidden;
  position: relative;
  border: none;
  font-size: 16px;
  outline: none;
`;

const StMyBtnContainer = styled.div`
  padding: 0;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;
