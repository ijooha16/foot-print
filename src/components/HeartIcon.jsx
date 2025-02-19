import supabase from "../supabase/client.js";
import HeartIcon_empty from "../assets/icon_heart_empty_24.png";
import HeartIcon_fill from "../assets/icon_heart_fill_24.png";
import { useEffect, useState } from "react";

const HeartIcon = ({ post_id }) => {
  const getSession = sessionStorage.getItem("id");
  const [likesArr, setLikesArr] = useState([]);
  const [likeCheck, setLikesCheck] = useState(false);

  useEffect(() => {
    setLikesCheck(likesArr.some(e => e.post_id === post_id));
  }, [likesArr, post_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("likes")
          .select("*")
          .eq("uid", getSession);

        if (error) throw error;
        setLikesArr(data || []); // 데이터가 없을 경우 빈 배열 설정
      } catch (error) {
        console.error("error fetching likes data", error);
      }
    };
    fetchData();
  }, [post_id]);

  // like 추가
  // 1. 하트 이미지 클릭 시 likes 테이블에 값 추가 <-> 삭제
  const addLike = async e => {
    e.preventDefault();
    e.stopPropagation();

    const { data, error } = await supabase
      .from("likes")
      .insert({ uid: getSession, post_id: post_id })
      .select(); // insert 후 새로 추가된 데이터를 받아옴

    if (error) {
      console.error("좋아요 추가 오류:", error);
    } else {
      console.log("Like added:", data);
      if (data) {
        setLikesArr(prev => [...prev, ...data]); // 기존 좋아요 배열 유지하면서 추가
        setLikesCheck(true); // 즉시 UI 반영
      }
    }
  };

  const removeLike = async e => {
    e.preventDefault();
    e.stopPropagation();

    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("uid", getSession)
      .eq("post_id", post_id);

    if (error) {
      console.error("삭제 오류:", error);
    } else {
      console.log("삭제 완료:", post_id);

      // Supabase에서 최신 데이터를 다시 가져와 업데이트
      const { data: updatedLikes } = await supabase
        .from("likes")
        .select("*")
        .eq("uid", getSession);

      setLikesArr(updatedLikes || []); // 최신 좋아요 리스트로 상태 업데이트
      setLikesCheck(false);
    }
  };

  return (
    <div>
      {likeCheck ? (
        <img
          src={HeartIcon_fill}
          alt="heart-img"
          className="heart_fill"
          style={{ width: "34px", height: "34px" }}
          onClick={e => removeLike(e)}
        />
      ) : (
        <img
          src={HeartIcon_empty}
          alt="heart-img"
          className="heart"
          style={{ width: "34px", height: "34px" }}
          onClick={e => addLike(e)}
        />
      )}
    </div>
  );
};

export default HeartIcon;
