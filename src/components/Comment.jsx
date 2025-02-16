import { useEffect, useState } from "react";
import CommentsDao from "../supabase/dao/commentDao";
import UsersDao from "../supabase/dao/userDao";
import supabase from "../supabase/client";
import styled from "styled-components";

export default function Comments({ post_id }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function loadComments() {
      const data = await CommentsDao.getComments(post_id);
      if (data) setComments(data);
    }
    loadComments();
  }, [post_id]);

  return (
    <div>
      {comments.map(comment => (
        <UserComment key={comment.comment_id}>
          <ProfileCommentImg src={comment.profile_img} />
          <p>닉네임{comment.nickname}</p>
          <p>{comment.content}</p>
        </UserComment>
      ))}
    </div>
  );
}

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
