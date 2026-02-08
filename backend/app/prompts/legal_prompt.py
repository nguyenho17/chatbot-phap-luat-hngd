def build_prompt(question: str, laws: list) -> str:
    law_text = "\n\n".join(
        f"Điều {l['article']}: {l['title']}\n{l['content']}"
        for l in laws
    )

    return f"""
Bạn là trợ lý pháp luật Việt Nam.
Chỉ trả lời dựa trên Luật Hôn nhân và Gia đình 2014.
Nếu không có căn cứ, hãy nói rõ là không tìm thấy trong luật.

CÂU HỎI:
{question}

CĂN CỨ PHÁP LUẬT:
{law_text}

TRẢ LỜI:
"""
