import styled from "styled-components";
import HomePostCard from "../components/HomePostCard";
import { useContext, useState } from "react";
import { HomeContext } from "../context/HomeContext";
import AddPostButton from "../components/AddPostButton";
import ShowModal from "./PostingModal";

const Home = () => {
  const { posts, setPosts } = useContext(HomeContext);
  // const isSignin = false;
  const [selectedPost, setSelectedPost] = useState(null);

  const showModal = post => {
    setSelectedPost(post);
  };
  const showAllPosts = () => {
    setPosts(posts);
    return;
  };

  const showInPosts = () => {
    const filterInPost = posts.filter(post => {
      return post.travel_location === "국내";
    });
    setPosts(filterInPost);
    return;
  };

  const showOutPosts = () => {
    const filterOutPost = posts.filter(post => {
      return post.travel_location === "국외";
    });
    setPosts(filterOutPost);
    console.log("filterOutPost", filterOutPost);

    return;
  };

  console.log("posts", posts);

  return (
    <>
      <StCategoryContainer>
        <StCategory onClick={showAllPosts}>전체</StCategory>
        <StCategory onClick={showInPosts}>국내</StCategory>
        <StCategory onClick={showOutPosts}>해외</StCategory>
      </StCategoryContainer>
      {posts.map(post => {
        // console.log("post", post);

        return (
          <MoveModal key={post.uid} onClick={() => showModal(post)}>
            <HomePostCard post={post} />
          </MoveModal>
        );
      })}
      {isSignin === true ? <AddPostButton /> : null}
      {selectedPost && (
        <ShowModal
          post={selectedPost}
          closeModal={() => setSelectedPost(null)}
        />
      )}
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
    transition:
      transform 0.3s ease,
      color 0.3s ease,
      font-weight 0.3s ease;
    transform: scale(1.3);
    font-weight: 700;
  }
`;

const MoveModal = styled.div`
  cursor: pointer;
`;
