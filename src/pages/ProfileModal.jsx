import styled from "styled-components";
import { useEffect, useState } from "react";
import { useContext } from "react";
import supabase from "../supabase/client";
import { AuthContext } from "../context/AuthProvider";
import UsersAPI from "../supabase/dao/userDao";
import { uploadFile } from "../supabase/dao/ImgDao";

const ProfileModal = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    introduction: "",
    link: "",
    mbti: "",
  });

  const { user } = useContext(AuthContext);

  const [profileImg, setProfileImg] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);

  const getSession = sessionStorage.getItem("id");

  // 유저 정보 가져오기
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

  // 프로필 이미지 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!getSession) {
          alert("저장된 이미지가 없습니다!");
          return;
        }

        const { data, error } = await supabase
          .from("users")
          .select("profile_img")
          .eq("uid", getSession)
          .single();

        if (error) throw error;

        setProfileImg(data.profile_img);
      } catch (error) {
        console.error("유저 정보 가져오기 오류:", error.message);
      }
    };

    fetchUserInfo();
  }, [getSession]);

  const handleProfileUpdate = async e => {
    e.preventDefault();

    if (!user) return;

    try {
      const data = await UsersAPI.updateUser(formData);

      console.log("complete", data);

      //업데이트 후 label에 반영
      setFormData({
        nickname: formData.nickname,
        introduction: formData.introduction,
        link: formData.link,
        mbti: formData.mbti,
      });

    } catch (error) {
      alert(error.message);
      console.error("업데이트 오류", error);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 이미지 선택하기
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImg(URL.createObjectURL(file));
      uploadImage(file);
    }
  };

  // 이미지 업로드하기
  const uploadImage = async file => {
    try {
      console.log("파일 업로드 시작:", file.name);
      const uploadedFileData = await uploadFile(file);

      if (uploadedFileData) {
        setProfileImg(uploadedFileData.publicURL);

        const { data, error } = supabase
          .from("users")
          .update({ profile_img: uploadedFileData.publicURL })
          .eq("uid", getSession);

        if (error) throw error;

        console.log("이미지 업데이트 성공", data);
      }
    } catch (error) {
      console.error("이미지 업로드 오류:", error.message);
    }
  };

  

  return (
    <ProfileBox>
      <EditImage>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {selectedImg && (
          <img src={selectedImg} alt="Selected Profile" width="100" />
        )}
        {profileImg && <img src={profileImg} alt="Profile" width="100" />}
      </EditImage>

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
        </EditMBTI>
        <button type="submit">저장</button>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const EditImage = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2rem;
  object-fit: cover;
  border-radius: 10px;
  text-align: center;
`;

const EditNickname = styled.div`
  text-align: center;
`;

const EditIntro = styled.div`
  text-align: center;
`;

const EditLink = styled.div`
  text-align: center;
`;

const EditMBTI = styled.div`
  text-align: center;
`;
