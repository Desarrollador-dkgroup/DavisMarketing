import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const GREEN = new THREE.Color("#AAC551");
const BLUE = new THREE.Color("#1C3D72");
const WHITE = new THREE.Color("#ffffff");

const clamp01 = (value) => THREE.MathUtils.clamp(value, 0, 1);
const easeOutCubic = (value) => 1 - (1 - clamp01(value)) ** 3;
const smoothStep = (start, end, value) => {
  const progress = clamp01((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
};

function seededRandom(seed) {
  const value = Math.sin(seed * 875.37) * 43758.5453;
  return value - Math.floor(value);
}

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(32, 32, 1, 32, 32, 31);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(255,255,255,0.95)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.3)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

function IntroParticles({ reducedMotion }) {
  const pointsRef = useRef(null);
  const materialRef = useRef(null);
  const glowTexture = useMemo(createGlowTexture, []);

  const { positions, colors } = useMemo(() => {
    const count = 150;
    const positionValues = new Float32Array(count * 3);
    const colorValues = new Float32Array(count * 3);
    const palette = [GREEN, BLUE, GREEN, BLUE, WHITE];

    for (let index = 0; index < count; index += 1) {
      const angle = seededRandom(index + 2) * Math.PI * 2;
      const radius = 3.1 + seededRandom(index + 20) * 9.5;
      positionValues[index * 3] = Math.cos(angle) * radius;
      positionValues[index * 3 + 1] = Math.sin(angle) * radius * 0.56;
      positionValues[index * 3 + 2] = -2 + seededRandom(index + 55) * 5;

      const color = palette[index % palette.length];
      colorValues[index * 3] = color.r;
      colorValues[index * 3 + 1] = color.g;
      colorValues[index * 3 + 2] = color.b;
    }

    return { positions: positionValues, colors: colorValues };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current || !materialRef.current) return;
    const time = reducedMotion ? 9 : clock.elapsedTime;
    const intro = smoothStep(0, 0.8, time);
    const fade = 1 - smoothStep(4.4, 6.4, time);

    materialRef.current.opacity = 0.13 + intro * fade * 0.85;
    pointsRef.current.rotation.z = time * 0.035;
    pointsRef.current.position.z = Math.min(time * 0.11, 0.65);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.18}
        sizeAttenuation
        transparent
        opacity={0}
        vertexColors
        depthWrite={false}
        map={glowTexture}
        alphaTest={0.015}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function CinematicLogo({ reducedMotion }) {
  const logoRef = useRef(null);
  const outlineRef = useRef(null);
  const outlineGlowRef = useRef(null);
  const fillMaterials = useRef([]);
  const outlineMaterials = useRef([]);
  const sphereMaterialRef = useRef(null);
  const { viewport } = useThree();
  const svg = useLoader(SVGLoader, "/hero/DavisMark.svg");

  const logoShapes = useMemo(
    () => svg.paths.slice(0, 2).flatMap((path, pathIndex) =>
      SVGLoader.createShapes(path).map((shape, shapeIndex) => {
        const flatGeometry = new THREE.ShapeGeometry(shape, 18);
        return {
          id: `${pathIndex}-${shapeIndex}`,
          fillGeometry: flatGeometry,
          outlineGeometry: new THREE.EdgesGeometry(flatGeometry, 16),
        };
      }),
    ),
    [svg],
  );

  useFrame(({ clock }) => {
    if (!logoRef.current || !outlineRef.current || !outlineGlowRef.current) return;
    const time = reducedMotion ? 9 : clock.elapsedTime;
    const outlineEnter = smoothStep(0, 3, time);
    const outlineExit = 1 - smoothStep(4.8, 6.3, time);
    const fillEnter = easeOutCubic((time - 3) / 3);
    const responsiveScale = Math.min(1, viewport.width / 11.5);

    outlineMaterials.current.forEach((material) => {
      if (material) material.opacity = outlineEnter * outlineExit * 0.95;
    });

    outlineRef.current.traverse((object) => {
      if (!object.isLineSegments) return;
      const positionCount = object.geometry.attributes.position.count;
      const visiblePositions = Math.floor((positionCount * outlineEnter) / 2) * 2;
      object.geometry.setDrawRange(0, visiblePositions);
    });

    outlineGlowRef.current.traverse((object) => {
      if (!object.isLineSegments) return;
      const positionCount = object.geometry.attributes.position.count;
      const visiblePositions = Math.floor((positionCount * outlineEnter) / 2) * 2;
      object.geometry.setDrawRange(0, visiblePositions);
      object.material.opacity = outlineEnter * outlineExit * 0.34;
    });

    fillMaterials.current.forEach((material) => {
      if (material) material.opacity = fillEnter;
    });

    if (sphereMaterialRef.current) sphereMaterialRef.current.opacity = fillEnter;

    const scale = responsiveScale * THREE.MathUtils.lerp(0.86, 1, fillEnter);
    logoRef.current.scale.setScalar(scale);
    outlineRef.current.scale.setScalar(responsiveScale * THREE.MathUtils.lerp(0.94, 1, outlineEnter));
    outlineGlowRef.current.scale.copy(outlineRef.current.scale);
    logoRef.current.position.z = THREE.MathUtils.lerp(-0.5, 0.15, fillEnter);
    logoRef.current.position.y = viewport.width < 8 ? 0.75 : 0.9;
    outlineRef.current.position.y = logoRef.current.position.y;
    outlineGlowRef.current.position.y = logoRef.current.position.y;
  });

  return (
    <>
      <group ref={outlineGlowRef}>
        <group position={[-4.9, 2.2, 0.08]} scale={[0.0118, -0.0118, 0.0118]}>
          {logoShapes.flatMap(({ id, outlineGeometry }, index) =>
            [[1.35, 0, 0], [-1.35, 0, 0], [0, 1.35, 0], [0, -1.35, 0]].map((position, glowIndex) => (
              <lineSegments
                key={`outline-glow-${id}-${glowIndex}`}
                geometry={outlineGeometry}
                position={position}
              >
                <lineBasicMaterial
                  color={index % 2 === 0 ? "#1C3D72" : "#AAC551"}
                  transparent
                  opacity={0}
                  depthWrite={false}
                  blending={THREE.AdditiveBlending}
                  toneMapped={false}
                />
              </lineSegments>
            )),
          )}
        </group>
      </group>

      <group ref={outlineRef}>
        <group position={[-4.9, 2.2, 0.1]} scale={[0.0118, -0.0118, 0.0118]}>
          {logoShapes.map(({ id, outlineGeometry }, index) => (
            <lineSegments key={`outline-${id}`} geometry={outlineGeometry}>
              <lineBasicMaterial
                ref={(material) => { outlineMaterials.current[index] = material; }}
                color={index % 2 === 0 ? "#1C3D72" : "#AAC551"}
                transparent
                opacity={0}
                blending={THREE.AdditiveBlending}
                toneMapped={false}
              />
            </lineSegments>
          ))}
        </group>
      </group>

      <group ref={logoRef}>
        <group position={[-4.9, 2.2, 0]} scale={[0.0118, -0.0118, 0.0118]}>
          {logoShapes.map(({ id, fillGeometry }, index) => (
            <mesh key={`fill-${id}`} geometry={fillGeometry} castShadow>
              <meshStandardMaterial
                ref={(material) => { fillMaterials.current[index] = material; }}
                color="#AAC551"
                transparent
                opacity={0}
                roughness={0.38}
                metalness={0}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>

        <mesh position={[-0.4, 1.6, 0.22]}>
          <circleGeometry args={[0.49, 64]} />
          <meshStandardMaterial
            ref={sphereMaterialRef}
            color="#1C3D72"
            transparent
            opacity={0}
            roughness={0.55}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
}

function CinematicLighting({ reducedMotion }) {
  const sweepLightRef = useRef(null);

  useFrame(({ clock }) => {
    if (!sweepLightRef.current) return;
    const time = reducedMotion ? 9 : clock.elapsedTime;
    const sweep = smoothStep(4.4, 7.4, time);
    const active = smoothStep(4.2, 4.65, time) * (1 - smoothStep(7.2, 7.8, time));
    sweepLightRef.current.position.x = THREE.MathUtils.lerp(-7, 7, sweep);
    sweepLightRef.current.intensity = active * 42;
  });

  return (
    <>
      <ambientLight intensity={1.35} />
      <directionalLight position={[4, 7, 8]} intensity={2.8} color="#ffffff" />
      <pointLight position={[-5, 1, 4]} intensity={12} distance={12} color="#AAC551" />
      <pointLight position={[5, 0, 4]} intensity={10} distance={12} color="#1C3D72" />
      <pointLight ref={sweepLightRef} position={[-7, 3, 5]} intensity={0} distance={9} color="#ffffff" />
    </>
  );
}

function Scene({ reducedMotion }) {
  return (
    <>
      <CinematicLighting reducedMotion={reducedMotion} />
      <IntroParticles reducedMotion={reducedMotion} />
      <CinematicLogo reducedMotion={reducedMotion} />
    </>
  );
}

function CinematicHeroScene({ reducedMotion = false }) {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 12.5], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <Suspense fallback={null}>
        <Scene reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

export default CinematicHeroScene;
