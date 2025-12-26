import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamById } from "../utils";

export default function Exam() {
  const { examId } = useParams();
  const [data, setData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);

  const handleSelect = (questionId, optionKey, correctAnswer) => {
    if (selectedOptions[questionId]) return;

    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));

    if (optionKey === correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const examData = await getExamById(examId);
      setData(examData);
    };
    fetchData();
  }, [examId]);

  return (
    <>
      {/* FIXED HEADER */}
      <div className="fixed top-20 left-0 w-full  bg-white z-40  px-6 py-4 flex justify-around items-center">
        <h1 className="text-2xl font-bold">{data?.examName || "Loading..."}</h1>
        <div className="text-2xl font-bold">Score: {score}</div>
      </div>

      {/* CONTENT */}
      <div className="flex w-full justify-center mt-32">
        {data ? (
          <div className="w-full max-w-4xl p-6">
            {data.questions.map((q, index) => (
              <div key={q.questionId} className="mb-6 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Question {index + 1}: {q.question}
                </h3>

                <ul>
                  {Object.entries(q.options).map(([key, value]) => {
                    const selected = selectedOptions[q.questionId];
                    const isCorrect = key === q.answer;
                    const isClicked = key === selected;

                    let bg = "bg-gray-100";

                    if (selected) {
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
                        onClick={() =>
                          handleSelect(q.questionId, key, q.answer)
                        }
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
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
