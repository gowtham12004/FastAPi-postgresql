
import React from 'react';
import { AssessmentTab } from '../types';
import { Icons } from '../constants';

interface OverviewProps {
  onNavigate: (tab: AssessmentTab) => void;
}

const Overview: React.FC<OverviewProps> = ({ onNavigate }) => {
  const requirements = [
    { title: 'FastAPI REST API', desc: 'Robust service implementation using modern Python 3.10+ features.' },
    { title: 'PostgreSQL Integration', desc: 'Persistent state management using SQLAlchemy/SQLModel.' },
    { title: 'External API Logic', desc: 'AI-Powered summarization using Gemini API as the external integration.' },
    { title: 'Strict Validation', desc: 'Pydantic models for every request and response schema.' },
    { title: 'Comprehensive Testing', desc: 'Unit and integration tests with Pytest and HTTPX.' },
    { title: 'Quality Documentation', desc: 'Exhaustive README covering design decisions and architecture.' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Solution Strategy: AI-Powered Task Summarizer</h2>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          This workspace implements a production-ready solution for the "Python Backend Engineer" assessment. 
          We use an <strong>AI-Powered Task Summarizer</strong> use case to demonstrate complex data flows, 
          external API integration, and clean architectural patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {requirements.map((req, idx) => (
          <div key={idx} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-indigo-300 transition-colors group">
            <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Icons.CheckCircle />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{req.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{req.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2">Ready to explore the architecture?</h3>
          <p className="text-indigo-100 opacity-90">View the source code, documentation, and live playground below.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => onNavigate(AssessmentTab.CODE)}
            className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Browse Code
          </button>
          <button 
            onClick={() => onNavigate(AssessmentTab.PLAYGROUND)}
            className="bg-indigo-500/50 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-500 transition-colors border border-indigo-400"
          >
            Live Playground
          </button>
        </div>
      </div>

      <div className="mt-16 border-t border-slate-200 pt-12">
        <h3 className="text-xl font-bold mb-6">Workflow Walkthrough</h3>
        <div className="space-y-8">
          {[
            { step: '01', title: 'Data Ingestion', text: 'Client sends a POST request with task details. Pydantic validates the input schema immediately.' },
            { step: '02', title: 'External Integration', text: 'The service asynchronously calls the Gemini API to generate a concise summary and determine a category.' },
            { step: '03', title: 'Persistence', text: 'Enriched data (original + AI summary) is committed to the PostgreSQL database using SQLAlchemy.' },
            { step: '04', title: 'Response', text: 'A validated response model is returned to the client with appropriate HTTP status codes (201 Created).' },
          ].map((item, idx) => (
            <div key={idx} className="flex space-x-6">
              <span className="text-4xl font-black text-slate-100 select-none leading-none">{item.step}</span>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-slate-600 text-sm max-w-2xl">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
