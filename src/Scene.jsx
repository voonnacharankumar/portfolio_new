import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;
  void main() {
    vec3 p = position;
    float d = sin(p.x * 2.4 + uTime * 0.9) * sin(p.y * 2.6 + uTime * 1.1) * sin(p.z * 2.2 + uTime * 0.7);
    d += 0.45 * sin(p.x * 5.0 - uTime * 1.3) * sin(p.y * 4.0 + uTime * 0.6);
    p += normal * d * 0.22;
    vDisp = d;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vView = -mv.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float fresnel = pow(1.0 - max(dot(n, v), 0.0), 2.2);
    vec3 col = mix(uColorA, uColorB, smoothstep(-0.7, 0.7, vDisp));
    col = mix(col, uColorC, fresnel);
    gl_FragColor = vec4(col + fresnel * 0.35, 1.0);
  }
`;

function createUniforms() {
  return {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color("#1e1b4b") },
    uColorB: { value: new THREE.Color("#7c3aed") },
    uColorC: { value: new THREE.Color("#22d3ee") },
  };
}

function createStarPositions() {
  const count = 1800;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 4 + Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi) - 4;
  }
  return positions;
}

function Orb() {
  const group = useRef(null);
  const core = useRef(null);
  const shell = useRef(null);
  const ringA = useRef(null);
  const ringB = useRef(null);
  const uniforms = useMemo(createUniforms, []);

  useFrame(function animate(state, delta) {
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    const wide = state.viewport.width > 7;
    const targetX = wide ? state.viewport.width * 0.22 : 0;
    const targetY = wide ? 0 : state.viewport.height * 0.24;
    const targetScale = wide ? 1.15 : 0.7;
    const g = group.current;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetScale, 0.08));
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.05);
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY + Math.sin(t * 0.8) * 0.12, 0.05);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.6, 0.04);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.4, 0.04);
    core.current.rotation.y += delta * 0.15;
    shell.current.rotation.y -= delta * 0.1;
    shell.current.rotation.z += delta * 0.05;
    ringA.current.rotation.z += delta * 0.35;
    ringB.current.rotation.z -= delta * 0.25;
  });

  return (
    <group ref={group} scale={1.15}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.25, 64]} />
        <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.85, 2]} />
        <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.18} />
      </mesh>
      <group rotation={[1.2, 0.3, 0]}>
        <mesh ref={ringA}>
          <torusGeometry args={[2.35, 0.012, 16, 200]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
        </mesh>
      </group>
      <group rotation={[-0.9, -0.6, 0.4]}>
        <mesh ref={ringB}>
          <torusGeometry args={[2.7, 0.008, 16, 200]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.55} />
        </mesh>
      </group>
    </group>
  );
}

function Stars() {
  const points = useRef(null);
  const positions = useMemo(createStarPositions, []);

  useFrame(function animate(state, delta) {
    points.current.rotation.y += delta * 0.02;
    points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, state.pointer.y * 0.1, 0.03);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#c7d2fe" transparent opacity={0.8} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function CameraRig() {
  useFrame(function animate(state) {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.4, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.3, 0.03);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene({ reducedMotion }) {
  return (
    <Canvas
      className="scene-canvas"
      aria-hidden="true"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <Stars />
      <Orb />
      <CameraRig />
    </Canvas>
  );
}
