import os
import json
import faiss
import numpy as np
from tqdm import tqdm
from dotenv import load_dotenv
from openai import OpenAI

# Load API key
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# === PATH CHÍNH XÁC THEO DỰ ÁN CỦA BẠN ===
DATA_DIR = "data/processed/laws/luat_hngd_2014"
VECTOR_DIR = "vector_db/faiss"
os.makedirs(VECTOR_DIR, exist_ok=True)

documents = []
metadata = []

def chunk_articles(json_path):
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    chunks = []

    # Trường hợp FILE GOM (có articles[])
    if "articles" in data:
        for article in data["articles"]:
            text = f"{article['article']} - {article['title']}: {article['content']}"
            chunks.append({
                "text": text,
                "meta": {
                    "law": data.get("law_name"),
                    "group": data.get("group"),
                    "article": article.get("article")
                }
            })

    # Trường hợp FILE 1 ĐIỀU (cũ)
    else:
        text = f"{data.get('article')} - {data.get('title')}: {data.get('content')}"
        chunks.append({
            "text": text,
            "meta": {
                "law": data.get("law_name"),
                "article": data.get("article")
            }
        })

    return chunks

# === LOAD & CHUNK TOÀN BỘ FILE JSON ===
for file in os.listdir(DATA_DIR):
    if file.endswith(".json"):
        path = os.path.join(DATA_DIR, file)
        chunks = chunk_articles(path)
        for c in chunks:
            documents.append(c["text"])
            metadata.append(c["meta"])

print(f"📄 Total chunks loaded: {len(documents)}")

# === CREATE EMBEDDINGS ===
embeddings = []
for doc in tqdm(documents, desc="Embedding documents"):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=doc
    )
    embeddings.append(response.data[0].embedding)

embeddings = np.array(embeddings).astype("float32")

# === SAVE FAISS INDEX ===
index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)
faiss.write_index(index, os.path.join(VECTOR_DIR, "laws.index"))

# === SAVE METADATA ===
with open(os.path.join(VECTOR_DIR, "metadata.json"), "w", encoding="utf-8") as f:
    json.dump(metadata, f, ensure_ascii=False, indent=2)

print("✅ Embedding & FAISS index created successfully!")
