import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

interface ModelProps {
  material: THREE.Material;
}

export function Cube({ material }: ModelProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5} material={material}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export function Vase({ material }: ModelProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5} material={material}>
      <cylinderGeometry args={[0.5, 0.8, 2, 32]} />
    </mesh>
  );
}

export function Bowl({ material }: ModelProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5} material={material}>
      <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
    </mesh>
  );
}

export function Ring({ material }: ModelProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5} material={material}>
      <torusGeometry args={[0.7, 0.2, 16, 32]} />
    </mesh>
  );
}