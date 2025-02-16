import { useContext } from "react";
import styled from "styled-components";
import { HomeContext } from "../context/HomeContext";

const ShowModal = ({ post, closeModal }) => {
  const { users, comments } = useContext(HomeContext);

  console.log("post", post);
  if (!post) return null;
  return (
    <EntireModal key={post.uid}>
      <PostModal>
        <Post>
          <PostTitle>{post.title}</PostTitle>
          <p>{users.nickname}</p>
          <button>...</button>
          <img src="https://item.kakaocdn.net/do/218bdb82c9a7456ee2080fe14a4642927154249a3890514a43687a85e6b6cc82"></img>
          <Icons>
            <p>{comments.content}</p>
            <button>하트</button>
          </Icons>
          <p>{post.content}</p>
        </Post>
        <Comment>
          <CloseBtn onClick={closeModal}>&times;</CloseBtn>
          <UserComment>
            <ProfileCommentImg src="https://item.kakaocdn.net/do/218bdb82c9a7456ee2080fe14a4642927154249a3890514a43687a85e6b6cc82"></ProfileCommentImg>
            <p>{users.nickname}</p>
            <p>댓글이에요</p>
          </UserComment>
          <CommentInputDiv>
            <input type="text"></input>
          </CommentInputDiv>
        </Comment>
      </PostModal>
    </EntireModal>
  );
};

export default ShowModal;

// styled-commponents
const EntireModal = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.768);
  z-index: 2;
`;

const PostModal = styled.div`
  position: relative;
  margin: auto;
  top: 25%;
  width: 1000px;
  height: 65%;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 2fr 1fr;
  border-radius: 20px;
`;

const Post = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-left: -10%;
`;

const PostTitle = styled.div`
  padding: 10px;
  text-align: center;
  font-size: larger;
  font-weight: 800;
`;

const Icons = styled.div`
  display: flex;
`;

const Comment = styled.div`
  display: grid;
  margin-left: -20%;
  background-color: #cee0ff;
  border-radius: 0 20px 20px 0;
`;

const CloseBtn = styled.span`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  font-size: larger;
  cursor: pointer;
`;

const UserComment = styled.div`
  display: flex;
  width: 80%;
  height: 50px;
`;

const ProfileCommentImg = styled.img`
  width: 50px;
  height: 50px;
`;

const CommentInputDiv = styled.div`
  height: 20%;
  background: #cee0ff;
  position: absolute;
  bottom: 0;
  width: 10%;
  padding: 10px;
  form {
    background: #ccc;
    width: 100%;
    height: 100%;
    input {
      width: 100%;
      height: calc(100% - 40px);
    }
    button {
      background: #003899;
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 0px 0px 6px 6px;
      font-size: 14px;
      color: #fff;
      transition: background-color 0.3s ease-in-out;
      &:hover {
        background: #0062ff;
        cursor: pointer;
      }
    }
  }
`;
