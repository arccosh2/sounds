import { Canvas } from '@react-three/fiber';
import Sphere from './Sphere';

const Scene = () => {
  return (
    <Canvas>
      <color attach="background" args={[0x1c192a]} />
      <Sphere />
    </Canvas>
  );
};

export default Scene;
