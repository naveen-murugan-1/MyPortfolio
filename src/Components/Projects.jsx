import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import Doodles from './Doodles';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, aboutRes] = await Promise.all([
          api.get('/projects'),
          api.get('/about')
        ]);
        setProjects(projRes.data);
        if (aboutRes.data && aboutRes.data.length > 0 && aboutRes.data[0].sectionBackgrounds?.projects) {
          setBgImage(`url('${aboutRes.data[0].sectionBackgrounds.projects}')`);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchData();
  }, []);

  const handleViewProject = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const displayProjects = projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section
      id="projects"
      className={`py-20 relative font-projects overflow-hidden min-h-[900px] flex flex-col justify-center bg-cover bg-center ${bgImage ? 'md:bg-fixed' : ''}`}
      style={bgImage ? { backgroundImage: bgImage } : { backgroundColor: '#000000' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <Doodles sectionName="projects" />
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500/10 via-violet-900/5 to-transparent blur-[80px] rounded-[100%]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-heading-container mb-24"
        >
          <h2 className="section-heading">
            <span className="text-white capitalize">SYSTEMS INTEGRATION</span>
          </h2>
          <div className="section-underline"></div>
        </motion.div>

        {displayProjects.length > 0 ? (
          <motion.div 
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             className="flex flex-wrap justify-center gap-8 w-full"
          >
              {displayProjects.map((project, index) => {
                const isHovered = hoveredIndex === index;

                return (
                  <motion.div
                    key={project._id}
                    variants={itemVariants}
                    id={`projects-${project.title ? project.title.toLowerCase().replace(/\s+/g, '-') : index}`}
                    className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-md"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* The Hover Card */}
                    <div
                      className="relative w-full aspect-[4/3] rounded-2xl cursor-pointer border border-violet-500/30 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:border-violet-500/60"
                      style={{
                        transition: 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      }}
                    >
                      {/* Front Face: High-resolution image with a bottom-aligned glassmorphism title bar */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                      >
                        {project.image ? (
                           <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[30%] sepia-[20%] mix-blend-luminosity" />
                        ) : (
                           <div className="w-full h-full bg-gradient-to-br from-gray-900 to-obsidian flex items-center justify-center font-bold text-4xl text-violet-400">
                             {project.title.charAt(0)}
                           </div>
                        )}
                        <div className="absolute inset-x-0 inset-y-0 bg-violet-900/20 mix-blend-overlay"></div>
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-obsidian/80 backdrop-blur-md border-t border-violet-500/40">
                          <h3 className="text-2xl font-bold text-violet-400">{project.title}</h3>
                        </div>
                      </div>

                      {/* Hover Overlay: Full glassmorphism effect */}
                      <div
                        className={`absolute inset-0 bg-obsidian/90 p-8 flex flex-col items-center justify-center transition-opacity duration-500 ${isHovered ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                      >
                        <h3 className="text-xl font-bold text-violet-400 mb-3 text-center uppercase tracking-widest border-b border-violet-500/30 pb-2 w-full">TECHNICAL SPECS</h3>
                        
                        <div className="text-violet-100 text-[11px] md:text-xs text-left mb-4 leading-relaxed flex-grow w-full font-mono space-y-2 mt-2">
                           {project.techStack?.length > 0 ? (
                             project.techStack.slice(0,4).map((tech, i) => (
                               <div key={i} className="flex justify-between border-b border-gray-800 pb-1">
                                 <span className="text-gray-400">SPEC_{i+1}:</span>
                                 <span className="text-violet-300 font-bold">{tech}</span>
                               </div>
                             ))
                           ) : (
                             <>
                               <div className="flex justify-between border-b border-gray-800 pb-1"><span className="text-gray-400">LATENCY:</span> <span className="text-violet-300 font-bold">12ms</span></div>
                               <div className="flex justify-between border-b border-gray-800 pb-1"><span className="text-gray-400">POWER:</span> <span className="text-violet-300 font-bold">1.2W</span></div>
                               <div className="flex justify-between border-b border-gray-800 pb-1"><span className="text-gray-400">FREQ:</span> <span className="text-violet-300 font-bold">2.4GHz</span></div>
                             </>
                           )}
                           <div className="text-[10px] text-gray-500 mt-4 line-clamp-3 overflow-hidden">{project.description}</div>
                        </div>

                        {/* Two call-to-action buttons */}
                        <div className="flex gap-3 justify-center mt-auto w-full">
                          {project.link && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleViewProject(project.link); }}
                              className="flex-1 bg-white text-gray-900 text-sm font-bold py-2 px-2 rounded-xl transition-all hover:scale-105 active:scale-95"
                            >
                              Live Demo
                            </button>
                          )}
                          {project.repo && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleViewProject(project.repo); }}
                              className="flex-1 bg-black/40 hover:bg-black/60 text-white text-sm font-bold py-2 px-2 rounded-xl border border-white/30 transition-all hover:scale-105 active:scale-95"
                            >
                              View Code
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </motion.div>
        ) : (
          <div className="text-center text-gray-400">Loading projects...</div>
        )}
      </div>
    </section>
  );
};

export default Projects;
