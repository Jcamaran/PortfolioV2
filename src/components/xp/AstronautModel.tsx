"use client";

import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function AstronautModel() {
  const { scene } = useGLTF('/models/cartoon_astronaut.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      scale={1.0} 
      position={[0, 0, 0]} 
      rotation={[0, Math.PI / 4, 0]}
    />
  );
}
