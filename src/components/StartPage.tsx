import { OrbitControls } from "@react-three/drei";

export const StartPage = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};

export default StartPage;