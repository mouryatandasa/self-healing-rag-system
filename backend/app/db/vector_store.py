from langchain_text_splitters import RecursiveCharacterTextSplitter
import chromadb
from chromadb.utils import embedding_functions
import os
import uuid

# Initialize ChromaDB
PERSISTENT_PATH = os.path.join(os.path.dirname(__file__), "chroma_db")
client = chromadb.PersistentClient(path=PERSISTENT_PATH)

# Using a standard embedding function
embedding_func = embedding_functions.DefaultEmbeddingFunction()

# Text splitter for chunking
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=600,
    chunk_overlap=100,
    length_function=len,
)

def get_or_create_collection(name="documents"):
    return client.get_or_create_collection(
        name=name, 
        embedding_function=embedding_func
    )

def add_document(text, metadata, base_doc_id):
    collection = get_or_create_collection()
    
    # Chunk the text
    chunks = text_splitter.split_text(text)
    
    documents = []
    metadatas = []
    ids = []
    
    for i, chunk in enumerate(chunks):
        documents.append(chunk)
        # Combine base metadata with chunk info
        chunk_metadata = metadata.copy()
        chunk_metadata["chunk_index"] = i
        metadatas.append(chunk_metadata)
        ids.append(f"{base_doc_id}_{i}")
    
    # Add all chunks to the collection
    collection.add(
        documents=documents,
        metadatas=metadatas,
        ids=ids
    )

def query_documents(query_text, n_results=3):
    collection = get_or_create_collection()
    results = collection.query(
        query_texts=[query_text],
        n_results=n_results
    )
    return results

