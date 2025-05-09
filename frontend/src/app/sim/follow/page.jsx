"use client";

// For simplicity, all calculations are done in metric
// For visualizations, the imperial system is used (e.g. feet, inches)
import { toast } from "react-toastify";

import React, { useEffect, useState, useContext, createContext } from "react";
import {
  Box,
  Paper,
  Stack,
  Button,
  Slider,
  Typography,
  Tooltip,
  Chip,
  Drawer,
  Alert,
} from "@mui/material";
import WholeScreen from "@/comps/Frames/WholeScreen";

const LINE_TARGET_COUNT = 20;

// pause play icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

// Stopsign icon
import StopIcon from "@mui/icons-material/Stop";
import StraightenIcon from "@mui/icons-material/Straighten";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

// create a context to manage all the positions of all trucks
const TruckPositionsContext = createContext();

export const useTruckPositions = () => {
  const context = useContext(TruckPositionsContext);
  if (!context) {
    throw new Error(
      "useTruckPositions must be used within a TruckPositionsProvider",
    );
  }
  return context;
};

export const TruckPositionsProvider = ({ children }) => {
  const [truckPositions, setTruckPositions] = useState({});
  const [truckCount, setTruckCount] = useState(0);

  return (
    <TruckPositionsContext.Provider
      value={{
        truckPositions,
        setTruckPositions,
        truckCount,
        setTruckCount,
      }}
    >
      {children}
    </TruckPositionsContext.Provider>
  );
};

// Define a scale from pixels to meters
const METERS_CONST = 10;
const PIXEL_CONST = 100;
const DT = 50; // 50 ms
const PIXEL_TO_METER = METERS_CONST / PIXEL_CONST; // Every 1 pixel is 5 meters
const METERS_TO_PIXEL = PIXEL_CONST / METERS_CONST;
const TRUCK_METERS = 22;

function mph_to_mps(mph) {
  // convert mph to m/s
  return (mph * 1609.34) / 3600;
}

const FollowingDistanceSimulator = () => {
  const [lineOffsets, setLineOffsets] = useState([]);
  const [lineSpacing, setLineSpacing] = useState(0);
  const [speed, setSpeed] = useState(15);
  const [SPEED_MULTIPLIER, setSpeedMultiplier] = useState(0.01);
  const [pause, setPause] = useState(true);
  const [time, setTime] = useState(0);
  const [showMeasurement, setShowMeasurement] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [followerWeight, setFollowerWeight] = useState(20000);

  function onCrash() {
    toast.error("Truck Crashed", { position: "top-center" });
    setPause(true);
  }

  // use the context to get the truck positions
  const { truckPositions } = useTruckPositions();

  function toggleDrawer() {
    setOpenDrawer((prev) => !prev);
  }

  function toggleMeasurements() {
    setShowMeasurement((prev) => !prev);
  }

  // Calculate the speed multiplier based on the set speed
  useEffect(() => {
    const newSpeedMultiplier = Math.max(0.0, (speed * METERS_TO_PIXEL) / 10000); // Clamp between 0.01 and 1
    setSpeedMultiplier(newSpeedMultiplier);
  }, [speed]);

  // Initialize lines and update on resize
  // Recompute line count and spacing on window resize or speed change
  useEffect(() => {
    const compute = () => {
      const width = window.innerWidth;
      const dynamicCount = Math.round(
        LINE_TARGET_COUNT * (SPEED_MULTIPLIER + 0.5),
      ); // dynamic line count
      const spacing = width / dynamicCount;
      setLineSpacing(spacing);
      setLineOffsets(
        Array.from({ length: dynamicCount }, (_, i) => i * spacing),
      );
    };

    compute();

    const handleResize = () => compute();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [SPEED_MULTIPLIER]);

  // Track the mouse position
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate lines with speed as multiplier of spacing
  useEffect(() => {
    const interval = setInterval(() => {
      if (pause) return;

      setLineOffsets((prev) =>
        prev.map((offset) => {
          const delta = lineSpacing * SPEED_MULTIPLIER;
          const newOffset = offset + delta;
          // advance the time
          return newOffset > window.innerWidth ? 0 : newOffset;
        }),
      );
      setTime((prevTime) => prevTime + 50);
    }, DT);

    return () => clearInterval(interval);
  }, [lineSpacing, SPEED_MULTIPLIER, pause]);

  return (
    <WholeScreen>
      <TopData speed={speed} time={time} paused={pause} />
      <UserButtons
        setPause={setPause}
        pause={pause}
        setSpeed={setSpeed}
        speed={speed}
        toggleMeasurements={toggleMeasurements}
        toggleDrawer={toggleDrawer}
        cursorPos={cursorPos}
        followerWeight={followerWeight}
        setFollowerWeight={setFollowerWeight}
      />
      {/* Simulator Area */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          border: "2px solid rgba(0, 131, 143, 0.16)",
        }}
      >
        {/* Moving Lines */}
        {lineOffsets.map((left, i) => (
          <Box key={`line-${i}`}>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${left}px`,
                width: "2px",
                backgroundColor: "rgba(0, 131, 143, 0.9)",
                opacity: 0.2,
              }}
            />
          </Box>
        ))}

        {/* Vehicles */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            alignItems: "center",
          }}
        >
          <VehicleWithPosition
            show_measurement={showMeasurement}
            time={time}
            origin={true}
            speed={mph_to_mps(speed)}
            name="Lead"
            paused={pause}
            // Initial position is in terms of meters
            initialPosition={{
              x: 10,
              y: window.innerHeight * 0.5 * PIXEL_TO_METER,
            }}
            debug={false}
            onCrash={onCrash}
          />

          <VehicleWithPosition
            show_measurement={showMeasurement}
            time={time}
            // speed={9.9}
            speed={mph_to_mps(speed)}
            name="Follower 1"
            weight={followerWeight}
            paused={pause}
            initialPosition={{
              x: 52,
              y: window.innerHeight * 0.5 * PIXEL_TO_METER,
            }}
            parentName="Lead"
            enableAuto={true}
            debug={true}
            onCrash={onCrash}
          />
        </Box>
      </Box>
      {/* A draw with the context data */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box sx={{ minWidth: 600, p: 2 }}>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(truckPositions, null, 2)}
          </pre>
        </Box>
      </Drawer>
    </WholeScreen>
  );
};

export const Page = () => {
  return (
    <TruckPositionsProvider>
      <FollowingDistanceSimulator />
    </TruckPositionsProvider>
  );
};

function UserButtons({
  setPause,
  pause,
  setSpeed,
  speed,
  toggleMeasurements = () => {},
  toggleDrawer = () => {},
  cursorPos = { x: 0, y: 0 },
  setFollowerWeight = () => {},
  followerWeight,
}) {
  const [local_speed, setLocalSpeed] = useState(speed);

  function set_pause() {
    setPause((prev) => !prev);
    if (pause) {
      toast.success("Simulation Resumed", { position: "top-center" });
    } else {
      toast.error("Simulation Paused", { position: "top-center" });
    }
  }

  // convert the mph to m/s
  function mph_to_mps(mph) {
    setLocalSpeed(mph);
    setSpeed(mph);
  }

  return (
    <Box sx={{ position: "absolute", bottom: 10, zIndex: 1 }}>
      <Paper
        sx={{ p: 3, width: "50vw" }}
        elevation={3}
        component={Stack}
        direction="row"
        justifyContent={"space-between"}
        spacing={2}
      >
        {/* Toggle Measurements */}
        <Tooltip title="Toggle Measurements">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              toggleMeasurements();
            }}
            fullWidth
          >
            <StraightenIcon />
          </Button>
        </Tooltip>
        {/* Pause/Play */}
        <Button
          fullWidth
          onClick={set_pause}
          variant="contained"
          color="primary"
        >
          {pause ? <PlayArrowIcon /> : <PauseIcon />}
        </Button>
        {/* Speed Slider */}
        <Box sx={{ px: 3 }}>
          <Stack sx={{ width: 300 }}>
            <Typography>Speed</Typography>
            <Slider
              value={local_speed}
              onChange={(e, newValue) => mph_to_mps(newValue)}
              step={5}
              min={0}
              max={75}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: "0" },
                { value: 25, label: "25" },
                { value: 50, label: "50" },
                { value: 75, label: "75" },
              ]}
            />
            <Typography>Follower Weight</Typography>
            <Slider
              value={followerWeight}
              onChange={(e, newValue) => setFollowerWeight(newValue)}
              step={10000}
              min={20000}
              max={80000}
              valueLabelDisplay="auto"
              marks={[
                { value: 20000, label: "20k" },
                { value: 40000, label: "40k" },
                { value: 60000, label: "60k" },
                { value: 80000, label: "80k" },
              ]}
            />
          </Stack>
        </Box>
        {/* Add Truck */}
        {/* <Tooltip title="Add Truck">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // Add truck logic here
            }}
          >
            <AddIcon />
          </Button>
        </Tooltip> */}

        {/* Open the drawer */}
        <Tooltip title="Open Drawer">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              toggleDrawer();
            }}
          >
            <MenuOpenIcon />
          </Button>
        </Tooltip>
        <Chip label={`Cursor Position: (${cursorPos.x}, ${cursorPos.y})`} />
      </Paper>
    </Box>
  );
}

const formatTime = (rawTime) => {
  const seconds = Math.floor(rawTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedSeconds = String(seconds % 60).padStart(2, "0");
  const formattedMinutes = String(minutes % 60).padStart(2, "0");
  const formattedHours = String(hours).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

function TopData({ speed, time, paused }) {
  const formattedTime = formatTime(time);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 10,
        left: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        p: 2,
      }}
    >
      <Stack>
        <Chip label={`Time: ${formattedTime}`} />
        {paused && (
          <Alert severity="warning" sx={{ mt: 1 }}>
            Simulation Paused
          </Alert>
        )}
      </Stack>
      <SpeedLimitSign speed={speed} />
    </Box>
  );
}

const SpeedLimitSign = ({ speed }) => {
  return (
    <Box
      sx={{
        width: 120,
        height: 160,
        backgroundColor: "white",
        border: "4px solid black",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: 3,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontSize: 12,
          fontWeight: "bold",
          color: "black",
          mb: 0.5,
        }}
      >
        SPEED
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontSize: 12,
          fontWeight: "bold",
          color: "black",
          mb: 1,
        }}
      >
        LIMIT
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "black",
        }}
      >
        {speed}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontSize: 12,
          fontWeight: "bold",
          color: "black",
        }}
      >
        mph
      </Typography>
    </Box>
  );
};

// Vehicle With Position
const VehicleWithPosition = ({
  name,
  speed,
  paused,
  initialPosition = { x: 0, y: 0 },
  parentName,
  debug,
  time,
  origin = false,
  onCrash = () => {},
  weight,
  braking_force = 95734, // in Newtons
  enableAuto = false,
  ...props
}) => {
  const isFollower = parentName != null;
  const { truckPositions, setTruckPositions } = useTruckPositions();
  const [actualSpeed, setActualSpeed] = useState(speed); // in m/s
  const [stoppingDistance, setStoppingDistance] = useState(0);

  function computeStoppingDistance(speed) {
    // convert the weight (lbs) to kg
    const massInKG = weight * 0.45359237; // lbs to kg
    // calculate the stopping distance using the formula
    let stopping_distance =
      ((1 / 2) * (massInKG * speed * speed)) / braking_force;

    let inFeet = stopping_distance * 3.28084; // convert to feet

    // print out the stats
    if (debug) {
      console.log(
        `Stopping Distance: ${stopping_distance} m, ft : ${inFeet} Speed: ${speed} m/s, Weight: ${weight} lbs which in kg is ${massInKG} kg, Braking Force: ${braking_force} N`,
      );
    }

    setStoppingDistance(stopping_distance);

    return stopping_distance; // in meters
  }

  // if my name is origin, throw an error
  if (name == "origin") {
    throw new Error("Truck name cannot be 'origin'");
  }

  // if the variant is "follower", slowly accelerate to the desired speed
  // useEffect(() => {
  //   computeStoppingDistance(speed); // Ensure stopping distance is computed when speed changes

  //   if (isFollower && enableAuto) {
  //     // if the parent is not moving, then set the speed to 0
  //     if (truckPositions[parentName]?.speed === 0) {
  //       setActualSpeed(0);
  //       return;
  //     }
  //     // if my stopping_distance is greater than my distance to the parent, lower my speed
  //   setActualSpeed(speed);
  // }, [isFollower, speed, weight, paused]);

  // Register the truck position
  useEffect(() => {
    const newTruckPosition = {
      name: name || "Lead Vehicle",
    };

    // if paused but time is 0, reset the position
    if (actualSpeed != null && paused && time === 0) {
      setTruckPositions((prev) => ({
        ...prev,
        [name]: {
          position: {
            x: initialPosition?.x,
            y: initialPosition?.y,
            renderX: initialPosition?.x * METERS_TO_PIXEL,
            renderY: initialPosition?.y * METERS_TO_PIXEL,
          },
          isFollower: isFollower,
          speed: actualSpeed,
        },
        ...(origin && {
          origin: {
            position: {
              x: initialPosition?.x,
              y: initialPosition?.y,
              renderX: initialPosition?.x * METERS_TO_PIXEL,
              renderY: initialPosition?.y * METERS_TO_PIXEL,
            },
            speed: actualSpeed,
          },
        }),
      }));
    }

    if (actualSpeed != null) {
      function get_distance_to_parent(prev) {
        let distance_to_parent = 0;
        if (parentName) {
          const parentPosition = prev[parentName]?.position?.x;
          const childPosition = prev[name]?.position?.x;
          if (parentPosition && childPosition) {
            distance_to_parent =
              Math.abs(parentPosition - childPosition) - TRUCK_METERS;
          }
        }
        return distance_to_parent;
      }

      const interval = setInterval(() => {
        if (!paused) {
          let stopping_distance = computeStoppingDistance(speed);

          setTruckPositions((prev) => {
            function get_render_position(pos, prev) {
              // if I'm the origin, then return the initial position
              // pos is in meters
              if (origin) {
                return {
                  x: initialPosition.x * METERS_TO_PIXEL,
                  y: initialPosition.y * METERS_TO_PIXEL,
                  distanceToParent: 0,
                };
              }
              return {
                x: (pos.x - prev.origin.position.x + 11) * METERS_TO_PIXEL, // WHAT IS GOING ON HERE
                y: pos.y * METERS_TO_PIXEL,
              };
            }

            let position = {
              x: (prev[name]?.position?.x || 0) - actualSpeed * (DT / 1000),
              y: prev[name]?.position?.y || 0,
            };

            let render_position = get_render_position(position, prev);

            if (enableAuto && isFollower) {
              // slow down my speed if I'm too close to the parent
              const distanceToParent = get_distance_to_parent(prev);
              // if the speed of the parent is 0, then set my speed to 0
              if (truckPositions[parentName]?.speed === 0) {
                setActualSpeed(0);
              }
              // if the values are similar, then set my speed to the parent's speed
              else if (Math.abs(distanceToParent - stopping_distance) < 0.1) {
                setActualSpeed(truckPositions[parentName]?.speed);
              } else if (distanceToParent < stopping_distance) {
                setActualSpeed(
                  Math.max(
                    0,
                    (actualSpeed * distanceToParent) / stopping_distance,
                  ),
                );
              }
              // if I'm too far away from the parent, speed up
              else if (distanceToParent > stopping_distance) {
                setActualSpeed(
                  Math.min(speed + mph_to_mps(3), actualSpeed + mph_to_mps(3)),
                );
              }
            } else if (!isFollower) {
              setActualSpeed(speed);
            }

            // If the distance to parent is less than 0, then set the position to the parent's position
            if (isFollower) {
              let distance_to_parent = get_distance_to_parent(prev);
              if (distance_to_parent < 0) {
                onCrash();
              }
            }

            const updatedPositions = {
              ...prev,
              [name]: {
                position: {
                  x: position.x,
                  y: position.y,
                  renderX: render_position.x,
                  renderY: render_position.y,
                  distanceToParent: get_distance_to_parent(prev),
                },
                speed: actualSpeed,
              },
            };

            if (origin) {
              updatedPositions["origin"] = updatedPositions[name]; // If I'm the origin, publish that position
            }

            return updatedPositions;
          });
        }
      }, DT);
      return () => clearInterval(interval);
    }

    return () => {
      setTruckPositions((prev) => {
        const { [newTruckPosition.name]: _, ...remainingPositions } = prev;
        return remainingPositions;
      });
    };
  }, [name, speed, setTruckPositions, paused, actualSpeed, weight]);

  return (
    <TopViewTruck
      drawPosition={{
        x: truckPositions[name]?.position?.renderX,
        y: truckPositions[name]?.position?.renderY,
      }}
      stoppingDistance={stoppingDistance}
      name={name}
      parentName={parentName}
      distanceToParent={truckPositions[name]?.position?.distanceToParent}
      {...props}
    />
  );
};

const TopViewTruck = ({
  name = "Default Name",
  show_measurement,
  parentName,
  drawPosition,
  stoppingDistance = null,
  distanceToParent, // in meters
}) => {
  // A typical truck is about 20 meters long and 2.5 meters wide
  const truckWidthMeters = 2.5;

  const { truckPositions } = useTruckPositions();

  const height = truckWidthMeters * METERS_TO_PIXEL;
  const width = TRUCK_METERS * METERS_TO_PIXEL;
  const cabWidth = width * 0.2;
  const trailerWidth = width * 0.8;

  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bottom: drawPosition.y || 0,
        left: drawPosition.x || 0,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: `${width}px`,
          height: `${height}px`,
          display: "flex",
          flexDirection: "row",
        }}
        component={Tooltip}
        title={`${name}: ${truckPositions[name]?.position?.x ?? 0} m ${parentName ? `(Parent: ${parentName}, Distance to Parent: ${distanceToParent || 0} m)` : ""}`}
      >
        {/* Cab */}
        <Box
          sx={{
            width: `${cabWidth}px`,
            height: "100%",
            border: "2px solid rgba(255, 255, 255, 0.5)",
            backgroundColor: "#ccc",
          }}
        />
        {/* Trailer */}
        <Box
          sx={{
            width: `${trailerWidth}px`,
            height: "100%",
            border: "2px solid rgba(255, 255, 255, 0.5)",
            backgroundColor: "#888",
          }}
        />
      </Box>

      {/* Measurement line below the truck */}
      {show_measurement && (
        <Box
          sx={{
            position: "relative",
            width: `${width}px`,
            mt: 1,
            height: 20,
          }}
        >
          {/* Arrow line */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "white",
            }}
          />
          {/* Left arrowhead */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderRight: "10px solid white",
              transform: "translateY(-50%)",
            }}
          />
          {/* Right arrowhead */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: "10px solid white",
              transform: "translateY(-50%)",
            }}
          />
          {/* Measurement text */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              px: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Typography variant="caption">{`${TRUCK_METERS} m`}</Typography>
          </Box>
        </Box>
      )}

      {/* Show the measurement of the parent, if there is one */}
      {parentName && show_measurement && distanceToParent > 0 && (
        <Box
          sx={{
            position: "absolute",
            width: `${distanceToParent * METERS_TO_PIXEL}px`,
            mt: 1,
            height: 20,
            left: -METERS_TO_PIXEL * distanceToParent,
          }}
        >
          {/* Arrow line */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              height: "2px",
              width: "100%",
              backgroundColor: "green",
            }}
          />
          {/* Left arrowhead */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderRight: "10px solid green",
              transform: "translateY(-50%)",
            }}
          />
          {/* Right arrowhead */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: "10px solid green",
              transform: "translateY(-50%)",
            }}
          />
          {/* Measurement text */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              px: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Typography variant="caption">{`${Math.round(distanceToParent)} m`}</Typography>
          </Box>
        </Box>
      )}

      {/* Show a box above for the ideal stopping distance */}
      {show_measurement && stoppingDistance && (
        <Typography id="stopping" variant="caption">
          Stopping Distance: {`${Math.round(stoppingDistance)} m`} or{" "}
          {`${Math.round(stoppingDistance) * 3.28} ft`}
        </Typography>
      )}
    </Box>
  );
};

export default Page;
