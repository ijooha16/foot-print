import styled from "styled-components";
import { useEffect, useState } from "react";
import { useContext } from "react";

import { AuthContext } from "../context/AuthProvider";
import UsersAPI from "../supabase/dao/userDao";

const ProfileModal = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    introduction: "",
    link: "",
    mbti: "",
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await UsersAPI.getUserInfo();
      const userData = data?.[0];

      if (userData) {
        setFormData({
          nickname: userData.nickname,
          introduction: userData.introduction,
          link: userData.link,
          mbti: userData.mbti,
        });
      }
    };
    fetchUserData();
  }, [user]);

  const handleProfileUpdate = async e => {
    e.preventDefault();

    if (!user) return;

    try {
      const { data, error } = await UsersAPI.updateUser(formData);

      if (error) throw error;

      console.log("complete", data);
    } catch (error) {
      alert(error.message);
      console.error("업데이트 오류", error);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <ProfileBox>
      <h2>프로필 수정하기</h2>
      <div>이미지 선택</div>
      <EditForm onSubmit={handleProfileUpdate}>
        <EditNickname>
          <label>{formData.nickname || "닉네임"}</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            placeholder="닉네임"
            onChange={handleChange}
            required
          />
          <button type="submit">저장</button>
        </EditNickname>

        <EditIntro>
          <label>{formData.introduction || "한줄소개"}</label>
          <input
            type="text"
            name="introduction"
            value={formData.introduction}
            placeholder="소개를 입력해주세요."
            onChange={handleChange}
            required
          />
          <button type="submit">저장</button>
        </EditIntro>

        <EditLink>
          <label>{formData.link || "링크"}</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            placeholder="링크"
            onChange={handleChange}
            required
          />
          <button type="submit">저장</button>
        </EditLink>

        <EditMBTI>
          <label>{formData.mbti || "MBTI"}</label>
          <input
            type="text"
            name="mbti"
            value={formData.mbti}
            placeholder="mbti"
            onChange={handleChange}
            required
          />
          <button type="submit">저장</button>
        </EditMBTI>
      </EditForm>
    </ProfileBox>
  );
};

export default ProfileModal;

const ProfileBox = styled.div`
  position: relative;
  margin: auto;
  top: 25%;
  width: 826px;
  height: 600px;

  background-color: lightgrey;
  display: grid;
  grid-template-columns: 2fr 1fr;
  border-radius: 20px;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const EditNickname = styled.div`
  background-color: white;
`;

const EditIntro = styled.div`
  background-color: white;
`;

const EditLink = styled.div`
  background-color: white;
`;

const EditMBTI = styled.div`
  background-color: white;
`;
