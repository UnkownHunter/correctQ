import { getExamsMetadata } from "../utils.js"

import { useEffect, useState } from "react";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const metadata = await getExamsMetadata();
      setData(metadata);
    };
    fetchData();
  }, []);

  return (
    <>
    <div>
      <h2>Exam History</h2>

      {data.length === 0 ? (
        <p>No exams found</p>
      ) : (
        <ul>
          {data.map(exam => (
            <li key={exam._id}>
              <strong>{exam.examName}</strong><br />
              Type: {exam.examType}<br />
              Questions: {exam.totalQuestions}<br />
              Created At: {new Date(exam.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}
