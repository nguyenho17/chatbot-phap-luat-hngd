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

    // Sắp xếp: Ưu tiên is_pinned = true lên trước
    const sortedHistory = [...chatHistory].sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0));

    sortedHistory.forEach((session, index) => {
        if (!session) return;

        const div = document.createElement("div");
        div.className = "history-item";
        if (session.is_pinned) div.classList.add("pinned"); // Thêm class để CSS nếu cần

        let displayTitle = session.title || 
            (session.messages && session.messages[0] ? session.messages[0].question : "Hội thoại mới");

        div.innerHTML = `
        <span class="history-title">
            <i class="${session.is_pinned ? 'fas fa-thumbtack pin-icon' : 'far fa-comment-dots'}"></i>
            ${displayTitle.substring(0, 25)}...
        </span>

        <span class="history-menu-btn">
            <i class="fas fa-ellipsis-h"></i>
        </span>

        <div class="history-menu">
            <div onclick="pinChat(${index})">
                <i class="fas fa-thumbtack"></i> ${session.is_pinned ? 'Bỏ ghim' : 'Ghim'}
            </div>
            <div onclick="renameChat(${index})"><i class="fas fa-edit"></i> Đổi tên</div>
            <div onclick="deleteChat(${index})"><i class="fas fa-trash"></i> Xóa</div>
        </div>
        `;

        // ... các logic click, active, menuBtn giữ nguyên như code của bạn ...
        div.onclick = () => loadSession(index);
        if (session.id === currentSessionId) div.classList.add("active");
        historyBox.appendChild(div);
        
        // Logic cho menuBtn
        const menuBtn = div.querySelector(".history-menu-btn");
        const menu = div.querySelector(".history-menu");
        menuBtn.onclick = (e) => {
            e.stopPropagation();
            document.querySelectorAll(".history-item").forEach(i => i.style.zIndex = "1");
            div.style.zIndex = "999";
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


async function pinChat(index) {
    const chat = chatHistory[index];
    
    // Đảo ngược trạng thái ghim (true <-> false)
    chat.is_pinned = !chat.is_pinned;

    try {
        await fetch("http://127.0.0.1:8000/chat/pin", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chat.id,
                is_pinned: chat.is_pinned // Gửi trạng thái để server lưu vào DB
            })
        });
    } catch (err) {
        console.error("Lỗi ghim:", err);
    }

    // Cập nhật lại LocalStorage và vẽ lại giao diện
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    renderHistory();
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

    // 1. Lấy User ID (Không chặn nữa, cho phép null nếu chưa đăng nhập)
    const rawUserId = localStorage.getItem("user_id");
    const userId = rawUserId ? parseInt(rawUserId) : null;

    // 2. Xóa gợi ý cũ
    const oldSugg = document.querySelector('.suggestions-container');
    if (oldSugg) oldSugg.remove();

    // 3. Khởi tạo Session (Chỉ thực hiện nếu đã đăng nhập)
    if (userId && !currentSessionId) {
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
                user_id: userId, // Sẽ là số nguyên hoặc null
                session_id: currentSessionId || null
            })
        });
        
        const data = await res.json();
        
        loading.remove();
        if (!res.ok) throw new Error(data.detail || "Lỗi máy chủ");

        addMessage(data.answer, "bot");
        questionCount++; 
        
        // Chỉ hiện đánh giá và lưu lịch sử nếu đã ĐĂNG NHẬP
        if (userId) {
            addRating();
            displaySuggestions(data.answer);

            // 4. CẬP NHẬT LỊCH SỬ TRONG LOCALSTORAGE
            let session = chatHistory.find(s => s.id === currentSessionId);
            if (!session) {
                session = { id: currentSessionId, title: question, messages: [] };
                chatHistory.unshift(session);
            }

            if (!session.messages) session.messages = [];
            session.id = data.chat_id || session.id;
            session.messages.push({ question, answer: data.answer });

            localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
            renderHistory();
        } else {
            // Đối với khách: Chỉ hiển thị gợi ý, không lưu
            displaySuggestions(data.answer);
        }

    } catch (err) {
        if (loading) loading.remove();
        addMessage("❌ Lỗi hệ thống: " + err.message, "bot");
    }
};
/**
 * MỚI: TẢI LỊCH SỬ TỪ SERVER KHI VÀO TRANG
 */
async function fetchHistoryFromServer() {

    const userId = localStorage.getItem("user_id");
    if (!userId) {
        console.log("Khách vãng lai: Bỏ qua load lịch sử.");
        return; 
    }

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
    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    
    const guestWarning = document.getElementById("guestWarning");
    const authContainer = document.getElementById("authContainer");
    const userMenuBtn = document.getElementById("userMenuBtn"); // Sửa thành userMenuBtn
    const userDropdown = document.getElementById("userDropdown");

    if (!userId) {
        // --- CHẾ ĐỘ KHÁCH ---
        if (guestWarning) guestWarning.style.display = "block";
        if (userMenuBtn) {
            userMenuBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i> Đăng nhập`;
            userMenuBtn.onclick = () => window.location.href = 'login.html';
        }
    } else {
        // --- ĐÃ ĐĂNG NHẬP ---
        if (guestWarning) guestWarning.style.display = "none";
        
        if (userMenuBtn) {
            // Cập nhật tên người dùng vào nút
            userMenuBtn.innerHTML = `
                <i class="fas fa-user-circle"></i> 
                <span>${userName}</span> 
                <i class="fas fa-chevron-down" style="font-size: 0.7rem; margin-left: 5px;"></i>
            `;
            
            // BẮT SỰ KIỆN CLICK MỞ MENU
            userMenuBtn.onclick = (e) => {
                e.stopPropagation(); 
                userDropdown.classList.toggle("show");
            };
        }

        // Đóng menu khi click ra ngoài
        window.onclick = (e) => {
            if (userDropdown && userDropdown.classList.contains("show")) {
                if (!authContainer.contains(e.target)) {
                    userDropdown.classList.remove("show");
                }
            }
            // Đóng modal hồ sơ nếu click ra ngoài vùng xám
            const modal = document.getElementById("profileModal");
            if (e.target == modal) {
                modal.style.display = "none";
            }
        };

        if (typeof fetchHistoryFromServer === "function") fetchHistoryFromServer();
    }
    
    if (typeof renderHistory === "function") renderHistory();
});
// Hàm Đăng xuất (được gọi từ dropdown-item trong HTML)
function handleLogout() {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        localStorage.clear();
        window.location.href = "index.html";
    }
}
async function openProfileModal() {
    // 1. Ẩn menu dropdown trước
    const dropdown = document.getElementById("userDropdown");
    if (dropdown) dropdown.classList.remove("show");

    const userId = localStorage.getItem("user_id");
    const modal = document.getElementById("profileModal");

    if (!userId) return alert("Vui lòng đăng nhập!");

    // 2. Hiển thị Modal và trạng thái chờ
    modal.style.display = "block";
    document.getElementById("profileDisplayName").innerText = "Đang tải...";

    try {
        // 3. Gọi API lấy dữ liệu
        const res = await fetch(`http://127.0.0.1:8000/auth/profile/${userId}`);
        const data = await res.json();

        if (res.ok) {
            // 4. Đổ dữ liệu thật vào các thẻ <p> trong Modal
            document.getElementById("profileDisplayName").innerText = data.full_name;
            document.getElementById("profileUsername").innerText = data.username;
            document.getElementById("profileEmail").innerText = data.email || "Chưa cập nhật";
        } else {
            alert("Không thể lấy thông tin hồ sơ.");
        }
    } catch (err) {
        console.error("Fetch error:", err);
        alert("Lỗi kết nối đến máy chủ.");
    }
}

// Hàm đóng Modal khi bấm dấu X hoặc bấm ra ngoài
function closeProfileModal() {
    document.getElementById("profileModal").style.display = "none";
}

// Đóng modal khi click ra ngoài vùng chứa
window.onclick = function(event) {
    const modal = document.getElementById("profileModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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
    const userId = localStorage.getItem("user_id");
    const guestWarning = document.getElementById("guestWarning");
    const authBtn = document.getElementById("authBtn");

    if (!userId) {
        // Chế độ khách
        guestWarning.style.display = "block";
        authBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Đăng nhập';
        authBtn.onclick = () => window.location.href = 'login.html';
    } else {
        // Đã đăng nhập
        guestWarning.style.display = "none";
        const userName = localStorage.getItem("user_name") || "Thành viên";
        authBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${userName} (Đăng xuất)`;
        authBtn.classList.add("logged-in");
        authBtn.onclick = () => {
            if(confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
                localStorage.clear();
                window.location.href = "index.html";
            }
        };
    }
});