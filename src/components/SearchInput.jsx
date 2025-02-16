import styled from "styled-components";
import searchIco from "../assets/icon_search_24.png";
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
      <button type="submit"></button>

      <input
        type="text"
        placeholder="검색어를 입력해주세요!"
        value={searchInput}
        onChange={e => {
          setSearchInput(e.target.value);
        }}
      />
    </StSearchForm>
  );
};

const StSearchForm = styled.form`
  width: 220px;
  height: 46px;
  padding: 0 14px;
  margin-right: 60px;
  display: flex;
  align-items: center;

  border-radius: 30px;
  background: #f1f1f3;
  position: relative;

  input {
    flex: 1;
    border: none;
    font-size: 16px;
    background: transparent;
    outline: none;
    margin-left: 10px;

    ::placeholder {
      color: #DEDEDE;
    }
  }

  button {
    min-width: 24px;
    min-height: 24px;
    background: url(${searchIco});
    border: none;
    cursor: pointer;
  }
`;
