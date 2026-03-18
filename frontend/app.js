const messages = document.getElementById("messages");
const questionInput = document.getElementById("question");
const sendBtn = document.getElementById("send");
const historyBox = document.getElementById("history");
let questionCount = 0; // đếm số câu hỏi user
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
// Cập nhật hàm addRating trong app.js
function addRating() {
    const ratingBox = document.createElement("div");
    ratingBox.className = "rating-box";
    ratingBox.style.cssText = "margin-top: 8px; padding: 5px; border-top: 1px solid rgba(255,255,255,0.1);";

    const label = document.createElement("small");
    label.innerText = "Đánh giá độ chính xác câu trả lời: ";
    label.style.color = "#888";
    ratingBox.appendChild(label);

    const starContainer = document.createElement("span");

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("i");
        star.className = "far fa-star";
        star.style.cssText = "cursor:pointer; color:#ccc; margin-right:6px; transition: 0.3s;";

        star.onclick = async () => {

            const userId = localStorage.getItem("user_id");
            if (!userId) return alert("Vui lòng đăng nhập để đánh giá");

            try {

                const response = await fetch("http://127.0.0.1:8000/chat/rate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user_id: parseInt(userId),
                        score: i   // ⭐ sửa lỗi ở đây
                    })
                });

                if (response.ok) {

                    const allStars = starContainer.querySelectorAll("i");

                    allStars.forEach((s, index) => {
                        if (index < i) {
                            s.className = "fas fa-star";
                            s.style.color = "#FFD700";
                        } else {
                            s.className = "far fa-star";
                            s.style.color = "#ccc";
                        }
                    });

                    label.innerText = "Cảm ơn bạn đã đánh giá!";
                    starContainer.style.pointerEvents = "none";
                }

            } catch (err) {
                console.error("Lỗi đánh giá:", err);
            }
        };

        starContainer.appendChild(star);
    }

    ratingBox.appendChild(starContainer);
    messages.appendChild(ratingBox);
    messages.scrollTop = messages.scrollHeight;
}
/**
 * 5. Quản lý Lịch sử Chat (CẬP NHẬT ĐỂ HIỂN THỊ ĐÚNG)
 */
function renderHistory() {

    if (!historyBox) return;

    historyBox.innerHTML = "";

    chatHistory.forEach((session, index) => {

        if (!session) return;

        const div = document.createElement("div");
        div.className = "history-item";

        let displayTitle =
            session.title ||
            (session.messages && session.messages[0]
                ? session.messages[0].question
                : "Hội thoại mới");

        div.innerHTML = `
        <span class="history-title">
            <i class="far fa-comment-dots"></i>
            ${displayTitle.substring(0,25)}...
        </span>

        <span class="history-menu-btn">
            <i class="fas fa-ellipsis-h"></i>
        </span>

        <div class="history-menu">
            <div onclick="pinChat(${index})"><i class="fas fa-thumbtack"></i> Ghim</div>
            <div onclick="renameChat(${index})"><i class="fas fa-edit"></i> Đổi tên</div>
            <div onclick="deleteChat(${index})"><i class="fas fa-trash"></i> Xóa</div>
        </div>
        `;

        div.onclick = () => loadSession(index);

        if (session.id === currentSessionId) {
            div.classList.add("active");
        }

        historyBox.appendChild(div);

        const menuBtn = div.querySelector(".history-menu-btn");
        const menu = div.querySelector(".history-menu");

        menuBtn.onclick = (e) => {

            e.stopPropagation();

            const item = e.target.closest(".history-item");

            // reset z-index
            document.querySelectorAll(".history-item").forEach(i=>{
                i.style.zIndex = "1";
            });

            // item đang mở menu nổi lên
            item.style.zIndex = "999";

            menu.classList.toggle("show");

        };

    });
}
async function deleteChat(index){

    if(!confirm("Bạn có chắc muốn xóa đoạn chat này?")) return

    const chat = chatHistory[index]

    try{

        await fetch(`http://127.0.0.1:8000/chat/delete/${chat.id}`,{
            method:"DELETE"
        })

    }catch(err){
        console.error("Lỗi delete:",err)
    }

    chatHistory.splice(index,1)

    localStorage.setItem("chatHistory", JSON.stringify(chatHistory))

    renderHistory()
}


async function renameChat(index){

    const newName = prompt("Nhập tên mới cho đoạn chat")

    if(!newName) return

    const chat = chatHistory[index]

    try{

        await fetch("http://127.0.0.1:8000/chat/rename",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                chat_id: chat.id,
                title: newName
            })
        })

    }catch(err){
        console.error("Rename lỗi:",err)
    }

    chatHistory[index].title = newName

    localStorage.setItem("chatHistory", JSON.stringify(chatHistory))

    renderHistory()
}


async function pinChat(index){

    const chat = chatHistory[index]

    try{

        await fetch("http://127.0.0.1:8000/chat/pin",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                chat_id: chat.id
            })
        })

    }catch(err){
        console.error("Pin lỗi:",err)
    }

    const item = chatHistory.splice(index,1)[0]

    chatHistory.unshift(item)

    localStorage.setItem("chatHistory", JSON.stringify(chatHistory))

    renderHistory()
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
 * 6. Xử lý Gửi tin nhắn (SỬA LỖI ĐỒNG BỘ USER_ID VỚI DATABASE)
 */
sendBtn.onclick = async () => {
    let question = questionInput.value.trim();
    if (!question) return;

    // 1. Kiểm tra User ID (Tránh lỗi 422)
    const rawUserId = localStorage.getItem("user_id");
    const userId = parseInt(rawUserId);
    if (!rawUserId || isNaN(userId)) {
        addMessage("❌ Lỗi: Bạn chưa đăng nhập. Hãy đăng nhập lại!", "bot");
        return;
    }

    // 2. Xóa gợi ý cũ
    const oldSugg = document.querySelector('.suggestions-container');
    if (oldSugg) oldSugg.remove();

    // 3. Khởi tạo Session nếu là câu hỏi đầu tiên
    if (!currentSessionId) {
        currentSessionId = Date.now();
        const newSession = { id: currentSessionId, title: question, messages: [] };
        chatHistory.unshift(newSession);
    }

    addMessage(question, "user");
    questionInput.value = "";

    const loading = document.createElement("div");
    loading.className = "message bot";
    loading.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Đang xử lý...`;
    messages.appendChild(loading);

    try {
        const res = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                question: question, 
                user_id: userId,
                session_id: currentSessionId
            })
        });
        
        const data = await res.json();
        
        loading.remove();
        if (!res.ok) throw new Error(data.detail || "Lỗi máy chủ");

        addMessage(data.answer, "bot");
        questionCount++; // tăng số câu hỏi
        addRating();
        displaySuggestions(data.answer);

        // 4. LƯU LỊCH SỬ (SỬA LỖI CÂU THỨ 2 TẠI ĐÂY)
        // Tìm lại session trong mảng chatHistory
        let session = chatHistory.find(s => s.id === currentSessionId);
        
        // Nếu không tìm thấy (do lỗi render), hãy ép tạo lại
        if (!session) {
            session = { id: currentSessionId, title: question, messages: [] };
            chatHistory.unshift(session);
        }

        // Đảm bảo cấu trúc messages luôn là mảng
        if (!session.messages) session.messages = [];
        session.id = data.chat_id || session.id;
        session.messages.push({ question, answer: data.answer });

        // Ghi đè lại toàn bộ vào LocalStorage để đồng bộ
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        renderHistory();

    } catch (err) {
        if (loading) loading.remove();
        addMessage("❌ Lỗi xử lý: " + err.message, "bot");
    }
};
/**
 * MỚI: TẢI LỊCH SỬ TỪ SERVER KHI VÀO TRANG
 */
async function fetchHistoryFromServer() {

    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    try {

        const res = await fetch(`http://127.0.0.1:8000/chat/history/${userId}`);
        if (!res.ok) return;

        const dbData = await res.json();

        let sessions = {};

        dbData.forEach(item => {

            const sid = item.SessionId || item.MaChat;

            if (!sessions[sid]) {

                sessions[sid] = {
                    id: sid,
                    title: item.CauHoi.substring(0,30),
                    messages: []
                }

            }

            sessions[sid].messages.push({
                question: item.CauHoi,
                answer: item.TraLoi
            });

        });

        chatHistory = Object.values(sessions);

        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

        renderHistory();

    } catch (err) {

        console.error("Lỗi fetch history:", err);

    }
}

/**
 * 7. Tiện ích & Hiển thị thông tin đăng nhập
 */
window.addEventListener('DOMContentLoaded', () => {
    // Hiển thị tên người dùng trên Header
    const userName = localStorage.getItem("user_name");
    const headerBtn = document.querySelector(".login-btn"); // Chỉnh selector cho đúng với HTML của bạn
    
    if (userName && headerBtn) {
        headerBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${userName} | Thoát`;
        headerBtn.onclick = (e) => {
            e.preventDefault();

            const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất không?");

            if (confirmLogout) {
                localStorage.clear();
                window.location.href = "login.html"; 
            }
        };
    }

    // Load lịch sử từ server
    fetchHistoryFromServer();
    renderHistory();
});

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
function toggleHistory(){

    const history = document.getElementById("history");
    const arrow = document.getElementById("historyArrow");

    if(history.style.display === "none"){

        history.style.display = "block";
        arrow.style.transform = "rotate(90deg)";

    }else{

        history.style.display = "none";
        arrow.style.transform = "rotate(0deg)";

    }

}
document.addEventListener("click", function(){

    document.querySelectorAll(".history-menu").forEach(menu=>{
        menu.classList.remove("show");
    });

});


document.addEventListener("DOMContentLoaded", () => {
    fetchHistoryFromServer();
});