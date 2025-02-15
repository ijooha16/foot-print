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
          <UserComment>
            <ProfileCommentImg src="https://item.kakaocdn.net/do/218bdb82c9a7456ee2080fe14a4642927154249a3890514a43687a85e6b6cc82"></ProfileCommentImg>
            <p>닉네임</p>
            <p>댓글이에요</p>
          </UserComment>
          <CommentInputDiv>
            <CommentInput type="text"></CommentInput>
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

            <Icons>
              <p>댓글</p>
              <button>하트</button>
            </Icons>
            <p>아무튼 게시글 내용임 </p>
          </Post>
          <Comment>
            <UserCommentDiv>
              <UserComment>
                <ProfileCommentImg src="https://item.kakaocdn.net/do/218bdb82c9a7456ee2080fe14a4642927154249a3890514a43687a85e6b6cc82"></ProfileCommentImg>
                <p>닉네임</p>
                <p>댓글이에요</p>
              </UserComment>
              <UserComment>
                <ProfileCommentImg src="https://item.kakaocdn.net/do/218bdb82c9a7456ee2080fe14a4642927154249a3890514a43687a85e6b6cc82"></ProfileCommentImg>
                <p>닉네임</p>
                <p>댓글이에요</p>
              </UserComment>
            </UserCommentDiv>
            <CommentInputDiv>
              <form>
                <CommentInput type="text"></CommentInput>
                <button type="submit">댓글작성</button>
              </form>
            </CommentInputDiv>
          </Comment>
        </FlexArea>
      </PostModal>
    </PostModalBg>
  );
};

export default showModal;

const PostModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FlexArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: calc(100% - 30px);
  border-bottom: 1px solid #000;
  > div {
    height: 100%;
  }
`;
const PostModal = styled.div`
<<<<<<< HEAD
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
  background-color: auqa;
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
=======
  width: 80%;
  height: 80%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const TitleArea = styled.div`
  position: relative;
  h1 {
    font-size: 20px;
    font-weight: 600;
    border-bottom: 1px solid #000;
    text-align: center;
    padding-bottom: 10px;
  }
  button {
    font-size: 0;
    position: absolute;
    top: -5px;
    right: 0;
    width: 30px;
    height: 30px;
    background-image: url(${closeIco});
    background-size: cover;
    background-position: center;
    background-color: transparent;
    border: none;
    transform: rotate(45deg);
    &:hover {
      cursor: pointer;
    }
  }
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60%;
  padding-right: 10px;

  grid-template-columns: 1fr;
  h1 {
    font-weight: 600;
    font-size: 18px;
  }
  p {
    font-weight: 600;
  }
  img {
    width: fit-content;
  }
>>>>>>> 6d4b4efa6f90152b8309c38abdb82dd9f80287d4
`;

const Icons = styled.div`
  display: flex;
`;

const Comment = styled.div`
<<<<<<< HEAD
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
=======
  flex: 1;
  position: relative;
  border-left: 1px solid #000;
>>>>>>> 6d4b4efa6f90152b8309c38abdb82dd9f80287d4
`;

const UserComment = styled.div`
  display: flex;
  width: 80%;
  height: 500px;
  margin-bottom: 0%;
`;

const ProfileCommentImg = styled.img`
  width: 50px;
  height: 50px;
`;

const UserCommentDiv = styled.div`
  padding: 10px;
  height: 80%;
  overflow-y: scroll;
`;
const CommentInput = styled.input``;

const CommentInputDiv = styled.div`
  height: 20%;
  background: #cee0ff;
  position: absolute;
  bottom: 0;
  width: 100%;
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
