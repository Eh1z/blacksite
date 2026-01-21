import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";
import { Mesh } from "three";

const Map = () => {
  const map = useGLTF("models/map.glb");
  useEffect(() => {
    map.scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);
  return <primitive object={map.scene} />;
};
useGLTF.preload("models/map.glb");

export default Map;