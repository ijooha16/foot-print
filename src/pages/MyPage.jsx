import { Fragment, useEffect, useState } from "react";
import supabase from "../supabase/client";
import styled from "styled-components";
import MypagePostCard from "../components/MypagePostCard";
import EditIcon from '../assets/icon_edit_24.png'

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
        <MypageInfoBox>
          <TitleText>닉네임</TitleText>
          <SubTitleText> MBTI </SubTitleText>
          <NormalText> ijooha16@gmail.com </NormalText>
          <NormalText>
            {" "}
            자기소개 어쩌구 저쩌구 ㅇ냔얼니ㅏㄹ다ㅜ핀아ㅓㄹ!
          </NormalText>
          <NormalText> blabla</NormalText>
          <ProfileEditBtn></ProfileEditBtn>
        </MypageInfoBox>
      </ContentsBox>
      <MypagePostBox>
        {posts.map(data => (
          <Fragment key={data.id}>
            <MypagePostCard data={data} />
          </Fragment>
        ))}
      </MypagePostBox>
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
  background-color: white;
  color: #121212;

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
  background-color: lightgray;
`;

const MypageInfoBox = styled.div`
  margin-left: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const TitleText = styled.p`
  margin: 0;
  font-size: 26px;
  font-weight: 700;
`;

const SubTitleText = styled.p`
  margin: 0;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
  color: #8b8b8b;
`;

const NormalText = styled.p`
  margin: 2px 0;
  font-size: 16px;
`;

const ProfileEditBtn = styled.button`
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: none;
  position: absolute;
  top: 12px;
  right: 0px;
  background-image: url(${EditIcon});
  background-position: fit;
  background-color: transparent;
`;

const MypagePostBox = styled.div`
  padding: 60px 40px;
  margin-bottom: 60px;
  border: none;
  border-radius: 60px;
  background-color: white;
  color: #121212;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
`;
