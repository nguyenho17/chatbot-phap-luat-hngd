from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.retrieval_service import retrieve_laws_semantic
from app.services.gemini_service import ask_gemini
# Import thêm hàm lưu
from typing import Optional # T
from app.services.user_service import save_chat_to_db, get_history_from_db
from app.config import get_connection
router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    question: str
    user_id: Optional[int] = None    # Cho phép để trống
    session_id: Optional[int] = None # Cho phép để trống
class RatingRequest(BaseModel):
    user_id: int
    score: int
from typing import Optional # Quan trọng: Phải import cái này
from pydantic import BaseModel

# Cập nhật Class để chấp nhận giá trị None
class ChatRequest(BaseModel):
    question: str
    user_id: Optional[int] = None    # Có thể để trống
    session_id: Optional[int] = None # Có thể để trống

@router.post("/")
def chat(req: ChatRequest):
    try:
        # 1. Tìm kiếm luật
        laws = retrieve_laws_semantic(req.question)

        # 2. Xử lý khi không thấy luật
        if not laws:
            answer = "Không tìm thấy căn cứ pháp lý phù hợp trong dữ liệu hiện có."
            
            # CHỈ LƯU VÀO DB NẾU LÀ THÀNH VIÊN (CÓ ID)
            if req.user_id:
                save_chat_to_db(req.user_id, req.question, answer)
                
            return {"answer": answer, "sources": []}

        # 3. Hỏi Gemini
        answer = ask_gemini(req.question, laws)

        # 4. Lưu lịch sử
        chat_id = None
        if req.user_id:
            # Chỉ gọi hàm lưu khi user_id khác None (đã đăng nhập)
            chat_id = save_chat_to_db(req.user_id, req.question, answer, req.session_id)
        
        return {
            "answer": answer,
            "sources": [l['content'] for l in laws] if laws else [],
            "chat_id": chat_id # Sẽ trả về null nếu là khách
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