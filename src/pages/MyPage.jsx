import { useEffect, useState } from "react";
import supabase from "../supabase/client";

const MyPage = () => {
  const [posts, setPosts] = useState([]);

  //데이터 갖다 쓰기
  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data, error } = await supabase.from("posts").select("*");
        if (error) throw error;
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  //데이터 넣기
  supabase.from("posts").insert({ posts });

  return <div>MyPage {posts.map(e => e.title)}</div>;
};

export default MyPage;
