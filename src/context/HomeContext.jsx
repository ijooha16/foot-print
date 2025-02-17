import { createContext, useEffect, useState } from "react";
import supabase from "../supabase/client";

export const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isSignin, setIsSignin] = useState(false);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [changePosts, setChangePosts] = useState([...posts]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: postsData, error: postsError },
          { data: usersData, error: usersError },
          { data: commentsData, error: commentsError },
          { data: likesData, error: likesError },
        ] = await Promise.all([
          supabase
            .from("posts")
            .select("*, users(nickname, mbti, profile_img)"),
          supabase.from("users").select("*"),
          supabase.from("comments").select("*"),
          supabase.from("likes").select("*"),
        ]);

        if (postsError) throw postsError;
        if (usersError) throw usersError;
        if (commentsError) throw commentsError;
        if (likesError) throw likesError;

        setPosts(postsData);
        setUsers(usersData);
        setComments(commentsData);
        setLikes(likesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //데이터 넣기
  supabase.from("posts").insert({ posts });
  supabase.from("users").insert({ users });
  supabase.from("comments").insert({ comments });
  supabase.from("likes").insert({ likes });

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
        likes,
        setLikes,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
