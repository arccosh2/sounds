import { Text } from '@react-three/drei';
import { useMemo } from 'react';
import { SphereGeometry, ShaderMaterial } from 'three';

const Sphere = () => {
  const spherePositions = useMemo(() => {
    const sphereGeometry = new SphereGeometry(1.6, 56, 56);
    return sphereGeometry.attributes.position.array;
  }, []);

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speed: { value: 1.0 },
        waveSize: { value: 0.1 },
        color: { value: { r: 0.68, g: 0.54, b: 0.72 } },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 5.0;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
          gl_FragColor = vec4(color, alpha);
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
        <primitive object={shaderMaterial} attach="material" />
      </points>

      <Text color="#cfb7d6" fontSize={1.6}>
        Sounds
      </Text>
    </>
  );
};

export default Sphere;
