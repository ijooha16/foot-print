import { createContext, useEffect, useState } from "react";
import supabase from "../supabase/client";

export const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isSignin, setIsSignin] = useState(false);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [changePosts, setChangePosts] = useState([...posts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: postsData, error: postsError },
          { data: usersData, error: usersError },
          { data: commentsData, error: commentsError },
        ] = await Promise.all([
          supabase.from("posts").select("*, users(nickname, mbti, profile_img)"),
          supabase.from("users").select("*"),
          supabase.from("comments").select("*"),
        ]);

        if (postsError) throw postsError;
        if (usersError) throw usersError;
        if (commentsError) throw commentsError;

        setPosts(postsData);
        setUsers(usersData);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log("users", users);
  supabase.from("posts").insert({ posts });
  supabase.from("users").insert({ users });
  supabase.from("comments").insert({ comments });

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
        setPosts,
        users,
        comments,
        isSignin,
        setIsSignin,
        changePosts,
        setChangePosts,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
