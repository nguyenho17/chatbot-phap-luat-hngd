const messages = document.getElementById("messages");
const questionInput = document.getElementById("question");
const sendBtn = document.getElementById("send");
const historyBox = document.getElementById("history");

// 1. Khởi tạo dữ liệu: SỬA LỖI LỌC để không bị undefined
let chatHistory = (JSON.parse(localStorage.getItem("chatHistory")) || [])
    .filter(s => s && (s.question || s.title || (s.messages && s.messages.length > 0))); 
 
let currentSessionId = null;

// Bộ câu hỏi gợi ý thông minh (GIỮ NGUYÊN)
const suggestionMap = {
    "kết hôn": ["Điều kiện kết hôn là gì?", "Thủ tục đăng ký kết hôn", "Kết hôn với người nước ngoài"],
    "ly hôn": ["Thủ tục ly hôn đơn phương", "Chia tài sản khi ly hôn", "Quyền nuôi con sau ly hôn"],
    "tài sản": ["Chia tài sản chung vợ chồng", "Tài sản riêng trước kết hôn"],
    "con cái": ["Mức cấp dưỡng cho con", "Quyền thăm nom con sau ly hôn"]
};

/**
 * 2. Định dạng văn bản AI (GIỮ NGUYÊN)
 */
function formatAIResponse(text) {
    if (!text) return "";
    return text
        .replace(/\*\*(.*?)\*\*/g, '<b style="color: var(--accent-glow);">$1</b>')
        .replace(/^\* (.*$)/gim, '<div style="margin-left: 20px; margin-bottom: 5px;">• $1</div>')
        .replace(/\n/g, '<br>');
}

/**
 * 3. Hiển thị gợi ý thông minh (GIỮ NGUYÊN)
 */
function displaySuggestions(botResponse) {
    const oldSuggestions = document.querySelector('.suggestions-container');
    if (oldSuggestions) oldSuggestions.remove();

    const container = document.createElement('div');
    container.className = 'suggestions-container';
    
    let suggestions = ["Tư vấn thủ tục ly hôn", "Quyền nuôi con", "Phân chia tài sản"]; 
    
    for (let key in suggestionMap) {
        if (botResponse.toLowerCase().includes(key)) {
            suggestions = suggestionMap[key];
            break;
        }
    }

    suggestions.forEach(text => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.innerText = text;
        btn.onclick = () => {
            questionInput.value = text;
            sendBtn.click();
        };
        container.appendChild(btn);
    });

    messages.appendChild(container);
    messages.scrollTop = messages.scrollHeight;
}

/**
 * 4. Hiển thị tin nhắn (GIỮ NGUYÊN)
 */
function addMessage(text, sender, isNew = false) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    messages.appendChild(div);
    
    const formattedText = formatAIResponse(text);
    div.innerHTML = formattedText;
    messages.scrollTop = messages.scrollHeight;
}

/**
 * 5. Quản lý Lịch sử Chat (SỬA LỖI HIỂN THỊ UNDEFINED)
 */
// Tìm và thay thế đoạn này ở đầu file app.js


// Thay thế hàm renderHistory để sửa lỗi hiển thị sidebar
function renderHistory() {
    historyBox.innerHTML = "";
    chatHistory.forEach((session, index) => {
        const div = document.createElement("div");
        
        // Lấy tiêu đề: Ưu tiên title -> câu hỏi đầu tiên -> mặc định
        let displayTitle = "Cuộc hội thoại mới";
        if (session.title) {
            displayTitle = session.title;
        } else if (session.messages && session.messages.length > 0) {
            displayTitle = session.messages[0].question;
        } else if (session.question) {
            displayTitle = session.question;
        }
        
        div.innerHTML = `<i class="far fa-comment-dots"></i> ${displayTitle.substring(0, 25)}...`;
        div.onclick = () => loadSession(index);
        
        if (session.id === currentSessionId) {
            div.style.borderColor = "var(--accent-glow)";
            div.style.background = "rgba(0, 210, 255, 0.1)";
        }
        historyBox.appendChild(div);
    });
}

function loadSession(index) {
    const session = chatHistory[index];
    if (!session) return;
    
    currentSessionId = session.id || index;
    messages.innerHTML = "";
    
    if (session.messages && session.messages.length > 0) {
        session.messages.forEach(m => {
            addMessage(m.question, "user");
            addMessage(m.answer, "bot");
        });
    } else {
        addMessage(session.question, "user");
        addMessage(session.answer, "bot");
    }
    renderHistory();
}

/**
 * 6. Xử lý Gửi tin nhắn (SỬA LỖI LƯU TRỮ ĐỒNG BỘ)
 */
sendBtn.onclick = async () => {
    let question = questionInput.value.trim();

    // 🔥 LÀM SẠCH CHUỖI TRƯỚC KHI GỬI JSON (BẮT BUỘC)
    question = question
        .replace(/\n/g, " ")
        .replace(/\r/g, " ")
        .replace(/\t/g, " ")
        .replace(/\s+/g, " ");

    if (!question) return;

    const oldSuggestions = document.querySelector('.suggestions-container');
    if (oldSuggestions) oldSuggestions.remove();

    if (!currentSessionId) {
        currentSessionId = Date.now();
        chatHistory.unshift({
            id: currentSessionId,
            title: question,
            messages: []
        });
    }

    addMessage(question, "user");
    questionInput.value = "";
    questionInput.style.height = "auto";

    const loading = document.createElement("div");
    loading.className = "message bot";
    loading.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Đang phân tích...`;
    messages.appendChild(loading);

    try {
        const res = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({question})
        });
        
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || "Lỗi máy chủ");
        }

        const data = await res.json();
        loading.remove();
        addMessage(data.answer, "bot", true);
        displaySuggestions(data.answer);

        const sessionIndex = chatHistory.findIndex(s => s.id === currentSessionId);
        if (sessionIndex !== -1) {
            if (!chatHistory[sessionIndex].messages) chatHistory[sessionIndex].messages = [];
            chatHistory[sessionIndex].messages.push({ question, answer: data.answer });
            localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        }
        
        renderHistory();
    } catch (err) {
    loading.innerHTML = "❌ " + err.message;
    }
};

/**
 * 7. Tiện ích (GIỮ NGUYÊN)
 */
document.getElementById("newChat").onclick = () => {
    currentSessionId = null;
    messages.innerHTML = `<div class="message bot"><i class="fas fa-magic"></i> Sẵn sàng hỗ trợ pháp luật. Mời bạn đặt câu hỏi.</div>`;
    renderHistory();
};

questionInput.onkeypress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
    }
};

questionInput.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
});

renderHistory();