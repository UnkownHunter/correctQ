# cors, middleware and router combining is done here.

from fastapi import FastAPI, File, UploadFile, HTTPException

from typing import Annotated
from fastapi.responses import HTMLResponse
from src.services.ai_server import generator



app = FastAPI()
@app.get("/")
async def main():
    content = """
<body>
<form action="/uploadfiles/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
</body>
    """
    return HTMLResponse(content=content)


@app.get("/check")
async def check():
    return {"connection":"successfully"}


@app.post("/uploadfiles/")
async def generate(file: UploadFile):
    if not file:
        raise HTTPException(status_code=400, detail="No files provided")
    try:
        # Assuming generator is updated to handle files
        response = generator(file)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing files: {str(e)}")



