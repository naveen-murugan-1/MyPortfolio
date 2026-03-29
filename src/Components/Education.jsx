import { GraduationCap } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import Doodles from './Doodles';

const Education = () => {
  const [educationData, setEducationData] = useState([]);
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eduRes, aboutRes] = await Promise.all([
          api.get('/education'),
          api.get('/about')
        ]);
        setEducationData(eduRes.data);
        if (aboutRes.data && aboutRes.data.length > 0 && aboutRes.data[0].sectionBackgrounds?.education) {
          setBgImage(`url('${aboutRes.data[0].sectionBackgrounds.education}')`);
        }
      } catch (err) {
        console.error("Error fetching education:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <section
      id="education"
      className={`py-20 text-white relative font-education bg-cover bg-center ${bgImage ? 'md:bg-fixed' : ''}`}
      style={bgImage ? { backgroundImage: bgImage } : {}}
    >
      <div className={`absolute inset-0 ${bgImage ? 'bg-[#0e1628]/60' : 'bg-[#0e1628]/90'} z-0`}></div>
      <Doodles sectionName="education" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-heading-container mb-12"
        >
          <h2 className="section-heading">
            <span className="text-white capitalize">Education</span>
          </h2>
          <div className="section-underline"></div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 w-full">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-md bg-black/80 border border-violet-400/20 rounded-xl p-6 hover:border-violet-400/60 transition-all duration-300 backdrop-blur-sm cursor-default hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
            >
              <div className="flex items-start gap-5">
                <div className="bg-violet-400/10 p-3 rounded-full flex-shrink-0 animate-pulse">
                  <GraduationCap className="text-violet-400" size={24} />
                </div>
                <div className="w-full">
                  <div className="flex flex-col mb-4">
                    <div className="text-left w-full">
                      <p className="text-xl font-bold text-violet-400 tracking-wide">{edu.institution}</p>
                      <p className="font-semibold text-white text-sm mt-1">{edu.degree}</p>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800">
                      <p className="text-gray-400 font-medium text-xs">
                        {(edu.fromDate || edu.toDate) ? `${edu.fromDate} - ${edu.toDate}` : edu.duration}
                      </p>
                      <p className="text-xs font-bold text-violet-400/80">{edu.gpa}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {edu.courses && edu.courses.map((course, idx) => (
                      <span key={idx} className="text-[10px] bg-gray-950/80 border border-gray-700/50 px-2 py-1 rounded-md text-gray-300 ">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;