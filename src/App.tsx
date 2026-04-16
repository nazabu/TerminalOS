/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTerminal } from './hooks/useTerminal';
import { Terminal } from './components/Terminal';
import { GlassDashboard } from './components/GlassDashboard';
import { CustomCursor } from './components/CustomCursor';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const terminal = useTerminal();

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {terminal.state.mode === 'terminal' ? (
          <motion.div 
            key="terminal"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-screen"
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
            className="min-h-screen"
          >
            <GlassDashboard terminal={terminal} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
