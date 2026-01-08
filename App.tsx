
import React, { useState } from 'react';
import { AssessmentTab } from './types';
import { Icons } from './constants';
import CodeExplorer from './components/CodeExplorer';
import DocViewer from './components/DocViewer';
import Overview from './components/Overview';
import ApiPlayground from './components/ApiPlayground';
import TestSuite from './components/TestSuite';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AssessmentTab>(AssessmentTab.OVERVIEW);

  const tabs = [
    { id: AssessmentTab.OVERVIEW, label: 'Overview', icon: Icons.Layout },
    { id: AssessmentTab.CODE, label: 'Source Code', icon: Icons.Code },
    { id: AssessmentTab.DOCS, label: 'Documentation', icon: Icons.FileText },
    { id: AssessmentTab.TESTING, label: 'Test Suite', icon: Icons.Shield },
    { id: AssessmentTab.PLAYGROUND, label: 'API Playground', icon: Icons.Activity },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Icons.Terminal />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">FastAPI Assessment Studio</h1>
            <p className="text-xs text-slate-500">Python Backend Engineering Solution Framework</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-sm font-medium text-slate-500 flex items-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            System Ready
          </span>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            Export Project
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-50 border-r border-slate-200 hidden md:flex flex-col p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-white shadow-sm border border-slate-200 text-indigo-600'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <tab.icon />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
          
          <div className="mt-auto p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <h4 className="text-indigo-900 text-xs font-bold uppercase tracking-wider mb-2">Tech Stack</h4>
            <div className="space-y-1">
              {['Python 3.10+', 'FastAPI', 'PostgreSQL', 'Pydantic'].map(tech => (
                <div key={tech} className="flex items-center text-xs text-indigo-700">
                  <Icons.CheckCircle />
                  <span className="ml-2">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="md:hidden flex overflow-x-auto bg-white border-b border-slate-200 p-2 sticky top-16 z-10 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap flex items-center space-x-2 px-4 py-2 rounded-lg mx-1 ${
                activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-600'
              }`}
            >
              <tab.icon />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white">
          {activeTab === AssessmentTab.OVERVIEW && <Overview onNavigate={setActiveTab} />}
          {activeTab === AssessmentTab.CODE && <CodeExplorer />}
          {activeTab === AssessmentTab.DOCS && <DocViewer />}
          {activeTab === AssessmentTab.TESTING && <TestSuite />}
          {activeTab === AssessmentTab.PLAYGROUND && <ApiPlayground />}
        </main>
      </div>
    </div>
  );
};

export default App;
