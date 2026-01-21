"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import AstronautModel from '@/components/xp/AstronautModel';
import WavingFlag from '@/components/xp/WavingFlag';
import FlagPole from '@/components/xp/FlagPole';

export default function MoonAstronaut() {
  return (
    <div className="w-full h-96 relative overflow-hidden">
      {/* Moon background image - clipped */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/MOON.png" 
          alt="" 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full object-cover object-bottom"
          style={{ height: '120%', maxHeight: '600px' }}
        />
      </div>
      
      {/* 3D Canvas on top */}
      <Canvas
        camera={{ position: [0, 2, 5], fov: 90 }}
        style={{ background: 'transparent' }}
        className="absolute inset-0 z-10"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <spotLight position={[0, 10, 0]} intensity={0.3} />

        <Suspense fallback={null}>
          {/* Astronaut */}
          <AstronautModel />
          
          {/* Flag pole and flag */}
          <FlagPole />
          <WavingFlag />
          
          {/* Ground shadow */}
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>

        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}