import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import { Cpu, Database, Layout, Server, Code, Smartphone, Terminal, PenTool, Layers } from 'lucide-react';
import Doodles from './Doodles';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, aboutRes] = await Promise.all([
          api.get('/skills'),
          api.get('/about')
        ]);
        setSkills(skillsRes.data);
        if (aboutRes.data && aboutRes.data.length > 0 && aboutRes.data[0].sectionBackgrounds?.skills) {
          setBgImage(`url('${aboutRes.data[0].sectionBackgrounds.skills}')`);
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategoryIcon = (category) => {
    const lower = category.toLowerCase();
    if (lower.includes('front')) return <Layout size={24} className="text-violet-400" />;
    if (lower.includes('back')) return <Server size={24} className="text-green-400" />;
    if (lower.includes('database')) return <Database size={24} className="text-amber-400" />;
    if (lower.includes('lang')) return <Code size={24} className="text-purple-400" />;
    if (lower.includes('tool')) return <Terminal size={24} className="text-rose-400" />;
    if (lower.includes('mobile')) return <Smartphone size={24} className="text-blue-400" />;
    if (lower.includes('design')) return <PenTool size={24} className="text-pink-400" />;
    return <Layers size={24} className="text-gray-400" />;
  };

  const getCategoryColor = (category) => {
    const lower = category.toLowerCase();
    if (lower.includes('front')) return "border-violet-500/30";
    if (lower.includes('back')) return "border-green-500/30";
    if (lower.includes('database')) return "border-amber-500/30";
    if (lower.includes('lang')) return "border-purple-500/30";
    return "border-gray-700";
  }

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-black flex justify-center items-center">
        <div className="animate-pulse text-violet-400">Loading Skills...</div>
      </section>
    )
  }

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
      id="skills"
      className={`py-20 relative font-skills bg-cover bg-center ${bgImage ? 'md:bg-fixed' : ''}`}
      style={bgImage ? { backgroundImage: bgImage } : {}}
    >
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl translate-x-1/2"></div>
      <Doodles sectionName="skills" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-heading-container mb-12"
        >
          <h2 className="section-heading">
            <Cpu className="text-violet-400" size={40} />
            <span className="text-white capitalize">Skills</span>
          </h2>
          <div className="section-underline"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-8 w-full"
        >
          {skills.map((category) => (
            <motion.div
              key={category._id}
              variants={itemVariants}
              className={`w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-md bg-gray-950/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:border-violet-500/60 ${getCategoryColor(category.category)} group cursor-default`}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-violet-700">
                <div className="p-3 bg-black rounded-xl group-hover:scale-110 transition-transform duration-300">
                  {getCategoryIcon(category.category)}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                  {category.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((skillName, index) => (
                  <motion.span
                    key={index}
                    id={`skills-${skillName ? skillName.toLowerCase().replace(/\s+/g, '-') : index}`}
                    whileHover={{ scale: 1.08, borderColor: "rgba(139, 92, 246, 0.5)", color: "#fff" }}
                    className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded-lg border border-gray-700 hover:bg-gray-950 transition-all cursor-default "
                  >
                    {skillName}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
