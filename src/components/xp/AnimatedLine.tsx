"use client";

import { easeIn, motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Logo3D from './Logo3D';
import TimelineSlider from './TimelineSlider';


function AnimatedLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [sliderPosition, setSliderPosition] = useState(0); // 0 to 1 (percentage of container width)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if mobile layout (vertical)
  const isMobile = viewportWidth < 768;

  // Calculate which card the slider is currently under
  useEffect(() => {
    const sliderPercent = sliderPosition * 100;
    let foundIndex: number | null = null;
    const isVerticalLayout = viewportWidth < 768;
    
    experiences.forEach((exp, index) => {
      // Use verticalPosition for mobile, position for desktop
      const cardPosition = parseFloat(isVerticalLayout ? exp.verticalPosition : exp.position);
      // Check if slider is within ±8% of card position
      if (Math.abs(sliderPercent - cardPosition) < 8) {
        foundIndex = index;
      }
    });
    
    setActiveCardIndex(foundIndex);
  }, [sliderPosition, viewportWidth]);

  // Responsive Logo3D dimensions
  const getLogoDimensions = () => {
    if (viewportWidth < 640) return { width: 180, height: 70, scale: 0.7 }; // mobile
    if (viewportWidth < 768) return { width: 240, height: 85, scale: 0.85 }; // sm
    return { width: 200, height: 90, scale: 1 }; // md and up
  };
  const logoDimensions = getLogoDimensions();
  
  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to line width (0 to 100%)
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["15%", "100%"]);

  const WordTransition = {
    duration: 0.5,
    delay: 0.6,
    anticipate: [0, 0.71, 0.2, 1.01]
  } as const;

  // Experience data (your last two experiences first, then first two)
  const experiences = [
    {
      title: "Software Engineer Capstone",
      date: " August, 2025 - Present",
      description: "Building a retrieval-augmented generation (RAG) LLM web application that enables Sikorsky engineers to diagnose and resolve discrepancies more efficiently.",
      position: "20%", // Position along horizontal line
      verticalPosition: "8%", // Position for vertical layout
      hdrPath: "/liquid_bg_asml.hdr",
      modelPath: "/models/sikorsky.glb",
      modelScale: 1,
      modelOffset: { x: 0, y: -0 } // Offset to center Sikorsky model
    },
    {
      title: "Data Analytics Engineer Intern",
      company: "ASML",
      date: "May, 2025 - Aug, 2025",
      description: "Developed ML-driven predictive analytics and a Python + Streamlit app using Azure Databricks to optimize manufacturing workflows.",
      position: "40%", // Position along horizontal line
      verticalPosition: "35%",
      modelPath: "/models/asml_3d_logo_3-v2.glb",
      modelScale: 1.6,
      hdrPath: "/liquid_bg_asml.hdr"
    },
    {
      title: "Data Analyst Intern",
      date: "May, 2024 - Aug, 2024",
      description: "Applied machine learning, statistical analysis, and web scraping to analyze weightlifting performance data, uncovering key indicators, and progression trends",
      position: "60%", // Position along horizontal line
      verticalPosition: "60%",
      modelPath: "/models/shu_4.glb",
      modelScale: 2,
      hdrPath: "/red_swirls.hdr",
      modelOffset: { x: 0, y: -10 }
    },
    {
      title: "Software Engineer Intern",
      date: "May, 2023 - Aug, 2023",
      description: "Built reusable Python-based ETL pipelines with SQL/MongoDB to automate Excel data ingestion and led a Monday.com implementation",
      position: "80%", // Position along horizontal line
      verticalPosition: "85%",
      modelPath: "/models/sikorsky.glb",
      modelScale: 1,
      hdrPath: "/liquid_bg_asml.hdr",
      modelOffset: { x: 0, y: -10 } 
    }
  ];

  // Stable refs for per-card mouse positions (no re-renders)
  const mouseRefs = useMemo(
    () => experiences.map(() => ({ current: { x: 0, y: 0 } } as { current: { x: number; y: number } })),
    []
  );

  return (
    <div className="relative w-full flex flex-col" onClick ={() => setActiveCardIndex(null)}>
      {/* Timeline section - Horizontal on desktop, Vertical on mobile */}
      <div className={`relative w-full ${isMobile ? 'flex flex-row' : 'flex flex-col'}`}>
        
        {/* Timeline Slider - Left side on mobile */}
        {isMobile && (
          <div className="w-16 shrink-0 pr-2">
            <TimelineSlider 
              sliderPosition={sliderPosition}
              onSliderChange={setSliderPosition}
              containerRef={containerRef}
              isVertical={true}
            />
          </div>
        )}

        <div ref={containerRef} className={`relative ${isMobile ? 'flex-1  min-h-200' : 'w-full h-64 sm:h-72 md:h-80 lg:h-96'} flex items-center ${isMobile ? 'flex-col justify-start py-0' : 'pb-12 sm:pb-16 md:pb-20'}`}>
          
          {/* Clickable overlay to ensure clicks anywhere deactivate cards */}
          <div 
            className="flex items-center justify-center absolute inset-0 z-0 w-full h-full" 
            onClick={() => setActiveCardIndex(null)}
          />
          
          {/* Horizontal/Vertical Line Container */}
          {!isMobile && (
            <div className="absolute top-1/2 -translate-y-1/2 left-0 h-0.75 w-full z-0">
            </div>
          )}
          
          {isMobile && (
            <div className="absolute left-8 top-0 w-0.75 h-full z-0">
            </div>
          )}

      {/* Experience Cards and Date Labels */}
      {experiences.map((exp, index) => (
        <div
          key={index}
          className={`absolute ${isMobile ? 'w-full flex flex-row items-center justify-center' : 'h-full flex flex-col items-center justify-center'} pointer-events-none`}
          style={isMobile ? { top: exp.verticalPosition, transform: 'translateY(-30%)' } : { left: exp.position }}
        >
          {/* Date label - Left of cards on mobile, top on desktop */}
          <div className={`${isMobile ? 'hidden' : ' block absolute bottom-[52%] mb-2 sm:mb-3 md:mb-4'} pointer-events-none`}>
            <span className="px-1.5 sm:px-2.5 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] sm:text-[10px] md:text-xs tracking-wider sm:tracking-widest uppercase bg-black/40 text-slate-200 border border-white/10 backdrop-blur-sm shadow flex items-center justify-center whitespace-nowrap">
              {exp.date}
            </span>
          </div>
          
          {/* Cards */}
          <motion.div
            className={`${isMobile ? 'order-2 relative' : 'absolute top-[52%]'} flex flex-row overflow-hidden border border-white/50 sm:border-white/60 rounded-md sm:rounded-lg shadow-md sm:shadow-lg shadow-blue-500/20 bg-linear-to-b from-[#8F87F1] to-90% to-blue-400/20 duration-400 md:hover:border-purple-400/60 md:hover:shadow-sm md:hover:shadow-purple-500/40 backdrop-hue-rotate-0 transition-all group cursor-pointer pointer-events-auto`}
                onClick={(e) => {
                  e.stopPropagation(); // this prevents the click from bubbling up to the parent div
                  const position = parseFloat(isMobile ? exp.verticalPosition : exp.position)/100;
                  setSliderPosition(position);
                  setActiveCardIndex(index); // Directly set active card to allow re-clicking
                }}
                style={{ 
                  boxShadow: '0 0 20px rgba(96, 165, 250, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
                  transformOrigin: 'center center'
                }}
                animate={{
                  width: activeCardIndex === index ? (isMobile ? 260 : viewportWidth < 768 ? 256 : 320) : (isMobile ? 210 : viewportWidth < 768 ? 200 : 240),
                  height: activeCardIndex === index ? (isMobile ? 180 : viewportWidth < 768 ? 200 : 224) : (isMobile ? 140 : viewportWidth < 768 ? 120 : 140),
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                initial={{ opacity: 0, filter: 'blur(2px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}

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
                  <div className="absolute top-0 left-0 right-0 inset-0 z-0 w-full h-full">
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
                        size={0.5} 
                        color="rgba(132, 140, 207, 1)" 
                      />
                    </ReactFlow>
                    <div className="absolute inset-0 bg-linear-to-b from-transparent from-50% to-black/20 pointer-events-none" />
                  
                    {/* Neon glow layers emanating from logo */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                      {/* Inner intense glow */}
                      <div 
                        className="absolute inset-0 "
                        style={{
                          background: `radial-gradient(circle at center, 
                            rgba(205, 209, 228) 20%, 
                            rgba(139, 92, 246, 0.4) 15%, 
                            transparent 40%)`,
                          filter: 'blur(15px)',
                          mixBlendMode: 'screen',
                          opacity: activeCardIndex === index ? 0 : 0.6,
                          transition: 'opacity 0.8s ease-in-out'
                        }}
                      />
                      
                      {/* Outer soft glow */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse at center, 
                            rgba(45, 85, 255, 0.3) 0%, 
                            rgba(43, 44, 170, 0.1) 30%, 
                            transparent 90%)`,
                          filter: 'blur(0px)',
                          mixBlendMode: 'screen',
                          opacity: activeCardIndex === index ? 0 : 0.4,
                          transition: 'opacity 1.2s ease-in-out'
                        }}
                      />
                    </div>
                    
                  </div>
                  
                  <div className="relative flex flex-col items-center justify-start h-full  w-full z-20 p-1">
                    <motion.div 
                      className="shrink-0" 
                      style={{ 
                        transform: exp.modelOffset ? `translate(${exp.modelOffset.x}px, ${exp.modelOffset.y}px)` : undefined 
                      }}
                      animate={{
                        y: activeCardIndex === index ? (isMobile ? -5 : viewportWidth < 768 ? -8 : -10) : 0,
                      }}
                      transition={{ duration: isMobile ? 0.3 : 0.4, ease: "easeOut" }}
                    >
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
                    </motion.div>
                    
                    <motion.div 
                      className="flex flex-col shrink-0 px-1.5 sm:px-3 md:px-4 mt-1 sm:mt-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: activeCardIndex === index ? 1 : 0,
                        y: activeCardIndex === index ? 0 : 10,
                        height: activeCardIndex === index ? 'auto' : 0,
                        marginTop: activeCardIndex === index ? (isMobile ? '0.25rem' : '0.5rem') : 0,
                      }}
                      transition={{ 
                        duration: isMobile ? 0.3 : 0.4, 
                        delay: activeCardIndex === index ? (isMobile ? 0.2 : 0.3) : 0,
                        ease: "easeOut"
                      }}
                    >
                      <h3 className="text-[11px] sm:text-sm md:text-base lg:text-lg font-bold text-white mb-0.5 sm:mb-1 md:mb-2 wrap-break-words max-w-full">{exp.title}</h3>
                      <p className="text-[11px] sm:text-xs md:text-sm text-gray-200 line-clamp-3 sm:line-clamp-3 md:line-clamp-3">{exp.description}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
        </div>
      ))}

        </div>
      </div>

      {/* Slider below the card section - Only show on desktop */}
      {!isMobile && (
        <div className="mt-6 sm:mt-8 md:mt-10">
          <TimelineSlider 
            sliderPosition={sliderPosition}
            onSliderChange={setSliderPosition}
            containerRef={containerRef}
            isVertical={false}
          />
        </div>
      )}

    </div>
  );
}

export default AnimatedLine;