import json
from typing import Dict, Any, List
from dotenv import load_dotenv
from pydantic import BaseModel, ValidationError, Field
from datetime import datetime
from google import genai
from google.genai import types




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
    explanation : str


class Exam(BaseModel):
    _id: str
    examName: str
    examType: str
    totalQuestions: int
    createdAt: datetime
    questions: List[Question]


class ExamsData(BaseModel):
    exams: List[Exam]
