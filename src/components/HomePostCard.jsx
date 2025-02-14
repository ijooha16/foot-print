import React, { useEffect, useState } from "react";
import supabase from "../supabase/client";
import styled from "styled-components";
import CommentIcon from "../assets/icon_comment.png";
import HeartIcon from "../assets/icon_heart_fill.png";

const HomePostCard = ({ post }) => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: usersData, error: usersError },
          { data: commentsData, error: commentsError },
        ] = await Promise.all([
          supabase.from("users").select("*"),
          supabase.from("comments").select("*"),
        ]);

        if (usersError) throw usersError;
        if (commentsError) throw commentsError;

        setUsers(usersData);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log("users", users);
  supabase.from("users").insert({ users });
  supabase.from("comments").insert({ comments });

  // card 내 user 정보 나타내기
  const setUserProfile = post => {
    const a = users.find(user => post.uid === user.uid);
    if (!a) return null;

    return (
      <StCardTextWrap key={a.uid}>
        <StNickName>{a.nickname}</StNickName>
        <StMbti>{a.mbti}</StMbti>
      </StCardTextWrap>
    );
  };

  // comments 나타내기
  const setComment = post => {
    const b = comments.find(comment => post.post_id === comment.post_id);
    if (!b) return null;
    return <div key={b.post_id}>{b.content}</div>;
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
