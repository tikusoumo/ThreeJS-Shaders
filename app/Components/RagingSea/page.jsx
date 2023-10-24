"use client";
import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import fragmentShader from "../shaders/RagingSea/fragmentShader";
import vertexShader from "../shaders/RagingSea/vertexShader";

export default function Scene() {
  return (
    <div className="h-screen">
      <Canvas>
        <TweakableBox />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

function TweakableBox() {
  const mesh = useRef();
  const {
    scale,
    uElevation,
    uFrequency,
    uSpeed,
    uDepthColor,
    uSurfaceColor,
    uColorOffset,
    uColorMultiplier,
    uSmallWaveElevation,
    uSmallWaveFrequency,
    uSmallWaveSpeed,
    uSmallWaveIterations,

  } = useControls("Transformation", {
    scale: {
      value: 1,
      min: 0,
      max: 5,
      step: 0.5,
    },
    uElevation: {
      value: 0.2,
      min: 0,
      max: 1,
      step: 0.2,
      onChange: (value) => {
        mesh.current.material.uniforms.uElevation.value = value;
      },
    },
    uFrequency: {
      value: new THREE.Vector2(5.1, 0.1),
      min: 0,
      max: 10,
      step: 0.1,
      onChange: (value) => {
        mesh.current.material.uniforms.uFrequency.value = value;
      },
    },
    uSpeed: {
      value: 3.0,
      min: 0,
      max: 5,
      step: 0.1,
      onChange: (value) => {
        mesh.current.material.uniforms.uSpeed.value = value;
      },
    },
    uDepthColor: {
      value: "#3d8eff",
      onChange: (value) => {
        mesh.current.material.uniforms.uDepthColor.value = new THREE.Color(
          value
        );
      },
    },
    uSurfaceColor: {
      value: "#3245ed",
      onChange: (value) => {
        mesh.current.material.uniforms.uSurfaceColor.value = new THREE.Color(
          value
        );
      },
    },
    uColorOffset: {
      value: 0.3,
      min: 0,
      max: 1,
      step: 0.1,
      onChange: (value) => {
        mesh.current.material.uniforms.uColorOffset.value = value;
      },
    },

    uColorMultiplier: {
      value: 4.0,
      min: 0,
      max: 5,
      step: 0.1,
      onChange: (value) => {
        mesh.current.material.uniforms.uColorMultiplier.value = value;
      },

    },
    uSmallWaveElevation: {
      value: 0.25,
      min: 0,
      max: 1,
      step: 0.1,
      onChange: (value) => {
        mesh.current.material.uniforms.uSmallWaveElevation.value = value;
      },
    },
    uSmallWaveFrequency: {
      value: 3.0,
      min: 0,
      max: 10,
      step: 0.1,
      onChange: (value) => {
        mesh.current.material.uniforms.uSmallWaveFrequency.value = value;
      },
    
    },
    uSmallWaveSpeed: {
      value: 0.2,
      min: 0,
      max: 1,
      step: 0.1,
      onChange: (value) => {
        mesh.current.material.uniforms.uSmallWaveSpeed.value = value;
      },

    },
    uSmallWaveIterations: {
      value: 4.0,
      min: 1,
      max: 5,
      step: 1,
      onChange: (value) => {
        mesh.current.material.uniforms.uSmallWaveIterations.value = value;
      },

    },
  });
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uElevation: {
        value: uElevation,
      },
      uFrequency: {
        value: uFrequency,
      },
      uSpeed: {
        value: uSpeed,
      },
      uDepthColor: {
        value: new THREE.Color(uDepthColor),
      },
      uSurfaceColor: {
        value: uSurfaceColor,
      },
      uColorOffset: {
        value: uColorOffset,
      },
      uColorMultiplier: {
        value: uColorMultiplier,
      },
      uSmallWaveElevation: {
        value: uSmallWaveElevation,
      },
      uSmallWaveFrequency: {
        value: uSmallWaveFrequency,
      },
      uSmallWaveSpeed: {
        value: uSmallWaveSpeed,
      },
      uSmallWaveIterations: {
        value: uSmallWaveIterations,
      },
    }),
    [
      uElevation,
      uFrequency,
      uSpeed,
      uSurfaceColor,
      uDepthColor,
      uColorOffset,
      uColorMultiplier,
      uSmallWaveElevation,
      uSmallWaveFrequency,
      uSmallWaveSpeed,
      uSmallWaveIterations,
    ]
  );
  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
  });
  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={scale}>
      <planeGeometry args={[2, 2, 512, 512]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
