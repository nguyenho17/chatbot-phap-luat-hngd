import os
from dotenv import load_dotenv
import pyodbc

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

MODEL_NAME = "models/gemini-2.5-flash"

def get_connection():
    conn = pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=NGUYEN_HO\\SQLEXPRESS;"
        "DATABASE=ChatbotLuatHonNhan;"
        "UID=sa;"
        "PWD=123123"
    )
    return conn