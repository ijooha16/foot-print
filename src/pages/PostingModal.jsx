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
          <UserCommentScrollBox>
            <UserComment>
              <ProfileCommentImg src="https://item.kakaocdn.net/do/218bdb82c9a7456ee2080fe14a4642927154249a3890514a43687a85e6b6cc82"></ProfileCommentImg>
              <div>
                <p>닉네임{users.nickname}</p>
                <p>댓글이에요</p>
              </div>
            </UserComment>
            <UserComment>
              <ProfileCommentImg src="https://item.kakaocdn.net/do/218bdb82c9a7456ee2080fe14a4642927154249a3890514a43687a85e6b6cc82"></ProfileCommentImg>
              <div>
                <p>닉네임{users.nickname}</p>
                <p>댓글이에요</p>
              </div>
            </UserComment>
          </UserCommentScrollBox>
          <CommentInputDiv>
            <form>
              <input type="text"></input>
              <button type="submit">댓글등록</button>
            </form>
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 65%;
  min-height: 500px;
  background-color: #ffffff;
  display: flex;
  grid-template-columns: 1.5fr 1fr;
  border-radius: 20px;
`;

const Post = styled.div`
  display: grid;
  justify-content: center;

  height: 100%;
  padding: 20px;
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
  background-color: #cee0ff;
  border-radius: 0 20px 20px 0;
  width: 100%;
  height: 100%;
`;

const CloseBtn = styled.span`
  display: flex;
  justify-content: flex-end;
  margin: 10px 20px;
  font-size: larger;
  cursor: pointer;
`;

const UserCommentScrollBox = styled.div`
  height: 70%;
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
  overflow-y: scroll;
  padding-right: 20px;
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #004ecc;
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #0062ff;
    cursor: pointer;
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`;
const UserComment = styled.div`
  display: flex;
  width: 80%;
  width: 100%;
  gap: 15px;
  border-bottom: 1px solid #9bc0ff;
  padding-bottom: 10px;
  height: 1000px;

  + div {
    margin-top: 10px;
  }
  + div:last-child {
    border-bottom: 0px;
  }
  img {
    border-radius: 100%;
  }
  div {
    p:nth-child(1) {
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
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
  width: -webkit-fill-available;
  padding: 10px;
  border-radius: 20px;
  form {
    width: 100%;
    height: 100%;
    input {
      border-radius: 10px 10px 0 0;
      width: 100%;
      height: calc(100% - 40px);
      border: none;
      padding: 20px;
    }
    button {
      background: #003899;
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 0px 0px 6px 6px;
      font-size: 14px;
      color: #fff;
      border-radius: 0 0 10px 10px;
      transition: background-color 0.3s ease-in-out;
      &:hover {
        background: #0062ff;
        cursor: pointer;
      }
    }
  }
`;
