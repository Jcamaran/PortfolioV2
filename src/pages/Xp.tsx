"use client";

import ParticlesBackground from "@/components/ParticlesBackground";
import { useState, memo, useRef } from "react";   
import { useScroll, useMotionValueEvent } from "framer-motion";
import AnimatedLine from "@/components/xp/AnimatedLine";


const MemoizedParticles = memo(ParticlesBackground);


export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [locked, setLocked] = useState(false);
  const [hasSnapped, setHasSnapped] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.45 && latest < 0.55 && !locked && !hasSnapped) {
      lockAndSnap();
    } 
  });

  const lockAndSnap = () => {
    setLocked(true);
    setHasSnapped(true); // Mark that snap has occurred

    // lock scrolling
    document.body.style.overflow = "hidden";

    // Scroll to second half of section
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    window.scrollTo({
      top: sectionTop + sectionHeight / 2,
      behavior: "smooth"
    });
    
    // unlock after animation 
    setTimeout(() => {
      setLocked(false);
      document.body.style.overflow = "auto";
    }, 900); // match duration of scroll
  };

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <MemoizedParticles />
      {/* Experience section */}
      <main className="relative z-10 w-full mx-auto px-8 pt-16 flex-1 flex flex-col">
        <section className="pt-16 text-center flex-shrink-0"> 
          <h1 className="text-5xl font-bold text-white mb-4">
            Professional Experience
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Here are some of the places i worked at over the last few years. Hover over the cards for some fun! 
          </p>
        </section>
        
        <div ref={sectionRef} className="flex-1 flex items-center justify-center w-full">
          <AnimatedLine />
        </div>
        
        {/* Moon Image at Bottom - Clipped */}
        <section className="relative w-full h-0  mt-0">
          {/* You can adjust the clipping by changing: 
              - h-64 (height: 16rem/256px) → h-48, h-80, h-96, etc.
              - object-bottom → object-top or object-center to show different parts
              - Change the inline height percentage to control how much shows
          */}
          {/* <img 
            src="/Moon_2.png" 
            alt="Moon surface" 
            className="absolute bottom-0 left-0 w-full object-cover object-bottom"
         
          /> */}
        </section>
      </main>
    </div>
  );
}
