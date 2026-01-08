
import React, { useState } from 'react';
import { Task } from '../types';
import { Icons } from '../constants';

const ApiPlayground: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete Project Documentation',
      content: 'Write the README for the assessment and check for typos.',
      summary: 'Finalize and proofread documentation.',
      category: 'Work',
      created_at: new Date().toISOString()
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = () => {
    if (!newTitle || !newContent) return;
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newTask: Task = {
        id: tasks.length + 1,
        title: newTitle,
        content: newContent,
        summary: `AI Summary: ${newContent.substring(0, 30)}...`,
        category: newContent.toLowerCase().includes('work') ? 'Work' : 'Personal',
        created_at: new Date().toISOString()
      };
      setTasks([newTask, ...tasks]);
      setNewTitle('');
      setNewContent('');
      setIsLoading(false);
    }, 1200);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">POST /tasks/</h3>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">Create Task</span>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Task Title</label>
              <input 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Weekly Groceries"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Content</label>
              <textarea 
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={3}
                placeholder="Detailed description of your task..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
            <button 
              onClick={handlePost}
              disabled={isLoading || !newTitle || !newContent}
              className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
                isLoading || !newTitle || !newContent 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Calling Gemini API...</span>
                </>
              ) : (
                <>
                  <Icons.Play />
                  <span>Execute Endpoint</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Server Logs</h4>
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="font-mono text-[13px] space-y-2 opacity-80 overflow-y-auto max-h-48">
            <div className="flex space-x-2">
              <span className="text-emerald-500">INFO:</span>
              <span>127.0.0.1:45322 - "POST /tasks/ HTTP/1.1" 201 Created</span>
            </div>
            <div className="flex space-x-2">
              <span className="text-indigo-400">DEBUG:</span>
              <span>External call to gemini-pro-vision starting...</span>
            </div>
            <div className="flex space-x-2">
              <span className="text-indigo-400">DEBUG:</span>
              <span>Response received from Gemini in 842ms.</span>
            </div>
            <div className="flex space-x-2">
              <span className="text-emerald-500">INFO:</span>
              <span>PostgreSQL Transaction committed (ID: {tasks.length}).</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-bold text-slate-900">GET /tasks/ (Database State)</h3>
          <span className="text-slate-400 text-xs">{tasks.length} total objects</span>
        </div>
        
        {tasks.length === 0 ? (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
            <p className="text-slate-400 italic">Database is currently empty.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            {tasks.map(task => (
              <div key={task.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow group relative">
                <button 
                  onClick={() => handleDelete(task.id)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${task.category === 'Work' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {task.category}
                  </span>
                  <span className="text-slate-400 text-[10px]">ID: {task.id}</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{task.title}</h4>
                <p className="text-sm text-slate-600 mb-3">{task.content}</p>
                
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mt-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center">
                    <Icons.CheckCircle />
                    <span className="ml-1">AI Enriched Summary</span>
                  </div>
                  <p className="text-xs text-indigo-700 font-medium italic">"{task.summary}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiPlayground;
