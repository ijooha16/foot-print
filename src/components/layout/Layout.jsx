import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SearchInput } from "../SearchInput";
import supabase from "../../supabase/client";
import { AuthContext } from "../../context/AuthProvider";

const Layout = () => {
  const { setIsSignin } = useContext(AuthContext);
  const isSignin = true;
  const [scrolled, setScrolled] = useState(false);

  //로그인 상태 확인
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // console.log("session", session);
      setIsSignin(session?.user ?? null);
    };
    getSession();
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1); // 100px 이상이면 true, 아니면 false
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
              <StBtn>로그아웃</StBtn>
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
    </>
  );
};

export default Layout;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  margin-top: ${props => (props.scrolled ? "140px" : "300px")};
  margin-left: calc((100vw - 920px) / 2);
  margin-right: calc((100vw - 920px) / 2);
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
  padding-right: 16px;
  width: 280px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;
