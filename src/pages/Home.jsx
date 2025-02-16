import styled from "styled-components";
import HomePostCard from "../components/HomePostCard";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../context/HomeContext";
import AddPostButton from "../components/AddPostButton";
import ShowModal from "./PostingModal";

const Home = () => {
  const { posts, changePosts, setChangePosts } = useContext(HomeContext);
  const isSignin = true;
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setChangePosts(posts);
  }, [posts]);

  const showPosts = where => {
    if (where === "all") {
      setChangePosts([...posts]);
      return;
    }
    if (where === "in") {
      const filterInPost = posts.filter(post => {
        return post.travel_location === "국내";
      });
      setChangePosts(filterInPost);
      return;
    }
    if (where === "out") {
      const filterOutPost = posts.filter(post => {
        return post.travel_location === "국외";
      });
      setChangePosts(filterOutPost);
      return;
    }
  };

  const showModal = post => {
    setSelectedPost(post);
  };

  return (
    <>
      <StCategoryContainer>
        <StCategory onClick={() => showPosts("all")}>전체</StCategory>
        <StCategory onClick={() => showPosts("in")}>국내</StCategory>
        <StCategory onClick={() => showPosts("out")}>국외</StCategory>
      </StCategoryContainer>
      <div>
        {changePosts.map((post, index) => {
          return (
            <MoveModal
              key={`${post.uid}-${index}`}
              onClick={() => showModal(post)}
            >
              <HomePostCard post={post} />
            </MoveModal>
          );
        })}
      </div>
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
