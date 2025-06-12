"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Html } from "@react-three/drei";
import { Box, Chip, Button } from "@mui/material";
import { DarkmodeContext } from "@/contexts/ThemeProvider";

export default function AnimationPage() {
  const [showLabels, setShowLabels] = useState(false);
  const [position, setPosition] = useState(0);

  const [data, setData] = useState({
    Cockpit: {
      actualPosition: [0, 0.1, 0.35],
      originPosition: [0, 0.1, 0.35],
      // secondaryLocation: [0, 5, flatZ],
      actualRotation: [-1.57, 0, 0],
      originRotation: [-1.57, 0, 0],
      secondaryRotation: [-1.57, 0, 0],
      rotation: [-1.57, 0, 0],
      labelPosition: [0, 0.1, 0.15],
      scale: 0.01,
      threshold: 2.8,
      src: "/models/plane/Toy_Plane_Cockpit.stl",
      label: "Cockpit",
    },
    Engine: {
      actualPosition: [0, -0.03, 0.9],
      originPosition: [0, -0.03, 0.9],
      actualRotation: [0, 0, 0],
      originRotation: [0, 0, 0],
      secondaryRotation: [0, 0, 0],
      rotation: [0, 0, 0],
      labelPosition: [0, 0.3, 0.1],
      scale: 0.01,
      threshold: 2.8,
      src: "/models/plane/Toy_Plane_Engine.stl",
      label: "Engine",
    },
    "Front Cover": {
      actualPosition: [0.0, -0.03, 0.84],
      originPosition: [0.0, -0.03, 0.84],
      actualRotation: [0, 3.14, 3.14],
      originRotation: [0, 3.14, 3.14],
      secondaryRotation: [0, 3.14, 3.14],
      rotation: [0, 3.14, 3.14],
      labelPosition: [0, 0.18, 0.84],
      scale: 0.01,
      threshold: 2.8,
      src: "/models/plane/Toy_Plane_Front_Cover.stl",
      label: "Front Cover",
    },
    Fuselage: {
      actualPosition: [0, 0, 0],
      originPosition: [0, 0, 0],
      actualRotation: [0, 3.14, -1.57],
      originRotation: [0, 3.14, -1.57],
      secondaryRotation: [0, 3.14, -1.57],
      rotation: [0, 3.14, -1.57],
      labelPosition: [0, 0.25, 0],
      scale: 0.01,
      threshold: 2.8,
      src: "/models/plane/Toy_Plane_fuselage.stl",
      label: "Fuselage",
    },
    "Lower Wing": {
      actualPosition: [0, -0.13, 0.44],
      originPosition: [0, -0.13, 0.44],
      actualRotation: [1.57, 3.14, 2.35],
      originRotation: [1.57, 3.14, 2.35],
      secondaryRotation: [1.57, 3.14, 2.35],
      rotation: [1.57, 3.14, 2.35],
      labelPosition: [0.6, 0.5, 0.2],
      scale: 0.01,
      threshold: 2.8,
      src: "/models/plane/Toy_Plane_Lower_Wing.stl",
      label: "Lower Wing",
    },
    Propeller: {
      actualPosition: [0, -0.03, 1.13],
      originPosition: [0, -0.03, 1.13],
      actualRotation: [0, 0, 1],
      originRotation: [0, 0, 1],
      secondaryRotation: [0, 0, 1],
      rotation: [0, 0, 1],
      labelPosition: [0, 0.18, 0.15],
      scale: 0.01,
      threshold: 2.8,
      src: "/models/plane/Toy_Plane_Propeller.stl",
      label: "Propeller",
    },
    "Rear Wing": {
      actualPosition: [0, 0.1, -0.48],
      originPosition: [0, 0.1, -0.48],
      actualRotation: [-1.57, 0, -1.57],
      originRotation: [-1.57, 0, -1.57],
      secondaryRotation: [-1.57, 0, -1.57],
      rotation: [-1.57, 0, -1.57],
      labelPosition: [0.0, 0.4, 0.2],
      scale: 0.01,
      threshold: 10,
      src: "/models/plane/Toy_Plane_Rear_Wing.stl",
      label: "Rear Wing",
    },
    "Wheel 1": {
      actualPosition: [0.38, -0.37, 0.71],
      originPosition: [0.38, -0.37, 0.71],
      actualRotation: [0, 1.57, 0],
      originRotation: [0, 1.57, 0],
      secondaryRotation: [0, 1.57, 0],
      rotation: [0, 1.57, 0],
      labelPosition: [0.2, -0.22, 0],
      scale: 0.01,
      threshold: 2.85,
      src: "/models/plane/Toy_Plane_Wheel_2x.stl",
      label: "Wheel 1",
    },
    "Wheel 2": {
      actualPosition: [-0.38, -0.37, 0.71],
      originPosition: [-0.38, -0.37, 0.71],
      actualRotation: [0, -1.57, 0],
      originRotation: [0, -1.57, 0],
      secondaryRotation: [0, -1.57, 0],
      rotation: [0, -1.57, 0],
      labelPosition: [-0.2, -0.22, 0],
      scale: 0.01,
      threshold: 2.85,
      src: "/models/plane/Toy_Plane_Wheel_2x.stl",
      label: "Wheel 2",
    },
  });

  // Compute the center of mass of all parts
  function computeCenterOfMass(data) {
    const keys = Object.keys(data);
    const sum = [0, 0, 0];
    keys.forEach((key) => {
      const pos = data[key].originPosition;
      sum[0] += pos[0];
      sum[1] += pos[1];
      sum[2] += pos[2];
    });
    return [sum[0] / keys.length, sum[1] / keys.length, sum[2] / keys.length];
  }

  const centerOfMass = computeCenterOfMass(data);

  function computeExplodedPosition(key, part) {
    // Compute the center of mass of the part's geometry if available, otherwise use originPosition
    let partCenter = part.originPosition;
    if (part.geometry && part.geometry.boundingBox) {
      const center = new THREE.Vector3();
      part.geometry.boundingBox.getCenter(center);
      partCenter = [center.x, center.y, center.z];
    }
    const explosionDistance = 0.8; // Adjust as needed
    const dir = [
      partCenter[0] - centerOfMass[0],
      partCenter[1] - centerOfMass[1],
      partCenter[2] - centerOfMass[2],
    ];
    // Find the axis with the greatest absolute distance to the center of mass
    const maxAxis = [0, 1, 2].reduce((a, b) =>
      Math.abs(dir[a]) > Math.abs(dir[b]) ? a : b,
    );

    // Only move along that axis, preserving sign
    const move = [0, 0, 0];
    // Make the movement length relative to its absolute distance from the center of mass
    const distance = Math.abs(dir[maxAxis]);
    const moveLength = explosionDistance * distance;
    move[maxAxis] = Math.sign(dir[maxAxis]) * moveLength;
    return [
      partCenter[0] + move[0],
      partCenter[1] + move[1],
      partCenter[2] + move[2],
    ];
  }

  const explode = () => {
    console.log("Exploding");
    setData((prevData) => {
      const newData = { ...prevData };
      Object.keys(newData).forEach((key) => {
        newData[key].actualPosition = computeExplodedPosition(
          key,
          newData[key],
        );
        newData[key].rotation = newData[key].secondaryRotation;
      });
      return newData;
    });
    // activate the labels
    setShowLabels(true);
  };

  const collapse = () => {
    console.log("Collapsing");
    setData((prevData) => {
      const newData = { ...prevData };
      Object.keys(newData).forEach((key) => {
        newData[key].actualPosition = newData[key].originPosition;
        newData[key].rotation = newData[key].originRotation;
      });
      return newData;
    });
    setShowLabels(false);
  };

  // occasionally toggle the exploded view
  useEffect(() => {
    let toggle = false;
    const interval = setInterval(() => {
      toggle ? collapse() : explode();
      toggle = !toggle;
    }, 5000); // Adjust the interval as needed
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <Canvas
          camera={{ position: [5, 0, 5], fov: 25 }}
          style={{ height: "100%", width: "100%" }}
        >
          <ambientLight intensity={255} />

          {Object.keys(data).map((key) => (
            <Model
              key={key}
              src={data[key].src}
              bob={false}
              label={showLabels && data[key].label}
              position={data[key].actualPosition}
              scale={data[key].scale}
              labelPosition={data[key].labelPosition}
              rotation={data[key].rotation}
              transparent={true}
            />
          ))}

          {/* Draw the center of mass */}
          {/* <mesh position={centerOfMass}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="hotpink" />
        </mesh> */}
          <OrbitControls autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>
      {/* <Button onClick={toggleSecondLocation}>Toggle Second Location</Button> */}
    </Box>
  );
}

function Model({
  src,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  labelPosition = [0, 0.5, 0],
  bob = false,
  label = "",
  scale = 1,
  threshold = 2.8,
  transparent = false,
}) {
  const meshRef = useRef(); // used for the mesh reference
  const [geometry, setGeometry] = useState();
  const [initailized, setInitialized] = useState(false);
  const targetPosition = useRef(new THREE.Vector3(...position));
  const targetRotation = useRef(new THREE.Euler(...rotation));
  const clockRef = useRef(new THREE.Clock());
  const { isDark } = useContext(DarkmodeContext);

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

    if (!initailized) {
      // init based on props
      meshRef.current.position.copy(targetPosition.current);
      meshRef.current.rotation.copy(targetRotation.current);
      setInitialized(true);
    } else if (bob) {
      const elapsed = clockRef.current.getElapsedTime();
      meshRef.current.position.y =
        targetPosition.current.y + Math.sin(elapsed * 2) * 0.03;
    }

    // interpolate to the target position
    meshRef.current.position.lerp(targetPosition.current, 0.1);
    meshRef.current.rotation.x = lerpAngle(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      0.02,
    );
    meshRef.current.rotation.y = lerpAngle(
      meshRef.current.rotation.y % 6.28,
      targetRotation.current.y,
      0.02,
    );
    meshRef.current.rotation.z = lerpAngle(
      meshRef.current.rotation.z,
      targetRotation.current.z,
      0.02,
    );
  });

  if (!geometry) return null;

  return (
    <group ref={meshRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={isDark ? "#000" : "#fff"}
          metalness={10}
          roughness={10}
          transparent={transparent}
          opacity={transparent ? 0.8 : 1}
        />
      </mesh>

      <Edges
        geometry={geometry}
        threshold={threshold}
        color={isDark ? "#fafafa" : "#222"}
        lineWidth={2}
      />

      {label && (
        <Html
          position={labelPosition}
          center
          distanceFactor={8}
          occlude
          style={{
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "0.25rem",
            whiteSpace: "nowrap",
            fontFamily: "monospace",
          }}
        >
          <div>{label}</div>
        </Html>
      )}
    </group>
  );
}
