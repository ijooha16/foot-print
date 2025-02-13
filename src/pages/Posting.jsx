import { useState } from "react";
import styled from "styled-components";

const Posting = () => {
  const [formData, setFormData] = useState({
    title: "",
    travelLocation: "",
    file: null,
    content: "",
  });
  const handleChangeInput = e => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const handleSubmitPosting = e => {
    e.preventDefault();
    console.log("폼 데이터:", formData);
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
            <label>
              <span>국내</span>
              <input
                type="radio"
                name="travelLocation"
                value="국내"
                checked={formData.travelLocation === "국내"}
                onChange={handleChangeInput}
              />
            </label>
            <label>
              <span>국외</span>
              <input
                type="radio"
                name="travelLocation"
                value="국외"
                checked={formData.travelLocation === "국외"}
                onChange={handleChangeInput}
              />
            </label>
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
      <div></div>
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
`;
