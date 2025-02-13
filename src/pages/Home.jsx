import styled from "styled-components";

const Home = () => {
  return (
    <StHomeMain>
      <StHeader>
        <StSearchInput placeholder="검색창" />
        <h2>FootPrint</h2>
        <StLoginBtn>로그인/회원가입</StLoginBtn>
      </StHeader>
      <StCategory>
        <div>전체</div>
        <div>국내</div>
        <div>해외</div>
      </StCategory>
      {/* supabase에서 card 값 가져오기 */}
      <StHomeCard>
        <StCardTop>
          <StProfileImg />
          <StCardTextWrap>
            <StNickName>NickName</StNickName>
            <StMbti>MBTI</StMbti>
          </StCardTextWrap>
          <img />
        </StCardTop>
        <StPostImg />
        <StIcons>
          <div>comment icon</div>
          <div>heart icon</div>
        </StIcons>
        <StComents>conmments</StComents>{" "}
      </StHomeCard>
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
const StProfileImg = styled.div`
  width: 70px;
  height: 70px;
  border: 1px solid black;
  border-radius: 70%;
  margin: 10px;
`;

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
