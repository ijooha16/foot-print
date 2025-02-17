import { useContext, useState } from "react";
import styled from "styled-components";
import CommentIcon from "../assets/icon_comment.png";
import HeartIcon from "../assets/icon_heart_empty_24.png";
import { HomeContext } from "../context/HomeContext";
import supabase from "../supabase/client";

const HomePostCard = ({ post }) => {
  const { users, comments } = useContext(HomeContext);
  const getSession = sessionStorage.getItem("id");
  const [like, setLike] = useState({ uid: getSession, post_id: 0 });
  // card 내 user 정보 나타내기
  const setUserProfile = post => {
    const postWriter = users.find(user => post.uid === user.uid);
    if (!postWriter) return null;

    return (
      <StCardTextWrap key={postWriter.uid}>
        <StNickName>{postWriter.nickname}</StNickName>
        <StMbti>{postWriter.mbti}</StMbti>
        <div>{post.travel_location}</div>
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

  // like 추가
  // 1. 하트 이미지 클릭 시 likes 테이블에 값 추가 <-> 삭제
  const addLike = async (e, post) => {
    e.preventDefault();
    e.stopPropagation();

    // like 깂 보내기
    const { data, error } = await supabase
      .from("likes")
      .insert({ uid: getSession, post_id: post.post_id });

    if (error) throw error;
  };

  // like 값 가져오기
  const removeLike = async () => {
    const likeInfo = await supabase
      .from("likes")
      .select("*")
      .eq("uid", getSession);

    console.log("likeInfo", likeInfo);

    likeInfo.data;
  };

  // 2. 현재 로그인한 사용자의 uid(getsession)와 posts의 uid를 비교
  // 3. 값이 없다면 빈하트(추가 가능), 있다면 빨간하트(삭제 가능)

  return (
    <>
      <StHomeCard>
        <StCardTop>
          <StProfileImg src="https://azshuuuatgkxkkguganq.supabase.co/storage/v1/object/public/img_bucket/uploads/1733724254699-21.jpg" />
          <div>{setUserProfile(post)}</div>
        </StCardTop>
        <StPostImg src="https://cafe24.poxo.com/ec01/reptily/HOvhRhvOk+Cp2KY4JuusAnHIWtRdH5D7VFDjkM1HS5VrlB0/xpHAjGhEYnPJ0BG3Viz7C+cKZoA9jUZDtJSnqw==/_/web/product/big/202405/2aad75e7236aa0794c82bbc72262681c.jpg" />
        <StIcons>
          <img
            src={CommentIcon}
            alt="comment-img"
            style={{ width: "34px", height: "34px" }}
          />
          <img
            src={HeartIcon}
            alt="heart-img"
            className="heart"
            style={{ width: "34px", height: "34px" }}
            onClick={removeLike()}
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
