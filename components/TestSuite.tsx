
import React from 'react';
import { Icons } from '../constants';

const TestSuite: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-700">
          <Icons.Shield />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pytest & HTTPX Test Suite</h2>
          <p className="text-slate-500 text-sm">Validating endpoints, models, and external integrations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Unit Tests
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start">
              <Icons.CheckCircle />
              <span className="ml-2">Pydantic schema validation tests</span>
            </li>
            <li className="flex items-start">
              <Icons.CheckCircle />
              <span className="ml-2">External service logic mocking</span>
            </li>
            <li className="flex items-start">
              <Icons.CheckCircle />
              <span className="ml-2">Database model field constraints</span>
            </li>
          </ul>
        </div>
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            Integration Tests
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start">
              <Icons.CheckCircle />
              <span className="ml-2">Full POST-to-GET roundtrip lifecycle</span>
            </li>
            <li className="flex items-start">
              <Icons.CheckCircle />
              <span className="ml-2">Error code verification (404, 422)</span>
            </li>
            <li className="flex items-start">
              <Icons.CheckCircle />
              <span className="ml-2">Dependency injection override (test_db)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-bold text-slate-900">Example: test_main.py</h3>
        <div className="bg-[#1e1e1e] rounded-2xl p-6 overflow-hidden relative">
          <div className="absolute top-4 right-4 text-xs font-bold text-slate-500 bg-slate-800 px-3 py-1 rounded">MOCKING DATABASE</div>
          <pre className="text-indigo-300 font-mono text-xs overflow-x-auto leading-relaxed">
{`import pytest
from httpx import AsyncClient
from .main import app

@pytest.mark.asyncio
async def test_create_task_success():
    """
    Test POST endpoint with external API mocking.
    """
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/tasks/", json={
            "title": "Integration Test",
            "content": "Checking the full API pipeline"
        })
    
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Integration Test"
    assert "summary" in data
    assert data["id"] is not None

@pytest.mark.asyncio
async def test_get_task_not_found():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/tasks/99999")
    assert response.status_code == 404`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TestSuite;
