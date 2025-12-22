import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center size-100 rounded-2xl glass">
          <div className="gap-6 flex flex-col justify-center items-center">
            <input
              type="text"
              className="input text-center"
              placeholder="Name of the Exam"
            />

            <label className="btn btn-outline btn-wide">
              Upload File
              <input type="file" className="hidden" />
            </label>
            <button className="btn btn-wide" onClick={() => navigate("/Exam")}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
