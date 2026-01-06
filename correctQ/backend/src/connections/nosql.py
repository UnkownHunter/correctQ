import asyncio
from pymongo import AsyncMongoClient, ReturnDocument


client = AsyncMongoClient("mongodb://localhost:27017")
db = client.get_database("exams")
exam_collection = db.get_collection("exams")

