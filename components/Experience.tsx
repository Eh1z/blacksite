import { OrbitControls, Environment } from "@react-three/drei";
import {
  onPlayerJoin,
  insertCoin,
  isHost,
  myPlayer,
  Joystick,
} from "playroomkit";
import Map from "./Map";
import { useEffect, useState } from "react";
import { CharacterControls } from "@/components";


interface Player {
  state: any;
  joystick: Joystick;
}

export const Experience = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const gameStart = async () => {
    await insertCoin();
  };

  useEffect(() => {
    gameStart();

    // Listen for new players joining and create joystick controls for them
    onPlayerJoin((state) => {
      // Jostick should only create UI for local player
      // Other players will be controlled remotely so only synchronize state
      const joystick = new Joystick(state, {
        type: "angular",
        buttons: [{ id: "fire", label: "Shoot" }],
      });

      const newPlayer: Player = { state, joystick };
      state.setState("health", 100);
      state.setState("kills", 0);
      state.setState("deaths", 0);
      setPlayers((players: Player[]) => [...players, newPlayer]);
      state.onQuit(() => {
        joystick.destroy();
        setPlayers((players: Player[]) =>
          players.filter((p: Player) => p.state.id !== state.id),
        );
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

      {players.map((player: Player, index: number) => (
        <CharacterControls
        key={index}
          position-x={index * 2}
          state={player.state}
          joystick={player.joystick}
          userPlayer={player.state.id === myPlayer()?.id}
        />
      ))}
    
    </>
  );
};

export default Experience;
