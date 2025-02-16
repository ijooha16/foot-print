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
      <StCategoryContainer>
        <StCategory>전체</StCategory>
        <StCategory>국내</StCategory>
        <StCategory>해외</StCategory>
      </StCategoryContainer>
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

const StCategoryContainer = styled.div`
  width: 300px;
  margin-bottom: 80px;
  display: flex;
  justify-content: space-between;
`;

const StCategory = styled.div`
  font-size: 18px;
  color: #8b8b8b;
  cursor: pointer;

  &:hover {
    color: #121212;
    transition: transform 0.3s ease, color 0.3s ease, font-weight 0.3s ease;
    transform: scale(1.3);
    font-weight: 700;
  }
`;
