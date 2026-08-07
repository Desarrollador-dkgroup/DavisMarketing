import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const BRAND_GREEN = new THREE.Color("#AAC551");
const BRAND_BLUE = new THREE.Color("#1C3D72");
const WHITE = new THREE.Color("#ffffff");

function seededRandom(seed) {
  const value = Math.sin(seed * 999.91) * 43758.5453;
  return value - Math.floor(value);
}

function BrandParticles() {
  const particlesRef = useRef();

  const circleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;

    const context = canvas.getContext("2d");
    const glow = context.createRadialGradient(32, 32, 0, 32, 32, 32);

    glow.addColorStop(0, "rgba(255, 255, 255, 1)");
    glow.addColorStop(0.14, "rgba(255, 255, 255, 1)");
    glow.addColorStop(0.38, "rgba(255, 255, 255, 0.65)");
    glow.addColorStop(0.7, "rgba(255, 255, 255, 0.18)");
    glow.addColorStop(1, "rgba(255, 255, 255, 0)");

    context.fillStyle = glow;
    context.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }, []);

  const { positions, colors } = useMemo(() => {
    const amount = 120;
    const positionValues = new Float32Array(amount * 3);
    const colorValues = new Float32Array(amount * 3);
    const palette = [BRAND_GREEN, BRAND_BLUE, WHITE];

    for (let index = 0; index < amount; index += 1) {
      const angle = seededRandom(index + 1) * Math.PI * 2;
      const radius = 3.7 + seededRandom(index + 12) * 5.6;
      positionValues[index * 3] = Math.cos(angle) * radius;
      positionValues[index * 3 + 1] = Math.sin(angle) * radius;
      positionValues[index * 3 + 2] = -1.8 + seededRandom(index + 30) * 4;

      const color = palette[index % palette.length];
      colorValues[index * 3] = color.r;
      colorValues[index * 3 + 1] = color.g;
      colorValues[index * 3 + 2] = color.b;
    }

    return { positions: positionValues, colors: colorValues };
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.z = clock.elapsedTime * 0.025;
    particlesRef.current.rotation.y = pointer.x * 0.06;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        sizeAttenuation
        transparent
        opacity={0.9}
        vertexColors
        depthWrite={false}
        map={circleTexture}
        alphaTest={0.01}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function BrandTrails() {
  const trailsRef = useRef();
  const { viewport } = useThree();

  const trails = useMemo(() => {
    const definitions = [
      { color: "#AAC551", points: [[-12, -1.8, -1], [-4, 2.7, 0], [4, 2.2, 0.5], [12, -1, -0.5]] },
      { color: "#1C3D72", points: [[-12, 2.4, -1.5], [-4, -2.8, 0], [4, -2, 0.8], [12, 1.4, -1]] },
      { color: "#ffffff", points: [[-12, 0.2, -2], [-5, -1.7, -0.5], [4, 2, 0], [12, 0.3, -1.4]] },
    ];

    return definitions.map(({ color, points }) => ({
      color,
      geometry: new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z))),
        72,
        0.012,
        6,
        false,
      ),
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!trailsRef.current) return;

    trailsRef.current.position.x = Math.sin(clock.elapsedTime * 0.5) * 0.45;
    trailsRef.current.position.y = Math.cos(clock.elapsedTime * 0.) * 0.12;
    trailsRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.25) * 0.012;
  });

  return (
    <group
      ref={trailsRef}
      scale={[Math.max(1, viewport.width / 20), 1, 1]}
    >
      {trails.map(({ color, geometry }) => (
        <mesh key={color} geometry={geometry}>
          <meshBasicMaterial color={color} transparent opacity={0.23} />
        </mesh>
      ))}
    </group>
  );
} 

function ExtrudedLogo() {
  const outerRef = useRef();
  const svg = useLoader(SVGLoader, "/hero/DavisMark.svg");

  const meshes = useMemo(
    () => svg.paths.flatMap((path, pathIndex) =>
      SVGLoader.createShapes(path).map((shape, shapeIndex) => ({
        id: `${pathIndex}-${shapeIndex}`,
        pathIndex,
        geometry: new THREE.ExtrudeGeometry(shape, {
          depth: 30,
          bevelEnabled: true,
          bevelSegments: 4,
          bevelSize: 3,
          bevelThickness: 3,
          curveSegments: 16,
        }),
      })),
    ),
    [svg],
  );

  useFrame(({ clock, pointer }, delta) => {
    if (!outerRef.current) return;

    const reveal = Math.min(1, clock.elapsedTime / 1.7);
    const easedReveal = 1 - (1 - reveal) ** 3;
    const scale = THREE.MathUtils.damp(outerRef.current.scale.x, easedReveal, 4, delta);

    outerRef.current.scale.setScalar(scale);
    outerRef.current.rotation.x = THREE.MathUtils.damp(outerRef.current.rotation.x, pointer.y * -0.1, 5, delta);
    outerRef.current.rotation.y = THREE.MathUtils.damp(outerRef.current.rotation.y, pointer.x * 0.16, 5, delta);
    outerRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.45) * 0.012;
    outerRef.current.position.y = Math.sin(clock.elapsedTime * 0.65) * 0.08;
  });

  /* LOGO */
  return (
    <group ref={outerRef} scale={0.01}>
      {/* <group position={[-4.9, 2.2, 0]} scale={[0.0118, -0.0118, 0.0118]}>
        {meshes.filter(({ pathIndex }) => pathIndex < 2).map(({ id, geometry }) => (
          <mesh key={id} geometry={geometry} castShadow receiveShadow>
            <meshStandardMaterial
              color="#AAC551"
              emissive="#26300c"
              emissiveIntensity={0.55}
              metalness={0.08}
              roughness={0.34}
            />
          </mesh>
        ))} 
      </group> */}

      <mesh position={[-0.4,1.6, 0.38]} castShadow>
        <sphereGeometry args={[0.49, 50, 48]} />
        <meshStandardMaterial
          color="#1C3D72"
          emissive="#071c39"
          emissiveIntensity={0.75}
          metalness={0.12}
          roughness={0.26}
        />
      </mesh>  
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#050606"]} />
      <fog attach="fog" args={["#050606", 11, 24]} />
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 7, 8]} intensity={3.2} color="#ffffff" castShadow />
      <pointLight position={[-6, 1, 4]} intensity={28} distance={12} color="#AAC551" />
      <pointLight position={[6, -1, 3]} intensity={24} distance={12} color="#1C3D72" />
      <BrandParticles />
      <BrandTrails />
      <ExtrudedLogo /> 
    </>
  );
}

function HeroScene() {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 12], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: false }}
      shadows
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
