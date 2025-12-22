import { getExams, getExamById } from "../utils.js";

console.log(getExams());

const exam = getExamById("exam_002");
console.log(exam.examName);
