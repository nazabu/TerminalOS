import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTerminal } from '../hooks/useTerminal';

interface TerminalProps {
  terminal: ReturnType<typeof useTerminal>;
}

const TypewriterLine = ({ text, delay }: { text: string; delay: number }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, 30);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <div>{displayed}</div>;
};

export function Terminal({ terminal }: TerminalProps) {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { state, executeCommand } = terminal;

  // Boot sequence effect
  useEffect(() => {
    if (state.logs.length > 0) {
      setIsBooting(false);
      return;
    }
    const timer = setTimeout(() => setIsBooting(false), 2000);
    return () => clearTimeout(timer);
  }, [state.logs.length]);

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.logs, isBooting]);

  // Focus input on any key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      inputRef.current?.focus();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        executeCommand(input, setInput);
        setHistoryIndex(-1);
      }
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const history = state.logs.map(l => l.cmd);
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const history = state.logs.map(l => l.cmd);
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const bootLines = [
    "Terminal OS v1.0.0",
    "Initializing kernel...",
    "Loading user data...",
    "Type 'help' to see available commands."
  ];

  return (
    <div className="h-full w-full bg-transparent text-slate-300 font-mono p-4 sm:p-8 text-sm sm:text-base selection:bg-slate-700 relative overflow-hidden hide-cursor">
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 scanlines z-50 mix-blend-overlay opacity-50 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 h-full overflow-y-auto custom-scrollbar pb-16 pr-4">
        <div className="mb-6 text-slate-500">
          <AnimatePresence>
            {isBooting ? (
              <motion.div exit={{ opacity: 0 }}>
                {bootLines.map((line, i) => (
                  <TypewriterLine key={i} text={line} delay={i * 0.6} />
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div>Terminal OS v1.0.0</div>
                <div>Type 'help' to see available commands.</div>
                {state.lastVisit && (
                  <div className="text-xs mt-1 opacity-50">
                    Last login: {new Date(state.lastVisit).toLocaleString()}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col">
          <AnimatePresence initial={false}>
            {state.logs.map((log) => (
              <motion.div 
                key={log.id} 
                className="mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="flex items-center text-emerald-500">
                  <span className="mr-2">guest@terminal-os:~$</span>
                  <span className="text-white">{log.cmd}</span>
                </div>
                <div>{log.output}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!isBooting && (
          <motion.div 
            className="flex items-center text-emerald-500 mt-2 border-l-2 border-emerald-500/50 pl-3 glow-flicker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="mr-2 shrink-0">guest@terminal-os:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none border-none flex-1 text-white caret-emerald-500"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </motion.div>
        )}
        <div ref={bottomRef} className="h-16" />
      </div>
    </div>
  );
}


