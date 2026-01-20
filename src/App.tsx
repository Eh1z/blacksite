import { Canvas } from "@react-three/fiber";
import { StartPage } from "@/components";

function App() {
  return (
    <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <StartPage />
    </Canvas>
  );
}

export default App;