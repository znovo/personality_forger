from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from core.generator import Generator


app = FastAPI(
    title="Personality Forge API",
    description="API for generating and managing AI personalities.",
    version="0.1.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
generator = Generator()


class GenerateRequest(BaseModel):
    prompt: str = Field(min_length=1)
    name: str = "default"


class GenerateResponse(BaseModel):
    name: str
    personality: str
    saved: bool


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/generate", response_model=GenerateResponse)
def generate(request: GenerateRequest):
    try:
        personality = generator.generate(
            user=request.prompt,
            personality_name=request.name
        )
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    return {
        "name": request.name,
        "personality": personality,
        "saved": True
    }

@app.get("/personalities")
def list_personalities():
    return {
        "personalities": generator.prompt_manager.list_personalities()
    }
@app.get("/personalities/{name}")
def get_personality(name: str):
    try:
        personality = generator.prompt_manager.load_personality(name)
    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="Personality not found"
        )

    return {
        "name": name,
        "personality": personality
    }
@app.delete("/personalities/{name}")
def delete_personality(name: str):
    try:
        generator.prompt_manager.delete_personality(name)
    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="Personality not found"
        )

    return {
        "name": name,
        "deleted": True
    }