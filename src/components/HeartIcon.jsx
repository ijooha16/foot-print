import supabase from "../supabase/client";
import HeartIcon_empty from "../assets/icon_heart_empty_24.png";
import HeartIcon_fill from "../assets/icon_heart_fill_24.png";
import { useEffect, useState } from "react";

const HeartIcon = ({ post_id }) => {
  const getSession = sessionStorage.getItem("id");
  const [likesArr, setLikesArr] = useState([]);
  const [likeCheck, setLikesCheck] = useState(likesArr.some(e => e.post_id === post_id));

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
  }, []);

  // like 추가
  // 1. 하트 이미지 클릭 시 likes 테이블에 값 추가 <-> 삭제
  const addLike = async (e, post_id) => {
    e.preventDefault();
    e.stopPropagation();

    const { data, error } = await supabase
      .from("likes")
      .insert({ "uid": getSession, "post_id": post_id })
      .select();

    if (error) {
      console.log("Like added:", data);
    } else {
      setLikesArr(prev => [...prev, ...data]); // 기존 배열 유지하면서 새로운 좋아요 추가
    }
  };

  const removeLike = async (e, post_id) => {
    e.preventDefault();
    e.stopPropagation();

    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("uid", getSession)  // `eq()`로 변경
      .eq("post_id", post_id);

    if (error) {
      console.error("삭제 오류:", error);
    } else {
      console.log("삭제 완료:", post_id);
      setLikesArr(prev => prev.filter(like => like.post_id !== post_id)); // 삭제된 post_id 제거
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
          onClick={e => removeLike(e, post_id)}
        />
      ) : (
        <img
          src={HeartIcon_empty}
          alt="heart-img"
          className="heart"
          style={{ width: "34px", height: "34px" }}
          onClick={e => addLike(e, post_id)}
        />
      )}
    </div>
  );
};

export default HeartIcon;
