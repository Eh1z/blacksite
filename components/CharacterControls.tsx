import { useRef, useState } from "react";
import { Joystick } from "playroomkit";
import { Group } from "three";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { OperatorCharacter } from "./OperatorCharacter";

interface CharacterControlsProps {
  state: any;
  joystick: Joystick;
  userPlayer: boolean;
  [key: string]: any;
}

const CharacterControls = ({
  state,
  joystick,
  userPlayer,
  ...props
}: CharacterControlsProps) => {
  const group = useRef<Group>(null);
  const character = useRef<Group>(null);
  const [animation, setAnimation] = useState<string>("Idle");

  return (
    <group ref={group} {...props}>

        <group ref={character}>
          <OperatorCharacter
            color={state.state.profile?.color}
            animation={animation}
          />
        </group>
    
    </group>
  );
};

export default CharacterControls;
