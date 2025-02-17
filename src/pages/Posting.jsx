import { useEffect, useState } from "react";
import supabase from "../supabase/client";
// import { SearchInput } from "../components/SearchInput";
// import SigninLoginBtn from "../components/SigninLoginBtn";
import AddIcon from "../assets/icon_add_black.png";
import { StBtn, ContentsBox, LoginTxt } from "../shared/styleGuide";
import styled from "styled-components";

const Posting = () => {
  const [posts, setPosts] = useState([]);

  //데이터 베이스에서 유저 이름 가져오기

  const nick_name = "사용자 닉네임";

  //데이터 가져오기
  const getPosts = async () => {
    try {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) throw error;
      setPosts(data);
      //uid가 노출되면 안댐
    } catch (error) {
      console.log("데이터 가져오기 오류 : ", error);
    }
  };

  // 로그인 사용자 정보 가져오기
  // const getUser = async () => {
  //   const { data: user, error } = await supabase.from("posts").select("*");
  //   if (error) {
  //     console.log("로그인 사용자 정보 가져오기 오류 : ", error);
  //     return null;
  //   }
  //   return user;
  // };
  // getUser();

  //데이터 갖다 쓰기
  useEffect(() => {
    getPosts();
  }, []);
  // console.log(posts);

  //데이터 넣기
  supabase.from("posts").insert({ posts });

  const [formData, setFormData] = useState({
    post_id: "",
    title: "",
    travelLocation: "",
    file: null,
    content: "",
  });

  //인풋값 입력
  const handleChangeInput = e => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  //작성완료버튼
  const handleSubmitPosting = async e => {
    e.preventDefault();
    console.log("폼 데이터:", formData);
    //제목, 내용 모두 입력 얼리리턴
    if (!formData.title || !formData.content) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    try {
      const { data, error } = await supabase.from("posts").insert([
        {
          // post_id: crypto.randomUUID(),
          uid: sessionStorage.getItem("id"),
          title: formData.title,
          travel_location: formData.travelLocation,
          content: formData.content,
          img_list: JSON.stringify({ img: "imgTEST" }),
        },
      ]);

      //ui 노출
      console.log("완료버튼누른후 data : ", data);
      setPosts(prevPosts => [...prevPosts, data[0]]);
      if (error) throw error;
      alert("게시글 등록 완료");
      setFormData({
        title: "",
        travelLocation: "",
        file: null,
        content: "",
      });
    } catch (error) {
      console.log("게시글 등록 오류 : ", error);
    }
  };

  return (
    <>
      <LoginTxt>게시글 작성하기</LoginTxt>
      <ContentsBox>
        <StFormBox onSubmit={handleSubmitPosting}>
          <StInputContainer>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChangeInput}
              placeholder="제목을 입력해주세요"
            />
          </StInputContainer>
          <StInputRadioBox>
            <p>어디로 여행 다녀오셨나요?</p>
            <div>
              <label>
                <input
                  type="radio"
                  name="travelLocation"
                  value="국내"
                  checked={formData.travelLocation === "국내"}
                  onChange={handleChangeInput}
                />
                <span>국내</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="travelLocation"
                  value="국외"
                  checked={formData.travelLocation === "국외"}
                  onChange={handleChangeInput}
                />
                <span>국외</span>
              </label>
            </div>
          </StInputRadioBox>
          <StInputFIle>
            <UploadLabel htmlFor="fileUpload">
              {/* 아래 image는 업로드한 이미지를 의미합니다! 이미지를 추가하면 박스가 이미지로 바뀌어요.
              추후 수정 부탁드립니다. */}
              {/* {image ? <PreviewImage src={image} alt="Preview" /> : <PlusIcon />} */}
              <PlusIcon />
            </UploadLabel>
            <input
              type="file"
              id="fileUpload"
              name="file"
              onChange={handleChangeInput}
            />
          </StInputFIle>
          <StInputContainer>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChangeInput}
              placeholder={`${nick_name}님의 이야기를 들려주세요!`}
              rows="2"
            ></textarea>
          </StInputContainer>
          <StBtn type="submit">등록하기</StBtn>
        </StFormBox>
      </ContentsBox>
      {/* 작성완료게시글 */}
      {/* <div>
        {posts.map(post => {
          return (
            <div key={post.post_id}>
              <h3>{post.title}</h3>
              <p>여행지 : {post.travelLocation}</p>
              <p>이미지</p>
              <p>{post.content}</p>
            </div>
          );
        })}
      </div> */}
    </>
  );
};

export default Posting;

const StFormBox = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 40px;
  width: 100%;
  > * {
    width: 100%;
  }
  button {
    width: 100px;
  }
`;

const StInputContainer = styled.label`
  input,
  textarea {
    width: 100%;
    padding: 20px 24px;
    border: 1px solid #ccc;
    border-radius: 20px;
    &:hover {
      outline: 2px solid #cee0ff;
    }
  }
`;

const StInputFIle = styled.div`
  input {
    display: none;
  }
`;

const UploadLabel = styled.label`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: #f8f8f8;

  &:hover {
    border-color: #dedede;
    background-color: #eee;
  }
`;

const PlusIcon = styled.div`
  width: 40px;
  height: 40px;
  background: url(${AddIcon}) no-repeat center;
  background-size: contain;
`;

// const PreviewImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   border-radius: 10px;
// `;

const StInputRadioBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  > p {
    font-weight: 600;
  }
  > div {
    display: flex;
    gap: 10px;
    label {
      &:hover {
        cursor: pointer;
      }
    }
  }

  input {
    margin: 0;
    margin-right: 10px;
  }
`;