"use client";
import { Canvas } from "@react-three/fiber";
import { Experience } from "@/components";
import { SoftShadows } from "@react-three/drei";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

const App = () => {
  return (
   
      <Canvas shadows camera={{ position: [30, 30, 0], fov: 30 }} className="w-full h-svh">
        <color attach="background" args={["#e3efef"]} />
        <SoftShadows size={32} />
        <Suspense fallback={null}>
          <Physics>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>

  );
};

export default App;
