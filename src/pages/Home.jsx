import { Link } from "react-router-dom";
import styled from "styled-components";
import HomePostCard from "../components/HomePostCard";
import { useContext } from "react";
import { HomeContext } from "../context/HomeContext";

const Home = () => {
  const { posts } = useContext(HomeContext);
  return (
    <>
      <StHomeMain>
        <StHeader>
          <StSearchInput placeholder="검색창" />
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <h2>FootPrint</h2>
          </Link>
          <Link to={"/login"}>
            <StLoginBtn>로그인/회원가입</StLoginBtn>
          </Link>
        </StHeader>
        <StCategory>
          <div>전체</div>
          <div>국내</div>
          <div>해외</div>
        </StCategory>
      </StHomeMain>
      {posts.map(post => {
        return (
          <Link
            to={`/posting?id=${post.post_id}`}
            key={post.uid}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <HomePostCard post={post} />
          </Link>
        );
      })}
    </>
  );
};

export default Home;

// styled-components
const StHomeMain = styled.div`
  width: 100%;
`;

const StHeader = styled.header`
  background-color: #b1b1b180;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StSearchInput = styled.input`
  width: 150px;
  height: 20px;
`;

const StLoginBtn = styled.button`
  width: 150px;
  height: 20px;
  cursor: pointer;
`;

const StCategory = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 50px;
`;
