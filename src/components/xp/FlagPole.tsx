"use client";

export default function FlagPole() {
  return (
    <group position={[0, 0, 0]}>
      {/* Vertical pole */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Horizontal pole */}
      <mesh position={[0.5, 2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 1, 8]} />
        <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Top sphere */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#gold" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}
