from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.retrieval_service import retrieve_laws_semantic
from app.services.gemini_service import ask_gemini
# Import thêm hàm lưu
from app.services.user_service import save_chat_to_db, get_history_from_db
from app.config import get_connection
router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    question: str
    user_id: int # Thêm user_id vào request
    session_id: int
class RatingRequest(BaseModel):
    user_id: int
    score: int
@router.post("/")
def chat(req: ChatRequest):
    try:
        laws = retrieve_laws_semantic(req.question)

        if not laws:
            answer = "Không tìm thấy căn cứ pháp lý phù hợp trong dữ liệu hiện có."
            # Lưu vào DB để Admin thấy cả những câu hỏi không có kết quả
            save_chat_to_db(req.user_id, req.question, answer)
            return {"answer": answer, "sources": []}

        answer = ask_gemini(req.question, laws)

        # GỌI HÀM LƯU: Dữ liệu sẽ hiện bên Admin và Sidebar User
        chat_id = save_chat_to_db(req.user_id, req.question, answer, req.session_id)
        return {
            "answer": answer,
            "sources": laws,
            "chat_id": chat_id
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# Thêm endpoint này để app.js tải lại lịch sử
@router.get("/history/{user_id}")
def get_chat_history(user_id: int):
    return get_history_from_db(user_id)
# app/api/chat.py

# app/api/chat.py

class RateRequest(BaseModel):
    user_id: int
    score: int

@router.post("/rate")
def rate_chat(data: RateRequest):
    conn = get_connection()
    cursor = conn.cursor()

    accuracy_percent = data.score * 20

    cursor.execute("""
        INSERT INTO DanhGiaChatbot
        (MaNguoiDung, DiemDanhGia, DoChinhXac, ThoiGian)
        VALUES (?, ?, ?, GETDATE())
    """, (data.user_id, data.score, accuracy_percent))

    conn.commit()
    conn.close()

    return {"message": "Đã lưu đánh giá"}
@router.put("/rename")
def rename_chat(data: dict):
    conn = get_connection()
    cursor = conn.cursor()

    chat_id = data.get("chat_id")
    title = data.get("title")

    cursor.execute("""
        UPDATE LichSuChat
        SET TieuDe = ?
        WHERE MaChat = ?
    """,(title,chat_id))

    conn.commit()
    conn.close()

    return {"message":"Renamed"}
@router.delete("/delete/{chat_id}")
def delete_chat(chat_id:int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        DELETE FROM LichSuChat
        WHERE MaChat = ?
    """,(chat_id,))

    conn.commit()
    conn.close()

    return {"message":"Deleted"}
@router.put("/pin")
def pin_chat(data:dict):

    chat_id = data.get("chat_id")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE LichSuChat
        SET Pinned = 1
        WHERE MaChat = ?
    """,(chat_id,))

    conn.commit()
    conn.close()

    return {"message":"Pinned"}