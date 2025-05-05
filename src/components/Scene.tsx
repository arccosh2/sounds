import { Canvas } from '@react-three/fiber';
import Sphere from './Sphere';
import { OrbitControls } from '@react-three/drei';

const Scene = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <OrbitControls makeDefault />
        <Sphere />
      </Canvas>
    </div>
  );
};

export default Scene;
