import os
import json

# backend/app/services/law_retriever.py
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
        if file.endswith(".json"):
            with open(
                os.path.join(LAW_DIR, file),
                "r",
                encoding="utf-8"
            ) as f:
                data = json.load(f)
                laws.append({
                    "source": file,
                    "content": json.dumps(data, ensure_ascii=False)
                })

    return laws
