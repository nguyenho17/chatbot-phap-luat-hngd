from google.genai.errors import ClientError
from google import genai
from google.genai.errors import ClientError
import os

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

def ask_gemini(question: str, laws: str):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"""
Bạn là trợ lý pháp luật Việt Nam.
Dựa trên quy định pháp luật sau:
{laws}

Câu hỏi:
{question}

Trả lời rõ ràng, dễ hiểu, có điều luật nếu có.
"""
        )
        return response.text

    except ClientError as e:
        if e.status_code == 429:
            return (
                "⚠️ Hệ thống đang quá tải do giới hạn API miễn phí.\n\n"
                "Vui lòng thử lại sau khoảng 30 giây hoặc liên hệ quản trị viên."
            )
        return "❌ Lỗi kết nối AI. Vui lòng thử lại."

    except Exception as e:
        return "❌ Hệ thống tạm thời gặp sự cố."
