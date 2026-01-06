import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useApi } from "../utils";

export default function HomeExam() {
  const { examId } = useParams();
  const location = useLocation();
  const examData = location.state; // comes as ARRAY
  const { makeRequest } = useApi();

  const [data, setData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);

  // Handle option click
  const handleSelect = (qIndex, optionKey, correctAnswer) => {
    if (selectedOptions[qIndex]) return;

    setSelectedOptions((prev) => ({
      ...prev,
      [qIndex]: optionKey,
    }));

    if (optionKey === correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  // Load data from navigation OR API fallback
  useEffect(() => {
    if (examData && Array.isArray(examData) && examData.length > 0) {
      // ✅ FIX: extract object from array
      setData(examData[0]);
    } else {
      // 🔒 Refresh-safe fallback
      const fetchExam = async () => {
        try {
          const apiData = await makeRequest(`exam/${examId}`);
          setData(apiData);
        } catch (err) {
          console.error("Failed to fetch exam:", err);
        }
      };
      fetchExam();
    }
  }, [examData, examId]);

  if (!data) {
    return <p className="text-center mt-40">Loading...</p>;
  }

  return (
    <>
      {/* HEADER */}
      <div className="fixed top-20 left-0 w-full bg-white z-40 px-6 py-4 flex justify-around items-center shadow">
        <h1 className="text-2xl font-bold">{data.examName}</h1>
        <div className="text-2xl font-bold">Score: {score}</div>
      </div>

      {/* CONTENT */}
      <div className="flex w-full justify-center mt-32">
        <div className="w-full max-w-4xl p-6">
          {data.questions.map((q, qIndex) => {
            const selectedOption = selectedOptions[qIndex];
            const isAnswered = selectedOption !== undefined;

            return (
              <div key={q.questionId} className="mb-6 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Question {qIndex + 1}: {q.question}
                </h3>

                <ul>
                  {Object.entries(q.options).map(([key, value]) => {
                    const isClicked = selectedOption === key;
                    const isCorrect = key === q.answer;

                    let bg = "bg-gray-100";

                    if (isAnswered) {
                      if (isClicked && isCorrect)
                        bg = "bg-green-600 text-white";
                      else if (isClicked && !isCorrect)
                        bg = "bg-red-500 text-white";
                      else if (!isClicked && isCorrect)
                        bg = "bg-green-400 text-white";
                    }

                    return (
                      <li
                        key={key}
                        onClick={() => handleSelect(qIndex, key, q.answer)}
                        className={`p-2 mt-1 rounded-sm cursor-pointer ${bg}`}
                      >
                        <input
                          type="checkbox"
                          checked={isClicked}
                          readOnly
                          className="checkbox checkbox-sm mr-2"
                        />
                        {key}: {value}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
