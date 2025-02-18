import styled from "styled-components";

const MypagePostCard = ({ post }) => {
  // const imgUrl = post.img_list.images;
  const imgUrl = JSON.parse(post.img_list);

  return (
    <PostBox style={{ backgroundImage: `url(${imgUrl.publicUrl})` }}>
      <Title>{post.title}</Title>
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
