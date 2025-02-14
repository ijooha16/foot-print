import { createContext, useEffect, useState } from "react";
import supabase from "../supabase/client";

const HomeContext = createContext();

export function HomeProvider({ children }) {
  // post data
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data, error } = await supabase.from("posts").select("*");
        if (error) throw error;
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);
  console.log("posts", posts);
  //데이터 넣기
  supabase.from("posts").insert({ posts });

  return (
    <HomeContext.Provider
      value={{
        posts,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
