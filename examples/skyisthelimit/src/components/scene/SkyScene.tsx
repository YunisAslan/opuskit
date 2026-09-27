"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { BackSide, MathUtils, Mesh, MeshBasicMaterial, SRGBColorSpace, type Group, type MeshStandardMaterial } from "three";
import { assets } from "@/config/assets";

const MAX_TILT = MathUtils.degToRad(8);
const LERP = 0.08;
// Sphere radius ends up at 50 units after the 0.001 scale; the dolly travels a third of the way to the wall.
const DOLLY = 18;
// Framing: the low sun sits right of the headline, and the pitch drops the real horizon onto the words "a horizon".
const START_YAW = MathUtils.degToRad(60);
const PITCH = MathUtils.degToRad(14);

function Sky({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF(assets["3dModelOrScene"].src);
  const group = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const target = useRef({ x: 0, y: 0, dolly: 0 });

  // The model ships a spec-gloss material three no longer reads; its sky lives in the emissive map.
  // Show that texture flat and unlit — the sky is the light.
  const sky = useMemo(() => {
    const s = scene.clone();
    s.traverse((o) => {
      if (o instanceof Mesh) {
        const map = (o.material as MeshStandardMaterial).emissiveMap;
        if (map) map.colorSpace = SRGBColorSpace;
        o.material = new MeshBasicMaterial({ map, side: BackSide, toneMapped: false });
      }
    });
    return s;
  }, [scene]);

  useEffect(() => {
    onReady();
    const onPointer = (e: PointerEvent) => {
      target.current.x = (e.clientY / window.innerHeight - 0.5) * 2;
      target.current.y = (e.clientX / window.innerWidth - 0.5) * 2;
      invalidate();
    };
    const onScroll = () => {
      target.current.dolly = MathUtils.clamp(window.scrollY / window.innerHeight, 0, 1);
      invalidate();
    };
    onScroll();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [invalidate, onReady]);

  // Damped toward target; keeps requesting frames only until it settles (frameloop="demand").
  useFrame(({ camera }) => {
    const g = group.current;
    if (!g) return;
    const t = target.current;
    const rx = t.x * MAX_TILT * 0.5;
    const ry = START_YAW + t.y * MAX_TILT;
    const z = -t.dolly * DOLLY;
    g.rotation.x = MathUtils.lerp(g.rotation.x, rx, LERP);
    g.rotation.y = MathUtils.lerp(g.rotation.y, ry, LERP);
    camera.position.z = MathUtils.lerp(camera.position.z, z, LERP);
    const moving = Math.abs(g.rotation.x - rx) + Math.abs(g.rotation.y - ry) + Math.abs(camera.position.z - z) > 1e-4;
    if (moving) invalidate();
  });

  return (
    <group ref={group} rotation={[0, START_YAW, 0]}>
      <primitive object={sky} scale={0.001} />
    </group>
  );
}

export default function SkyScene({ active, onReady }: { active: boolean; onReady: () => void }) {
  return (
    <Canvas
      aria-hidden
      dpr={[1, 2]}
      frameloop={active ? "demand" : "never"}
      camera={{ fov: 55, near: 0.1, far: 200, position: [0, 0, 0], rotation: [PITCH, 0, 0] }}
      gl={{ antialias: false, powerPreference: "low-power" }}
    >
      <Sky onReady={onReady} />
    </Canvas>
  );
}
