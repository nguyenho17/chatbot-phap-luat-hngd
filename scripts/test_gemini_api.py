import os
from dotenv import load_dotenv
from google import genai

# Load env
load_dotenv()

# Create client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Gọi model
response = client.models.generate_content(
    model="models/gemini-2.5-flash",
    contents="Xin chào, bạn là ai?"
)

print(response.text)
