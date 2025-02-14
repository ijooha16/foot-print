import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const [scrolled, setScrolled] = useState(false);

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
        <div>검색창</div>
        <Logo scrolled={scrolled} href="/">
          FootPrint
        </Logo>
        <div>로그인 / 회원가입</div>
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
  margin-bottom: 80px;
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
