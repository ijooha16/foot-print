import { useContext } from "react";
import styled from "styled-components";
import CommentIcon from "../assets/icon_comment.png";
import HeartIcon from "./HeartIcon.jsx";
import { HomeContext } from "../context/HomeContext";

const HomePostCard = ({ post }) => {
  const { users, comments } = useContext(HomeContext);
  const post_id = post.post_id;
  const img_path = JSON.parse(post.img_list);

  // card 내 user 정보 나타내기
  const setUserProfile = post => {
    const postWriter = users.find(user => post.uid === user.uid);
    if (!postWriter) return null;

    return (
      <>
        <StProfileImg src={postWriter.profile_img} />
        <StCardTextWrap key={postWriter.uid}>
          <StNickName>{postWriter.nickname}</StNickName>
          <StMbti>{postWriter.mbti}</StMbti>
          <div>{post.travel_location}</div>
        </StCardTextWrap>
      </>
    );
  };

  // comments 나타내기
  const setComment = post => {
    const postComment = comments.find(
      comment => post.post_id === comment.post_id,
    );
    if (!postComment) return null;
    return <div key={postComment.post_id}>{postComment.content}</div>;
  };

  // post.post_id === like 줄의 post_id 일치하면 꽉찬하트

  // 2. 현재 로그인한 사용자의 uid(getsession)와 posts의 uid를 비교
  // 3. 값이 없다면 빈하트(추가 가능), 있다면 빨간하트(삭제 가능)

  return (
    <>
      <StHomeCard>
        <StCardTop>
          {setUserProfile(post)}
        </StCardTop>
        <StPostImg src={img_path.publicUrl} />
        <StIcons>
          <img
            src={CommentIcon}
            alt="comment-img"
            style={{ width: "34px", height: "34px" }}
          />
          <HeartIcon post_id={post_id} />
        </StIcons>
        <StComents>{setComment(post)}</StComents>
      </StHomeCard>
    </>
  );
};

export default HomePostCard;

// styled-components
const StHomeCard = styled.div`
  width: 700px;
  margin-bottom: 60px;
  padding: 40px 30px;
  border-radius: 40px;
  background-color: #f1f1f3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  @media (max-width: 800px) {
    width: 100%;
    > * {
      width: 100% !important;
    }
  }
`;

const StCardTop = styled.div`
  display: flex;
  gap: 20px;
`;

const StCardTextWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const StNickName = styled.h4`
  font-size: 24px;
  font-weight: 700;
  color: #121212;
`;
const StMbti = styled.h6`
  font-size: 18px;
  font-weight: 700;
  color: #8b8b8b;
`;

// img 변경해야 함
const StProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
`;

// img 변경해야 함
const StPostImg = styled.img`
  width: 640px;
  height: 520px;
  background-color: white;
`;

const StIcons = styled.div`
  margin: 0 16px;
  display: flex;
  gap: 16px;
`;

const StComents = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 20px;
  font-size: 20px;
  color: #8b8b8b;
  max-width: 760px;
`;
