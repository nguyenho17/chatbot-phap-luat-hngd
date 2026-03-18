import os
from dotenv import load_dotenv
from google import genai
from google.genai.errors import ClientError
from pathlib import Path

# ===== LOAD ENV =====
BASE_DIR = Path(__file__).resolve().parents[2]   # backend/
ENV_PATH = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_PATH)

API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    raise RuntimeError("❌ GOOGLE_API_KEY chưa được thiết lập")

client = genai.Client(api_key=API_KEY)


def ask_gemini(question: str, laws: list) -> str:
    """
    laws: list các dict luật đã retrieve
    """

    if not laws:
        return "Không tìm thấy căn cứ pháp lý trong dữ liệu hiện có."

    try:
        # ===== BUILD CONTEXT (AN TOÀN) =====
        context_blocks = []
        for law in laws:
            context_blocks.append(
                f"""Luật: {law.get('law_name', 'Luật HNGĐ 2014')}
Điều: {law.get('article', '')}
Tiêu đề: {law.get('title', '')}
Nội dung: {law.get('content', '')}
"""
            )

        context = "\n---\n".join(context_blocks)

        prompt = f"""
Bạn là trợ lý pháp luật Việt Nam chuyên về Luật Hôn nhân và Gia đình.

❗ NGUYÊN TẮC BẮT BUỘC:
- CHỈ sử dụng thông tin trong DỮ LIỆU PHÁP LUẬT bên dưới
- TUYỆT ĐỐI KHÔNG bổ sung kiến thức bên ngoài
- Nếu dữ liệu chưa đủ chi tiết → phải nói rõ

=== DỮ LIỆU PHÁP LUẬT ===
{context}

=== CÂU HỎI ===
{question}

=== YÊU CẦU TRẢ LỜI ===
- Trả lời chi tiết từng ý
- Diễn giải rõ nội dung điều luật
- MỖI Ý PHẢI TRÍCH DẪN ĐIỀU LUẬT (ví dụ: Điều 56 Luật HNGĐ 2014)
- Trình bày dạng gạch đầu dòng

=== TRẢ LỜI ===
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text.strip()

    except ClientError as e:
        error_message = str(e)

        # ===== KIỂM TRA HẾT QUOTA =====
        if "429" in error_message or "quota" in error_message.lower():
            return "⚠️ Hệ thống đang quá tải (đã đạt giới hạn API miễn phí). Vui lòng thử lại sau."

        print("Gemini ClientError:", e)
        return "❌ Lỗi kết nối tới hệ thống AI."

    except Exception as e:
        print("Gemini error:", e)
        return "❌ Hệ thống AI gặp sự cố tạm thời."