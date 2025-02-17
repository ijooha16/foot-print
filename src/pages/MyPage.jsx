import { Fragment } from "react";
import styled from "styled-components";
import MypagePostCard from "../components/MypagePostCard.jsx";
import EditIcon from "../assets/icon_edit_24.png";
import { useContext } from "react";
import { MyPageContext } from "../context/MyPageContext.jsx";

const MyPage = () => {
  const { posts, users } = useContext(MyPageContext);
  const getSession = sessionStorage.getItem("id");

  console.log(posts, users);

  const myInfo = users.find(u => u.uid === getSession);
  const myPost = posts.filter(post => post.uid === getSession);

  return (
    <>
      <ContentsBox direction="row">
        <ProfileImg>img</ProfileImg>
        <MypageInfoBox>
          <TitleText>{myInfo.nickname}</TitleText>
          <SubTitleText> {myInfo.mbti} </SubTitleText>
          <NormalText> {myInfo.email}</NormalText>
          <NormalText>{myInfo.introduction}</NormalText>
          <ProfileEditBtn></ProfileEditBtn>
        </MypageInfoBox>
      </ContentsBox>
      <MypagePostBox>
        {myPost.map(data => (
          <Fragment key={data.post_id}>
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
  width: 300px;
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

const ProfileEditBtn = styled.a`
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
  cursor: pointer;
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
