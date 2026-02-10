"use client";

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface TimelineSliderProps {
  sliderPosition: number;
  onSliderChange: (position: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isVertical?: boolean;
}

// Card positions matching the experiences - HORIZONTAL layout
const cardPositions = [ 0.1 ,0.20,0.3, 0.40, 0.50, 0.60, 0.70, 0.80,0.9];

// Timeline labels with positions
const timelineMarkers = [
  { position: 0.20, label: '2025', year: true, verticalLabel: 'Present ', verticalPosition: 0.08 },
  { position: 0.40, label: 'Summer 2025', year: true, verticalLabel: "Sum '25", verticalPosition: 0.35 },
  { position: 0.60, label: '2024', year: true, verticalLabel: '2024', verticalPosition: 0.60 },
  { position: 0.80, label: '2023', year: true, verticalLabel: '2023', verticalPosition: 0.85 },
];

// Vertical positions matching experiences - VERTICAL layout
const verticalPositions = [0.08, 0.35, 0.60, 0.85];
export default function TimelineSlider({ sliderPosition, isVertical = false }: TimelineSliderProps) {

  // Memoize marker calculations for better performance
  const markerStates = useMemo(() => {
    const positions = isVertical ? verticalPositions : cardPositions;
    return positions.map(position => {
      const distance = Math.abs(sliderPosition - position);
      const isNear = distance < 0.08;
      const scale = isNear ? 1.5 + (0.08 - distance) * 5 : 1;
      return { isNear, scale };
    });
  }, [sliderPosition, isVertical]);

  if (isVertical) {
    return (
      <div className="relative h-full w-full flex items-center justify-center py-8">
        <div className="relative h-full w-0.5 bg-white/10 rounded-full backdrop-blur-sm">
          {/* Ruler markers for vertical */}
          {verticalPositions.map((position, index) => {
            const { isNear, scale } = markerStates[index];
            
            return (
              <motion.div
                key={index}
                className="absolute left-1/2 flex items-center"
                style={{ 
                  top: `${position * 100}%`,
                  willChange: 'transform'
                }}
                animate={{ 
                  scale,
                  x: '-50%',
                  y: '-50%'
                }}
                transition={{ 
                  ease: "easeInOut", 
                  stiffness: 400, 
                  damping: 25,
                  mass: 0.5
                }}
              >
                <motion.div
                  className="bg-white rounded-full"
                  style={{ willChange: 'transform' }}
                  animate={{
                    scaleX: isNear ? 1.2 : 1,
                    scaleY: isNear ? 1.2 : 1,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25,
                    mass: 0.5
                  }}
                  initial={{
                    width: '12px',
                    height: '2px',
                  }}
                />
              </motion.div>
            );
          })}
          
          {/* Slider track progress */}
          <motion.div
            className="absolute left-0 top-0 w-full bg-white rounded-full"
            style={{ height: `${sliderPosition * 100}%`, willChange: 'height' }}
          />
          
          {/* Slider handle */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-4 h-10 bg-gray-700 rounded-full shadow-lg border-2 border-white/50 pointer-events-none"
            animate={{ 
              top: `${sliderPosition * 100}%`,
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ y: '-50%', willChange: 'transform' }}
          />
        </div>
        
        {/* Timeline markers to the right */}
        <div className="absolute left-6 top-0 h-full">
          {timelineMarkers.map((marker, index) => (
            <div
              key={index}
              className="absolute flex flex-row items-center"
              style={{ top: `${marker.verticalPosition * 100}%`, transform: 'translateY(-80%) translateX(35px)' }}
            >
              {/* Horizontal line connecting to slider */}
              <div className="" />
              
              {/* Label */}   
              <span className="text-[10px] font-semibold text-white whitespace-nowrap">
                {marker.verticalLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full mt-8 px-2">
      <div className="relative">
        <div className="relative w-full h-0.5 bg-white/10 rounded-full backdrop-blur-sm">
          {/* Ruler markers */}
          {cardPositions.map((pos, index) => {
            const { isNear, scale } = markerStates[index];
            
            return (
              <motion.div
                key={index}
                className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ 
                  left: `${pos * 100}%`,
                  willChange: 'transform'
                }}
                animate={{
                  scale: scale,
                }}
                transition={{ 
                 ease: "easeInOut", 
                  stiffness: 400, 
                  damping: 25,
                  mass: 0.5
                }}
              >
                {/* Marker line */}
                <motion.div
                  className="bg-white rounded-full"
                  style={{ willChange: 'transform' }}
                  animate={{
                    scaleX: isNear ? 1.2 : 1,
                    scaleY: isNear ? 1.2 : 1,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25,
                    mass: 0.5
                  }}
                  initial={{
                    width: '2px',
                    height: '12px',
                  }}
                />
              </motion.div>
            );
          })}
          
          {/* Slider track progress */}
          <motion.div
            className="absolute left-0 top-0 h-full bg-white rounded-full"
            style={{ width: `${sliderPosition * 100}%`, willChange: 'width' }}
          />
          
          {/* Slider handle */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-10 h-4 bg-gray-700 rounded-full shadow-lg border-2 border-white/50 pointer-events-none"
            animate={{ 
              left: `${sliderPosition * 100}%`,
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ x: '-50%', willChange: 'transform' }}
          />
        </div>
        
        {/* Timeline markers below the slider */}
        <div className="relative w-full mt-6">
          {timelineMarkers.map((marker, index) => (
            <div
              key={index}
              className="absolute flex flex-col items-center"
              style={{ left: `${marker.position * 100}%`, transform: 'translateX(-50%)' }}
            >
              {/* Vertical line connecting to slider */}
              <div className="w-px h-4 bg-linear-to-b from-white/40 to-transparent mb-2" />
              
              {/* Label */}
              <span 
                className={`text-xs ${marker.year ? 'font-semibold text-white' : 'text-gray-400'} whitespace-nowrap`}
              >
                {marker.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
