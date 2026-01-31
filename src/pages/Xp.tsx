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
        <section className="pt-16 text-center shrink-0"> 
          <h3 className="text-3xl font-bold text-white mb-4">
            My Journey Over The Last few years
          </h3>
          <p className="text-lg text-gray-300 mb-8 w-fullmx-auto">
            Hover over the cards for some fun! 
          </p>
        </section>
        
        <div ref={sectionRef} className="flex items-center justify-center w-full">
          <AnimatedLine />
        </div>
        
        {/* Moon Image at Bottom - Clipped */}
        <section className="relative w-full h-0  mt-0">
          
        </section>
      </main>
    </div>
  );
}
