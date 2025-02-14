import styled from "styled-components";
import closeIco from "../assets/icon_add.png";
const showModal = () => {
  return (
    // <>
    <PostModalBg>
      <PostModal>
        <TitleArea>
          <h1>게시글 제목</h1>
          <button>닫기</button>
        </TitleArea>
        <FlexArea>
          <Post>
            <img src="https://item.kakaocdn.net/do/218bdb82c9a7456ee2080fe14a4642927154249a3890514a43687a85e6b6cc82"></img>
            <p>작성자</p>
            <p>mpti : </p>
            <button>...</button>

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
`;

const Icons = styled.div`
  display: flex;
`;

const Comment = styled.div`
  flex: 1;
  position: relative;
  border-left: 1px solid #000;
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
