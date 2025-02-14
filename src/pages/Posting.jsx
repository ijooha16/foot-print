import { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabase/client";

const Posting = () => {
  const [posts, setPosts] = useState([]);

  //데이터 갖다 쓰기
  useEffect(() => {
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
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            // post_id: crypto.randomUUID(),
            uid: "5889f782-2266-420e-a94a-cc7b7eddd725",
            title: formData.title,
            travel_location: formData.travelLocation,
            content: formData.content,
            img_list: JSON.stringify({ img: "imgTEST" }),
          },
        ])
        .select();
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
    <div>
      <header>헤더</header>
      <div>
        <StFormBox onSubmit={handleSubmitPosting}>
          <label>
            <span>제목</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChangeInput}
              placeholder="제목을 입력하세요"
            />
          </label>
          <div>
            <label>여행지 선택</label>
            <StLabelFlexRow>
              <input
                type="radio"
                name="travelLocation"
                value="국내"
                checked={formData.travelLocation === "국내"}
                onChange={handleChangeInput}
              />
              <span>국내</span>
            </StLabelFlexRow>
            <StLabelFlexRow>
              <input
                type="radio"
                name="travelLocation"
                value="국외"
                checked={formData.travelLocation === "국외"}
                onChange={handleChangeInput}
              />
              <span>국외</span>
            </StLabelFlexRow>
          </div>
          <label>
            <span>파일선택 </span>
            <input type="file" name="file" onChange={handleChangeInput} />
          </label>
          <div>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChangeInput}
              placeholder="내용 입력"
            ></textarea>
          </div>
          <button type="submit">등록하기</button>
        </StFormBox>
      </div>
      {/* 작성완료게시글 */}
      <div>
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
      </div>
      <footer>푸터</footer>
    </div>
  );
};

export default Posting;

const StFormBox = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  > * {
    border: 2px solid red;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
  }
  label > span {
    font-weight: 600;
    /* width: 100%; */
    background: red;
    /* display: block; */
    text-align: left;
  }
  label input {
    width: 100%;
    background: pink;
  }
`;

const StLabelFlexRow = styled.div`
  display: flex;
  background: red;
  align-items: center;
  gap: 5px;
  width: fit-content;
`;
