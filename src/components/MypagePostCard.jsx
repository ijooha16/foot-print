import styled from "styled-components";

const MypagePostCard = ({ data }) => {
  return (
    <PostBox>
      hi
      {data.title}
    </PostBox>
  );
};

export default MypagePostCard;

const PostBox = styled.div`
  width: 240px;
  height: 240px;
  /* border-radius: 20px; */
  background-color: lightgray;
`;
