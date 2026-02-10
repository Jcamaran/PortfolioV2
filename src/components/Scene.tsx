"use client"
import { Canvas } from '@react-three/fiber'
import {useLoader} from '@react-three/fiber'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import { Suspense, useEffect } from 'react'
import * as THREE from 'three'




function SceneContent({}) {
  const gltf = useLoader(GLTFLoader, '/models/orbital_view_of_arrakis_from_timq_xyz.glb')
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      gltf.scene?.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material: THREE.Material) => material.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
    };
  }, [gltf]);
  
  return (
    <>
     <primitive object={gltf.scene} />
    </>
  )
}

export default function Scene() {
  return (
    <div className="w-80 h-80">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance'
        }}
        onCreated={({ gl }) => {
          // Handle WebGL context loss
          const canvas = gl.domElement;
          canvas.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            console.warn('WebGL context lost');
          });
          
          canvas.addEventListener('webglcontextrestored', () => {
            console.log('WebGL context restored');
          });
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[10,10,10]} intensity={1} />
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
