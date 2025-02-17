import { uploadFile, loadFile } from "../supabase/dao/ImgDao";

export default function Test() {
  const fileEvent = e => {
    const file = e.target.files[0];
    if (!file) return;

    console.log(file);
    uploadFile(file);
  };

  return (
    <>
      <input type="file" onChange={fileEvent} />
    </>
  );
}
