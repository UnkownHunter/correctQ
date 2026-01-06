import data from './data/exams.json';

// Get a particular exam by ID
export async function getExamById(examId) {
  return data.exams.find(exam => exam._id === examId) || null;
}

// Get all exams
export async function getExams() {
  return data.exams;
}

export async function getExamsMetadata() {
  return data.exams.map(exam => ({
    _id: exam._id,
    examName: exam.examName,
    examType: exam.examType,
    totalQuestions: exam.totalQuestions,
    createdAt: exam.createdAt
  }));
}

// export const useApi = () => {

//     const makeRequest = async (endpoint, options = {}) => {
//         const defaultOptions = {
//             headers: {
//                 "Content-Type": "*/*",
//                 "Accept" : "application/json"
  
//             }
//         }

//         const response = await fetch(`http://localhost:8000/${endpoint}`, {
//             ...defaultOptions,
//             ...options,
//         })

//         if (!response.ok) {
//             const errorData = await response.json().catch(() => null)
//             if (response.status === 429) {
//                 throw new Error("Daily quota exceeded")
//             }
//             throw new Error(errorData?.detail || "An error occurred")
//         }

//         return response.json()
//     }

//     return {makeRequest}
// }


export const useApi = () => {
  const makeRequest = async (endpoint, options = {}) => {
    const response = await fetch(
      `http://localhost:8000/${endpoint}`,
      {
        headers: {
          Accept: "application/json",
          ...(options.body && !(options.body instanceof FormData)
            ? { "Content-Type": ["application/json", "application/pdf"] }
            : {}),
          ...options.headers,
        },
        ...options,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 429) {
        throw new Error("Daily quota exceeded");
      }
      throw new Error(errorData?.detail || "An error occurred");
    }

    return response.json();
  };

  return { makeRequest };
};
