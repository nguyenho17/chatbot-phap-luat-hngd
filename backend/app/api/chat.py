from fastapi import APIRouter
from pydantic import BaseModel

# Sửa từ 'retrieve_relevant_laws' thành 'retrieve_laws_semantic'
from app.services.retrieval_service import retrieve_laws_semantic
from app.services.gemini_service import ask_gemini

router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    question: str


from fastapi import HTTPException

@router.post("/chat")
def chat(req: ChatRequest):
    try:
        laws = retrieve_laws_semantic(req.question)
        answer = ask_gemini(req.question, laws)
        return {"answer": answer}
    except Exception as e:
        print("Chat error:", e)
        raise HTTPException(
            status_code=503,
            detail="Hệ thống AI đang quá tải, vui lòng thử lại sau."
        )
