import { createContext, useEffect, useState } from "react";
import supabase from "../supabase/client.js";

//context
const MyPageContext = createContext(null);

//provider
const MyPageProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // `Promise.all`을 사용하여 병렬 요청
        const [
          { data: usersData, error: usersError },
          { data: postsData, error: postsError },
        ] = await Promise.all([
          supabase.from("users").select("*"),
          supabase.from("posts").select("*"),
        ]);

        if (usersError) throw usersError;
        if (postsError) throw postsError;

        setUsers(usersData);
        setPosts(postsData);
        
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  console.log(users, posts)

  return (
    <MyPageContext.Provider value={{ users, posts }}>
      {children}
    </MyPageContext.Provider>
  );
};

export { MyPageContext, MyPageProvider };
