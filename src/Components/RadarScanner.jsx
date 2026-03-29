import React from 'react';
import { motion } from 'framer-motion';

const RadarScanner = () => {
    return (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-40">
            {/* The Scanner Beam origin point fixed at the top center */}
            <motion.div
                className="absolute top-0 left-1/2 w-[300vw] h-[300vh] -translate-x-1/2"
                style={{
                    originX: "50%",
                    originY: "0%",
                }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 8, // technical, slow speed
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <svg
                    viewBox="0 0 100 200"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                >
                    <defs>
                        {/* Searchlight style radial gradient */}
                        <radialGradient id="radarGradient" cx="50%" cy="0%" r="200%" fx="50%" fy="0%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* The conical beam covering the range */}
                    <path
                        d="M 50 0 L 100 200 L 0 200 Z"
                        fill="url(#radarGradient)"
                        style={{ mixBlendMode: 'screen' }}
                    />
                </svg>
            </motion.div>

            {/* Locked Transmitter Node at Top-Middle */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-violet-600 rounded-full blur-[2px] z-10 border border-white/20"></div>
        </div>
    );
};

export default RadarScanner;