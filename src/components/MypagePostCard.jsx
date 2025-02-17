import styled from "styled-components";

const MypagePostCard = ({ data }) => {
  // const imgUrl = data.img_list.images;
  const imgUrl = JSON.parse(data.img_list);

  console.log("img url  sdfsdfsdf", imgUrl);

  return (
    <PostBox style={{ backgroundImage: `url(${imgUrl.img})` }}>
      <Title>{data.title}</Title>
    </PostBox>
  );
};

export default MypagePostCard;

const PostBox = styled.div`
  width: 240px;
  height: 240px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-end;
  /* border-radius: 20px; */
  background-color: lightgray;
  /* background-image: url(${props => props.img_url}); */
  background-size: cover;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;
