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

