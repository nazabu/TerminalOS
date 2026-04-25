/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTerminal } from './hooks/useTerminal';
import { Terminal } from './components/Terminal';
import { GlassDashboard } from './components/GlassDashboard';
import { CustomCursor } from './components/CustomCursor';
import { NeuralBackground } from './components/NeuralBackground';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const terminal = useTerminal();

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-50 overflow-hidden">
      <NeuralBackground />
      <CustomCursor />
      <AnimatePresence mode="wait">
        {terminal.state.mode === 'terminal' ? (
          <motion.div 
            key="terminal"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 z-10"
          >
            <Terminal terminal={terminal} />
          </motion.div>
        ) : (
          <motion.div 
            key="ui"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 z-10"
          >
            <GlassDashboard terminal={terminal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
