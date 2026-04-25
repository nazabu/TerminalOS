import React, { useState, useEffect, ReactNode } from 'react';
import { userData } from '../data/content';

export type Mode = 'terminal' | 'ui';

export interface Log {
  cmd: string;
  output: ReactNode;
  id: string;
}

export interface TerminalState {
  lastVisit: number | null;
  logs: Log[];
  mode: Mode;
  sessionStart: number;
}

export function useTerminal() {
  const [state, setState] = useState<TerminalState>({
    lastVisit: null,
    logs: [],
    mode: 'ui',
    sessionStart: Date.now(),
  });

  useEffect(() => {
    const storedLastVisit = localStorage.getItem('terminal_last_visit');
    const storedMode = localStorage.getItem('terminal_mode') as Mode | null;
    
    const now = Date.now();
    
    setState(prev => ({
      ...prev,
      lastVisit: storedLastVisit ? parseInt(storedLastVisit, 10) : null,
      mode: storedMode || 'ui',
    }));

    localStorage.setItem('terminal_last_visit', now.toString());
  }, []);

  const setMode = (mode: Mode) => {
    setState(prev => ({ ...prev, mode }));
    localStorage.setItem('terminal_mode', mode);
  };

  const clearLogs = () => {
    setState(prev => ({ ...prev, logs: [] }));
  };

  const addLog = (cmd: string, output: ReactNode) => {
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, { cmd, output, id: Math.random().toString(36).substring(7) }]
    }));
  };

  const executeCommand = (commandString: string, setInput?: (val: string) => void) => {
    const trimmed = commandString.trim();
    if (!trimmed) return;

    const args = trimmed.split(' ').filter(Boolean);
    const cmd = args[0].toLowerCase();

    let output: ReactNode = '';

    const ClickableCmd = ({ command, desc }: { command: string, desc: string }) => (
      <div>
        <span 
          className="text-amber-700 font-bold w-24 inline-block cursor-pointer hover:text-amber-600 transition-colors"
          onClick={() => setInput?.(command)}
        >
          {command}
        </span> 
        - {desc}
      </div>
    );

    switch (cmd) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 mt-2 mb-4">
            <ClickableCmd command="help" desc="List all commands" />
            <ClickableCmd command="whoami" desc="Personal info" />
            <ClickableCmd command="about" desc="Personal info" />
            <ClickableCmd command="projects" desc="List all projects (usage: projects [name])" />
            <ClickableCmd command="skills" desc="Categorized list of skills" />
            <ClickableCmd command="contact" desc="Links and Email" />
            <ClickableCmd command="status" desc="Show session time and current mode" />
            <ClickableCmd command="clear" desc="Wipe terminal logs" />
            <ClickableCmd command="ui" desc="Switch to UI mode" />
          </div>
        );
        break;
      case 'whoami':
      case 'about':
        output = <div className="mt-2 mb-4 text-slate-300">{userData.bio}</div>;
        break;
      case 'projects':
        if (args[1]) {
          const projectName = args.slice(1).join(' ').toLowerCase();
          const project = userData.projects.find(p => p.name.toLowerCase() === projectName);
          if (project) {
            output = (
              <div className="mt-2 mb-4">
                <div className="text-emerald-400 font-bold text-lg">{project.name}</div>
                <div className="text-slate-300 my-1">{project.description}</div>
                <div className="text-emerald-600">Tech: {project.tech.join(', ')}</div>
                <div className="text-slate-500 mt-1">Link: <a href={project.link} target="_blank" rel="noreferrer" className="underline hover:text-emerald-400">{project.link}</a></div>
              </div>
            );
          } else {
            output = <div className="mt-2 mb-4 text-rose-500">Project not found: {args.slice(1).join(' ')}</div>;
          }
        } else {
          output = (
            <div className="mt-2 mb-4 flex flex-col gap-2">
              {userData.projects.map(p => (
                <div key={p.name}>
                  <span 
                    className="text-emerald-500 font-bold cursor-pointer hover:text-emerald-400 transition-colors"
                    onClick={() => setInput?.(`projects ${p.name.toLowerCase()}`)}
                  >
                    {p.name}
                  </span> - {p.description}
                </div>
              ))}
              <div className="text-slate-500 text-sm mt-2">Tip: Click a project or type 'projects &lt;name&gt;' for details.</div>
            </div>
          );
        }
        break;
      case 'skills':
        output = (
          <div className="mt-2 mb-4 flex flex-col gap-2">
            <div><span className="text-emerald-400 font-bold">Frontend:</span> {userData.skills.frontend.join(', ')}</div>
            <div><span className="text-emerald-400 font-bold">Backend:</span> {userData.skills.backend.join(', ')}</div>
            <div><span className="text-emerald-400 font-bold">Tools:</span> {userData.skills.tools.join(', ')}</div>
          </div>
        );
        break;
      case 'contact':
        output = (
          <div className="mt-2 mb-4 flex flex-col gap-1">
            <div><span className="text-emerald-600 font-bold w-20 inline-block">Email:</span> <a href={`mailto:${userData.contact.email}`} className="underline hover:text-white">{userData.contact.email}</a></div>
            <div><span className="text-emerald-600 font-bold w-20 inline-block">GitHub:</span> <a href={userData.contact.github} target="_blank" rel="noreferrer" className="underline hover:text-white">{userData.contact.github}</a></div>
            <div><span className="text-emerald-600 font-bold w-20 inline-block">LinkedIn:</span> <a href={userData.contact.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-white">{userData.contact.linkedin}</a></div>
          </div>
        );
        break;
      case 'status':
        const sessionTime = Math.floor((Date.now() - state.sessionStart) / 1000);
        const lastVisitStr = state.lastVisit ? new Date(state.lastVisit).toLocaleString() : 'First visit';
        output = (
          <div className="mt-2 mb-4 flex flex-col gap-1">
            <div><span className="text-emerald-500 font-bold w-32 inline-block">Current Mode:</span> {state.mode}</div>
            <div><span className="text-emerald-500 font-bold w-32 inline-block">Session Time:</span> {sessionTime} seconds</div>
            <div><span className="text-emerald-500 font-bold w-32 inline-block">Last Visit:</span> {lastVisitStr}</div>
          </div>
        );
        break;
      case 'clear':
        clearLogs();
        return; // Return early to avoid adding the 'clear' command to logs
      case 'ui':
        output = <div className="mt-2 mb-4 text-emerald-500">Switching to UI mode...</div>;
        addLog(trimmed, output);
        setTimeout(() => setMode('ui'), 500);
        return;
      default:
        output = <div className="mt-2 mb-4 text-rose-500">Command not found: {cmd}. Type 'help' for a list of commands.</div>;
    }

    addLog(trimmed, output);
  };

  return {
    state,
    executeCommand,
    setMode,
    clearLogs
  };
}


