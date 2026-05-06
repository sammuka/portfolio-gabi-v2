'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/use-reduced-motion';

/**
 * Grain backdrop — Cold Archive palette.
 *
 * Uniforms (hex cru permitido apenas aqui, excecao documentada no passo 12):
 *   uBase = #0A0A0C  (carbono profundo)
 *   uCool = #3B7CDE  (azul Cold Archive, baixa amplitude)
 *   uMetal = #5E95EA (azul um tom mais claro, flecks micro-frios)
 *
 * Reduced-motion: fallback CSS radial-gradient, sem WebGL.
 * Canvas absoluto, 100% container pai, pointer-events: none.
 */

// Exception: raw hex literals are allowed inside this file (shader uniform limitation).
const COLOR_BASE = '#0A0A0C';
const COLOR_COOL = '#3B7CDE';
const COLOR_METAL = '#5E95EA';

function Shader() {
  const ref = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uBase: { value: new THREE.Color(COLOR_BASE) },
      uCool: { value: new THREE.Color(COLOR_COOL) },
      uMetal: { value: new THREE.Color(COLOR_METAL) },
    }),
    [],
  );

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.uniforms.uTime.value = state.clock.elapsedTime;
    const { width, height } = state.size;
    ref.current.uniforms.uResolution.value.set(width, height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;
          uniform float uTime;
          uniform vec2 uResolution;
          uniform vec3 uBase;
          uniform vec3 uCool;
          uniform vec3 uMetal;
          varying vec2 vUv;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            return mix(
              mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
              mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x),
              u.y
            );
          }

          void main() {
            vec2 uv = vUv;
            vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
            vec2 p = (uv - 0.5) * aspect;

            // Vertical wash: carbono -> carbono com leve toque frio em cima.
            float vertical = smoothstep(-0.6, 0.8, p.y);
            vec3 base = mix(uBase, mix(uBase, uCool, 0.08), vertical);

            // Radial azul bem sutil fora do centro (fonte fria no canto).
            float r = length(p - vec2(0.5, 0.3));
            base = mix(base, mix(uBase, uCool, 0.12), smoothstep(1.0, 0.2, r) * 0.18);

            // Flecks: micro pontos frios, amplitude MUITO baixa (0.05).
            float t = uTime * 0.06;
            vec2 fp = p * 3.0 + vec2(sin(t), cos(t * 0.7)) * 0.1;
            float fleck = noise(fp * 6.0 + t);
            float sparkle = smoothstep(0.90, 0.97, fleck);
            base += uMetal * sparkle * 0.05;

            // Grain monocromático sutil.
            float grain = hash(uv * uResolution + fract(uTime)) - 0.5;
            base += grain * 0.02;

            gl_FragColor = vec4(base, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export function GrainBackdrop({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    // Fallback CSS: radial frio, sem WebGL, sem animacao.
    return (
      <div
        aria-hidden
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 30%, var(--accent-soft), transparent 60%)',
          contain: 'paint',
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        willChange: 'transform',
        contain: 'paint',
      }}
    >
      <Canvas
        gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <Shader />
      </Canvas>
    </div>
  );
}
