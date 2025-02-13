import { Fragment, useEffect, useState } from "react";
import supabase from "../supabase/client";
import styled from "styled-components";
import MypagePostCard from "../components/MypagePostCard";

const MyPage = () => {
  const [posts, setPosts] = useState([]);

  //데이터 갖다 쓰기
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

  //데이터 넣기
  supabase.from("posts").insert({ posts });

  return (
    <>
      MyPage {posts.map(e => e.title)}
      <ContentsBox direction="row">
        <ProfileImg>img</ProfileImg>
        <div>
          nickName
          MBTI
          email
          blabla
        </div>
      </ContentsBox>
      <GridBox>
        {posts.map(data => <Fragment key={data.id}><MypagePostCard data={data}/></Fragment>)}
      </GridBox>
    </>
  );
};

export default MyPage;

const ContentsBox = styled.div`
  width: ${props => (props.modal ? "920px" : "800px")};
  padding: 60px 40px;
  margin-bottom: 60px;
  gap: 40px;
  border: none;
  border-radius: 60px;
  background-color: lightgray;

  display: flex;
  flex-direction: ${props => props.direction || "column"};
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.div`
  width: 180px;
  height: 180px;
  border: none;
  border-radius: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`

const GridBox = styled.div`
    width: ${props => (props.modal ? "920px" : "800px")};
  padding: 60px 40px;
  margin-bottom: 60px;
  gap: 40px;
  border: none;
  border-radius: 60px;
  background-color: lightgray;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
`