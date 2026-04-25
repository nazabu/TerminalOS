import React, { useState } from 'react';
import { userData } from '../data/content';
import { Terminal as TerminalIcon, User, Code, Wrench, Mail, ExternalLink, Github, Linkedin, Twitter, X } from 'lucide-react';
import { useTerminal } from '../hooks/useTerminal';
import { motion, AnimatePresence } from 'motion/react';

interface GlassDashboardProps {
  terminal: ReturnType<typeof useTerminal>;
}

export function GlassDashboard({ terminal }: GlassDashboardProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [hidingProject, setHidingProject] = useState<string | null>(null);

  const handleClose = () => {
    setHidingProject(selectedProject);
    setTimeout(() => {
      setSelectedProject(null);
      setHidingProject(null);
    }, 800);
  };

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
    <div className="h-full w-full bg-transparent text-stone-800 p-4 sm:p-8 font-sans relative overflow-y-auto custom-scrollbar hide-cursor">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-12">
          <motion.h1 
            className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-stone-900 to-stone-500"
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
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 hover:bg-white/80 border border-amber-700/30 backdrop-blur-md transition-all text-sm font-medium hover:glow-flicker text-stone-900"
          >
            <TerminalIcon size={16} className="text-amber-700" />
            Return to Terminal
          </motion.button>
        </header>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Bio Card */}
          <motion.div variants={cardVariants} className="md:col-span-2 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:border-amber-700/30 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-4 text-amber-700">
              <User size={24} />
              <h2 className="text-xl font-semibold text-stone-900">About Me</h2>
            </div>
            <p className="text-stone-700 leading-relaxed text-lg">
              {userData.bio}
            </p>
          </motion.div>

          {/* Contact Card */}
          <motion.div variants={cardVariants} className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:border-amber-700/30 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-amber-700">
              <Mail size={24} />
              <h2 className="text-xl font-semibold text-stone-900">Contact</h2>
            </div>
            <div className="flex flex-col gap-4">
              <a href={`mailto:${userData.contact.email}`} className="flex items-center gap-3 text-stone-700 hover:text-stone-900 transition-colors">
                <Mail size={18} className="text-amber-700/70" /> {userData.contact.email}
              </a>
              <a href={userData.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-stone-700 hover:text-stone-900 transition-colors">
                <Github size={18} className="text-amber-700/70" /> GitHub
              </a>
              <a href={userData.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-stone-700 hover:text-stone-900 transition-colors">
                <Linkedin size={18} className="text-amber-700/70" /> LinkedIn
              </a>
              <a href={userData.contact.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-stone-700 hover:text-stone-900 transition-colors">
                <Twitter size={18} className="text-amber-700/70" /> Twitter
              </a>
            </div>
          </motion.div>

          {/* Projects Card */}
          <motion.div variants={cardVariants} className="md:col-span-2 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:border-amber-700/30 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-amber-700">
              <Code size={24} />
              <h2 className="text-xl font-semibold text-stone-900">Projects</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userData.projects.map((project) => (
                <motion.div 
                  key={project.name} 
                  layoutId={`project-container-${project.name}`}
                  onClick={() => setSelectedProject(project.name)}
                  className="bg-white/60 rounded-2xl p-5 border border-white/40 hover:border-amber-700/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(180,83,9,0.08)] cursor-pointer flex flex-col"
                >
                  <div className="flex justify-between items-start mb-2">
                    <motion.h3 layoutId={`project-title-${project.name}`} className="text-lg font-medium text-stone-900">{project.name}</motion.h3>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-stone-500 hover:text-amber-700 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-sm text-stone-600 mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs px-2 py-1 rounded-md bg-amber-700/10 border border-amber-700/20 text-amber-900">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Card */}
          <motion.div variants={cardVariants} className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:border-amber-700/30 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-amber-700">
              <Wrench size={24} />
              <h2 className="text-xl font-semibold text-stone-900">Skills</h2>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-medium text-stone-500 mb-3 uppercase tracking-wider">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.frontend.map(s => (
                    <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-white/60 border border-white/80 text-stone-800">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-stone-500 mb-3 uppercase tracking-wider">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.backend.map(s => (
                    <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-white/60 border border-white/80 text-stone-800">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-stone-500 mb-3 uppercase tracking-wider">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.tools.map(s => (
                    <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-white/60 border border-white/80 text-stone-800">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-8 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm pointer-events-auto"
              onClick={handleClose}
            />
            {(() => {
              const project = userData.projects.find((p) => p.name === selectedProject);
              if (!project) return null;
              
              const isHiding = hidingProject === project.name;

              return (
                <motion.div
                  layoutId={!isHiding ? `project-container-${project.name}` : undefined}
                  className={`w-full max-w-3xl rounded-3xl p-8 sm:p-12 overflow-hidden flex flex-col relative pointer-events-auto z-10 transition-colors duration-300 ${
                    isHiding ? 'bg-transparent border-transparent shadow-none' : 'bg-white/90 backdrop-blur-2xl border border-white/60 shadow-[0_32px_64px_rgba(0,0,0,0.1)]'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {isHiding && (
                    <div className="absolute inset-0 pointer-events-none z-0">
                      {Array.from({ length: 150 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ 
                            x: 0, 
                            y: 0,
                            scale: 1,
                            opacity: 1,
                          }}
                          animate={{ 
                            x: (Math.random() - 0.5) * 800, 
                            y: (Math.random() - 0.5) * 800,
                            rotate: (Math.random() - 0.5) * 720,
                            scale: 0,
                            opacity: 0,
                          }}
                          transition={{ duration: 0.6 + Math.random() * 0.4, ease: "easeOut" }}
                          className="absolute bg-white backdrop-blur-md rounded-sm"
                          style={{
                            left: `${(i % 15) * 6.66}%`,
                            top: `${Math.floor(i / 15) * 10}%`,
                            width: '6.67%',
                            height: '10.1%',
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {!isHiding && (
                    <>
                      <motion.button 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors z-20"
                      >
                        <X size={24} />
                      </motion.button>
                      <div className="flex justify-between items-start mb-6">
                        <motion.h3 layoutId={`project-title-${project.name}`} className="text-3xl font-bold text-stone-900 pr-12 relative z-10">{project.name}</motion.h3>
                      </div>
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        transition={{ duration: 0.2 }}
                        className="relative z-10"
                      >
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map((t) => (
                            <span key={t} className="text-sm px-3 py-1.5 rounded-md bg-amber-700/10 border border-amber-700/20 text-amber-900 font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                        <p className="text-lg text-stone-600 mb-8 leading-relaxed flex-1">
                          {project.description}
                        </p>
                        
                        <div className="mt-auto pt-8 border-t border-stone-200/50 flex justify-end">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-700 text-amber-50 hover:bg-amber-800 transition-colors shadow-lg shadow-amber-700/20 font-medium"
                          >
                            <span>View Project</span>
                            <ExternalLink size={18} />
                          </a>
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


