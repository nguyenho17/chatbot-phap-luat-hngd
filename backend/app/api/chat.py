from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.retrieval_service import retrieve_laws_semantic
from app.services.gemini_service import ask_gemini

router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    question: str


@router.post("/")
def chat(req: ChatRequest):
    try:
        # 1. Retrieve luật
        laws = retrieve_laws_semantic(req.question)

        if not laws:
            return {
                "answer": "Không tìm thấy căn cứ pháp lý phù hợp trong dữ liệu hiện có.",
                "sources": []
            }

        # 2. Gọi Gemini (RAG)
        answer = ask_gemini(req.question, laws)

        # 3. Trả kết quả
        return {
            "answer": answer,
            "sources": [
                {
                    "law_name": law.get("law_name"),
                    "article": law.get("article"),
                    "title": law.get("title"),
                    "content": law.get("content")
                }
                for law in laws
            ]
        }

    except Exception as e:
        print("Chat error:", e)
        raise HTTPException(
            status_code=500,
            detail="Lỗi xử lý hệ thống."
        )
