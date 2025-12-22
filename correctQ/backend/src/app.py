# cors, middleware and router combining is done here.
from fastapi import FastAPI


app = FastAPI()



@app.get("/")
async def root():
    return {"message": "Hello World !!"}
