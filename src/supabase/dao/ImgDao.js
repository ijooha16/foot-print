import supabase from "../client";

// fucntion - 이미지를 supabase에 업로드하는 함수
// param -  file과 file.name을을 받아옵니다
// file - 실제 저장할 이미지 파일
// .from("파일저장경로로") - supabase내부에 파일이 저장될 경로
// return - supabase 내부의 실제 데이터 저장정보가 리턴됨

async function uploadFile(file) {
  const { data, error } = await supabase.storage
    .from("img_bucket/uploads")
    .upload(file.name, file);
  if (error) {
    alert("업로드 실패");
  } else {
    alert("업로드 성공");
    loadFile(data.fullPath);
  }
}

async function loadFile(file_path) {
  const { data } = supabase.storage
    .from("img_bucket/uploads")
    .getPublicUrl(file_path);
  return data;
}

export { uploadFile, loadFile };
