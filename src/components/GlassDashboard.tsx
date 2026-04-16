import React, { useState, useEffect } from 'react';
import { userData } from '../data/content';
import { Terminal as TerminalIcon, User, Code, Wrench, Mail, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';
import { useTerminal } from '../hooks/useTerminal';
import { motion } from 'motion/react';

interface GlassDashboardProps {
  terminal: ReturnType<typeof useTerminal>;
}

export function GlassDashboard({ terminal }: GlassDashboardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white p-4 sm:p-8 font-sans relative overflow-hidden hide-cursor">
      {/* Abstract background blobs */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none"
        animate={{ x: mousePos.x * -2, y: mousePos.y * -2 }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none"
        animate={{ x: mousePos.x * 2, y: mousePos.y * 2 }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />

      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      >
        <header className="flex justify-between items-center mb-12">
          <motion.h1 
            className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Terminal OS
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => terminal.setMode('terminal')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 backdrop-blur-md transition-all text-sm font-medium shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <TerminalIcon size={16} />
            Return to Terminal
          </motion.button>
        </header>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Bio Card */}
          <motion.div variants={cardVariants} className="md:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-4 text-purple-300">
              <User size={24} />
              <h2 className="text-xl font-semibold">About Me</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {userData.bio}
            </p>
          </motion.div>

          {/* Contact Card */}
          <motion.div variants={cardVariants} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-pink-300">
              <Mail size={24} />
              <h2 className="text-xl font-semibold">Contact</h2>
            </div>
            <div className="flex flex-col gap-4">
              <a href={`mailto:${userData.contact.email}`} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Mail size={18} /> {userData.contact.email}
              </a>
              <a href={userData.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Github size={18} /> GitHub
              </a>
              <a href={userData.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href={userData.contact.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Twitter size={18} /> Twitter
              </a>
            </div>
          </motion.div>

          {/* Projects Card */}
          <motion.div variants={cardVariants} className="md:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-blue-300">
              <Code size={24} />
              <h2 className="text-xl font-semibold">Projects</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userData.projects.map((project) => (
                <div key={project.name} className="bg-black/20 rounded-2xl p-5 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-white">{project.name}</h3>
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Card */}
          <motion.div variants={cardVariants} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-green-300">
              <Wrench size={24} />
              <h2 className="text-xl font-semibold">Skills</h2>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.frontend.map(s => (
                    <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-200">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.backend.map(s => (
                    <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-200">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.tools.map(s => (
                    <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-200">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

