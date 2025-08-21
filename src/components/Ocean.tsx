import * as THREE from "three";
import { useRef, useState } from "react";
import type { ThreeElements } from "@react-three/fiber";
import { Canvas, useFrame } from "@react-three/fiber";

function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);

      // Wave function
      const z =
        Math.sin(x / 2 + time) * 0.2 + Math.cos(y / 3 + time * 1.5) * 0.2;

      position.setZ(i, z);
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[100, 100, 256, 256]} />
      <meshStandardMaterial
        color="#004488"
        emissive="#001e3c"
        emissiveIntensity={0.3}
        metalness={0.2}
        roughness={0.6}
      />
    </mesh>
  );
}

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 5, 0], fov: 75 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} />
      <Ocean />
    </Canvas>
  );
}
