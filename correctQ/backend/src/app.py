# cors, middleware and router combining is done here.

from fastapi import FastAPI, File, UploadFile, HTTPException
from google.genai import types
from typing import Annotated
from fastapi.responses import HTMLResponse
from src.services.ai_server import generator

from src.crud.exams import pull_exam_by_id




app = FastAPI()
@app.get("/")
async def main():
    content = """
<body>
<form action="/uploadfiles/" enctype="multipart/form-data" method="post">
<input name="file" type="file">
<input type="submit">
</form>
</body>
    """
    return HTMLResponse(content=content)


@app.get("/check")
async def check():
    return {"connection":"successfully"}


@app.get("/exam/{exam_id}")
async def examQuestionsandAnswers(exam_id):
    exam = await pull_exam_by_id(exam_id)
    print(exam)
    return exam

@app.post("/uploadfiles/")
async def generate(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No files provided")
    try:
        # Assuming generator is updated to handle files
        response = generator(file)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing files: {str(e)}")



