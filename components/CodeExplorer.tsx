
import React, { useState } from 'react';
import { CodeFile } from '../types';
import { Icons } from '../constants';

const CodeExplorer: React.FC = () => {
  const files: CodeFile[] = [
    {
      name: 'main.py',
      language: 'python',
      description: 'The primary entry point with global exception handling for network timeouts.',
      content: `import httpx
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas, database, external_service

app = FastAPI(title="AI-Powered Task Summarizer")

# --- Global Exception Handlers ---

@app.exception_handler(httpx.TimeoutException)
async def httpx_timeout_handler(request: Request, exc: httpx.TimeoutException):
    """
    Handle external API timeouts globally.
    Returns 504 Gateway Timeout as per assessment requirements.
    """
    return JSONResponse(
        status_code=status.HTTP_504_GATEWAY_TIMEOUT,
        content={
            "detail": "External AI service timed out. Please try again later.",
            "error_code": "GATEWAY_TIMEOUT_EXT_API"
        }
    )

# --- Dependencies ---

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Endpoints ---

@app.post("/tasks/", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    """
    POST: Create a task and process summary via External AI API.
    """
    # External Integration Logic (May trigger httpx.TimeoutException)
    ai_data = await external_service.generate_summary(task.content)
    
    db_task = models.Task(
        title=task.title,
        content=task.content,
        summary=ai_data.summary,
        category=ai_data.category
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks/", response_model=List[schemas.TaskResponse])
def get_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Task).offset(skip).limit(limit).all()

@app.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    for key, value in task_update.dict(exclude_unset=True).items():
        setattr(db_task, key, value)
    
    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(db_task)
    db.commit()
    return None
`
    },
    {
      name: 'models.py',
      language: 'python',
      description: 'SQLAlchemy Database Models.',
      content: `from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from .database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    summary = Column(Text)
    category = Column(String(100), index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
`
    },
    {
      name: 'schemas.py',
      language: 'python',
      description: 'Pydantic Request/Response validation schemas.',
      content: `from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    content: str = Field(..., min_length=5)

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

class TaskResponse(TaskBase):
    id: int
    summary: Optional[str] = None
    category: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
`
    },
    {
      name: 'external_service.py',
      language: 'python',
      description: 'Abstraction layer for third-party API integration.',
      content: `import httpx
import os
from pydantic import BaseModel

class AIResult(BaseModel):
    summary: str
    category: str

async def generate_summary(text: str) -> AIResult:
    """
    Simulates calling an LLM (e.g. Gemini) to summarize task content.
    Uses httpx with defined timeouts to test error handling.
    """
    api_key = os.getenv("API_KEY")
    
    # In production, we use a timeout config:
    # timeout = httpx.Timeout(10.0, connect=5.0)
    # async with httpx.AsyncClient(timeout=timeout) as client:
    #     ...
    
    return AIResult(
        summary=f"Processed summary of: {text[:20]}...",
        category="Work" if "work" in text.lower() else "Personal"
    )
`
    }
  ];

  const [activeFile, setActiveFile] = useState<CodeFile>(files[0]);

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-64 border-r border-slate-200 bg-slate-50 overflow-y-auto">
        <div className="p-4 uppercase text-[10px] font-bold text-slate-400 tracking-widest">Project Structure</div>
        <div className="space-y-1 p-2">
          {files.map((file) => (
            <button
              key={file.name}
              onClick={() => setActiveFile(file)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-all ${
                activeFile.name === file.name
                  ? 'bg-white shadow-sm border border-slate-200 text-indigo-600 font-medium'
                  : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              <Icons.FileText />
              <span>{file.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
        <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-[#333]">
          <div className="flex items-center space-x-2">
            <span className="text-emerald-400 text-xs px-2 py-0.5 border border-emerald-400/30 rounded uppercase font-bold">Python 3.10+</span>
            <span className="text-slate-400 text-sm font-mono">{activeFile.name}</span>
          </div>
          <button 
            className="text-slate-400 hover:text-white transition-colors" 
            title="Copy Content"
            onClick={() => {
              navigator.clipboard.writeText(activeFile.content);
              alert('Code copied to clipboard!');
            }}
          >
            <Icons.Copy />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed text-slate-300 whitespace-pre scrollbar-dark">
          {activeFile.content}
        </div>
        <div className="bg-[#252526] p-4 border-t border-[#333]">
          <h4 className="text-slate-400 text-xs font-bold uppercase mb-1">Documentation</h4>
          <p className="text-slate-500 text-sm">{activeFile.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CodeExplorer;
