  /* eslint-disable @typescript-eslint/no-explicit-any */
  "use client";
  import { useRef } from "react";
  import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
  import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from "@react-three/drei";
  import { easing } from "maath";
  import { useStore } from "../shirtStore";
  import * as THREE from "three";

  export default function ShirtScene({
    position = [0, 0, 2.5],
    fov = 25,
  }: {
    position?: [number, number, number];
    fov?: number;
  }) {
    return (
      <Canvas
        shadows
        camera={{ position, fov }}
        gl={{ preserveDrawingBuffer: true }}
        eventPrefix="client"
        className="opacity-0 animate-fadeIn"
      >
        <ambientLight intensity={0.5 * Math.PI} />
        {/* Using a built-in preset instead of loading HDR */}
        <Environment preset="city" />
        <CameraRig>
          <Backdrop />
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      </Canvas>
    );
  }

  function Backdrop() {
    const shadows = useRef<AccumulativeShadows>(null!);

    useFrame((state, delta) => {
      if (shadows.current) {
        const mesh = shadows.current.getMesh();
        if (mesh) {
          easing.dampC(mesh.material.color, useStore.getState().color, 0.25, delta);
        }
      }
    });

    return (
      <AccumulativeShadows
        ref={shadows}
        temporal
        frames={60}
        alphaTest={0.85}
        scale={5}
        resolution={2048}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -0.14]}
      >
        <RandomizedLight
          amount={4}
          radius={9}
          intensity={0.55 * Math.PI}
          ambient={0.25}
          position={[5, 5, -10]}
        />
        <RandomizedLight
          amount={4}
          radius={5}
          intensity={0.25 * Math.PI}
          ambient={0.55}
          position={[-5, 5, -9]}
        />
      </AccumulativeShadows>
    );
  }

  function CameraRig({ children }: { children: React.ReactNode }) {
    const group = useRef<THREE.Group>(null!);
    const { intro } = useStore();

    useFrame((state, delta) => {
      easing.damp3(
        state.camera.position,
        [intro ? -state.viewport.width / 4 : 0, 0, 2],
        0.25,
        delta
      );
      if (group.current) {
        easing.dampE(
          group.current.rotation,
          [state.pointer.y / 10, -state.pointer.x / 5, 0],
          0.25,
          delta
        );
      }
    });

    return <group ref={group}>{children}</group>;
  }

  function Shirt(props: ThreeElements["mesh"]) {
    const { color, decal } = useStore();
    const texture = useTexture(`/assets/homeSlide_image/men/projectimg/${decal}.jpg`);
    const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb") as any;

    useFrame((state, delta) => {
      if (materials?.lambert1) {
        easing.dampC(materials.lambert1.color, color, 0.25, delta);
      }
    });

    return (
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        {...props}
        dispose={null}
      >
        <Decal
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          map={texture}
        />
      </mesh>
    );
  }

  // Preload GLTF and images
  useGLTF.preload("/shirt_baked_collapsed.glb");
  [
    "t-shirt-12.jpg",
    "t-shirt-2.jpg",
    "t-shirt-3.jpg",
  ].forEach(useTexture.preload);
