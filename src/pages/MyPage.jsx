import { Fragment } from "react";
import styled from "styled-components";
import MypagePostCard from "../components/MypagePostCard.jsx";
import EditIcon from "../assets/icon_edit_24.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.jsx";
import { MyPageContext } from "../context/MyPageContext.jsx";


const MyPage = () => {
  const { users, posts } = useContext(MyPageContext);
  // const { authUser } = useContext(AuthContext);

  // const myInfo = users.find(
  //   u => u.uid === "0272c1b6-524c-4705-865c-c7d6866a9e40",
  // );
  // const myPost = posts.find(
  //   post => post.uid === "0272c1b6-524c-4705-865c-c7d6866a9e40",
  // );

  return (
    <>
      <ContentsBox direction="row">
        <ProfileImg>img</ProfileImg>
        <MypageInfoBox>
          <TitleText>{users.map(u => u.nick_name)}</TitleText>
          <SubTitleText> {users.map(u => u.mbti)} </SubTitleText>
          <NormalText> {users.map(u => u.email)}</NormalText>
          <NormalText>{users.map(u => u.introduction)}</NormalText>
          <ProfileEditBtn></ProfileEditBtn>
        </MypageInfoBox>
      </ContentsBox>
      <MypagePostBox>
        {posts.map(data => (
          <Fragment key={data.post_id}>
            <MypagePostCard data={data} />
          </Fragment>
        ))}
        <div
          style={{ backgroundColor: "gray", width: "100px", height: "6000px" }}
        ></div>
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
