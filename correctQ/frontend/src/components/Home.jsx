import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

   

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/auth/updatepic", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    setFileUrl(data.fileUrl); // store URL here

    setTimeout(() => {
      navigate("/Exam",{data});
    }, 2000);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 p-10 rounded-2xl glass">
        <input
          type="text"
          className="input text-center"
          placeholder="Name of the Exam"
        />

        <label className="btn btn-outline">
          Upload PDF / Image
          <input
            type="file"
            accept="application/pdf,image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {file && <p className="text-sm">{file.name}</p>}
        {fileUrl && <p className="text-xs break-all">{fileUrl}</p>}

        <button className="btn" onClick={handleUpload}>
          Submit
        </button>
      </div>
    </div>
  );
}
