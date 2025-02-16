import styled from "styled-components";
import HomePostCard from "../components/HomePostCard";
import { useContext, useState } from "react";
import { HomeContext } from "../context/HomeContext";
import AddPostButton from "../components/AddPostButton";
import ShowModal from "./PostingModal";

const Home = () => {
  const { posts, setPosts } = useContext(HomeContext);
  const isSignin = true;
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
      <StHomeMain>
        <StCategory>
          <div onClick={showAllPosts}>전체</div>
          <div onClick={showInPosts}>국내</div>
          <div onClick={showOutPosts}>국외</div>
        </StCategory>
      </StHomeMain>
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

const MoveModal = styled.div`
  cursor: pointer;
`;
