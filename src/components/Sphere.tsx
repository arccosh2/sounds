import { Text } from '@react-three/drei';
import { useMemo, useRef, useEffect } from 'react';
import { ShaderMaterial } from 'three';
import { useAudio } from '../hooks/useAudio';
import { useThree } from '@react-three/fiber';

const Sphere = () => {
  const materialRef = useRef<ShaderMaterial>(null);
  const timeRef = useRef(0);
  const { audioLevel } = useAudio();
  const { viewport } = useThree();

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      if (!materialRef.current) return;

      timeRef.current += 0.05;
      materialRef.current.uniforms.time.value = timeRef.current;
      materialRef.current.uniforms.audioLevel.value = audioLevel;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [audioLevel]);

  const spherePositions = useMemo(() => {
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const radius = 1.5;

    for (let i = 0; i < particleCount; i++) {
      // 球面座標系でランダムな位置を生成
      const theta = Math.random() * Math.PI * 2; // 0から2π
      const phi = Math.acos(2 * Math.random() - 1); // -1から1をacosで変換

      // 球面座標から直交座標に変換
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // 位置を配列に格納
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    return positions;
  }, []);

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        audioLevel: { value: 0 },
      },
      vertexShader: `
        uniform float time;
        uniform float audioLevel;
        
        void main() {
          float wave = sin(position.x * 2.0 + time) * audioLevel * 0.6;
          vec3 newPosition = position;
          newPosition.y += wave;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          gl_PointSize = 5.0;
        }
      `,
      fragmentShader: `
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
          gl_FragColor = vec4(0.68, 0.54, 0.72, alpha);
        }
      `,
      transparent: true,
    });
  }, []);

  return (
    <>
      <directionalLight position={[1, 2, 3]} intensity={1} />
      <ambientLight intensity={1} />

      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            array={spherePositions}
            itemSize={3}
            count={spherePositions.length / 3}
            args={[spherePositions, 3]}
          />
        </bufferGeometry>
        <primitive
          ref={materialRef}
          object={shaderMaterial}
          attach="material"
        />
      </points>

      <Text color="#cfb7d6" fontSize={viewport.width / 10} letterSpacing={0.1}>
        Sounds
      </Text>
    </>
  );
};

export default Sphere;
