import { useEffect, useState } from "react";
import CommentsDao from "../supabase/dao/commentDao";
import styled from "styled-components";
import supabase from "../supabase/client";

export default function Comments({ post_id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function loadComments() {
      const data = await CommentsDao.getComments(post_id);
      if (data) setComments(data);
      console.log(data);
    }
    loadComments();
  }, [post_id]);

  const deleteComments = async comment_id => {
    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("comment_id", comment_id);

      if (error) throw error;

      // 성공적으로 삭제되면 상태 업데이트
      setComments(prev => prev.filter(c => c.comment_id !== comment_id));

      return true;
    } catch (error) {
      console.error("댓글 삭제 오류:", error.message);
      return false;
    }
  };

  // const editCommentHandler = async (post_id) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("posts")
  //       .update({
  //         uid: sessionStorage.getItem("id"),
  //         title: formData.title,
  //         travel_location: formData.travel_location,
  //         content: formData.content,
  //         img_list: JSON.stringify({ publicUrl: img_path.publicUrl }),
  //       })
  //       .eq("post_id", post_id);

  //     if (error) throw error;
  //     return data;
  //   } catch (error) {
  //     console.error("게시글 수정 오류:", error.message);
  //     return null;
  //   }
  // };

  return (
    <div>
      {comments.map(comment => (
        <UserComment key={comment.comment_id}>
          <ProfileCommentImg src={comment.users.profile_img} />
          <p>{comment.users.nickname}</p>
          <p>{comment.content}</p>
          <ButtonDiv>
            <button onClick={() => editCommentHandler()}>수정</button>
            <button
              onClick={() => {
                deleteComments(comment.comment_id);
              }}
            >
              삭제
            </button>
          </ButtonDiv>
        </UserComment>
      ))}
    </div>
  );
}

const ButtonDiv = styled.div`
  margin-left: auto;
`;

const UserComment = styled.div`
  display: flex;
  width: 80%;
  gap: 15px;
  border-bottom: 1px solid #9bc0ff;
  padding-bottom: 10px;
  height: 100%;

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
