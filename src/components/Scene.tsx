import { Canvas } from '@react-three/fiber';
import Sphere from './Sphere';
import { OrbitControls } from '@react-three/drei';

const Scene = () => {
  return (
    <Canvas>
      <OrbitControls makeDefault />
      <Sphere />
    </Canvas>
  );
};

export default Scene;
