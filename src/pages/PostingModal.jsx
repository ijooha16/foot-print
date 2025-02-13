import styled from "styled-components";

const PostModal = styled.div`
  width: 1280px;
  height: 80%;
  background-color: wheat;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const Post = styled.div`
  background-color: auqa;
  display: grid;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-left: -15%;
`;

const Icons = styled.div`
  display: flex;
`;

const Comment = styled.div`
  display: grid;
  margin-left: -20%;
  background-color: aqua;
`;

const UserComment = styled.div`
  margin-top: 10px;
  margin-left: 10%;
  display: flex;
  width: 80%;
  height: 100px;
  margin-bottom: 0%;
`;

const ProfileCommentImg = styled.img`
  width: 50px;
  height: 50px;
`;
const CommentInput = styled.input`
  margin-left: 10%;
  display: block;
  width: 80%;
  margin-bottom: -100%;
`;

const CommentInputDiv = styled.div`
  height: 20%;
`;
const showModal = () => {
  return (
    <>
      <PostModal>
        <Post>
          <h1>게시글 제목</h1>
          <p>작성자</p>
          <button>...</button>
          <img src="https://item.kakaocdn.net/do/218bdb82c9a7456ee2080fe14a4642927154249a3890514a43687a85e6b6cc82"></img>
          <Icons>
            <p>댓글</p>
            <button>하트</button>
          </Icons>
          <p>아무튼 게시글 내용임 </p>
        </Post>
        <Comment>
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
          <CommentInputDiv>
            <CommentInput type="text"></CommentInput>
          </CommentInputDiv>
        </Comment>
      </PostModal>
    </>
  );
};

export default showModal;
