import { createContext, useEffect, useState } from "react";
import supabase from "../supabase/client";

export const HomeContext = createContext();

export function HomeProvider({ children }) {
  // post data
  const [posts, setPosts] = useState([]);
  const [isSignin, setIsSignin] = useState(false);

  //post 가져오는 로직
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

  //session 가져오는 로직
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsSignin(session?.user ?? null);
    };
    getSession();
  }, []);

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
