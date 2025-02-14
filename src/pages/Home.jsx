import { Link } from "react-router-dom";
import styled from "styled-components";
import HomePostCard from "../components/HomePostCard";
import { useContext } from "react";
import { HomeContext } from "../context/HomeContext";
import AddPostButton from "../components/AddPostButton";

const Home = () => {
  const { posts, isLogin } = useContext(HomeContext);

  return (
    <>
      <StHomeMain>
        <StCategory>
          <div>전체</div>
          <div>국내</div>
          <div>해외</div>
        </StCategory>
      </StHomeMain>
      {posts.map(post => {
        return (
          // link (x) 게시글 상세 모달로 연결
          <Link
            to={`/posting?id=${post.post_id}`}
            key={post.uid}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <HomePostCard post={post} />
          </Link>
        );
      })}
      {isLogin ? <AddPostButton /> : null}
    </>
  );
};

export default Home;

// styled-components
const StHomeMain = styled.div`
  width: 100%;
`;

const StCategory = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 50px;
`;
