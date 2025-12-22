export default function Home() {
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
            <button className="btn btn-wide">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
