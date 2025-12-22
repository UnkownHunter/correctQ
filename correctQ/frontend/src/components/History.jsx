import { getExamsMetadata } from "../utils.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const metadata = await getExamsMetadata();
      setData(metadata);
    };
    fetchData();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    let formatted = date.toLocaleString("en-US", options);
    // Remove the space before AM/PM
    formatted = formatted.replace(" AM", "AM").replace(" PM", "PM");
    // Replace comma with middle dot
    formatted = formatted.replace(", ", " · ");
    return formatted;
  };
  return (
    <>
      <div>
        <h2>Exam History</h2>

        {data.length === 0 ? (
          <p>No exams found</p>
        ) : (
          <div className="flex flex-col gap-5 mt-16 mx-6 -z-10">
            {data.map((exam) => (
              <div
                key={exam._id}
                onClick={() => navigate(`/exam/${exam._id}`)}
                className="card bg-base-100 shadow-md flex-row items-center justify-between p-4 rounded-2xl cursor-pointer"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="flex flex-col">
                    <h2 className="text-md  sm:text-lg font-semibold">
                      {exam.examName}
                    </h2>
                    <p className="text-xs sm:text-md">
                      {formatDate(exam.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
