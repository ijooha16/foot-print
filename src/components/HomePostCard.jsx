import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CommentIcon from "../assets/icon_comment.png";
import HeartIcon from "../assets/icon_heart_fill.png";
import { HomeContext } from "../context/HomeContext";
import supabase from "../supabase/client";

const HomePostCard = ({ post }) => {
  const { users, comments } = useContext(HomeContext);
  const [imageList, setImageList] = useState([]);

  // 스토리지-버킷에서 이미지 가져오기
  useEffect(() => {
    const fetchImageList = async () => {
      const { data, error } = await supabase.storage
        .from("img_bucket") // 버킷명
        .list("uploads"); // 버킷 내 파일명

      setImageList(data);
    };
    fetchImageList();
  }, []);

  // card 내 user 정보 나타내기
  const setUserProfile = post => {
    const postWriter = users.find(user => post.uid === user.uid);
    if (!postWriter) return null;

    return (
      <StCardTextWrap key={postWriter.uid}>
        <StNickName>{postWriter.nickname}</StNickName>
        <StMbti>{postWriter.mbti}</StMbti>
      </StCardTextWrap>
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

  return (
    <>
      <StHomeCard>
        <StCardTop>
          <StProfileImg />
          <div>{setUserProfile(post)}</div>
        </StCardTop>
        <StPostImg />
        <StIcons>
          <img
            src={CommentIcon}
            alt="comment img"
            style={{ width: "34px", height: "34px" }}
          />
          <img
            src={HeartIcon}
            alt="heart img"
            style={{ width: "34px", height: "34px" }}
          />
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
const StProfileImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
`;

// img 변경해야 함
const StPostImg = styled.div`
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
