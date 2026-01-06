from google import genai
from google.genai import types
from src.models.exam_model import ExamsData
from src.services.prompt import system_instruction
from dotenv import load_dotenv
load_dotenv()



def generator(file):
    if not file:
        raise ValueError("No files provided")
    client = genai.Client(api_key="KEY_API")

    data = file.file.read()
    mime_type = file.content_type or 'application/pdf'

    response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[
        types.Part.from_bytes(
            data=data,
            mime_type=mime_type,
        )],
    config={
        "temperature": 0.7,
        "system_instruction": system_instruction,
        "response_mime_type": "application/json",
        "response_schema": ExamsData,
    })


    structured_challenge= response.parsed
    final_data =structured_challenge.model_dump()
    
    return(final_data)
