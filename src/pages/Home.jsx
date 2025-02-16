import styled from "styled-components";
import HomePostCard from "../components/HomePostCard";
import { useContext, useEffect, useState, useRef } from "react";
import { HomeContext } from "../context/HomeContext";
import AddPostButton from "../components/AddPostButton";
import ShowModal from "./PostingModal";

const Home = () => {
  const { posts, changePosts, setChangePosts } = useContext(HomeContext);
  const isSignin = true;
  const [selectedPost, setSelectedPost] = useState(null);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef(null);
  const postLimit = 5; // 한 번에 불러올 개수

  useEffect(() => {
    setChangePosts(posts);
  }, [posts]);

  const showPosts = where => {
    if (where === "all") {
      setChangePosts([...posts]);
      return;
    }
    if (where === "in") {
      const filterInPost = posts.filter(post => {
        return post.travel_location === "국내";
      });
      setChangePosts(filterInPost);
      return;
    }
    if (where === "out") {
      const filterOutPost = posts.filter(post => {
        return post.travel_location === "국외";
      });
      setChangePosts(filterOutPost);
      return;
    }
  };

  useEffect(() => {
    setChangePosts(posts);
  }, [posts]);

  const showPosts = where => {
    if (where === "all") {
      setChangePosts([...posts]);
      return;
    }
    if (where === "in") {
      const filterInPost = posts.filter(post => {
        return post.travel_location === "국내";
      });
      setChangePosts(filterInPost);
      return;
    }
    if (where === "out") {
      const filterOutPost = posts.filter(post => {
        return post.travel_location === "국외";
      });
      setChangePosts(filterOutPost);
      return;
    }
  };

  const showModal = post => {
    setSelectedPost(post);
  };

  //초기화
  useEffect(() => {
    setChangePosts(posts);
  }, [posts]);

  //카테고리 변경 후 displayedPosts 초기화
  useEffect(() => {
    setDisplayedPosts(changePosts.slice(0, postLimit)); // 처음 5개만 렌더링
    setPage(1);
  }, [changePosts]);

  //5개씩 포스트 추가 (changePosts에서 가져옴)
  const fetchPosts = () => {
    if (loading) return;
    setLoading(true);

    const start = page * postLimit; // 현재 페이지의 시작 인덱스
    const end = start + postLimit;

    const newPosts = changePosts.slice(start, end);

    if (newPosts.length > 0) {
      setDisplayedPosts(prev => [...prev, ...newPosts]);
      setPage(prev => prev + 1);
    }

    setLoading(false);
  };

  //스크롤 감지
  useEffect(() => {
    observer.current = new IntersectionObserver(entries => {
      if (
        entries[0].isIntersecting &&
        displayedPosts.length < changePosts.length
      ) {
        fetchPosts();
      }
    });

    const loadMoreElement = document.getElementById("loadMore");
    if (observer.current && loadMoreElement) {
      observer.current.observe(loadMoreElement);
    }

    return () => observer.current?.disconnect();
  }, [displayedPosts, changePosts]);

  return (
    <>
      <StCategoryContainer>
        <StCategory onClick={() => showPosts("all")}>전체</StCategory>
        <StCategory onClick={() => showPosts("in")}>국내</StCategory>
        <StCategory onClick={() => showPosts("out")}>국외</StCategory>
      </StCategoryContainer>
<<<<<<< HEAD

      <PostContainer>
        {displayedPosts.map((post, index) => (
          <MoveModal
            key={`${post.uid}-${index}`}
            onClick={() => showModal(post)}
          >
            <HomePostCard post={post} />
          </MoveModal>
        ))}
      </PostContainer>

      {loading && <Loading>로딩 중...</Loading>}
      {displayedPosts.length < changePosts.length && (
        <div id="loadMore" style={{ height: "20px" }}></div>
      )}

=======
      <StCardWrap>
        {changePosts.map((post, index) => {
          return (
            <MoveModal
              key={`${post.uid}-${index}`}
              onClick={() => showModal(post)}
            >
              <HomePostCard post={post} />
            </MoveModal>
          );
        })}
      </StCardWrap>
>>>>>>> 0d91b16 (style : 반응형 수정)
      {isSignin === true ? <AddPostButton /> : null}
      {selectedPost && (
        <ShowModal
          post={selectedPost}
          closeModal={() => setSelectedPost(null)}
        />
      )}
    </>
  );
};

export default Home;

<<<<<<< HEAD
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

=======
const StCardWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 800px) {
    width: 100%;
    padding: 0 20px;
    > * {
      width: 100%;
    }
  }
`;
>>>>>>> 0d91b16 (style : 반응형 수정)
const StCategoryContainer = styled.div`
  width: 300px;
  margin-bottom: 80px;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const StCategory = styled.div`
  font-size: 18px;
  color: #8b8b8b;
  cursor: pointer;

  &:hover {
    color: #121212;
    transition:
      transform 0.3s ease,
      color 0.3s ease,
      font-weight 0.3s ease;
    transform: scale(1.3);
    font-weight: 700;
  }
`;

const MoveModal = styled.div`
  cursor: pointer;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 16px;
  margin: 10px 0;
  color: gray;
`;
