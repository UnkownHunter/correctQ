import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/uploadfiles", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    navigate(`/mainexam/${1}`, { state: data.response.exams });
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

        <button className="btn" onClick={handleUpload}>
          Submit
        </button>
      </div>
    </div>
  );
}
