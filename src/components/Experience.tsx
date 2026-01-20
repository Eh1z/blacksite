import { OrbitControls, Environment } from "@react-three/drei";
import { onPlayerJoin, insertCoin, isHost, myPlayer, Joystick } from "playroomkit";
import Map from "./Map";
import {useEffect, useState} from "react"

interface Player {
  state: any;
  joyStick: Joystick;
}

export const Experience = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const gameStart = async () => {
    await insertCoin();
  }

  useEffect(() => {
    gameStart()


    // Listen for new players joining and create joystick controls for them
    onPlayerJoin((state) => {
    // Jostick should only create UI for local player
    // Other players will be controlled remotely so only synchronize state
      const joyStick = new Joystick(state, {
        type: "angular",
        buttons: [{ id: "fire", label: "Shoot"}]
      })

      const newPlayer: Player = {state, joyStick}
      state.setState("health", 100);
      state.setState("kills", 0);
      state.setState("deaths", 0);
      setPlayers((players: Player[]) => [...players, newPlayer])
      state.onQuit(() => {
        joyStick.destroy();
        setPlayers((players: Player[]) => players.filter((p: Player) => p.state.id !== state.id));
      });
    });
    
  }, []);


  return (
    <>
      <directionalLight
        intensity={0.3}
        castShadow={true}
        position={[25, 18, -25]}
        // Shadow settings
        shadow-camera-near={0}
        shadow-camera-far={90}
        shadow-camera-right={30}
        shadow-camera-left={-30}
        shadow-camera-top={25}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-bias={-0.0001}
      />
      <OrbitControls />
      <Environment preset="park" />
      <Map />
    </>
  );
};

export default Experience;
