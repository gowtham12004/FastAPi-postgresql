
import React, { useState } from 'react';
import { Icons } from '../constants';

const DocViewer: React.FC = () => {
  const [view, setView] = useState<'readme' | 'pdf'>('readme');

  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-50 border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <button 
            onClick={() => setView('readme')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${view === 'readme' ? 'bg-white shadow-sm border border-slate-200 text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            README.md
          </button>
          <button 
            onClick={() => setView('pdf')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${view === 'pdf' ? 'bg-white shadow-sm border border-slate-200 text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Assessment Report (PDF)
          </button>
        </div>
        <button className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
          <Icons.ExternalLink />
          <span>Download PDF</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 bg-slate-100">
        {view === 'readme' ? (
          <div className="max-w-4xl mx-auto bg-white p-12 shadow-sm rounded-2xl border border-slate-200 prose prose-slate">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
              <h2 className="text-3xl font-extrabold text-slate-900 m-0">README.md</h2>
              <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">Project Guide</span>
            </div>

            <section className="mb-12">
              <h3 className="flex items-center space-x-2 text-xl font-bold text-slate-900 mb-4">
                <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded text-sm">1</span>
                <span>Problem Understanding</span>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                The objective is to architect a robust backend that integrates <strong>FastAPI</strong>, <strong>PostgreSQL</strong>, and an external AI layer (Gemini). 
                We implement an async pipeline to enrich task data before persistence, ensuring the database remains a source of high-quality, processed information.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="flex items-center space-x-2 text-xl font-bold text-slate-900 mb-4">
                <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded text-sm">2</span>
                <span>Design Decisions</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                <div className="p-5 border border-slate-100 rounded-xl shadow-sm bg-slate-50">
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center text-sm">
                    <span className="mr-2"><Icons.Database /></span> Indexed Storage
                  </h4>
                  <p className="text-xs text-slate-500">
                    PostgreSQL tables utilize indexes on query-heavy fields (category, id) to maintain O(log n) lookup performance.
                  </p>
                </div>
                <div className="p-5 border border-slate-100 rounded-xl shadow-sm bg-slate-50">
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center text-sm">
                    <span className="mr-2"><Icons.Shield /></span> Error Resiliency
                  </h4>
                  <p className="text-xs text-slate-500">
                    Implemented global 504 Gateway Timeout handlers for third-party network failures.
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Page 1 */}
            <div className="bg-white p-16 shadow-lg rounded-sm border border-slate-200 min-h-[1100px] relative">
              <div className="absolute top-8 right-8 text-slate-300 font-mono text-xs italic">Assessment Submission | Confidential</div>
              
              <div className="mt-20 text-center mb-24">
                <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Technical Assessment Report</h1>
                <p className="text-xl text-slate-500">FastAPI & PostgreSQL Backend Engineering</p>
                <div className="mt-12 h-1 w-24 bg-indigo-600 mx-auto"></div>
              </div>

              <div className="space-y-12">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">I. Executive Summary</h2>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    This document outlines the architectural approach for the <strong>AI-Powered Task Manager</strong>. 
                    The solution is built on a non-blocking, asynchronous FastAPI foundation, prioritizing data integrity through Pydantic validation 
                    and resilient external service communication.
                  </p>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">II. System Architecture Diagram</h2>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50 flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex space-x-6">
                        <div className="w-24 h-24 bg-white border-2 border-indigo-600 rounded-xl flex items-center justify-center flex-col shadow-sm">
                          <Icons.Layout />
                          <span className="text-[10px] font-bold mt-1">Client</span>
                        </div>
                        <div className="h-24 flex items-center">
                          <div className="w-12 h-0.5 bg-slate-300 relative">
                            <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-300 transform rotate-45"></div>
                          </div>
                        </div>
                        <div className="w-32 h-24 bg-indigo-600 text-white rounded-xl flex items-center justify-center flex-col shadow-md">
                          <Icons.Terminal />
                          <span className="text-[10px] font-bold mt-1">FastAPI</span>
                        </div>
                        <div className="h-24 flex items-center">
                          <div className="w-12 h-0.5 bg-slate-300 relative">
                            <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-300 transform rotate-45"></div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                           <div className="w-24 h-10 bg-white border border-slate-300 rounded-lg flex items-center justify-center space-x-2 shadow-sm">
                             <Icons.Database />
                             <span className="text-[10px] font-bold">Postgres</span>
                           </div>
                           <div className="w-24 h-10 bg-white border border-slate-300 rounded-lg flex items-center justify-center space-x-2 shadow-sm">
                             <Icons.Activity />
                             <span className="text-[10px] font-bold">Gemini API</span>
                           </div>
                        </div>
                      </div>
                      <p className="text-[10px] font-mono text-slate-400">Layered Communication Flow v1.0</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">III. Core Implementation Strategies</h2>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm">Resiliency Strategy</h4>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        Implemented global exception handlers for <code>httpx.TimeoutException</code>. This ensures that downstream latency 
                        from external LLM providers results in a clean 504 Gateway Timeout response rather than process hangs or internal server errors (500).
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm">Validation Strategy</h4>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        Pydantic V2 is used for strict runtime type checking. Every request is scrubbed and validated before hitting the database layer, 
                        minimizing SQL injection risks and ensuring consistent state.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-16 right-16 flex justify-between text-[10px] font-bold text-slate-300 uppercase tracking-widest border-t border-slate-100 pt-4">
                <span>Page 1 of 2</span>
                <span>FastAPI Submission</span>
              </div>
            </div>

            {/* Page 2 */}
            <div className="bg-white p-16 shadow-lg rounded-sm border border-slate-200 min-h-[1100px] relative">
              <div className="absolute top-8 right-8 text-slate-300 font-mono text-xs italic">Assessment Submission | Confidential</div>
              
              <div className="space-y-12">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">IV. Security & Compliance</h2>
                  <ul className="space-y-4 text-sm text-slate-700">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                      <span><strong>Environment Isolation:</strong> Sensitive credentials (DB URLs, API Keys) are managed via <code>.env</code> files and never hardcoded in source.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                      <span><strong>Rate Limiting:</strong> Recommendation for production deployment includes Redis-backed middleware to prevent DoS on Gemini API endpoints.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                      <span><strong>Input Sanitization:</strong> Automatic stripping of whitespace and HTML tags in Pydantic validators.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">V. Operational Readiness (Deployment)</h2>
                  <div className="bg-slate-900 rounded-xl p-6 font-mono text-[11px] text-indigo-300 overflow-hidden shadow-inner">
                    <div className="text-slate-500 mb-2"># Build and run the stack</div>
                    <div>$ docker-compose up --build -d</div>
                    <div className="mt-4 text-slate-500 mb-2"># Run database migrations</div>
                    <div>$ alembic upgrade head</div>
                    <div className="mt-4 text-slate-500 mb-2"># Execute full test suite</div>
                    <div>$ pytest -v --cov=app tests/</div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">VI. API Documentation (OpenAPI)</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">POST</span>
                        <code className="text-xs font-bold text-slate-700">/tasks/</code>
                      </div>
                      <p className="text-[11px] text-slate-500">Creates a new task. Enriches with AI summary. Returns 201 Created.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg opacity-60">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">GET</span>
                        <code className="text-xs font-bold text-slate-700">/tasks/</code>
                      </div>
                      <p className="text-[11px] text-slate-500">Retrieves task list with metadata. Supports pagination parameters.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-16 right-16 flex justify-between text-[10px] font-bold text-slate-300 uppercase tracking-widest border-t border-slate-100 pt-4">
                <span>Page 2 of 2</span>
                <span>FastAPI Submission</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocViewer;
