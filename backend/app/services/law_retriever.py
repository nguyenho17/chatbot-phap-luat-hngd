import os
import json

BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../../")
)

LAW_DIR = os.path.join(
    BASE_DIR,
    "data",
    "processed",
    "laws",
    "luat_hngd_2014"
)

def load_all_laws():
    if not os.path.exists(LAW_DIR):
        raise FileNotFoundError(f"❌ Không tìm thấy thư mục luật: {LAW_DIR}")

    laws = []

    for file in os.listdir(LAW_DIR):
        if not file.endswith(".json"):
            continue

        path = os.path.join(LAW_DIR, file)
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)

        for art in data.get("articles", []):
            laws.append({
                "source": file,
                "law_name": data.get("law_name"),
                "group": data.get("group"),
                "article": art.get("article"),
                "title": art.get("title"),
                "content": art.get("content"),
                # 🔑 TEXT DÙNG CHO EMBEDDING / SEMANTIC SEARCH
                "text": (
                    f"Luật: {data.get('law_name')}\n"
                    f"Nhóm: {data.get('group')}\n"
                    f"Điều: {art.get('article')}\n"
                    f"Tiêu đề: {art.get('title')}\n"
                    f"Nội dung: {art.get('content')}"
                )
            })

    return laws
