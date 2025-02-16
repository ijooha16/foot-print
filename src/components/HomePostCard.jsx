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
          <img src={CommentIcon} alt="comment img" />
          <img src={HeartIcon} alt="heart img" />
        </StIcons>
        <StComents>{setComment(post)}</StComents>
      </StHomeCard>
    </>
  );
};

export default HomePostCard;

// styled-components
const StHomeCard = styled.div`
  margin: 40px auto;
  padding-bottom: 30px;
  width: 500px;
  border: 1px solid black;
  border-radius: 20px;
`;

const StCardTop = styled.div`
  display: flex;
`;

const StCardTextWrap = styled.div`
  display: block;
`;

const StNickName = styled.h4`
  margin-top: 20px;
  margin-bottom: 5px;
`;
const StMbti = styled.h6`
  margin-top: 0px;
  margin-bottom: 10px;
`;

// img 변경해야 함
const StProfileImg = styled.div`
  width: 70px;
  height: 70px;
  border: 1px solid black;
  border-radius: 70%;
  margin: 10px;
`;

// img 변경해야 함
const StPostImg = styled.div`
  margin: auto;
  width: 450px;
  height: 450px;
  border: 1px solid black;
`;

const StIcons = styled.div`
  display: flex;
  margin: 20px 25px;
  gap: 10px;
`;

const StComents = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 25px;
`;
