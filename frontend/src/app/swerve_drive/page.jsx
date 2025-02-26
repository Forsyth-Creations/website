"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Paper,
  Box,
  TextField,
  Stack,
  Button,
  Chip,
  Tooltip,
  Typography,
  IconButton,
  useMediaQuery,
  Divider,
} from "@mui/material";
import WholeScreen from "@/comps/Frames/WholeScreen";

// Pause and play icon
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NorthIcon from "@mui/icons-material/North"; // For flip y
import EastIcon from "@mui/icons-material/East"; // For flip x
import LineAxisIcon from "@mui/icons-material/LineAxis";

// Check and Cross icon
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const SwerveDrivePage = () => {
  const radius = 20;
  const spacing = 50;

  const wheelVectors = useRef([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  const wheelAngles = useRef([0, 0, 0, 0]);

  const [paused, setPaused] = useState(false);
  const [frequency, setFrequency] = useState(60);
  const [robotAngle, setRobotAngle] = useState(0);
  const [angularVelocity, setAngularVelocity] = useState(0);
  const [linearVelocity, setLinearVelocity] = useState([0, 0]);
  const [position, setPosition] = useState([0, 0]);
  const [renderedPosition, setRenderedPosition] = useState([0, 0]);
  const [toggleValidationWindow, setToggleValidationWindow] = useState(false);
  const [toggleOdom, setToggleOdom] = useState(false);

  const isSmall = useMediaQuery("(max-width:900px)");

  const windowCenter = [window.innerWidth / 2, window.innerHeight / 2];

  useEffect(() => {
    setRenderedPosition([window.innerWidth / 2, window.innerHeight / 2]);
  }, []);

  function updatePose() {
    let xt1 = position[0] + linearVelocity[0] * (1 / frequency);
    let yt1 = position[1] + linearVelocity[1] * (1 / frequency);
    let thetat1 = robotAngle + angularVelocity * (1 / frequency);
    console.log(`xt1: ${xt1} yt1: ${yt1}`);
    console.log(
      `Position: ${position}, Linear Velocity: ${linearVelocity}, Angular Velocity: ${angularVelocity}, Rendered Position: ${renderedPosition} xt1: ${xt1} yt1: ${yt1}`,
    );
    setPosition([xt1, yt1]);
    setRobotAngle(thetat1);
    setRenderedPosition([windowCenter[0] + xt1, windowCenter[1] - yt1]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) {
        return;
      }
      updatePose();
    }, 1000 / frequency);

    return () => clearInterval(interval);
  }, [position, linearVelocity, angularVelocity, paused]);

  const handleReset = () => {
    setRenderedPosition([window.innerWidth / 2, window.innerHeight / 2]);
    setAngularVelocity(0);
    setLinearVelocity([0, 0]);
    setPosition([0, 0]);
    setRobotAngle(0);
  };

  const togglePause = () => {
    if (paused) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  };

  const handleToggleValidationWindow = () => {
    setToggleValidationWindow(!toggleValidationWindow);
  };

  const averageX = (
    wheelVectors.current.reduce((acc, curr) => acc + parseFloat(curr[0]), 0) / 4
  ).toFixed(2);

  const averageY = (
    wheelVectors.current.reduce((acc, curr) => acc + parseFloat(curr[1]), 0) / 4
  ).toFixed(2);

  return (
    <WholeScreen>
      {/* Show an x and y axis symbol in the top right */}
      <Box sx={{ position: "absolute", top: 20, right: 100 }}>
        <svg
          width="100"
          height="100"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        >
          <line x1="0" y1="0" x2="0" y2="50" stroke="red" strokeWidth="1" />
          <line x1="0" y1="50" x2="50" y2="50" stroke="red" strokeWidth="1" />
          <text x="5" y="45" fill="red">
            Y
          </text>
          <text x="45" y="65" fill="red">
            X
          </text>
        </svg>
      </Box>

      {/* When I toggle the validation window, show me a printout in the exact center of the screen with all the wheelVectors */}
      {toggleValidationWindow && (
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 2,
            zIndex: 100,
          }}
        >
          <Stack direction="column" spacing={2}>
            <Typography>Wheel Vectors</Typography>
            <Chip
              label={`Robot XY Components: ${linearVelocity[0].toFixed(2)}, ${linearVelocity[1].toFixed(2)}`}
            />
            <Chip label={`Front Left: ${wheelVectors.current[0]}`} />
            <Chip label={`Front Right: ${wheelVectors.current[1]}`} />
            <Chip label={`Back Right: ${wheelVectors.current[2]}`} />
            <Chip label={`Back Left: ${wheelVectors.current[3]}`} />
            {/* Confirm that the math is sound */}
            <Divider />
            <Typography>X Components:</Typography>
            <Stack direction="row" spacing={2}>
              <Typography>
                {`(${wheelVectors.current[0][0]} + ${wheelVectors.current[1][0]} + ${wheelVectors.current[2][0]} + ${wheelVectors.current[3][0]}) / 4`}{" "}
                = {averageX}
              </Typography>
              {/* If the x average is equal to the x component of the robot, show a check */}
              <Tooltip
                title={
                  averageX === linearVelocity[0].toFixed(2)
                    ? "Matches overall velocity"
                    : "Incorrect"
                }
              >
                {averageX === linearVelocity[0].toFixed(2) ? (
                  <CheckIcon />
                ) : (
                  <CloseIcon />
                )}
              </Tooltip>
            </Stack>
            {/* Now show the average heading */}
            <Divider />
            <Typography>Y Components:</Typography>
            <Stack direction="row" spacing={2}>
              <Typography>
                {`(${wheelVectors.current[0][1]} + ${wheelVectors.current[1][1]} + ${wheelVectors.current[2][1]} + ${wheelVectors.current[3][1]}) / 4`}{" "}
                = {averageY}
              </Typography>
              {/* If the x average is equal to the x component of the robot, show a check */}
              <Tooltip
                title={
                  averageY === linearVelocity[1].toFixed(2)
                    ? "Matches overall velocity"
                    : "Incorrect"
                }
              >
                {averageY === linearVelocity[1].toFixed(2) ? (
                  <CheckIcon />
                ) : (
                  <CloseIcon />
                )}
              </Tooltip>
            </Stack>
            <Divider />
            {/* Show the set wheel angles */}
            <Typography>Wheel Angles (Units are counter clockwise):</Typography>
            <Chip
              label={`Front Left: Rads: ${-wheelAngles.current[0].toFixed(2)} Deg: ${-wheelAngles.current[0] * (180 / Math.PI).toFixed(2)}`}
            />
            <Chip
              label={`Front Right: Rads:  ${-wheelAngles.current[1].toFixed(2)} Deg: ${-wheelAngles.current[1] * (180 / Math.PI).toFixed(2)}`}
            />
            <Chip
              label={`Back Right: Rads:  ${-wheelAngles.current[2].toFixed(2)} Deg: ${-wheelAngles.current[2] * (180 / Math.PI).toFixed(2)}`}
            />
            <Chip
              label={`Back Left: Rads:  ${-wheelAngles.current[3].toFixed(2)} Deg: ${-wheelAngles.current[3] * (180 / Math.PI).toFixed(2)}`}
            />
          </Stack>
        </Paper>
      )}

      <RobotRender
        position={renderedPosition}
        radius={radius}
        angularVelocity={angularVelocity}
        frequency={frequency}
        linearVelocity={linearVelocity}
        robotAngle={robotAngle}
        wheelVectors={wheelVectors}
        spacing={spacing}
        wheelAngles={wheelAngles}
      />

      {toggleOdom && (
        <Odometry position={position} windowCenter={windowCenter} />
      )}
      <Chip
        sx={{ position: "absolute", top: 20, left: 20 }}
        label={`Position   X: ${position[0].toFixed(2)}   Y: ${position[1].toFixed(2)}`}
      />
      <Box
        sx={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Stack direction={isSmall ? "column" : "row"} spacing={2} sx={{ m: 4 }}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Angular Velocity (rad/s)"
              type="number"
              value={angularVelocity}
              onChange={(e) =>
                setAngularVelocity(parseFloat(e.target.value) || 0)
              }
              size="small"
            />
            <TextField
              label="X Velocity (m/s)"
              type="number"
              value={linearVelocity[0]}
              onChange={(e) =>
                setLinearVelocity([
                  parseFloat(e.target.value) || 0,
                  linearVelocity[1],
                ])
              }
              size="small"
            />
            <TextField
              label="Y Velocity (m/s)"
              type="number"
              value={linearVelocity[1]}
              onChange={(e) =>
                setLinearVelocity([
                  linearVelocity[0],
                  parseFloat(e.target.value) || 0,
                ])
              }
              size="small"
            />
          </Stack>
          <Stack
            direction="row"
            sw={{ width: "100%" }}
            justifyContent={"space-between"}
          >
            <Tooltip title="Reset">
              <IconButton variant="contained" onClick={handleReset}>
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
            <IconButton variant="contained" onClick={togglePause}>
              {paused ? <PlayArrowIcon /> : <PauseIcon />}
            </IconButton>
            <Tooltip title="Toggle validation window">
              <IconButton
                variant="contained"
                onClick={handleToggleValidationWindow}
              >
                {toggleValidationWindow ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </Tooltip>
            {/* Multiply x velocity by -1 */}
            <Tooltip title="Flip X">
              <IconButton
                variant="contained"
                onClick={() =>
                  setLinearVelocity([linearVelocity[0] * -1, linearVelocity[1]])
                }
              >
                <EastIcon />
              </IconButton>
            </Tooltip>
            {/* Multiply y velocity by -1 */}
            <Tooltip title="Flip Y">
              <IconButton
                variant="contained"
                onClick={() =>
                  setLinearVelocity([linearVelocity[0], linearVelocity[1] * -1])
                }
              >
                <NorthIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle Odom">
              <IconButton
                variant="contained"
                onClick={() => setToggleOdom(!toggleOdom)}
              >
                <LineAxisIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Joystick setLinearVelocity={setLinearVelocity} />
      </Box>
    </WholeScreen>
  );
};

const Odometry = ({ position, windowCenter }) => {
  // Draw two lines, from the center of the window to the provided position, showing X and Y

  return (
    <>
      <ArrowVector
        start={windowCenter}
        end={[windowCenter[0] + position[0], windowCenter[1]]}
        color="green"
        label={`X: ${position[0].toFixed(2)}`}
      />
      <ArrowVector
        start={[windowCenter[0] + position[0], windowCenter[1]]}
        end={[windowCenter[0] + position[0], windowCenter[1] - position[1]]}
        color="red"
        label={`Y: ${position[1].toFixed(2)}`}
      />
    </>
  );
};

const Joystick = ({ setLinearVelocity }) => {
  const [joystickPosition, setJoystickPosition] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState([0, 0]); // Stores the initial click offset
  const joystickRef = useRef(null);

  const handleStart = (e) => {
    setIsDragging(true);
    const rect = joystickRef.current.getBoundingClientRect();
    const clientX = e.touches?.[0]?.clientX ?? e.clientX;
    const clientY = e.touches?.[0]?.clientY ?? e.clientY;

    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;

    // Store the initial offset when clicked
    setOffset([x - joystickPosition[0], y - joystickPosition[1]]);
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const clientX = e.touches?.[0]?.clientX ?? e.clientX;
    const clientY = e.touches?.[0]?.clientY ?? e.clientY;

    let x = clientX - rect.left - rect.width / 2 - offset[0];
    let y = clientY - rect.top - rect.height / 2 - offset[1];

    // Constrain joystick movement within the circle
    const radius = 40;
    const distance = Math.sqrt(x * x + y * y);
    if (distance > radius) {
      x = (x / distance) * radius;
      y = (y / distance) * radius;
    }

    const multiplier = 5;
    setJoystickPosition([x, y]);
    setLinearVelocity([x * multiplier, -y * multiplier]); // Adjust divisor for sensitivity
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <svg
      ref={joystickRef}
      width="100"
      height="100"
      style={{
        border: "1px solid black",
        borderRadius: "50%",
        touchAction: "none",
      }}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <circle cx="50" cy="50" r="40" fill="lightgray" />
      <circle
        cx={50 + joystickPosition[0]}
        cy={50 + joystickPosition[1]}
        r="10"
        fill="blue"
      />
    </svg>
  );
};

const RobotRender = ({
  position,
  radius,
  angularVelocity,
  linearVelocity,
  robotAngle,
  wheelVectors,
  spacing,
  wheelAngles,
}) => {
  const offsets = [
    [spacing, -spacing],
    [spacing, spacing],
    [-spacing, spacing],
    [-spacing, -spacing],
  ];

  function computeWheelSpeed(Vx, Vy, omega, Xi, Yi) {
    return Math.sqrt((Vx - omega * Yi) ** 2 + (Vy + omega * Xi) ** 2);
  }

  function computeWheelAngle(Vx, Vy, omega, Xi, Yi) {
    return Math.atan2(Vy + omega * Xi, Vx - omega * Yi);
  }

  return (
    <>
      {/* Robot body */}
      <Box
        sx={{
          position: "absolute",
          left: position[0] - radius,
          top: position[1] - radius,
          width: radius * 2,
          height: radius * 2,
          borderRadius: "50%",
          border: "1px solid white",
        }}
      />

      {/* Wheels */}
      {offsets.map((offset, index) => {
        const rotatedX =
          offset[0] * Math.cos(robotAngle) - offset[1] * Math.sin(robotAngle);
        const rotatedY =
          offset[0] * Math.sin(robotAngle) + offset[1] * Math.cos(robotAngle);
        const wheelX = position[0] + rotatedX - radius;
        const wheelY = position[1] + rotatedY - radius;

        return (
          <Box
            key={index}
            sx={{
              position: "absolute",
              left: wheelX,
              top: wheelY,
              width: radius * 2,
              height: radius * 2,
              // borderRadius: "50%",
              border: "1px solid white",
            }}
          />
        );
      })}

      {/* Show a central vector that corresponds to the overall linear velocity */}
      <ArrowVector
        start={position}
        end={[position[0] + linearVelocity[0], position[1] - linearVelocity[1]]}
        color="blue"
      />

      {/* Superimposed arrows */}
      {offsets.map((offset, index) => {
        const rotatedX =
          offset[0] * Math.cos(robotAngle) - offset[1] * Math.sin(robotAngle);
        const rotatedY =
          offset[0] * Math.sin(robotAngle) + offset[1] * Math.cos(robotAngle);
        const wheelCenterX = position[0] + rotatedX;
        const wheelCenterY = position[1] + rotatedY;

        // Run the wheel computation here
        const wheelSpeed = computeWheelSpeed(
          linearVelocity[0],
          -linearVelocity[1],
          angularVelocity,
          rotatedX,
          rotatedY,
        );
        const wheelAngle = computeWheelAngle(
          linearVelocity[0],
          -linearVelocity[1],
          angularVelocity,
          rotatedX,
          rotatedY,
        );

        const endpoints = [
          [wheelCenterX, wheelCenterY],
          [
            wheelCenterX + wheelSpeed * Math.cos(wheelAngle),
            wheelCenterY + wheelSpeed * Math.sin(wheelAngle),
          ],
        ];

        let wheelSpeedX = wheelSpeed * Math.cos(wheelAngle);
        let wheelSpeedY = wheelSpeed * Math.sin(wheelAngle);

        // update wheel vectors
        wheelVectors.current[index] = [
          wheelSpeedX.toFixed(2),
          -wheelSpeedY.toFixed(2),
        ];

        // Update the wheel angles
        wheelAngles.current[index] = wheelAngle;

        return (
          <ArrowVector
            key={index}
            start={endpoints[0]}
            end={endpoints[1]}
            color="green"
          />
        );
      })}
    </>
  );
};

const ArrowVector = ({
  start,
  end,
  color = "red",
  strokeWidth = 2,
  label = null,
}) => {
  const arrowSize = 10; // Size of arrowhead

  // Calculate the angle of the arrow
  const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);

  // Calculate arrowhead points to ensure the tip is exactly at 'end'
  const leftX = end[0] - arrowSize * Math.cos(angle - Math.PI / 6);
  const leftY = end[1] - arrowSize * Math.sin(angle - Math.PI / 6);
  const rightX = end[0] - arrowSize * Math.cos(angle + Math.PI / 6);
  const rightY = end[1] - arrowSize * Math.sin(angle + Math.PI / 6);

  if (start[0] === end[0] && start[1] === end[1]) {
    return;
  }

  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* Main arrow line (stopping at the base of the arrowhead) */}
      <line
        x1={start[0]}
        y1={start[1]}
        x2={(leftX + rightX) / 2}
        y2={(leftY + rightY) / 2}
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Arrowhead with the tip at 'end' */}
      <polygon
        points={`${end[0]},${end[1]} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />

      {/* Label at the center of the vector */}
      {label && (
        <text
          x={(start[0] + end[0]) / 2}
          y={(start[1] + end[1]) / 2}
          fill={color}
          fontSize="12"
          textAnchor="middle"
          dy="-5"
        >
          {label}
        </text>
      )}
    </svg>
  );
};

export default SwerveDrivePage;
