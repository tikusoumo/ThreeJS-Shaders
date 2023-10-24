"use client";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Color } from "three";
import { MathUtils } from "three";
import fragmentShader from "../shaders/Pattern/fragmentShader";
import vertexShader from "../shaders/Pattern/vertexShader";

export default function Scene() {
  return (
    <div className="h-screen">
      <Canvas shadows>
        <Plane />
      </Canvas>
    </div>
  );
}

function Plane() {
  const mesh = useRef();


  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1.5}
     
      >
      <planeGeometry args={[2, 2]} />

      <OrbitControls />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        
        
      />
    </mesh>
  );
}
