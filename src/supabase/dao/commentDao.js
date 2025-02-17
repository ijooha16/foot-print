import supabase from "../client";

const CommentsAPI = {
  // 댓글 가져오기
  getComments: async post_id => {
    if (!post_id) return;
    try {
      const { data, error } = await supabase
        .from("comments")
        .select(
          `
            uid,
            content,
            users!inner(nickname,profile_img)
            `,
        )
        .eq("post_id", post_id);

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("댓글 가져오기 오류:", error.message);
      return null;
    }
  },

  // 댓글 추가
  insertComment: async (formData, post_id) => {
    try {
      const userId = sessionStorage.getItem("id");
      if (!userId) throw new Error("사용자 ID가 없습니다.");

      const { data, error } = await supabase.from("comments").insert([
        {
          uid: userId,
          content: formData.content,
          post_id: post_id,
        },
      ]);

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("댓글 생성 오류:", error.message);
      return null;
    }
  },

  // 댓글 수정
  updateComment: async (formData, comment_id) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .update({
          content: formData.content,
        })
        .eq("comment_id", comment_id);

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("댓글 수정 오류:", error.message);
      return null;
    }
  },

  // 댓글 삭제
  deleteComment: async comment_id => {
    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("comment_id", comment_id);

      if (error) throw error;

      return true; // 삭제 성공 시 true 반환
    } catch (error) {
      console.error("댓글 삭제 오류:", error.message);
      return false;
    }
  },
};

export default CommentsAPI;
