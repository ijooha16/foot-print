import { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabase/client";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: postsData, error: postsError },
          { data: usersData, error: usersError },
          { data: commentsData, error: commentsError },
        ] = await Promise.all([
          supabase.from("posts").select("*"),
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

  supabase.from("posts").insert({ posts });
  supabase.from("users").insert({ users });
  supabase.from("comments").insert({ comments });

  console.log("posts", posts);
  console.log("users", users);
  console.log("comments", comments);

  return (
    <StHomeMain>
      <StHeader>
        <StSearchInput placeholder="검색창" />
        <h2>FootPrint</h2>
        <Link to={"/login"}>
          <StLoginBtn>로그인/회원가입</StLoginBtn>
        </Link>
      </StHeader>
      <StCategory>
        <div>전체</div>
        <div>국내</div>
        <div>해외</div>
      </StCategory>
      {/* postCard */}
      {/* {posts.map(post => { */}
      <StHomeCard>
        <StCardTop>
          <StProfileImg />
          {users.map(user => (
            <StCardTextWrap key={user.id}>
              <StNickName>{user.nick_name}</StNickName>
              <StMbti>{user.mbti}</StMbti>
            </StCardTextWrap>
          ))}
        </StCardTop>
        <StPostImg />
        <StIcons>
          <img src="../assets/icon_comment.png" alt="comment img" />
          <img src="../assets/icon_heart_fill.png" alt="heart img" />
        </StIcons>
        {comments.map(e => (
          <StComents key={e.id}>{e.text}</StComents>
        ))}
      </StHomeCard>
      ;{/* })} */}
    </StHomeMain>
  );
};

export default Home;

// styled-components
const StHomeMain = styled.div`
  width: 100%;
`;

const StHeader = styled.header`
  background-color: #b1b1b180;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StSearchInput = styled.input`
  width: 150px;
  height: 20px;
`;

const StLoginBtn = styled.button`
  width: 150px;
  height: 20px;
  cursor: pointer;
`;

const StCategory = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 50px;
`;

const StHomeCard = styled.div`
  margin: auto;
  padding-bottom: 30px;
  width: 500px;
  border: 1px solid black;
  border-radius: 20px;
`;

const StCardTop = styled.div`
  display: flex;
`;

const StCardTextWrap = styled.div`
  display: block;
`;

const StNickName = styled.h4`
  margin-top: 20px;
  margin-bottom: 5px;
`;
const StMbti = styled.h6`
  margin-top: 0px;
  margin-bottom: 10px;
`;

// img 변경해야 함
const StProfileImg = styled.div`
  width: 70px;
  height: 70px;
  border: 1px solid black;
  border-radius: 70%;
  margin: 10px;
`;

// img 변경해야 함
const StPostImg = styled.div`
  margin: auto;
  width: 450px;
  height: 450px;
  border: 1px solid black;
`;

const StIcons = styled.div`
  display: flex;
  margin: 20px;
`;

const StComents = styled.div`
  margin: 20px;
`;
