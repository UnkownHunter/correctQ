
import sys
import os
import asyncio

# Add the backend/src directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.connections.nosql import exam_collection as collections
async def pull_exam_by_id(exam_id):
    exam = await collections.find_one({"_id": exam_id})
    return (exam) 



if __name__ == "__main__" :
    # print(pull_exam_by_id("exam_001"))

    asyncio.run(pull_exam_by_id("exam_001"))

    