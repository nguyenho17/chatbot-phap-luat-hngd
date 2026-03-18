from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.config import get_connection

router = APIRouter(prefix="/auth", tags=["Auth"])

class LoginRequest(BaseModel):
    username: str
    password: str

class RegisterRequest(BaseModel):
    fullname: str
    email: str
    username: str
    password: str

# ===============================
# Đăng nhập hệ thống
# ===============================
@router.post("/login")
def login(req: LoginRequest):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT 
                tk.MaTaiKhoan,
                nd.MaNguoiDung,
                nd.HoTen,
                vt.TenVaiTro,
                tk.TrangThai
            FROM TaiKhoan tk
            JOIN NguoiDung nd ON tk.MaNguoiDung = nd.MaNguoiDung
            JOIN VaiTro vt ON tk.MaVaiTro = vt.MaVaiTro
            WHERE tk.TenDangNhap = ? AND tk.MatKhau = ?
        """, req.username, req.password)

        row = cursor.fetchone()

        if not row:
            raise HTTPException(status_code=401, detail="Sai tài khoản hoặc mật khẩu")

        # 🔒 Kiểm tra tài khoản bị khóa
        if row[4] == "Đã khóa":
            raise HTTPException(
                status_code=403,
                detail="Tài khoản đã bị khóa"
            )

        return {
            "user_id": row[1],
            "name": row[2],
            "role": row[3]
        }

    finally:
        cursor.close()
        conn.close()

# ===============================
# Đăng ký tài khoản
# ===============================
@router.post("/register")
def register(req: RegisterRequest):
    conn = get_connection()
    cursor = conn.cursor()
    
    try:
        # 1. Thêm vào bảng NguoiDung (OUTPUT INSERTED dùng cho SQL Server)
        cursor.execute("""
            INSERT INTO NguoiDung (HoTen, Email)
            OUTPUT INSERTED.MaNguoiDung
            VALUES (?, ?)
        """, req.fullname, req.email)
        
        user_id = cursor.fetchone()[0]

        # 2. Thêm vào bảng TaiKhoan (Mặc định vai trò USER là 2)
        cursor.execute("""
            INSERT INTO TaiKhoan (TenDangNhap, MatKhau, MaNguoiDung, MaVaiTro)
            VALUES (?, ?, ?, 2)
        """, req.username, req.password, user_id)

        conn.commit()
        return {"message": "Đăng ký thành công!"}
    except Exception as e:
        conn.rollback()
        # Lỗi thường xảy ra do Unique Constraint của Email hoặc TenDangNhap
        raise HTTPException(status_code=400, detail="Tên đăng nhập hoặc Email đã tồn tại!")
    finally:
        cursor.close()
        conn.close()