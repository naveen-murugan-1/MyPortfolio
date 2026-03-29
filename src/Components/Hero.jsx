import { Download } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Doodles from './Doodles';
import RadarScanner from './RadarScanner';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import api from '../api';

const Hero = ({ scrollToSection }) => {
  const [profile, setProfile] = useState(null);

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/about');
        if (res.data && res.data.length > 0) {
          setProfile(res.data[0]);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleDownloadResume = () => {
    if (profile?.resume) {
      window.open(profile.resume, '_blank');
    } else {
      alert("Resume not available yet.");
    }
  };

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center pt-16 text-white relative bg-obsidian border-b border-violet-900/40 overflow-hidden font-hero bg-cover bg-center ${profile?.sectionBackgrounds?.hero ? 'md:bg-fixed' : ''}`}
      style={profile?.sectionBackgrounds?.hero ? {
        backgroundImage: `url('${profile.sectionBackgrounds.hero}')`,
      } : {}}
    >
      <RadarScanner />
      <div className="absolute inset-0 bg-hex-grid"></div>
      {profile?.sectionBackgrounds?.hero && <div className="absolute inset-0 bg-obsidian/80 z-0"></div>}
      <Doodles sectionName="hero" />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: { onClick: { enable: true, mode: "push" }, onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { push: { quantity: 4 }, repulse: { distance: 200, duration: 0.4 } },
          },
          particles: {
            color: { value: "#8b5cf6" },
            links: { color: "#8b5cf6", distance: 150, enable: true, opacity: 0.4, width: 1 },
            move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1.5, straight: false },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col-reverse md:flex-row items-center gap-10 relative z-10 w-full">

        {/* 🚀 LEFT CONTENT WITH GLIDE ENTRANCE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-1/2 text-center md:text-left md:mb-0"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-tight">
            SIGNAL ARCHITECT: <br /><span className="text-violet-400">FROM SILICON TO SYSTEMS</span>
          </h1>

          <h2 className="text-xl md:text-2xl text-violet-400 font-bold mb-6 min-h-[2.5rem] tracking-wide">
            <Typewriter
              words={[
                'Embedded Systems', 'VLSI Design', 'Digital Signal Processing',
                'Hardware Interface Design', 'Systems Integration', 'Firmware Engineering'
              ]}
              loop={0} cursor cursorStyle="|" typeSpeed={60} deleteSpeed={40} delaySpeed={1200}
            />
          </h2>

          <p className="text-gray-200 mb-8 max-w-lg leading-relaxed font-sans text-sm md:text-base">
            {profile?.title || 'Passionate about building efficient, modern tech solutions.'}
          </p>

          <div className="flex flex-col gap-4 justify-center md:justify-start">
            <motion.button
              onClick={handleDownloadResume}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.9)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-[320px] flex border border-violet-400 text-violet-400 items-center justify-center gap-2 bg-obsidian/90 px-8 py-3.5 rounded-xl font-bold transition-all backdrop-blur-sm"
            >
              <Download size={18} className="animate-bounce" />
              Download Resume
            </motion.button>
          </div>
        </motion.div>

        {/* 🚀 RIGHT IMAGE WITH FLOATING & POP ENTRANCE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, type: 'spring', bounce: 0.2 }}
          className="md:w-1/2 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative group block"
          >
            <div className="absolute inset-0 rounded-full border border-violet-400/30 transition-all duration-500 -z-10"></div>
            <motion.img
              whileHover={{ scale: 1.03, rotate: 2 }}
              transition={{ duration: 0.4 }}
              src={profile?.profileImage || "/praveen.jpg"}
              alt={profile?.name || "Signal Architect"}
              className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-violet-400/60 object-cover cursor-pointer object-center filter"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
