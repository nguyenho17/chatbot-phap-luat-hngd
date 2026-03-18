from app.config import get_connection

# --- GIỮ NGUYÊN CODE CŨ CỦA BẠN ---
def get_all_users():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT HoTen, Email
        FROM NguoiDung
    """)
    users = []
    for row in cursor.fetchall():
        users.append({
            "name": row[0],
            "email": row[1]
        })
    conn.close()
    return users

# --- THÊM MỚI: HÀM LƯU LỊCH SỬ CHO ADMIN & USER ---
def save_chat_to_db(user_id: int, question: str, answer: str, session_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    try:

        cursor.execute("""
            INSERT INTO LichSuChat (MaNguoiDung, CauHoi, TraLoi, ThoiGian, SessionId)
            OUTPUT INSERTED.MaChat
            VALUES (?, ?, ?, GETDATE(), ?)
        """, (user_id, question, answer, session_id))

        chat_id = cursor.fetchone()[0]

        conn.commit()

        return chat_id

    except Exception as e:
        print(f"Lỗi SQL: {e}")
        conn.rollback()
        return None

    finally:
        conn.close()

def get_history_from_db(user_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    # Thêm ISNULL để tránh giá trị NULL gây lỗi cho Frontend
    # Sửa trong user_service.py
    cursor.execute("""
        SELECT SessionId, MaChat, CauHoi, TraLoi, 
        ISNULL(TieuDe,'') as TieuDe,
        ISNULL(Pinned,0) as Pinned,
        CONVERT(VARCHAR, ThoiGian, 120) as ThoiGian
        FROM LichSuChat 
        WHERE MaNguoiDung = ? 
        ORDER BY ThoiGian DESC
    """, (user_id,))
    
    rows = cursor.fetchall()
    history = []
    for row in rows:
        history.append({
            "SessionId": row[0],
            "MaChat": row[1],
            "CauHoi": row[2],
            "TraLoi": row[3],
            "ThoiGian": row[4]
        })
    conn.close()
    return history
