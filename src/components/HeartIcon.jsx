import supabase from "../supabase/client";
import HeartIcon_empty from "../assets/icon_heart_empty_24.png";
import HeartIcon_fill from "../assets/icon_heart_fill_24.png";
import { useEffect, useState } from "react";

const HeartIcon = ({ post_id }) => {
  const getSession = sessionStorage.getItem("id");
  const [likesArr, setLikesArr] = useState([]);
  const likeCheck = likesArr.some(e => e.post_id === post_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, error] = await supabase
          .from("likes")
          .select("*")
          .eq("uid", getSession);

        if (error) throw error;

        setLikesArr(data);
      } catch (error) {
        console.error("error fetching likes data", error);
      }
    };
    fetchData();
  }, []);

  // like 추가
  // 1. 하트 이미지 클릭 시 likes 테이블에 값 추가 <-> 삭제
  const addLike = async (e, { post_id }) => {
    e.preventDefault();
    e.stopPropagation();

    // like 깂 보내기
    const { data, error } = await supabase
      .from("likes")
      .insert({ uid: getSession, post_id: post_id });

    if (error) throw error;
    console.log("Like added:", data);
    setLikesArr(data);
  };

  const removeLike = async ({ post_id }) => {
    const { data, error } = await supabase
      .from("likes") // 🔹 삭제할 테이블 선택
      .delete()
      .match({ post_id: post_id });
    if (error) {
      console.error("삭제 오류:", error);
    } else {
      console.log("삭제 완료:", data);
      setLikesArr(data);
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
          onClick={() => removeLike(post_id)}
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
