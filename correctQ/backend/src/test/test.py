
import json
from typing import Dict, Any, List
import os
from dotenv import load_dotenv
from pydantic import BaseModel, ValidationError, Field
from datetime import datetime
from google import genai
from google.genai import types



load_dotenv()

GENAI_API_KEY = os.getenv("GENAI_API_KEY")
if not GENAI_API_KEY:
    raise ValueError("GENAI_API_KEY is not set in the environment.")


client = genai.Client(api_key=GENAI_API_KEY)


class Options(BaseModel):
    A: str
    B: str
    C: str
    D: str


class Question(BaseModel):
    questionId: int
    question: str
    options: Options
    answer: str = Field(..., min_length=1, max_length=1)


class Exam(BaseModel):
    _id: str
    examName: str
    examType: str
    totalQuestions: int
    createdAt: datetime
    questions: List[Question]


class ExamsData(BaseModel):
    exams: List[Exam]



# Exam generator function from image
def generate_exam_from_image(image_path: str, difficulty: str = "medium") -> Dict[str, Any]:
    # Upload the image file
    my_file = client.files.upload(file=image_path)

    system_instruction = """You are an expert in processing examination images.

Your task is to extract and structure the exam content from the uploaded image into a valid Exam object.

The image contains an exam with multiple-choice questions. Extract the exam name, type, questions, options, and answers.

STRICT REQUIREMENTS:
1. Output MUST be valid JSON matching the Exam schema.
2. Exactly match the field names: _id, examName, examType, totalQuestions, createdAt, questions.
3. createdAt should be in ISO format (e.g., "2025-12-23T10:00:00Z").
4. Each question has questionId (int), question (str), options (dict with A,B,C,D), answer (single letter str).
5. Do NOT include additional text, only JSON.

OUTPUT FORMAT (MANDATORY):
{
  "_id": "exam_001",
  "examName": "Extracted Exam Name",
  "examType": "CA",
  "totalQuestions": 3,
  "createdAt": "2025-12-23T10:00:00Z",
  "questions": [
    {
      "questionId": 1,
      "question": "Question text",
      "options": {"A": "Opt A", "B": "Opt B", "C": "Opt C", "D": "Opt D"},
      "answer": "A"
    }
  ]
}
"""

    prompt = f"Extract the exam from this image and structure it as a {difficulty} difficulty exam in the specified JSON format."

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",  # Use appropriate model for image understanding
            contents=[my_file, prompt],
            config={
                "temperature": 0.1,  # Low for accuracy
                "system_instruction": system_instruction,
                "response_mime_type": "application/json",
                "response_schema": Exam,
            }
        )
        structured_exam = response.parsed
        final_data = structured_exam.model_dump()
        print("-" * 50)
        print("\nStructured Exam:\n", json.dumps(final_data, indent=2))
        print("-" * 50)

        # Validate required fields
        required_fields = ["_id", "examName", "examType", "totalQuestions", "createdAt", "questions"]
        for field in required_fields:
            if field not in final_data:
                raise ValueError(f"Missing required field: {field}")

        return final_data

    except (json.JSONDecodeError, ValidationError, Exception) as e:
        print("----------- ERROR -----------")
        print(e)
        print("-----------------------------")
        # Return a sample exam as fallback
        return {
            "_id": "exam_fallback",
            "examName": "Fallback Exam",
            "examType": "General",
            "totalQuestions": 1,
            "createdAt": datetime.now().isoformat() + "Z",
            "questions": [
                {
                    "questionId": 1,
                    "question": "Sample question",
                    "options": {"A": "A", "B": "B", "C": "C", "D": "D"},
                    "answer": "A"
                }
            ]
        }

# Example usage
if __name__ == "__main__":
    image_path = "/Users/akash/Desktop/CorrectionsApp/correctQ/backend/src/data/exam.png"
    exam = generate_exam_from_image(image_path, "easy")
    
    # Save to JSON file
    output_file = "/Users/akash/Desktop/CorrectionsApp/correctQ/backend/src/test/generated_exam.json"
    with open(output_file, "w") as f:
        json.dump(exam, f, indent=2)
    
    print(f"Exam saved to {output_file}")
    print(json.dumps(exam, indent=2))

