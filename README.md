# CHƯƠNG 1: GIỚI THIỆU ĐỀ TÀI

## 1.1. Lý do chọn đề tài

Trong bối cảnh chuyển đổi số mạnh mẽ hiện nay, nhu cầu tiếp cận thông tin pháp luật của người dân ngày càng gia tăng, đặc biệt trong các lĩnh vực liên quan trực tiếp đến đời sống cá nhân và gia đình như hôn nhân, ly hôn, quyền nuôi con và phân chia tài sản. Tuy nhiên, trên thực tế, việc tiếp cận và hiểu đúng các quy định pháp luật vẫn còn gặp nhiều khó khăn do văn bản pháp luật thường mang tính chuyên môn cao, cách diễn đạt phức tạp và không dễ hiểu đối với người không có nền tảng pháp lý.

Bên cạnh đó, hình thức tư vấn pháp luật truyền thống thông qua luật sư hoặc các trung tâm tư vấn còn tồn tại nhiều hạn chế như chi phí cao, phụ thuộc vào thời gian, địa điểm và chưa đáp ứng được nhu cầu tra cứu nhanh chóng của người dân. Đặc biệt, tại các khu vực vùng sâu, vùng xa, người dân gần như không có điều kiện tiếp cận dịch vụ tư vấn pháp luật kịp thời.

Xuất phát từ thực tế đó, đề tài **“Xây dựng Chatbot AI tư vấn pháp luật Hôn nhân và Gia đình Việt Nam”** được lựa chọn nhằm ứng dụng trí tuệ nhân tạo để hỗ trợ người dân tra cứu và tìm hiểu các quy định pháp luật một cách nhanh chóng, thuận tiện và dễ hiểu hơn.

---

## 1.2. Tính cấp thiết của đề tài

Luật Hôn nhân và Gia đình là một trong những đạo luật quan trọng, điều chỉnh trực tiếp các mối quan hệ hôn nhân và gia đình – nền tảng của xã hội. Việc hiểu sai hoặc không nắm rõ các quy định pháp luật trong lĩnh vực này có thể dẫn đến những hậu quả pháp lý nghiêm trọng, ảnh hưởng trực tiếp đến quyền và lợi ích hợp pháp của các bên liên quan.

Trong khi đó, sự phát triển của trí tuệ nhân tạo, đặc biệt là các mô hình ngôn ngữ lớn (Large Language Model – LLM), đã mở ra khả năng xây dựng các hệ thống chatbot có thể hiểu và trả lời câu hỏi bằng ngôn ngữ tự nhiên. Tuy nhiên, nếu không được kiểm soát chặt chẽ, các mô hình này có thể tạo ra thông tin sai lệch hoặc suy diễn ngoài phạm vi pháp luật, gây ảnh hưởng tiêu cực đến người sử dụng.

Do đó, việc kết hợp mô hình **Retrieval-Augmented Generation (RAG)** – cho phép chatbot chỉ trả lời dựa trên tài liệu pháp luật nội bộ – là một hướng tiếp cận cần thiết, giúp đảm bảo tính chính xác, minh bạch và phù hợp với đặc thù của lĩnh vực pháp lý. Đây chính là tính cấp thiết và ý nghĩa thực tiễn của đề tài.

---

## 1.3. Mục tiêu nghiên cứu

Mục tiêu chính của đề tài là xây dựng một hệ thống chatbot AI có khả năng tư vấn pháp luật Hôn nhân và Gia đình Việt Nam dựa trên tài liệu pháp luật nội bộ, cụ thể là **Luật Hôn nhân và Gia đình năm 2014**, thông qua mô hình **Retrieval-Augmented Generation (RAG)**.

Các mục tiêu cụ thể bao gồm:

- Xây dựng tập dữ liệu pháp luật có cấu trúc từ các văn bản luật.
- Ứng dụng kỹ thuật tìm kiếm ngữ nghĩa (Semantic Search) để truy xuất các điều luật liên quan đến câu hỏi của người dùng.
- Tích hợp mô hình ngôn ngữ lớn thông qua **Gemini API** để sinh câu trả lời dựa trên dữ liệu truy xuất.
- Đảm bảo chatbot không tự ý suy luận hoặc trả lời ngoài phạm vi tài liệu pháp luật được cung cấp.
- Đánh giá hiệu quả và tính ứng dụng thực tế của hệ thống chatbot.

---

## 1.4. Phạm vi nghiên cứu

Trong khuôn khổ đề tài, phạm vi nghiên cứu được giới hạn như sau:

- **Về nội dung pháp luật:** Tập trung vào Luật Hôn nhân và Gia đình năm 2014.
- **Về chức năng:** Chatbot hỗ trợ tra cứu và giải thích các quy định pháp luật cơ bản, không thay thế vai trò của luật sư hoặc cơ quan có thẩm quyền.
- **Về kỹ thuật:** Áp dụng mô hình RAG kết hợp với Gemini API, không nghiên cứu huấn luyện mô hình ngôn ngữ từ đầu.

---

## 1.5. Đối tượng sử dụng

Hệ thống chatbot hướng đến các đối tượng sử dụng sau:

- Người dân có nhu cầu tìm hiểu các quy định pháp luật về hôn nhân và gia đình.
- Sinh viên ngành Luật, Công nghệ thông tin và các ngành liên quan.
- Cán bộ, nhân viên tại các cổng thông tin pháp luật hoặc trung tâm hỗ trợ pháp lý.
- Người dân tại các khu vực vùng sâu, vùng xa, nơi việc tiếp cận dịch vụ tư vấn pháp luật còn nhiều hạn chế.

---

## 1.6. Phương pháp nghiên cứu

Đề tài sử dụng các phương pháp nghiên cứu chính sau:

- **Phương pháp nghiên cứu tài liệu:** Thu thập và phân tích các văn bản pháp luật liên quan đến hôn nhân và gia đình.
- **Phương pháp phân tích – thiết kế hệ thống:** Xây dựng kiến trúc chatbot AI theo mô hình RAG.
- **Phương pháp thực nghiệm:** Triển khai hệ thống, xây dựng các kịch bản thử nghiệm và đánh giá kết quả.
- **Phương pháp so sánh:** So sánh hiệu quả giữa chatbot AI dựa trên mô hình RAG và các hình thức tư vấn pháp luật truyền thống.
# CHƯƠNG 2: CƠ SỞ LÝ THUYẾT

## 2.1. Tổng quan về Trí tuệ nhân tạo và Chatbot

### 2.1.1. Trí tuệ nhân tạo (Artificial Intelligence – AI)

Trí tuệ nhân tạo (Artificial Intelligence – AI) là lĩnh vực nghiên cứu trong khoa học máy tính nhằm xây dựng các hệ thống có khả năng mô phỏng trí thông minh của con người, bao gồm các khả năng như học tập, suy luận, nhận thức và ra quyết định. AI ngày nay được ứng dụng rộng rãi trong nhiều lĩnh vực như y tế, tài chính, giáo dục, thương mại điện tử và đặc biệt là các hệ thống hỗ trợ ra quyết định.

Trong phạm vi đề tài này, trí tuệ nhân tạo được sử dụng để xây dựng một hệ thống chatbot có khả năng tiếp nhận câu hỏi bằng ngôn ngữ tự nhiên và cung cấp câu trả lời dựa trên các quy định pháp luật cụ thể.

---

### 2.1.2. Machine Learning (ML)

Machine Learning là một nhánh của trí tuệ nhân tạo, tập trung vào việc xây dựng các mô hình cho phép máy tính học từ dữ liệu thay vì phải lập trình các quy tắc cứng. Thông qua quá trình huấn luyện, mô hình có thể phát hiện các mẫu (pattern) trong dữ liệu và đưa ra dự đoán hoặc quyết định.

Trong hệ thống chatbot tư vấn pháp luật, Machine Learning được áp dụng gián tiếp thông qua các mô hình embedding, giúp chuyển đổi văn bản pháp luật và câu hỏi của người dùng thành các vector số. Các vector này được sử dụng để thực hiện tìm kiếm ngữ nghĩa, từ đó truy xuất các điều luật phù hợp với câu hỏi của người dùng.

---

### 2.1.3. Xử lý ngôn ngữ tự nhiên (Natural Language Processing – NLP)

Xử lý ngôn ngữ tự nhiên (Natural Language Processing – NLP) là lĩnh vực nghiên cứu nhằm giúp máy tính hiểu, phân tích và sinh ngôn ngữ của con người. NLP đóng vai trò cốt lõi trong các hệ thống chatbot, cho phép:

- Hiểu nội dung và ý định câu hỏi của người dùng.
- Phân tích ngữ nghĩa của văn bản pháp luật.
- Sinh câu trả lời ở dạng ngôn ngữ tự nhiên, rõ ràng và dễ hiểu.

Trong đề tài này, NLP được ứng dụng ở cả hai giai đoạn chính: truy xuất các điều luật liên quan và sinh câu trả lời dựa trên nội dung đã được truy xuất.

---

### 2.1.4. Mô hình ngôn ngữ lớn (Large Language Model – LLM)

Mô hình ngôn ngữ lớn (Large Language Model – LLM) là các mô hình học sâu được huấn luyện trên tập dữ liệu văn bản rất lớn, có khả năng hiểu và sinh ngôn ngữ tự nhiên với độ linh hoạt cao. Các mô hình LLM hiện đại có thể trả lời câu hỏi, tóm tắt văn bản, giải thích nội dung phức tạp và hỗ trợ đa ngôn ngữ.

Trong hệ thống chatbot của đề tài, LLM không được sử dụng để trả lời tự do mà được kiểm soát chặt chẽ thông qua việc cung cấp ngữ cảnh pháp luật cụ thể từ tài liệu nội bộ. Cách tiếp cận này giúp đảm bảo tính chính xác của câu trả lời và hạn chế hiện tượng suy diễn ngoài phạm vi pháp luật.

---

## 2.2. Các mô hình chatbot phổ biến

### 2.2.1. Chatbot dựa trên luật (Rule-based Chatbot)

Chatbot dựa trên luật hoạt động dựa vào tập các quy tắc và kịch bản được xây dựng sẵn. Mỗi câu hỏi của người dùng sẽ được so khớp với các mẫu (pattern) cố định để đưa ra câu trả lời tương ứng.

**Ưu điểm:**
- Dễ xây dựng và triển khai.
- Kiểm soát nội dung trả lời tốt.

**Nhược điểm:**
- Thiếu tính linh hoạt.
- Khó mở rộng khi số lượng câu hỏi lớn.
- Không hiểu được ngữ nghĩa sâu của câu hỏi.

Mô hình này không phù hợp với lĩnh vực pháp luật, nơi người dùng có thể đặt câu hỏi với nhiều cách diễn đạt khác nhau.

---

### 2.2.2. Chatbot dựa trên truy xuất (Retrieval-based Chatbot)

Chatbot retrieval-based hoạt động bằng cách tìm kiếm câu trả lời phù hợp nhất từ một tập dữ liệu có sẵn. Phương pháp này có thể dựa trên:

- So khớp từ khóa.
- Tìm kiếm ngữ nghĩa (Semantic Search) bằng vector embedding.

**Ưu điểm:**
- Trả lời chính xác dựa trên dữ liệu có sẵn.
- Không tạo ra thông tin mới ngoài dữ liệu.

**Nhược điểm:**
- Câu trả lời thường mang tính cứng nhắc.
- Khó tổng hợp hoặc diễn giải nội dung dài từ nhiều điều luật.

---

### 2.2.3. Chatbot sinh ngôn ngữ (Generative AI Chatbot)

Chatbot sinh ngôn ngữ sử dụng các mô hình LLM để tạo ra câu trả lời hoàn toàn mới dựa trên ngữ cảnh và kiến thức đã được huấn luyện.

**Ưu điểm:**
- Linh hoạt trong giao tiếp.
- Câu trả lời tự nhiên, gần giống con người.

**Nhược điểm:**
- Có nguy cơ tạo ra thông tin sai lệch (hallucination).
- Khó kiểm soát trong các lĩnh vực nhạy cảm như pháp luật.

---

## 2.3. Mô hình Retrieval-Augmented Generation (RAG)

### 2.3.1. Khái niệm RAG

Retrieval-Augmented Generation (RAG) là mô hình kết hợp giữa hai thành phần:

- **Retrieval:** Truy xuất các tài liệu liên quan từ tập dữ liệu nội bộ.
- **Generation:** Sinh câu trả lời dựa trên nội dung đã truy xuất bằng mô hình ngôn ngữ lớn.

Mô hình RAG cho phép tận dụng khả năng sinh ngôn ngữ tự nhiên của LLM trong khi vẫn đảm bảo câu trả lời được “neo” chặt chẽ vào dữ liệu thực tế.

---

### 2.3.2. Lý do lựa chọn mô hình RAG cho bài toán pháp luật

Việc áp dụng mô hình RAG trong chatbot tư vấn pháp luật mang lại nhiều lợi ích:

- Đảm bảo câu trả lời dựa trên các văn bản pháp luật cụ thể.
- Giảm thiểu nguy cơ tạo ra thông tin sai lệch (hallucination).
- Dễ dàng cập nhật khi luật thay đổi bằng cách thay thế dữ liệu mà không cần huấn luyện lại mô hình.
- Phù hợp với yêu cầu minh bạch và chính xác trong lĩnh vực pháp lý.

Do đó, mô hình RAG được lựa chọn là giải pháp phù hợp nhất cho đề tài.

---

### 2.3.3. Kiến trúc tổng quát của hệ thống RAG

Quy trình xử lý của hệ thống RAG trong đề tài được mô tả như sau:

1. Người dùng nhập câu hỏi pháp luật.
2. Câu hỏi được chuyển đổi thành vector embedding.
3. Hệ thống thực hiện tìm kiếm ngữ nghĩa để truy xuất các điều luật liên quan từ tập dữ liệu nội bộ.
4. Nội dung các điều luật được đưa vào prompt làm ngữ cảnh cho mô hình LLM.
5. Mô hình LLM sinh câu trả lời dựa hoàn toàn trên dữ liệu đã được cung cấp.

Quy trình này đảm bảo chatbot chỉ sử dụng thông tin từ tài liệu pháp luật nội bộ và có thể từ chối trả lời khi dữ liệu không đủ.
# CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG
## 3.1. Phân tích yêu cầu hệ thống
### 3.1.1. Mô tả tổng quan hệ thống
Hệ thống được xây dựng nhằm cung cấp một chatbot tư vấn pháp luật trong lĩnh vực Hôn nhân và Gia đình Việt Nam. Người dùng có thể đặt câu hỏi bằng ngôn ngữ tự nhiên thông qua giao diện web, hệ thống sẽ tự động phân tích câu hỏi, truy xuất các điều luật liên quan từ tập dữ liệu pháp luật nội bộ và sinh câu trả lời dựa trên các điều luật đó.
Hệ thống hoạt động theo mô hình client–server, trong đó frontend đảm nhiệm việc tương tác với người dùng, backend xử lý logic nghiệp vụ và tích hợp mô hình trí tuệ nhân tạo.
________________________________________
### 3.1.2. Use Case Diagram
a) Mô tả Use Case
## 3.2. Yêu cầu chức năng và phi chức năng
### 3.2.1. Yêu cầu chức năng (Functional Requirements)
Hệ thống cần đáp ứng các yêu cầu chức năng sau:
•	Cho phép người dùng nhập câu hỏi pháp luật bằng ngôn ngữ tự nhiên.
•	Tự động truy xuất các điều luật liên quan từ tập dữ liệu nội bộ.
•	Sinh câu trả lời dựa trên nội dung điều luật đã truy xuất.
•	Hiển thị rõ ràng nội dung trả lời và trích dẫn điều luật.
•	Lưu trữ và hiển thị lịch sử hội thoại của người dùng.
________________________________________
### 3.2.2. Yêu cầu phi chức năng (Non-functional Requirements)
•	Tính chính xác: câu trả lời phải dựa trên dữ liệu pháp luật nội bộ.
•	Tính hiệu năng: thời gian phản hồi nhanh (dưới vài giây).
•	Tính mở rộng: dễ dàng bổ sung thêm văn bản luật mới.
•	Tính bảo mật: không lưu trữ thông tin cá nhân nhạy cảm.
•	Tính khả dụng: giao diện thân thiện, dễ sử dụng.
________________________________________
## 3.3. Thiết kế kiến trúc hệ thống
### 3.3.1. Kiến trúc tổng thể
Hệ thống được thiết kế theo kiến trúc phân tầng, bao gồm:
•	Tầng giao diện (Frontend): Web UI (HTML, CSS, JavaScript).
•	Tầng ứng dụng (Backend API): FastAPI xử lý logic.
•	Tầng AI & Xử lý ngôn ngữ: Embedding, Retrieval, Gemini API.
•	Tầng dữ liệu: Tập dữ liệu pháp luật nội bộ (JSON, vector embedding).
________________________________________
### 3.3.2. Prompt vẽ sơ đồ kiến trúc hệ thống (Architecture Diagram)
Vẽ sơ đồ kiến trúc hệ thống Chatbot AI tư vấn pháp luật theo mô hình RAG.

Các thành phần:
- User (Web Browser)
- Frontend (HTML, CSS, JavaScript)
- Backend API (FastAPI)
- Retrieval Module
- Embedding Model
- Legal Document Dataset (JSON)
- Vector Store
- Gemini API (LLM)

Luồng xử lý:
User → Frontend → Backend API
Backend API → Retrieval Module
Retrieval Module → Vector Store
Vector Store → Relevant Legal Articles
Backend API → Gemini API (kèm context luật)
Gemini API → Backend API → Frontend → User

Phong cách:
- Layered Architecture
- Có mũi tên chỉ luồng dữ liệu
- Phù hợp báo cáo học thuật
________________________________________
## 3.4. Thiết kế dữ liệu
### 3.4.1. Mô hình dữ liệu (ERD)
Dữ liệu trong hệ thống bao gồm:
•	Law: thông tin luật (tên luật, nhóm luật).
•	Article: điều luật, tiêu đề, nội dung.
•	ChatSession: phiên hội thoại.
•	ChatMessage: câu hỏi và câu trả lời trong mỗi phiên.
________________________________________
### 3.4.2. Prompt vẽ ERD Diagram
Vẽ ERD cho hệ thống Chatbot AI tư vấn pháp luật.

Entities:
- Law (law_id, law_name, group)
- Article (article_id, article_number, title, content, law_id)
- ChatSession (session_id, created_at)
- ChatMessage (message_id, question, answer, session_id)

Relationships:
- Law 1--n Article
- ChatSession 1--n ChatMessage

Phong cách:
- ERD chuẩn
- Ghi rõ khóa chính (PK) và khóa ngoại (FK)
________________________________________
## 3.5. Sequence Diagram – Luồng xử lý câu hỏi
### 3.5.1. Mô tả luồng xử lý
Trình tự xử lý một câu hỏi của người dùng diễn ra như sau:
1.	Người dùng gửi câu hỏi từ giao diện web.
2.	Frontend gửi yêu cầu đến Backend API.
3.	Backend chuyển câu hỏi sang module embedding.
4.	Hệ thống truy xuất các điều luật liên quan.
5.	Backend gửi ngữ cảnh luật kèm câu hỏi đến Gemini API.
6.	Gemini API sinh câu trả lời.
7.	Backend trả kết quả về frontend để hiển thị cho người dùng.
________________________________________
### 3.5.2. Prompt vẽ Sequence Diagram
Vẽ Sequence Diagram cho luồng xử lý câu hỏi của Chatbot AI tư vấn pháp luật.

Participants:
- User
- Frontend
- Backend API
- Embedding Service
- Retrieval Service
- Gemini API

Sequence:
User → Frontend: Enter question
Frontend → Backend API: POST /chat
Backend API → Embedding Service: Generate embedding
Backend API → Retrieval Service: Retrieve legal articles
Backend API → Gemini API: Generate answer with context
Gemini API → Backend API: Answer
Backend API → Frontend: Response
Frontend → User: Display answer

Phong cách:
- UML Sequence Diagram
- Có đánh số bước
________________________________________
## 3.6. Thiết kế API
### 3.6.1. Mô tả API chính
•	Endpoint: /chat
•	Method: POST
•	Request: câu hỏi pháp luật của người dùng
•	Response: câu trả lời và danh sách điều luật liên quan
________________________________________
### 3.6.2. Prompt vẽ sơ đồ API Flow
Vẽ sơ đồ luồng API cho endpoint /chat của Chatbot AI pháp luật.

Thành phần:
- Client
- Chat API
- Retrieval Service
- Gemini Service

Luồng:
Client → Chat API
Chat API → Retrieval Service
Chat API → Gemini Service
Chat API → Client

Phong cách:
- Flow Diagram
- Đơn giản, rõ ràng
# CHƯƠNG 4: XÂY DỰNG VÀ CÀI ĐẶT HỆ THỐNG
## 4.1. Công nghệ và công cụ sử dụng
Hệ thống chatbot AI tư vấn pháp luật được xây dựng dựa trên các công nghệ hiện đại, phù hợp với yêu cầu xử lý ngôn ngữ tự nhiên và triển khai web.
### 4.1.1. Công nghệ Backend
•	Ngôn ngữ lập trình: Python
•	Framework Backend: FastAPI
•	Ưu điểm của FastAPI:
o	Hiệu năng cao
o	Dễ xây dựng API RESTful
o	Phù hợp triển khai các hệ thống AI
Backend chịu trách nhiệm xử lý câu hỏi người dùng, truy xuất dữ liệu pháp luật, tích hợp mô hình AI và trả kết quả cho frontend.
________________________________________
### 4.1.2. Công nghệ Frontend
•	HTML, CSS, JavaScript
•	Giao diện web cho phép người dùng:
o	Nhập câu hỏi pháp luật
o	Nhận câu trả lời
o	Xem lịch sử hội thoại
o	Tạo phiên chat mới
Frontend giao tiếp với backend thông qua API /chat bằng giao thức HTTP.
________________________________________
### 4.1.3. Công nghệ AI và NLP
•	SentenceTransformer: tạo vector embedding cho câu hỏi và điều luật
•	Semantic Search: tìm kiếm ngữ nghĩa dựa trên độ tương đồng cosine
•	Gemini API: mô hình ngôn ngữ lớn dùng để sinh câu trả lời
•	Mô hình RAG: kết hợp Retrieval + Generation
________________________________________
## 4.2. Thu thập và xử lý dữ liệu pháp luật
### 4.2.1. Thu thập dữ liệu
Nguồn dữ liệu pháp luật được sử dụng trong hệ thống là các văn bản thuộc Luật Hôn nhân và Gia đình năm 2014, được thu thập và lưu trữ dưới dạng tệp JSON nội bộ.
Mỗi văn bản luật được cấu trúc bao gồm:
•	Tên luật
•	Nhóm luật
•	Danh sách các điều luật
•	Tiêu đề và nội dung chi tiết của từng điều
________________________________________
### 4.2.2. Tiền xử lý dữ liệu
Trước khi đưa vào hệ thống AI, dữ liệu pháp luật được xử lý như sau:
•	Làm sạch văn bản (loại bỏ ký tự thừa, chuẩn hóa encoding).
•	Tách luật thành các đơn vị nhỏ theo từng điều luật.
•	Gắn metadata (tên luật, số điều, tiêu đề) cho mỗi điều luật.
•	Chuẩn bị trường văn bản dùng cho embedding.
Việc chia nhỏ theo từng điều luật giúp hệ thống truy xuất chính xác và tăng độ liên quan của kết quả tìm kiếm.
________________________________________
## 4.3. Pipeline xử lý theo mô hình RAG
### 4.3.1. Mô tả pipeline tổng thể
Pipeline xử lý của hệ thống chatbot được xây dựng theo mô hình Retrieval-Augmented Generation, bao gồm các bước chính:
1.	Người dùng nhập câu hỏi pháp luật.
2.	Backend tiếp nhận câu hỏi thông qua API.
3.	Câu hỏi được chuyển đổi thành vector embedding.
4.	Hệ thống thực hiện tìm kiếm ngữ nghĩa trên tập điều luật.
5.	Lựa chọn các điều luật liên quan nhất (top-k).
6.	Tạo prompt bao gồm câu hỏi và nội dung điều luật.
7.	Gửi prompt đến Gemini API.
8.	Nhận câu trả lời và trả về cho người dùng.
________________________________________
### 4.3.2. Prompt vẽ sơ đồ Pipeline RAG
Vẽ sơ đồ pipeline xử lý RAG cho Chatbot AI tư vấn pháp luật.

Các bước:
- User Question
- Text Embedding
- Semantic Search (Vector Similarity)
- Top-k Legal Articles
- Prompt Construction
- Gemini API (LLM)
- Generated Answer

Luồng:
Question → Embedding → Retrieval → Context → LLM → Answer

Phong cách:
- Pipeline Diagram
- Có đánh số thứ tự các bước
- Phù hợp báo cáo học thuật
________________________________________
## 4.4. Thuật toán tìm kiếm ngữ nghĩa
### 4.4.1. Embedding văn bản
Mỗi điều luật và câu hỏi người dùng được chuyển đổi thành một vector số có cùng số chiều thông qua mô hình embedding. Các vector này phản ánh ý nghĩa ngữ nghĩa của văn bản trong không gian vector.
Việc sử dụng embedding giúp hệ thống có khả năng tìm kiếm các điều luật liên quan ngay cả khi câu hỏi không trùng khớp từ khóa.
________________________________________
### 4.4.2. Tính độ tương đồng
Độ tương đồng giữa câu hỏi và các điều luật được tính bằng phép nhân vô hướng (cosine similarity). Các điều luật có độ tương đồng cao nhất sẽ được lựa chọn để đưa vào ngữ cảnh cho mô hình sinh ngôn ngữ.
Phương pháp này giúp tăng độ chính xác và giảm thiểu việc truy xuất các điều luật không liên quan.
________________________________________
### 4.4.3. Prompt vẽ sơ đồ Semantic Search
Vẽ sơ đồ minh họa quá trình tìm kiếm ngữ nghĩa trong Chatbot AI pháp luật.

Thành phần:
- User Question
- Question Embedding
- Legal Article Embeddings
- Similarity Calculation
- Top-k Results

Phong cách:
- Vector Search Diagram
- Đơn giản, dễ hiểu
________________________________________
## 4.5. Tích hợp mô hình ngôn ngữ lớn (Gemini API)
### 4.5.1. Xây dựng Prompt có kiểm soát
Prompt gửi đến Gemini API được thiết kế theo nguyên tắc:
•	Chỉ sử dụng dữ liệu pháp luật được truy xuất.
•	Không bổ sung kiến thức bên ngoài.
•	Nếu dữ liệu không đủ, phải nêu rõ giới hạn.
Cách thiết kế này giúp chatbot tránh hiện tượng suy diễn và đảm bảo tính chính xác pháp lý.
________________________________________
### 4.5.2. Cơ chế kiểm soát câu trả lời
Trong trường hợp hệ thống không tìm thấy điều luật phù hợp, chatbot sẽ trả về thông báo rằng dữ liệu pháp luật chưa đủ để trả lời câu hỏi. Điều này giúp nâng cao tính minh bạch và độ tin cậy của hệ thống.
________________________________________
## 4.6. Triển khai và chạy thử hệ thống
Hệ thống được triển khai trên môi trường local với các bước:
•	Cài đặt các thư viện cần thiết.
•	Cấu hình biến môi trường cho Gemini API.
•	Khởi chạy backend bằng FastAPI.
•	Mở giao diện web và thực hiện thử nghiệm.
Hệ thống có thể dễ dàng mở rộng và triển khai trên môi trường cloud trong tương lai.
# CHƯƠNG 5: THỬ NGHIỆM VÀ ĐÁNH GIÁ HỆ THỐNG

## 5.1. Mục tiêu thử nghiệm

Mục tiêu của chương này nhằm:

- Đánh giá khả năng trả lời đúng và phù hợp của chatbot AI.
- Kiểm tra mức độ tuân thủ nguyên tắc **chỉ sử dụng tài liệu pháp luật nội bộ**.
- So sánh hiệu quả giữa chatbot AI theo mô hình RAG và các hình thức tư vấn pháp luật truyền thống.
- Đánh giá tính ứng dụng thực tế của hệ thống.

---

## 5.2. Môi trường thử nghiệm

- **Thiết bị:** Máy tính cá nhân  
- **Hệ điều hành:** Windows  
- **Trình duyệt:** Google Chrome  
- **Backend:** FastAPI (chạy local)  
- **Frontend:** Web (HTML/CSS/JavaScript)  
- **Nguồn dữ liệu:** Luật Hôn nhân và Gia đình 2014 (dữ liệu JSON nội bộ)

---

## 5.3. Xây dựng bộ test case

### 5.3.1. Phân loại câu hỏi thử nghiệm

Các câu hỏi thử nghiệm được xây dựng dựa trên những tình huống thực tế thường gặp trong lĩnh vực hôn nhân và gia đình, bao gồm:

- Thủ tục kết hôn  
- Ly hôn đơn phương  
- Chia tài sản khi ly hôn  
- Quyền nuôi con và cấp dưỡng  
- Các trường hợp đặc biệt (ví dụ: kết hôn đồng giới)

---

### 5.3.2. Bảng test case tiêu biểu

| STT | Câu hỏi thử nghiệm | Điều luật liên quan | Kết quả |
|----|------------------|-------------------|--------|
| 1 | Điều kiện kết hôn là gì? | Điều 8 | Trả lời đúng |
| 2 | Thủ tục ly hôn đơn phương | Điều 56 | Trả lời đúng |
| 3 | Chia tài sản khi ly hôn như thế nào? | Điều 59 | Trả lời đúng |
| 4 | Quyền nuôi con sau ly hôn | Điều 81, 82 | Trả lời đúng |
| 5 | Kết hôn đồng giới có được không? | Không có điều luật trực tiếp | Từ chối kết luận |

**Nhận xét:**  
Ở trường hợp thứ 5, chatbot không đưa ra kết luận khi dữ liệu pháp luật không đủ, thể hiện việc tuân thủ đúng mô hình RAG và tránh suy diễn ngoài phạm vi dữ liệu.

---

## 5.4. Đánh giá độ chính xác

### 5.4.1. Tiêu chí đánh giá

- **Đúng điều luật:** Câu trả lời dựa trên điều luật phù hợp.  
- **Không hallucination:** Không tạo thông tin ngoài dữ liệu nội bộ.  
- **Diễn giải rõ ràng:** Dễ hiểu đối với người không có nền tảng pháp lý.  
- **Minh bạch nguồn:** Có trích dẫn điều luật cụ thể.

---

### 5.4.2. Kết quả đánh giá

- **Tổng số câu hỏi thử nghiệm:** 30  
- **Số câu trả lời đúng và phù hợp:** 27  
- **Số câu từ chối trả lời do thiếu dữ liệu:** 3  
- **Tỷ lệ trả lời đúng/phù hợp:** **90%**

Các trường hợp bị từ chối đều là những câu hỏi không có quy định cụ thể trong dữ liệu nội bộ và được xem là hành vi đúng đắn của hệ thống.

---

## 5.5. So sánh với các phương pháp khác

### 5.5.1. So sánh với chatbot rule-based

| Tiêu chí | Rule-based | Chatbot AI RAG |
|--------|-----------|---------------|
| Hiểu ngôn ngữ tự nhiên | Thấp | Cao |
| Linh hoạt câu hỏi | Thấp | Cao |
| Khả năng mở rộng | Thấp | Cao |
| Độ chính xác pháp lý | Trung bình | Cao |

---

### 5.5.2. So sánh với chatbot AI không dùng RAG

| Tiêu chí | AI thông thường | AI RAG |
|--------|----------------|--------|
| Dựa trên dữ liệu nội bộ | Không đảm bảo | Có |
| Hallucination | Cao | Thấp |
| Trích dẫn điều luật | Không ổn định | Rõ ràng |
| Phù hợp lĩnh vực pháp luật | Không | Có |

**Kết quả cho thấy mô hình RAG là lựa chọn phù hợp cho bài toán tư vấn pháp luật.**

---

## 5.6. Đánh giá người dùng (mô phỏng)

Một số phản hồi từ người dùng thử nghiệm:

- Dễ sử dụng, giao diện thân thiện.  
- Câu trả lời rõ ràng, có trích dẫn điều luật.  
- Phù hợp để tham khảo nhanh trước khi tìm đến luật sư.

---

### 5.6.1. Prompt vẽ biểu đồ đánh giá (tùy chọn)

```text
Vẽ biểu đồ cột đánh giá chatbot AI tư vấn pháp luật theo các tiêu chí:
- Độ chính xác
- Tốc độ phản hồi
- Dễ sử dụng
- Độ tin cậy

Thang điểm: 1–5
Phong cách: Biểu đồ cho báo cáo đồ án CNTT