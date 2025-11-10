import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const Butterfly = ({ targetPosition }: { targetPosition: THREE.Vector3 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [randomTarget, setRandomTarget] = useState(new THREE.Vector3(
    Math.random() * 10 - 5,
    Math.random() * 5 + 2,
    Math.random() * 10 - 5
  ));
  const velocity = useRef(new THREE.Vector3());
  const time = useRef(0);

  useEffect(() => {
    // Update random target periodically
    const interval = setInterval(() => {
      if (targetPosition.length() === 0) {
        setRandomTarget(new THREE.Vector3(
          Math.random() * 10 - 5,
          Math.random() * 5 + 2,
          Math.random() * 10 - 5
        ));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [targetPosition]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    time.current += delta;

    // Determine target (click position or random)
    const target = targetPosition.length() > 0 ? targetPosition : randomTarget;

    // Move towards target
    const direction = new THREE.Vector3().subVectors(target, position);
    const distance = direction.length();

    if (distance > 0.1) {
      direction.normalize();
      velocity.current.lerp(direction.multiplyScalar(2), 0.05);
      
      const newPos = position.clone().add(velocity.current.multiplyScalar(delta));
      setPosition(newPos);
      groupRef.current.position.copy(newPos);

      // Rotate butterfly to face movement direction
      const angle = Math.atan2(velocity.current.x, velocity.current.z);
      groupRef.current.rotation.y = angle;
    }

    // Wing flapping animation
    if (leftWingRef.current && rightWingRef.current) {
      const flapSpeed = 15;
      const flapAngle = Math.sin(time.current * flapSpeed) * 0.6;
      leftWingRef.current.rotation.z = flapAngle;
      rightWingRef.current.rotation.z = -flapAngle;
    }

    // Gentle bobbing motion
    groupRef.current.position.y += Math.sin(time.current * 3) * 0.01;
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#2d1b4e" />
      </mesh>

      {/* Left Wing */}
      <mesh ref={leftWingRef} position={[-0.15, 0, 0]}>
        <boxGeometry args={[0.5, 0.01, 0.7]} />
        <meshStandardMaterial 
          color="#9b87f5" 
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Right Wing */}
      <mesh ref={rightWingRef} position={[0.15, 0, 0]}>
        <boxGeometry args={[0.5, 0.01, 0.7]} />
        <meshStandardMaterial 
          color="#9b87f5"
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Left Wing Detail */}
      <mesh ref={leftWingRef} position={[-0.15, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.5]} />
        <meshStandardMaterial 
          color="#7E69AB"
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Right Wing Detail */}
      <mesh ref={rightWingRef} position={[0.15, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.5]} />
        <meshStandardMaterial 
          color="#7E69AB"
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

export const Butterfly3D = () => {
  const [clickPosition, setClickPosition] = useState(new THREE.Vector3());

  const handleClick = (event: MouseEvent) => {
    // Convert 2D screen coordinates to 3D world coordinates
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Create a position in 3D space
    const targetPos = new THREE.Vector3(
      x * 8,
      y * 6 + 3,
      0
    );
    
    setClickPosition(targetPos);
    
    // Reset after butterfly reaches target
    setTimeout(() => {
      setClickPosition(new THREE.Vector3());
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Butterfly targetPosition={clickPosition} />
      </Canvas>
    </div>
  );
};
