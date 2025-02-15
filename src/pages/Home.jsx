import styled from "styled-components";
import HomePostCard from "../components/HomePostCard";
import { useContext, useState } from "react";
import { HomeContext } from "../context/HomeContext";
import AddPostButton from "../components/AddPostButton";
import ShowModal from "./PostingModal";

const Home = () => {
  const { posts } = useContext(HomeContext);
  const isSignin = true;
  const [selectedPost, setSelectedPost] = useState(null);

  const showModal = post => {
    setSelectedPost(post);
  };
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
        // console.log("post", post);

        return (
          <MoveModal key={post.uid} onClick={() => showModal(post)}>
            <HomePostCard post={post} />
          </MoveModal>
        );
      })}
      {isSignin ? <AddPostButton /> : null}
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
