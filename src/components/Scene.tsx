import { Canvas } from '@react-three/fiber';
import Sphere from './Sphere';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';

const Scene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // NOTE: footer・headerの高さを含めないCanvasの描画領域の高さを取得する
  useEffect(() => {
    const updateHeight = () => {
      if (!containerRef.current) return;
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      if (!header || !footer) return;

      const headerHeight = header.getBoundingClientRect().height;
      const footerHeight = footer.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;
      const availableHeight = windowHeight - headerHeight - footerHeight;

      containerRef.current.style.height = `${availableHeight}px`;
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
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
