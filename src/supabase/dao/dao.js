import { useState } from "react";
import supabase from "../client";

function Posts() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    let postData;
    try {
      postData = await supabase.from("posts").select("*");
      return postData;
    } catch (e) {
      console.log(e);
    }
  };

  const updatePosts = async () => {
    let postData;
    try {
      postData = await supabase.from("posts").select("*");
      console.log("포스트 내용이 업데이트 되었습니다!");
      return postData;
    } catch (e) {
      console.log(e);
    }
  };
}
