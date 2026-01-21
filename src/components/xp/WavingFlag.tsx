"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WavingFlag() {
  const flagRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (flagRef.current) {
      const time = clock.getElapsedTime();
      const geometry = flagRef.current.geometry as THREE.PlaneGeometry;
      const positions = geometry.attributes.position;
      
      // Animate vertices to create wave effect
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Wave calculation: further from pole = more wave
        const wave = Math.sin(x * 4 + time * 3) * 0.1 * x;
        positions.setZ(i, wave);
      }
      
      positions.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={flagRef} position={[0.5, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
      <planeGeometry args={[1, 0.6, 20, 20]} />
      <meshStandardMaterial 
        color="#ff0000" 
        side={THREE.DoubleSide}
        roughness={0.8}
      />
    </mesh>
  );
}
