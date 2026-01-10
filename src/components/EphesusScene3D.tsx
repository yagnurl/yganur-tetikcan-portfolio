'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

interface EphesusScene3DProps {
  isHovered: boolean;
}

// Ancient Column/Temple Model Component
function AncientRuins({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current && isHovered) {
      // Rotate 360 degrees continuously when hovered
      groupRef.current.rotation.y += delta * 1.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Base Platform */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>

      {/* Steps */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -0.15 + i * 0.1, 0.3 - i * 0.15]}>
          <boxGeometry args={[2.8 - i * 0.2, 0.1, 1.8 - i * 0.3]} />
          <meshStandardMaterial color="#e8d5b7" roughness={0.7} />
        </mesh>
      ))}

      {/* Main Columns - Front Row */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <group key={`front-${i}`} position={[x, 0.5, 0.5]}>
          {/* Column Base */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.14, 0.1, 16]} />
            <meshStandardMaterial color="#f5e6d3" roughness={0.6} />
          </mesh>
          {/* Column Shaft */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.9, 16]} />
            <meshStandardMaterial color="#f0e0cc" roughness={0.5} />
          </mesh>
          {/* Column Capital */}
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.14, 0.08, 0.12, 16]} />
            <meshStandardMaterial color="#f5e6d3" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Main Columns - Back Row */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <group key={`back-${i}`} position={[x, 0.5, -0.3]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.14, 0.1, 16]} />
            <meshStandardMaterial color="#e8d5b7" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.9, 16]} />
            <meshStandardMaterial color="#e2d0b5" roughness={0.5} />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.14, 0.08, 0.12, 16]} />
            <meshStandardMaterial color="#e8d5b7" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Architrave (Top Beam) */}
      <mesh position={[0, 1.15, 0.1]}>
        <boxGeometry args={[2.2, 0.15, 1]} />
        <meshStandardMaterial color="#f5e6d3" roughness={0.6} />
      </mesh>

      {/* Pediment (Triangular Top) */}
      <mesh position={[0, 1.4, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[1.2, 0.4, 3]} />
        <meshStandardMaterial color="#f0e0cc" roughness={0.6} />
      </mesh>

      {/* Decorative Details */}
      <mesh position={[0, 1.25, 0.55]}>
        <boxGeometry args={[1.8, 0.08, 0.05]} />
        <meshStandardMaterial color="#d4a574" roughness={0.7} />
      </mesh>
    </group>
  );
}

// Loading Fallback
function LoadingFallback() {
  return (
    <Html center>
      <div style={{ 
        color: '#8b7355', 
        fontSize: '12px', 
        fontWeight: 600,
        background: 'rgba(255,255,255,0.8)',
        padding: '8px 12px',
        borderRadius: '8px'
      }}>
        Loading 3D...
      </div>
    </Html>
  );
}

export default function EphesusScene3D({ isHovered }: EphesusScene3DProps) {
  return (
    <Canvas
      camera={{ position: [2.5, 1.5, 2.5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={<LoadingFallback />}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          color="#fff5e6"
        />
        <directionalLight 
          position={[-3, 2, -2]} 
          intensity={0.3} 
          color="#ffeedd"
        />
        
        {/* Environment for reflections */}
        <Environment preset="sunset" />
        
        {/* The Ancient Ruins Model */}
        <AncientRuins isHovered={isHovered} />
        
        {/* Controls - disabled when not hovering for performance */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          enabled={false}
        />
      </Suspense>
    </Canvas>
  );
}
