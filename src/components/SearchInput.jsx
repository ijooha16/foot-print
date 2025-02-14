import styled from "styled-components";
import searchIco from "../assets/icon_search.png";
import { useState } from "react";

export const SearchInput = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = e => {
    e.preventDefault();
    if (!searchInput) {
      alert("검색어를 입력하세요");
      return;
    }
    setSearchInput("");

    //검색페이지 이동 로직 작성하기
  };
  return (
    <StSearchForm onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="검색어 입력"
        value={searchInput}
        onChange={e => {
          setSearchInput(e.target.value);
        }}
      />
      <button type="submit">검색</button>
    </StSearchForm>
  );
};

const StSearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 260px;
  height: 40px;
  border-radius: 30px;
  background: #f1f1f3;
  overflow: hidden;
  position: relative;

  input {
    flex: 1;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    background: transparent;
    outline: none;
    padding-left: 40px;
  }

  button {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background: url(${searchIco}) center / 60% no-repeat;

    border: none;
    font-size: 0;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      cursor: pointer;
    }
  }
`;
