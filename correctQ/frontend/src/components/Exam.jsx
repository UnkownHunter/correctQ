import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getExamById } from "../utils";
import { useState } from "react";
export default function Exam() {
  const {examId} = useParams();
  const [data, setData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const Examdata = await getExamById(examId);
      setData(Examdata);
    };
    fetchData();
  }, []);
  return (
    <>

    <div className="flex w-full h-screen justify-center items-center mt-10">
      {data ? (
        <div className="w-full max-w-4xl p-6">
          <h1 className="text-2xl font-bold mb-6">{data.examName}</h1>
          {data.questions.map((q, index) => (
            <div key={q.questionId} className="mb-6 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Question {index + 1}: {q.question}</h3>
              <ul className="mb-2">
                {Object.entries(q.options).map(([key, value]) => (
                  <li key={key} className={`p-1 ${key === q.answer ? 'bg-green-200' : ''}`}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600">Correct Answer: {q.answer}</p>
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
