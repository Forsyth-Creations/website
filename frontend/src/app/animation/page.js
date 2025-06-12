"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Html } from "@react-three/drei";
import { Box, Chip } from "@mui/material";

export default function AnimationPage() {
  const [scrollY, setScrollY] = useState(0);
  const [modelPosition, setModelPosition] = useState([0, 0, 0]);
  const [modelPosition2, setModelPosition2] = useState([0, 2, 0]);
  const [autorotate, setAutoRotate] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // when the scroll is greater than 600, move the model to the left
  useEffect(() => {
    if (scrollY > 600) {
      setModelPosition([-1.5, 0, 0]);
      setModelPosition2([1.5, 0, 0]);
      setAutoRotate(false);
      setShowLabels(true);
    } else {
      setModelPosition([0, 0, 0]);
      setModelPosition2([0, 0, 0]);
      setAutoRotate(true);
      setShowLabels(false);
    }
  }, [scrollY]);

  return (
    <Box sx={{ height: "300vh" }}>
      <Box sx={{ top: 0, left: 0, zIndex: 1000, position: "fixed" }}>
        <Chip
          label={`Scroll Y: ${scrollY}`}
          sx={{ color: "white", background: "#222", mt: 1 }}
        />
      </Box>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          background: "black",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          style={{ height: "100%", width: "100%" }}
        >
          <ambientLight intensity={0.5} />
          <Model
            src="/models/Lid.stl"
            autorotate={autorotate}
            label={showLabels && "Lid Model"}
            position={modelPosition}
            scale={0.03}
            labelPosition={[0, -1.5, 0]}
          />
          <Model
            src="/models/Lid.stl"
            autorotate={autorotate}
            label={showLabels && "Lid Model 2"}
            position={modelPosition2}
            scale={0.03}
            labelPosition={[0, -1.5, 0]}
          />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
      {/* A third, fake box to make it so scrolling can happen */}
    </Box>
  );
}

function Model({
  src,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  labelPosition = [0, 0.5, 0],
  autorotate = false,
  label = "",
  glideTime = 1000,
  showPose = false,
  scale = 1,
}) {
  const meshRef = useRef(); // used for the mesh reference
  const [geometry, setGeometry] = useState();
  const targetPosition = useRef(new THREE.Vector3(...position));
  const targetRotation = useRef(new THREE.Euler(...rotation));
  const clockRef = useRef(new THREE.Clock());

  function lerpAngle(current, target, alpha) {
    const delta = ((target - current + Math.PI) % (2 * Math.PI)) - Math.PI;
    return current + delta * alpha;
  }

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(
      src,
      (geom) => {
        geom.scale(scale, scale, scale); // Apply initial scale
        geom.computeBoundingBox();
        const center = new THREE.Vector3();
        geom.boundingBox.getCenter(center);
        geom.translate(-center.x, -center.y, -center.z); // Center the model
        setGeometry(geom);
      },
      undefined,
      (error) => console.error("Error loading STL:", error),
    );
  }, [src]);

  // When `position` or `rotation` changes, update targets
  useEffect(() => {
    targetPosition.current = new THREE.Vector3(...position);
    targetRotation.current = new THREE.Euler(...rotation);
    clockRef.current.start();
  }, [position, rotation]);

  useFrame(() => {
    if (!meshRef.current) return;

    // Smooth position (glide-to-position)
    meshRef.current.position.lerp(targetPosition.current, 0.1);

    // Console.log the meshRef current position
    console.log(
      `Current Position: ${meshRef.current.rotation.x}, ${meshRef.current.rotation.y}, ${meshRef.current.rotation.z}`,
    );

    if (autorotate) {
      // Continuous slow spin
      meshRef.current.rotation.y += 0.003;

      // Bobbing effect
      meshRef.current.position.y =
        targetPosition.current.y + Math.sin(performance.now() / 500) * 0.05;
    } else {
      // Interpolate rotation toward target
      let back_toward = lerpAngle(
        meshRef.current.rotation.x,
        targetRotation.current.x,
        0.05,
      );

      console.log(
        `Current Rotation: ${meshRef.current.rotation.x}, Target: ${targetRotation.current.x}, Back Toward: ${back_toward}`,
      );

      meshRef.current.rotation.x = back_toward;
      meshRef.current.rotation.y = lerpAngle(
        meshRef.current.rotation.y,
        targetRotation.current.y,
        0.05,
      );
      meshRef.current.rotation.z = lerpAngle(
        meshRef.current.rotation.z,
        targetRotation.current.z,
        0.05,
      );

      // Ensure bobbing is off
      meshRef.current.position.y = targetPosition.current.y;
    }
  });

  if (!geometry) return null;

  return (
    <group ref={meshRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="black"
          side={THREE.DoubleSide}
          roughness={0.5}
          metalness={0}
        />
      </mesh>

      <Edges geometry={geometry} threshold={15} color="white" />

      {label && (
        <Html
          position={labelPosition}
          center
          distanceFactor={8}
          occlude
          style={{
            color: "white",
            background: "rgba(0,0,0,0.5)",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "20px",
            whiteSpace: "nowrap",
          }}
        >
          <div>{label}</div>
        </Html>
      )}

      {showPose && (
        <Html
          position={[0, -0.5, 0]}
          center
          distanceFactor={8}
          occlude
          style={{
            color: "white",
            background: "rgba(0,0,0,0.5)",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "10px",
            whiteSpace: "nowrap",
          }}
        >
          <div>
            Pose:{" "}
            {meshRef.current?.position
              .toArray()
              .map((n) => n.toFixed(2))
              .join(", ")}{" "}
            |
            {meshRef.current?.rotation
              .toArray()
              .slice(0, 3)
              .map((n) => n.toFixed(2))
              .join(", ")}
          </div>
        </Html>
      )}
    </group>
  );
}
