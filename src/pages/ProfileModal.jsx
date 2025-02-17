import styled from "styled-components";
import { useState } from "react";
import { useContext } from "react";
import supabase from "../supabase/client";
import { AuthContext } from "../context/AuthProvider";

// {
//   "id": "41712710-7b35-4e5a-bc8a-8e6793312d53",
//   "aud": "authenticated",
//   "role": "authenticated",
//   "email": "qwe1@gmail.com",
//   "email_confirmed_at": "2025-02-16T09:27:01.329061Z",
//   "phone": "",
//   "confirmed_at": "2025-02-16T09:27:01.329061Z",
//   "last_sign_in_at": "2025-02-17T06:15:01.930633558Z",
//   "app_metadata": {
//       "provider": "email",
//       "providers": [
//           "email"
//       ]
//   },
//   "user_metadata": {
//       "email_verified": true
//   },
//   "identities": [
//       {
//           "identity_id": "54b42a6a-985a-4a50-9515-4b75266aa179",
//           "id": "41712710-7b35-4e5a-bc8a-8e6793312d53",
//           "user_id": "41712710-7b35-4e5a-bc8a-8e6793312d53",
//           "identity_data": {
//               "email": "qwe1@gmail.com",
//               "email_verified": false,
//               "phone_verified": false,
//               "sub": "41712710-7b35-4e5a-bc8a-8e6793312d53"
//           },
//           "provider": "email",
//           "last_sign_in_at": "2025-02-16T09:27:01.320037Z",
//           "created_at": "2025-02-16T09:27:01.320094Z",
//           "updated_at": "2025-02-16T09:27:01.320094Z",
//           "email": "qwe1@gmail.com"
//       }
//   ],
//   "created_at": "2025-02-16T09:27:01.307577Z",
//   "updated_at": "2025-02-17T06:15:01.93578Z",
//   "is_anonymous": false
// }

const ProfileModal = () => {
  const testuserProfile = {
    "id": "41712710-7b35-4e5a-bc8a-8e6793312d53",
    "aud": "authenticated",
    "role": "authenticated",
    "email": "qwe1@gmail.com",
    "email_confirmed_at": "2025-02-16T09:27:01.329061Z",
    "phone": "",
    "confirmed_at": "2025-02-16T09:27:01.329061Z",
    "last_sign_in_at": "2025-02-17T06:15:01.930633558Z",
    "app_metadata": {
        "provider": "email",
        "providers": [
            "email"
        ]
    },
    "user_metadata": {
        "email_verified": true
    },
    "identities": [
        {
            "identity_id": "54b42a6a-985a-4a50-9515-4b75266aa179",
            "id": "41712710-7b35-4e5a-bc8a-8e6793312d53",
            "user_id": "41712710-7b35-4e5a-bc8a-8e6793312d53",
            "identity_data": {
                "email": "qwe1@gmail.com",
                "email_verified": false,
                "phone_verified": false,
                "sub": "41712710-7b35-4e5a-bc8a-8e6793312d53"
            },
            "provider": "email",
            "last_sign_in_at": "2025-02-16T09:27:01.320037Z",
            "created_at": "2025-02-16T09:27:01.320094Z",
            "updated_at": "2025-02-16T09:27:01.320094Z",
            "email": "qwe1@gmail.com"
        }
    ],
    "created_at": "2025-02-16T09:27:01.307577Z",
    "updated_at": "2025-02-17T06:15:01.93578Z",
    "is_anonymous": false
}
  const { userProfile, user } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [link, setLink] = useState("");
  const [mbti, setMbti] = useState("");
  console.log("profile user : ", user);
  console.log("profile user : ", userProfile);
  const handleProfileUpdate = async e => {
    e.preventDefault();

    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .upsert({ id: user.id, ...userProfile });

      if (error) throw error;

      console.log("complete", data);
    } catch (error) {
      alert(error.message); // 오류 메시지를 alert로 표시
      console.error("업데이트 오류", error); // 콘솔에 오류 출력
    }
  };

  const handleProfileSubmit = e => {
    e.preventDefault();
    if (nickname !== userProfile.nickname)
      handleProfileUpdate("nickname", nickname);
    if (introduction !== userProfile.introduction)
      handleProfileUpdate("introduction", introduction);
    if (link !== userProfile.link) handleProfileUpdate("link", link);
    if (mbti !== userProfile.mbti) handleProfileUpdate("mbti", mbti);
  };

  return (
    <ProfileBox>
      <h2>프로필 수정하기</h2>
      <div>이미지 선택</div>
      <EditForm>
        <EditNickname>
          <label>{userProfile.nickname || "닉네임"}</label>
          <input
            type="text"
            value={userProfile.nickname}
            placeholder="닉네임"
            onChange={e => setNickname(e.target.value)}
            required
          />
          <button onClick={handleProfileSubmit}>저장</button>
        </EditNickname>

        <EditIntro>
          <label>{userProfile.introduction || "한줄소개"}</label>
          <input
            type="text"
            value={userProfile.introduction}
            placeholder="소개를 입력해주세요."
            onChange={e => setIntroduction(e.target.value)}
            required
          />
          <button onClick={handleProfileSubmit}>저장</button>
        </EditIntro>

        <EditLink>
          <label>{userProfile.link || "링크"}</label>
          <input
            type="text"
            value={userProfile.link}
            placeholder="링크"
            onChange={e => setLink(e.target.value)}
            required
          />
          <button onClick={handleProfileSubmit}>저장</button>
        </EditLink>

        <EditMBTI>
          <label>{userProfile.mbti || "MBTI"}</label>
          <input
            type="text"
            value={userProfile.mbti}
            placeholder="mbti"
            onChange={e => setMbti(e.target.value)}
            required
          />
          <button onClick={handleProfileSubmit}>저장</button>
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
