"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
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
  Drawer,
  Modal,
} from "@mui/material";
import WholeScreen from "@/comps/Frames/WholeScreen";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
// Pause and play icon
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NorthIcon from "@mui/icons-material/North"; // For flip y
import EastIcon from "@mui/icons-material/East"; // For flip x
import LineAxisIcon from "@mui/icons-material/LineAxis";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import { LineChart } from "@mui/x-charts/LineChart";
import { Joystick } from "react-joystick-component";

// Check and Cross icon
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function normalizeAngle(angle) {
  return ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
}

function shortestAngle(currentAngle, targetAngle) {
  let diff = ((targetAngle - currentAngle + Math.PI) % (2 * Math.PI)) - Math.PI;
  return currentAngle + diff;
}

const modal_style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};

const SwerveDrivePage = () => {
  const radius = 20;
  const spacing = 50;

  const wheelVectors = useRef([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  // const wheelAnglesLog = useRef([

  const wheelAngles = useRef([0, 0, 0, 0]);

  const [simTime, setSimTime] = useState(0);
  const [counter, setCounter] = useState(0);

  const angleHistoryA = useRef({});

  const [paused, setPaused] = useState(false);
  const [frequency, setFrequency] = useState(60);
  const [samplingPeriod, setSamplingPeriod] = useState(
    Math.round(frequency * 0.1),
  );
  const [robotAngle, setRobotAngle] = useState(0);
  const [angularVelocity, setAngularVelocity] = useState(0);
  const [linearVelocity, setLinearVelocity] = useState([0, 0]);
  const [position, setPosition] = useState([0, 0]);
  const [renderedPosition, setRenderedPosition] = useState([0, 0]);
  const [toggleValidationWindow, setToggleValidationWindow] = useState(false);
  const [toggleOdom, setToggleOdom] = useState(false);
  const [windowCenter, setWindowCenter] = useState([0, 0]);
  const [toggleGraph, setToggleGraph] = useState(false);

  const isSmall = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    if (window == undefined) {
      return;
    }
    setRenderedPosition([window.innerWidth / 2, window.innerHeight / 2]);
    setWindowCenter([window.innerWidth / 2, window.innerHeight / 2]);
  }, []);

  function updatePose() {
    let xt1 = position[0] + linearVelocity[0] * (1 / frequency);
    let yt1 = position[1] + linearVelocity[1] * (1 / frequency);
    let thetat1 = robotAngle + angularVelocity * (1 / frequency);
    setPosition([xt1, yt1]);
    setRobotAngle(normalizeAngle(thetat1));
    setRenderedPosition([windowCenter[0] + xt1, windowCenter[1] - yt1]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) {
        return;
      }
      updatePose();
      setSimTime((prev) => {
        const newCounter = counter + 1;
        setCounter(newCounter);

        if (newCounter % samplingPeriod === 0) {
          let currentAngle = normalizeAngle(
            wheelAngles.current[0] - robotAngle,
          );
          angleHistoryA.current[prev] = currentAngle;
        }

        const newTime = prev + 1 / frequency;
        return newTime;
      });
    }, 1000 / frequency);

    return () => clearInterval(interval);
  }, [
    position,
    linearVelocity,
    angularVelocity,
    paused,
    wheelAngles,
    samplingPeriod,
  ]);

  const codeSegment = `function shortestAngle(currentAngle, targetAngle) {
        let diff = (targetAngle - currentAngle + Math.PI) % (2 * Math.PI) - Math.PI;
        return currentAngle + diff;
      }`;

  const handleReset = () => {
    if (window !== undefined) {
      setWindowCenter([window.innerWidth / 2, window.innerHeight / 2]);
    }
    setWindowCenter([window.innerWidth / 2, window.innerHeight / 2]);
    setRenderedPosition([window.innerWidth / 2, window.innerHeight / 2]);
    setAngularVelocity(0);
    setLinearVelocity([0, 0]);
    setPosition([0, 0]);
    setRobotAngle(0);
    setSimTime(0);
    setCounter(0);
    angleHistoryA.current = {};
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

  const downloadHistoryAsCSV = () => {
    const csv = Object.keys(angleHistoryA.current)
      .map((key) => {
        return `${key},${angleHistoryA.current[key]}`;
      })
      .join("\n");
    const element = document.createElement("a");
    const file = new Blob([csv], { type: "text/csv" });
    element.href = URL.createObjectURL(file);
    element.download = "swerve_module_a_history.csv";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <Box sx={{ maxHeight: "100vh", overflowY: "clip" }}>
      <WholeScreen>
        {/* Show an x and y axis symbol in the top right */}
        <Axis sx={{ position: "absolute", top: 20, right: 80 }} />

        <Modal
          open={toggleValidationWindow}
          onClose={handleToggleValidationWindow}
        >
          <Paper sx={modal_style}>
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
              <Typography>
                Wheel Angles (Units are counter clockwise):
              </Typography>
              <Chip
                label={`A: Rads: ${normalizeAngle(robotAngle - wheelAngles.current[0]).toFixed(2)} Deg: ${(normalizeAngle(robotAngle - wheelAngles.current[0]) * (180 / Math.PI)).toFixed(2)}`}
              />
              <Chip
                label={`B: Rads:  ${normalizeAngle(robotAngle - wheelAngles.current[1]).toFixed(2)} Deg: ${(normalizeAngle(robotAngle - wheelAngles.current[1]) * (180 / Math.PI)).toFixed(2)}`}
              />
              <Chip
                label={`C: Rads:  ${normalizeAngle(robotAngle - wheelAngles.current[2]).toFixed(2)} Deg: ${(normalizeAngle(robotAngle - wheelAngles.current[2]) * (180 / Math.PI)).toFixed(2)}`}
              />
              <Chip
                label={`D: Rads:  ${normalizeAngle(robotAngle - wheelAngles.current[3]).toFixed(2)} Deg: ${(normalizeAngle(robotAngle - wheelAngles.current[3]) * (180 / Math.PI)).toFixed(2)}`}
              />
            </Stack>
          </Paper>
        </Modal>

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
          showAxis={toggleOdom}
        />

        {toggleOdom && (
          <Odometry position={position} windowCenter={windowCenter} />
        )}
        <Stack sx={{ position: "absolute", top: 20, left: 20 }} spacing={1}>
          <Chip
            label={`Position   X: ${position[0].toFixed(2)}   Y: ${position[1].toFixed(2)}`}
          />
          <Chip label={`Time: ${simTime.toFixed(2)}`} />
          <Chip label={`Robot Angle: ${robotAngle.toFixed(2)}`} />
          <Chip label={`Angular Velocity: ${angularVelocity.toFixed(2)}`} />
        </Stack>
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
          <Stack
            direction={isSmall ? "column" : "row"}
            spacing={2}
            sx={{ m: 4 }}
          >
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
                    setLinearVelocity([
                      linearVelocity[0] * -1,
                      linearVelocity[1],
                    ])
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
                    setLinearVelocity([
                      linearVelocity[0],
                      linearVelocity[1] * -1,
                    ])
                  }
                >
                  <NorthIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Toggle Axis">
                <IconButton
                  variant="contained"
                  onClick={() => setToggleOdom(!toggleOdom)}
                >
                  <SocialDistanceIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Toggle Graph">
                <IconButton
                  variant="contained"
                  onClick={() => setToggleGraph(!toggleGraph)}
                >
                  <LineAxisIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <Joystick2 setLinearVelocity={setLinearVelocity} />
        </Box>
      </WholeScreen>
      <Drawer
        anchor="right"
        open={toggleGraph}
        onClose={() => setToggleGraph(false)}
      >
        <Box sx={{ padding: 2, maxWidth: "40vw" }}>
          <Typography variant="h6">Swerve Module A Graph</Typography>
          <LineChart
            skipAnimation
            xAxis={[
              {
                data: Object.keys(angleHistoryA.current)
                  .slice(-50)
                  .map((key) => parseFloat(key)),
              },
            ]}
            series={[
              {
                data: Object.values(angleHistoryA.current)
                  .slice(-50)
                  .map((value) => value),
              },
            ]}
            width={500}
            height={300}
          />
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => setToggleGraph(false)}
              color="error"
              variant="contained"
            >
              Close
            </Button>
            {/* Clear History */}
            <Button
              onClick={() => (angleHistoryA.current = {})}
              variant="contained"
            >
              Clear History
            </Button>
            {/* Download as CSV */}
            <Button
              variant="contained"
              color="warning"
              onClick={downloadHistoryAsCSV}
            >
              Download as CSV ({Object.keys(angleHistoryA.current).length})
              entries
            </Button>
          </Stack>
          <Stack sx={{ overflowY: "auto", p: 2 }} spacing={2}>
            <Divider></Divider>
            <Typography variant="h6">Notes about the graph:</Typography>
            <Alert severity="info">
              In this graph, you will see there are conditions where you might
              suddenly "jump" from 0 to 2π or vice versa. This is because the
              angle is normalized to be between 0 and 2π. This is done to ensure
              that the angle is always between 0 and 2π. However, for the robot
              implementation, you can use a "difference" function to calculate
              the shortest angle between two angles. To do this, you will have
              to keep track of a history of current and previous angles. An
              example Javascript implementation is shown below:
            </Alert>
            <CodeBlock code={codeSegment}></CodeBlock>
          </Stack>
        </Box>
      </Drawer>
    </Box>
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

const Joystick2 = ({ setLinearVelocity }) => {
  const isSmall = useMediaQuery("(max-width:900px)");
  const [joystick, setJoystick] = useState({ x: 0, y: 0 });
  const scaler = 100;
  const handleMove = (event) => {
    setJoystick({ x: event.x, y: event.y });
    setLinearVelocity([event.x * scaler, event.y * scaler]);
  };

  return (
    <Stack
      alignContent={"center"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography>Joystick</Typography>
      <Joystick
        size={isSmall ? 100 : 150}
        baseColor={"#204D71"}
        stickColor={"#505050"}
        move={handleMove}
        throttle={10}
        pos={joystick}
        stickSize={isSmall ? 50 : 75}
      />
    </Stack>
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
  showAxis = false,
}) => {
  const offsets = [
    [spacing, -spacing],
    [spacing, spacing],
    [-spacing, spacing],
    [-spacing, -spacing],
  ];

  const names = ["A", "B", "C", "D"];

  function computeWheelSpeed(Vx, Vy, omega, Xi, Yi) {
    return Math.sqrt((Vx - omega * Yi) ** 2 + (Vy + omega * Xi) ** 2);
  }

  function computeWheelAngle(Vx, Vy, omega, Xi, Yi) {
    return Math.atan2(Vy + omega * Xi, Vx - omega * Yi);
  }

  const previousWheelAngles = useRef([0, 0, 0, 0]);

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

      {/* Axis for the main body */}
      {showAxis && (
        <Axis
          sx={{
            position: "absolute",
            top: position[1] - 50,
            left: position[0],
          }}
        />
      )}

      {/* Wheels */}
      {offsets.map((offset, index) => {
        const rotatedX =
          offset[0] * Math.cos(robotAngle) - offset[1] * Math.sin(robotAngle);
        const rotatedY =
          offset[0] * Math.sin(robotAngle) + offset[1] * Math.cos(robotAngle);
        const wheelX = position[0] + rotatedX - radius;
        const wheelY = position[1] + rotatedY - radius;
        const name = names[index];

        return (
          <Box
            key={index}
            sx={{
              position: "absolute",
              left: wheelX + radius / 2,
              top: wheelY,
              width: radius,
              height: radius * 2,
              // borderRadius: "50%",
              border: "1px solid white",
              borderTop: "1px solid green",
              // rotate with the vector
              transform: `rotate(${
                wheelAngles.current[index] * (180 / Math.PI) + 90
              }deg)`,
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
              }}
            >
              {name}
            </Typography>

            {showAxis && (
              <Axis sx={{ position: "absolute", top: -30, right: 10 }} />
            )}
          </Box>
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

        const previousAngle = previousWheelAngles.current[index];

        // Run the wheel computation here
        const wheelSpeed = computeWheelSpeed(
          linearVelocity[0],
          -linearVelocity[1],
          angularVelocity,
          rotatedX,
          rotatedY,
        );

        const wheelAngle = shortestAngle(
          previousAngle,
          normalizeAngle(
            computeWheelAngle(
              linearVelocity[0],
              -linearVelocity[1],
              angularVelocity,
              rotatedX,
              rotatedY,
            ),
          ),
        );

        // update the previous angle
        previousWheelAngles.current[index] = wheelAngle;

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

const Axis = ({ sx, size = 50, stroke = 3 }) => {
  return (
    <Box sx={sx}>
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
        <line
          x1="0"
          y1="0"
          x2="0"
          y2={size}
          stroke="red"
          strokeWidth={stroke}
        />
        <line
          x1="0"
          y1={size}
          x2="50"
          y2={size}
          stroke="red"
          strokeWidth={stroke}
        />
        <text x="5" y={size - 5} fill="red">
          Y
        </text>
        <text x={size - 5} y="65" fill="red">
          X
        </text>
      </svg>
    </Box>
  );
};

const CodeBlock = ({ code }) => (
  <SyntaxHighlighter language="javascript" style={dracula}>
    {code}
  </SyntaxHighlighter>
);

export default SwerveDrivePage;
