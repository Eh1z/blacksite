import { Canvas } from "@react-three/fiber";
import { Experience } from "@/components";
import { SoftShadows } from "@react-three/drei";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

function App() {
  return (
    <Canvas shadows camera={{ position: [30, 30, 0], fov: 30 }}>
      <color attach="background" args={["#e3efef"]} />
      <SoftShadows size={32} />
   

          <Experience />

    </Canvas>
  );
}

export default App;
