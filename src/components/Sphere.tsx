import { OrbitControls } from '@react-three/drei';
// import { useMemo } from 'react';
// import { SphereGeometry } from 'three';

const Sphere = () => {
  // const spherePositions = useMemo(() => {
  //   const sphereGeometry = new SphereGeometry(1.5, 32, 32);

  //   return sphereGeometry.attributes.position;
  // }, []);

  return (
    <>
      <directionalLight position={[1, 2, 3]} intensity={1} />
      <ambientLight intensity={1} />
      <OrbitControls />
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#a286aa" wireframe />
      </mesh>
    </>
  );
};

export default Sphere;
