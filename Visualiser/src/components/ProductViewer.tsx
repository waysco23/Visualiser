import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { Cube, Vase, Bowl, Ring } from './models/BasicModels';

interface ProductViewerProps {
  selectedModel: string;
  colors: string[];
}

const vertexShader = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vPosition;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  
  void main() {
    // Create a gradient based on position
    float y = (vPosition.y + 1.0) * 0.5; // Normalize to 0-1
    
    vec3 color;
    if (y < 0.33) {
      color = mix(color1, color2, y * 3.0);
    } else if (y < 0.66) {
      color = mix(color2, color3, (y - 0.33) * 3.0);
    } else {
      color = mix(color3, color1, (y - 0.66) * 3.0);
    }
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function hexToRgb(hex: string): THREE.Vector3 {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return new THREE.Vector3(
    parseInt(result![1], 16) / 255,
    parseInt(result![2], 16) / 255,
    parseInt(result![3], 16) / 255
  );
}

function ModelWrapper({ model: Model, colors }: { model: React.ComponentType<any>; colors: string[] }) {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        color1: { value: hexToRgb(colors[0]) },
        color2: { value: hexToRgb(colors[1]) },
        color3: { value: hexToRgb(colors[2]) },
      },
    });
  }, [colors]);

  return <Model material={material} />;
}

export function ProductViewer({ selectedModel, colors }: ProductViewerProps) {
  const ModelComponent = {
    cube: Cube,
    vase: Vase,
    bowl: Bowl,
    ring: Ring,
  }[selectedModel];

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden bg-white shadow-xl">
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            <ModelWrapper model={ModelComponent} colors={colors} />
          </Stage>
        </Suspense>
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
}