from fastapi import FastAPI, Request, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from typing import List, Optional, Union
import chromadb
import asyncio
import json
import io
import uuid
from app.db.vector_store import add_document, query_documents

# Document processing imports
try:
    import pypdf
except ImportError:
    pypdf = None

try:
    import docx
except ImportError:
    docx = None

app = FastAPI(title="Self-Healing RAG System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def extract_text_from_file(file: UploadFile) -> str:
    content = ""
    filename = file.filename.lower()
    file_bytes = await file.read()
    await file.seek(0)

    if filename.endswith(".pdf"):
        if pypdf:
            pdf = pypdf.PdfReader(io.BytesIO(file_bytes))
            for page in pdf.pages:
                content += page.extract_text() + "\n"
        else:
            content = "[PDF processing not available]"
    elif filename.endswith(".docx"):
        if docx:
            doc = docx.Document(io.BytesIO(file_bytes))
            for para in doc.paragraphs:
                content += para.text + "\n"
        else:
            content = "[DOCX processing not available]"
    elif filename.endswith((".txt", ".csv")):
        content = file_bytes.decode("utf-8")
    
    return content

@app.get("/")
def home():
    return {"message": "Self-Healing RAG API running"}

@app.post("/api/chat")
async def chat(
    message: Optional[str] = Form(None),
    files: Optional[Union[List[UploadFile], UploadFile]] = File(None),
    history: Optional[str] = Form(None)
):
    # Normalize files to a list (Fixes the 422 error!)
    file_list = []
    if files:
        if isinstance(files, list):
            file_list = files
        else:
            file_list = [files]
    
    last_msg = message or ""
    
    # 1. Process and Store Files if any
    if file_list:
        for file in file_list:
            text = await extract_text_from_file(file)
            if text.strip():
                # Add to Vector DB
                doc_id = str(uuid.uuid4())
                add_document(text, {"filename": file.filename}, doc_id)
    
    # 2. Retrieve Relevant Context from Vector DB
    context = ""
    if last_msg:
        search_results = query_documents(last_msg, n_results=2)
        if search_results['documents'] and search_results['documents'][0]:
            # Combine the top results into a context string
            context = "\n".join(search_results['documents'][0])

    async def generate():
        # Inform user we are using retrieved context
        if context:
            prefix = "Based on your documents, "
            for word in prefix.split():
                yield f"data: {json.dumps({'text': word + ' '})}\n\n"
                await asyncio.sleep(0.05)
            
            # Simulated answer based on the context snippets
            answer = f"I found information regarding '{last_msg}'. Here is what I found: " + context[:200] + "..."
            for word in answer.split():
                yield f"data: {json.dumps({'text': word + ' '})}\n\n"
                await asyncio.sleep(0.05)
        else:
            words = f"I processsed your request. Since I couldn't find specific matching context in your uploaded documents, I'm answering from general knowledge: You said: {last_msg}".split()
            for word in words:
                yield f"data: {json.dumps({'text': word + ' '})}\n\n"
                await asyncio.sleep(0.05)
                
        yield "data: [DONE]\n\n"
        
    return StreamingResponse(generate(), media_type="text/event-stream")
