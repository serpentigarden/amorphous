import * as THREE from "three";
import { useRef } from "react";
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
      const z =
        Math.sin(x * 0.3 + time * 1.5) * 0.2 +
        Math.cos(y * 0.4 + time * 1.2) * 0.2;
      position.setZ(i, z);
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[90, 90, 128, 128]} />
      <meshStandardMaterial
        color="#004488"
        emissive="#001e3c"
        emissiveIntensity={0.3}
        metalness={0.1}
        roughness={0.5}
      />
    </mesh>
  );
}

import { Sky, Environment } from "@react-three/drei";
export function Scene() {
  return (
    <Canvas camera={{ position: [0, 5, 0], fov: 75 }}>
      <Sky sunPosition={[0, 20, 100]} />
      <Environment preset="dawn" />
      <ambientLight intensity={0.9} />
      <directionalLight position={[0, 50, 10]} intensity={1.5} color="white" />
      <Ocean />
    </Canvas>
  );
}
