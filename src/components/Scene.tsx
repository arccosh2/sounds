import { Canvas } from '@react-three/fiber';
import Sphere from './Sphere';
import { OrbitControls } from '@react-three/drei';

const Scene = () => {
  return (
    <Canvas>
      <color attach="background" args={[0x1c192a]} />
      <OrbitControls makeDefault />
      <Sphere />
    </Canvas>
  );
};

export default Scene;
