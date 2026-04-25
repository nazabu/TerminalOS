import React from 'react';
import { userData } from '../data/content';
import { Terminal as TerminalIcon, User, Code, Wrench, Mail, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';
import { useTerminal } from '../hooks/useTerminal';
import { motion } from 'motion/react';

interface GlassDashboardProps {
  terminal: ReturnType<typeof useTerminal>;
}

export function GlassDashboard({ terminal }: GlassDashboardProps) {
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
    <div className="h-full w-full bg-transparent text-white p-4 sm:p-8 font-sans relative overflow-y-auto custom-scrollbar hide-cursor">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-12">
          <motion.h1 
            className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"
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
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 border border-emerald-500/30 backdrop-blur-md transition-all text-sm font-medium hover:glow-flicker"
          >
            <TerminalIcon size={16} className="text-emerald-400" />
            Open Terminal
          </motion.button>
        </header>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Bio Card */}
          <motion.div variants={cardVariants} className="md:col-span-2 bg-[#050505]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.5)] hover:border-emerald-500/20 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <User size={24} />
              <h2 className="text-xl font-semibold text-white">About Me</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg">
              {userData.bio}
            </p>
          </motion.div>

          {/* Contact Card */}
          <motion.div variants={cardVariants} className="bg-[#050505]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.5)] hover:border-emerald-500/20 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-emerald-400">
              <Mail size={24} />
              <h2 className="text-xl font-semibold text-white">Contact</h2>
            </div>
            <div className="flex flex-col gap-4">
              <a href={`mailto:${userData.contact.email}`} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                <Mail size={18} className="text-emerald-500/70" /> {userData.contact.email}
              </a>
              <a href={userData.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                <Github size={18} className="text-emerald-500/70" /> GitHub
              </a>
              <a href={userData.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                <Linkedin size={18} className="text-emerald-500/70" /> LinkedIn
              </a>
              <a href={userData.contact.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                <Twitter size={18} className="text-emerald-500/70" /> Twitter
              </a>
            </div>
          </motion.div>

          {/* Projects Card */}
          <motion.div variants={cardVariants} className="md:col-span-2 bg-[#050505]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.5)] hover:border-emerald-500/20 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-emerald-400">
              <Code size={24} />
              <h2 className="text-xl font-semibold text-white">Projects</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userData.projects.map((project) => (
                <div key={project.name} className="bg-black/40 rounded-2xl p-5 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-white">{project.name}</h3>
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Card */}
          <motion.div variants={cardVariants} className="bg-[#050505]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.5)] hover:border-emerald-500/20 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-emerald-400">
              <Wrench size={24} />
              <h2 className="text-xl font-semibold text-white">Skills</h2>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.frontend.map(s => (
                    <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.backend.map(s => (
                    <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.tools.map(s => (
                    <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


