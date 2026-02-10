"use client"
import { Canvas } from '@react-three/fiber'
import {useLoader} from '@react-three/fiber'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'




function SceneContent({}) {
  const gltf = useLoader(GLTFLoader, '/models/orbital_view_of_arrakis_from_timq_xyz.glb')
  
  return (
    <>
     <primitive object={gltf.scene} />
    </>
  )
}

export default function Scene() {
  return (
    <div className="w-80 h-80">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[10,10,10]} intensity={1} />
        <SceneContent />
      </Canvas>
    </div>
  )
}
