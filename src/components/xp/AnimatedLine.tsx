"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Logo3D from './Logo3D';


function AnimatedLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive Logo3D dimensions
  const getLogoDimensions = () => {
    if (viewportWidth < 640) return { width: 180, height: 70, scale: 0.7 }; // mobile
    if (viewportWidth < 768) return { width: 240, height: 85, scale: 0.85 }; // sm
    return { width: 350, height: 105, scale: 1 }; // md and up
  };
  const logoDimensions = getLogoDimensions();
  
  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to line width (0 to 100%)
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["5%", "100%"]);

  // Experience data (your last two experiences first, then first two)
  const experiences = [
    {
      title: "Software Engineer Capstone",
      date: " August, 2025 - Present",
      description: "Building a retrieval-augmented generation (RAG) LLM web application that enables Sikorsky engineers to diagnose and resolve discrepancies more efficiently.",
      position: "15%", // Position along horizontal line
      hdrPath: "city",
      modelPath: "/models/sikorsky.glb",
      modelScale: 1.25
    },
    {
      title: "Data Analytics Engineering Intern",
      company: "ASML",
      date: "May, 2025 - Aug, 2025",
      description: "Developed ML-driven predictive analytics and a Python + Streamlit app using Azure Databricks to optimize manufacturing workflows.",
      position: "35%", // Position along horizontal line
      modelPath: "/models/asml_3d_logo_3-v2.glb",
      modelScale: 2.1,
      hdrPath: "sunset"
    },
    {
      title: "Data Analyst Intern",
      date: "2022 - 2023",
      description: "Applied machine learning, statistical analysis, and web scraping to analyze weightlifting performance data, uncovering key indicators, and progression trends",
      position: "60%", // Position along horizontal line
      modelPath: "/models/shu_4.glb",
      modelScale: 2.5,
      hdrPath: "warehouse"
    },
    {
      title: "Software Engineer Intern",
      date: "2021 - 2022",
      description: "Built reusable Python-based ETL pipelines with SQL/MongoDB to automate Excel data ingestion and led a Monday.com implementation",
      position: "85%", // Position along horizontal line
      modelPath: "/models/sikorsky.glb",
      modelScale: 1.25,
      hdrPath: "city"
    }
  ];

  // Stable refs for per-card mouse positions (no re-renders)
  const mouseRefs = useMemo(
    () => experiences.map(() => ({ current: { x: 0, y: 0 } } as { current: { x: number; y: number } })),
    []
  );

  return (
    <div ref={containerRef} className="relative w-full h-96 flex items-center">
      {/* Horizontal Line Container */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 h-0.75 w-full z-0">
        {/* Background line */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-slate-400/20 backdrop-blur-sm" />
        
        {/* Animated line (gradient) that grows with scroll */}
        {/* <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-500 shadow-[0_0_10px_#a78bfa,0_0_20px_#60a5fa]"
          style={{ width: lineWidth, borderRadius: 9999 }}
        /> */}
      </div>

      {/* Experience Cards and Date Labels - Top/Bottom */}
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="absolute h-full flex flex-col items-center justify-center"
          style={{ left: exp.position }}
        >
          {/* Layout alternates: even = date top, card bottom | odd = card top, date bottom */}
          {index % 2 === 0 ? (
            <>
              {/* Date on top */}
              <div className="absolute bottom-[52%] mb-4">
                <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-0.5 md:py-1 rounded-full text-[10px] sm:text-xs tracking-wide sm:tracking-widest uppercase bg-black/40 text-slate-200 border border-white/10 backdrop-blur-sm shadow flex items-center justify-center whitespace-nowrap">
                  {exp.date}
                </span>
              </div>
              
              {/* Card on bottom */}
              <motion.div
                className="absolute top-[52%] md:w-80 sm:w-64 w-56 h-56 flex flex-row overflow-y-hidden border border-white/60 rounded-lg shadow-lg shadow-blue-500/20 bg-linear-to-b from-[#8F87F1] to-slate-900/10 to-60% duration-400 hover:border-purple-400/60 hover:shadow-sm hover:shadow-purple-500/40 backdrop-hue-rotate-0 transition-all group-hover:backdrop-hue-rotate-15 group"
                style={{ 
                  boxShadow: '0 0 20px rgba(96, 165, 250, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)'
                }}
                initial={{ opacity: 0, filter: 'blur(2px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                  scale: 1.00,
                  boxShadow: '0 0 30px rgba(96, 165, 250, 0.5), 0 0 60px rgba(139, 92, 246, 0.4), 0 0 10px rgba(167, 139, 250, 0.3)',
                  transition: { duration: 0.2 }
                }}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                onMouseMove={(e) => {
                  const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                  const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                  mouseRefs[index].current = {
                    x: Math.max(-0.9, Math.min(0.9, x)),
                    y: Math.max(-0.9, Math.min(0.9, y))
                  };
                }}
                onMouseOut={() => {
                  mouseRefs[index].current = { x: 0, y: 0 };
                }}
              >
                <div className="relative inset-0 bg-linear-to-b from-white/5 from-40% to-black/60 backdrop-blur-sm rounded-lg border border-white/20 h-full w-full">
                  <div className="absolute inset-0 z-0 w-full h-full">
                    <ReactFlow 
                      nodes={[]} 
                      edges={[]} 
                      fitView={false} 
                      panOnDrag={false} 
                      zoomOnScroll={false} 
                      zoomOnPinch={false} 
                      zoomOnDoubleClick={false}
                      nodesDraggable={false}
                      nodesConnectable={false}
                      elementsSelectable={false}
                      proOptions={{ hideAttribution: true }}
                    >
                      <Background 
                        variant={BackgroundVariant.Lines} 
                        gap={20} 
                        size={1} 
                        color="rgba(148, 163, 184, 0.3)" 
                      />
                    </ReactFlow>
                    <div className="absolute inset-0 bg-linear-to-b from-transparent from-50% to-black/20 pointer-events-none" />
                  </div>
                  
                  <div className="flex items-center justify-center right-2 z-20 p-1 sm:p-1.5 md:p-0">
                    <Logo3D 
                      modelPath={exp.modelPath} 
                      width={logoDimensions.width} 
                      height={logoDimensions.height} 
                      modelScale={exp.modelScale * logoDimensions.scale}
                      isHovered={hoveredCardIndex === index}
                      hdrPath={exp.hdrPath}
                      dpr={viewportWidth < 640 ? [1, 1.5] : [1, 2]}
                      mouseRef={mouseRefs[index] as any}
                    />
                  </div>
                  
                  <div className="relative z-10 p-2 sm:p-3 md:p-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-1.5 md:mb-2">{exp.title}</h3>
                    <p className="text-xs sm:text-xs md:text-sm text-gray-200 group-hover:ml-1 transition-all ease-in-out duration-300 line-clamp-3">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* Card on top */}
              <motion.div
                className="absolute  -translate-y-3 bottom-[52%] md:w-80 sm:w-64 w-56 h-56 flex flex-row overflow-y-hidden border border-white/60 rounded-lg shadow-lg shadow-blue-500/20 bg-linear-to-b from-[#8F87F1] to-slate-900/10 to-60% duration-400 hover:border-purple-400/60 hover:shadow-sm hover:shadow-purple-500/40 backdrop-hue-rotate-0 transition-all group-hover:backdrop-hue-rotate-15 group z-20"
                style={{ 
                  boxShadow: '0 0 20px rgba(96, 165, 250, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)'
                }}
                initial={{ opacity: 0, filter: 'blur(2px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                  scale: 1.00,
                  boxShadow: '0 0 30px rgba(96, 165, 250, 0.5), 0 0 60px rgba(139, 92, 246, 0.4), 0 0 10px rgba(167, 139, 250, 0.3)',
                  transition: { duration: 0.2 }
                }}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                onMouseMove={(e) => {
                  const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                  const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                  mouseRefs[index].current = {
                    x: Math.max(-0.9, Math.min(0.9, x)),
                    y: Math.max(-0.9, Math.min(0.9, y))
                  };
                }}
                onMouseOut={() => {
                  mouseRefs[index].current = { x: 0, y: 0 };
                }}
              >
                <div className="relative inset-0 bg-linear-to-b from-white/5 from-40% to-black/60 backdrop-blur-sm rounded-lg border border-white/20 h-full w-full">
                  <div className="absolute inset-0 z-0 w-full h-full">
                    <ReactFlow 
                      nodes={[]} 
                      edges={[]} 
                      fitView={false} 
                      panOnDrag={false} 
                      zoomOnScroll={false} 
                      zoomOnPinch={false} 
                      zoomOnDoubleClick={false}
                      nodesDraggable={false}
                      nodesConnectable={false}
                      elementsSelectable={false}
                      proOptions={{ hideAttribution: true }}
                    >
                      <Background 
                        variant={BackgroundVariant.Dots} 
                        gap={20} 
                        size={1} 
                        color="rgba(148, 163, 184, 0.3)" 
                      />
                    </ReactFlow>
                    <div className="absolute inset-0 bg-linear-to-b from-transparent from-50% to-black/20 pointer-events-none" />
                  </div>
                  
                  <div className="flex items-center justify-center right-2 z-20 p-1 sm:p-1.5 md:p-0">
                    <Logo3D 
                      modelPath={exp.modelPath} 
                      width={logoDimensions.width} 
                      height={logoDimensions.height} 
                      modelScale={exp.modelScale * logoDimensions.scale}
                      isHovered={hoveredCardIndex === index}
                      hdrPath={exp.hdrPath}
                      dpr={viewportWidth < 640 ? [1, 1.5] : [1, 2]}
                      mouseRef={mouseRefs[index] as any}
                    />
                  </div>
                  
                  <div className="relative z-10 p-2 sm:p-3 md:p-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-1.5 md:mb-2">{exp.title}</h3>
                    <p className="text-xs sm:text-xs md:text-sm text-gray-200 group-hover:ml-1 transition-all ease-in-out duration-300 line-clamp-3">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Date on bottom */}
              <div className="absolute top-[52%] mt-4">
                <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-0.5 md:py-1 rounded-full text-[10px] sm:text-xs tracking-wide sm:tracking-widest uppercase bg-black/40 text-slate-200 border border-white/10 backdrop-blur-sm shadow flex items-center justify-center whitespace-nowrap">
                  {exp.date}
                </span>
              </div>
            </>
          )}
        </div>
      ))}

    </div>
  );
}

export default AnimatedLine;