import streamlit as st
import sys
import os

with open("frontend/index.html", "r", encoding="utf-8") as f:
    html = f.read()

st.components.v1.html(html, height=800)
# Fix import backend
sys.path.append(os.path.abspath("backend"))

st.set_page_config(page_title="Chatbot Luật HNGĐ")

st.title("🤖 Chatbot Luật Hôn Nhân & Gia Đình")

# Lưu lịch sử chat
if "messages" not in st.session_state:
    st.session_state.messages = []

# Hiển thị chat
for msg in st.session_state.messages:
    st.chat_message(msg["role"]).write(msg["content"])

# Input
if prompt := st.chat_input("Nhập câu hỏi..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    st.chat_message("user").write(prompt)

    # 👉 TEST trước
    reply = f"Bạn hỏi: {prompt}"

    st.session_state.messages.append({"role": "assistant", "content": reply})
    st.chat_message("assistant").write(reply)