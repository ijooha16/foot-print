import styled from "styled-components";
import searchIco from "../assets/icon_search.png";
import { useContext, useState } from "react";
import { HomeContext } from "../context/HomeContext";

export const SearchInput = () => {
  const { posts, setChangePosts } = useContext(HomeContext);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = e => {
    e.preventDefault();
    if (!searchInput) {
      alert("검색어를 입력하세요");
      return;
    }
    // 검색창 필터링
    const keyword = searchInput;

    const searchPosts = posts.filter(post => {
      return (
        post.title.includes(keyword) ||
        post.content.includes(keyword) ||
        post.users?.nickname.includes(keyword) ||
        post.users?.mbti.includes(keyword.toUpperCase())
      );
    });

    setChangePosts(searchPosts);

    if (e.key === "Enter") return;
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
  width: 280px;
  height: 46px;
  padding: 0 14px;
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
      color: #dedede;
    }
  }

  button {
  min-width: 24px;
  min-height: 24px;
  background: url(${searchIco}) no-repeat center;
  background-size: 24px 24px; /* 배경 이미지 크기 조정 */
  border: none;
  cursor: pointer;
}
`;
