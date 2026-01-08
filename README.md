# FastAPI Take-Home Assessment 

A professional workbench and documentation suite for the **AI-Powered Task Summarizer** backend assessment. This project demonstrates a production-ready approach to building a FastAPI service with PostgreSQL persistence and external AI integrations.

## 🚀 Project Overview

Your task is to build a robust REST API service using FastAPI and PostgreSQL. The serviceshould act as a bridge between a local database and an external API (such as an LLM provider,GitHub, or a public data
service), demonstrating your ability to handle complex data flows, strict validation, and testing.

## 🛠 Tech Stack

- **Framework**: FastAPI (Python 3.10+)
- **Validation**: Pydantic v2
- **ORM**: SQLAlchemy / SQLModel
- **Database**: PostgreSQL
- **Testing**: Pytest & HTTPX (Async tests)
- **Deployment**: Docker & Docker Compose

## 🏗 Architecture & Design Patterns

### 1. Layered Architecture
The project is organized into distinct layers to promote maintainability and testability:
- **`main.py`**: Entry point and route definitions.
- **`models.py`**: Database schemas (SQLAlchemy).
- **`schemas.py`**: Data validation and serialization (Pydantic).
- **`external_service.py`**: Abstraction layer for third-party API communication.
- **`database.py`**: Connection pooling and session management.

### 2. Dependency Injection
We utilize FastAPI's dependency injection system for database sessions and configuration management, allowing for easy mocking during unit testing.


## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/tasks/` | Create a task (triggers AI summarization) |
| `GET` | `/tasks/` | List all tasks with pagination |
| `PUT` | `/tasks/{id}` | Update task details |
| `DELETE` | `/tasks/{id}` | Remove a task |

## 🧪 Testing Strategy

The solution includes a comprehensive test suite using `pytest`:
- **Unit Tests**: Testing Pydantic models and logic in `external_service.py` with mocks.
- **Integration Tests**: Using `httpx.AsyncClient` to perform full request-response cycles against a test database.

## 📝 Design Decisions & Assumptions

1. **AI Latency**: We assume the external AI API might be slow. The frontend implementation includes loading states, and the backend uses async calls.
2. **Data Integrity**: Pydantic models enforce strict length constraints and type checks to prevent database pollution.
3. **Graceful Degradation**: If the Gemini API is unreachable, the system is designed to return a `503 Service Unavailable` error rather than crashing.

---
*Created as part of a Senior Backend Engineering Assessment.*
