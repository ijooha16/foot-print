import { useEffect, useState } from "react";
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
        <StNickName>{a.nick_name}</StNickName>
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
