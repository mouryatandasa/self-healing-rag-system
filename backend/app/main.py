from fastapi import FastAPI

app = FastAPI(title="Self-Healing RAG System")


@app.get("/")
def home():
    return {"message": "Self-Healing RAG API running"}


@app.get("/query")
def query(q: str):
    return {
        "question": q,
        "answer": "RAG system response will come here"
    }