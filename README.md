# **Self-Healing RAG System (Loopie.ai)**

A production-ready AI system that retrieves, verifies, and generates answers from documents using a **Self-Healing Retrieval-Augmented Generation (RAG)** pipeline.

---

## **Features**

*  Upload PDF documents dynamically
*  Semantic search using vector database
*  Reranking for better relevance
*  AI-generated answers (streaming)
*  Self-healing loop for improved responses
* Modern UI (Loopie.ai inspired, dark/light mode)

---

##  **Tech Stack**

**Frontend**

* Next.js (React + TypeScript)
* Tailwind CSS

**Backend**

* FastAPI (Python)
* LangChain + ChromaDB

**AI / LLM**

* Grok / OpenAI-compatible APIs

---

##  **Project Structure**

```
self-healing-rag-system/
│
├── frontend/        # Next.js UI
├── backend/         # FastAPI backend
├── data/            # PDF documents
├── vector_db/       # Stored embeddings
```

---

##  **Setup**

### 1. Clone repo

```bash
git clone <your-repo-url>
cd self-healing-rag-system
```

---

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## **Environment Variables**

### Backend

```
GROQ_API_KEY=your_key
# or
XAI_API_KEY=your_key
```

### Frontend

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

##  **Usage**

1. Upload a PDF
2. Ask a question
3. Get AI-generated answer with context

---

## **Features Preview**

* Chat-based UI
* Real-time streaming responses
* Document-aware answers

---

##  **Future Improvements**

* Confidence scoring
* Source highlighting
* Multi-document support
* Deployment (Render + Vercel)

---

##  **Author**

Built as an advanced AI system project to demonstrate real-world RAG architecture.

---

## **Notes**

This is not just a basic chatbot — it is a **self-correcting AI system** designed for production-level applications.

---
