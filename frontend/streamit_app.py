import streamlit as st
import streamlit.components.v1 as components
import os

# Thiết lập trang
st.set_page_config(page_title="Galaxy AI Law", layout="wide")

# Lấy đường dẫn thư mục hiện tại của file streamlit_app.py
current_dir = os.path.dirname(os.path.abspath(__file__))
html_file_path = os.path.join(current_dir, "index.html")

st.title("🌌 Galaxy AI Law System")

# Kiểm tra sự tồn tại của file trước khi đọc
if os.path.exists(html_file_path):
    with open(html_file_path, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    # Hiển thị giao diện HTML
    # Tăng height lên để không bị đen khoảng dưới
    components.html(html_content, height=1000, scrolling=True)
else:
    st.error(f"❌ Không tìm thấy file index.html!")
    st.write(f"Đường dẫn đang tìm: `{html_file_path}`")
    st.write("Danh sách file hiện có trong thư mục gốc:")
    st.write(os.listdir(current_dir))