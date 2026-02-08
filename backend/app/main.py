from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.retrieval_service import retrieve_laws_semantic
from app.services.gemini_service import ask_gemini

app = FastAPI(title="Chatbot AI Luật HNGĐ")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str

@app.post("/chat/chat")
def chat(req: ChatRequest):
    laws = retrieve_laws_semantic(req.question)
    law_text = "\n\n".join([l["content"] for l in laws])
    answer = ask_gemini(req.question, law_text)
    return {"answer": answer}
