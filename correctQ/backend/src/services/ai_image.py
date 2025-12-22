import json
from typing import Dict, Any, List
from dotenv import load_dotenv
from pydantic import BaseModel, ValidationError, Field
from datetime import datetime
from google import genai
from google.genai import types

# Load environment variables
load_dotenv()

if not GENAI_API_KEY:
    raise ValueError("GENAI_API_KEY is not set in the environment.")

# Initialize Gemini client
client = genai.Client()


my_file = client.files.upload(file="path/to/sample.jpg")

# Define response schema using Pydantic

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



response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[my_file, "Caption this image."],
)





# Challenge generator function
def generate_challenge_with_ai(difficulty: str)-> Dict[str, Any]:
    system_instruction = f"""You are an expert coding challenge creator.
Your task is to generate a coding question with multiple choice answers.
The question should be appropriate for the specified difficulty level: {difficulty}.

For easy questions: Focus on basic syntax, simple operations, or common programming concepts.
For medium questions: Cover intermediate concepts like data structures, algorithms, or language features.
For hard questions: Include advanced topics, design patterns, optimization techniques, or complex algorithms.

Return the challenge in the following JSON structure:
{{
    "title": "The question title",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correct_answer_id": 0,
    "explanation": "Detailed explanation of why the correct answer is right"
}}

Make sure the options are plausible but with only one clearly correct answer.
"""

    try:
        # Generate content from Gemini
            response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"Generate a {difficulty} difficulty coding challenge.",
            config={
                "temperature": 0.7,
                "system_instruction": system_instruction,
                "response_mime_type": "application/json",
                "response_schema": ChallengeSchema,
            }
        )
            structured_challenge= response.parsed
            final_data =structured_challenge.model_dump()
            print("-"*50)
            print("\nStructured Object:\n", final_data)
            print("-"*50)


            required_fields = ["title", "options", "correct_answer_id", "explanation"]
            for field in required_fields:
                if field not in final_data:
                    raise ValueError(f"Missing required field: {field}")

            return final_data

    except (json.JSONDecodeError, ValidationError, Exception) as e:
        print("----------- ERROR -----------")
        print(e)
        print("-----------------------------")
        return {
            "title": "Basic Python List Operation",
            "options": [
                "my_list.append(5)",
                "my_list.add(5)",
                "my_list.push(5)",
                "my_list.insert(5)",
            ],
            "correct_answer_id": 0,
            "explanation": "In Python, append() is the correct method to add an element to the end of a list."
        }

# Example usage
if __name__ == "__main__":
    challenge = generate_challenge_with_ai("easy")
    print(json.dumps(challenge, indent=2))
