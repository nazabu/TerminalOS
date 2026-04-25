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

const terminalVariants = {
  initial: { 
    opacity: 0, 
    scaleY: 0.01,
    scaleX: 0
  },
  animate: { 
    opacity: 1, 
    scaleY: [0.01, 0.01, 1],
    scaleX: [0, 1, 1],
    filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
    transition: { 
      duration: 0.7, 
      times: [0, 0.4, 1],
      ease: "easeInOut"
    }
  },
  exit: { 
    opacity: [1, 1, 0],
    scaleY: [1, 0.01, 0.01],
    scaleX: [1, 1, 0],
    filter: ['blur(0px)', 'blur(5px)', 'blur(10px)'],
    transition: { 
      duration: 0.5,
      times: [0, 0.6, 1],
      ease: "easeIn"
    }
  }
};

const uiVariants = {
  initial: { 
    opacity: 0,
    filter: 'blur(20px)',
    scale: 1.1,
  },
  animate: { 
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1],
    }
  },
  exit: { 
    opacity: [1, 0.8, 0],
    x: [0, -15, 15, -10, 10, 0],
    y: [0, 10, -10, 10, -10, 0],
    filter: [
      'blur(0px)', 
      'blur(5px)', 
      'blur(10px)', 
      'blur(15px)'
    ],
    scale: [1, 1.05, 1],
    transition: { 
      duration: 0.6,
      times: [0, 0.2, 0.4, 1]
    }
  }
};

export default function App() {
  const terminal = useTerminal();

  return (
    <div className="fixed inset-0 w-full h-full bg-[#f4f1ea] overflow-hidden">
      <NeuralBackground />
      <CustomCursor />
      <AnimatePresence mode="wait">
        {terminal.state.mode === 'terminal' ? (
          <motion.div 
            key="terminal"
            variants={terminalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 z-10 origin-center"
          >
            <Terminal terminal={terminal} />
          </motion.div>
        ) : (
          <motion.div 
            key="ui"
            variants={uiVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 z-10 origin-center"
          >
            <GlassDashboard terminal={terminal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
