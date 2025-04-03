"use client";
import React, { useRef, useEffect, useState } from "react";
import WholeScreen from "@/comps/Frames/WholeScreen";
import {
  Tooltip,
  Button,
  Stack,
  Chip,
  Popper,
  Box,
  Typography,
  Divider,
  Drawer,
  Paper,
  Alert,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

// Pause and play button from mui
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const MOVEMENT_SPEED_OF_CHILDREN = 1; // px per key press
const MOVEMENT_SPEED_OF_PARENT = 10; // px per key press
const ERROR_CONSTANT = 0.1; // px
const WINDOW_MARGIN = 30; // px

const PossibleStates = Object.freeze({
  PENDING: "PENDING",
  SPAWNED: "SPAWNED",
  MOVING: "MOVING",
  ACHIEVED: "ACHIEVED",
  WAITING_FOR_PARENT: "WAITING_FOR_PARENT",
  STOPPED: "STOPPED",
});

const PlatooningSimPage = () => {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 150 });
  const [nodes, setNodes] = useState([]);
  const [trackedPoints, setTrackedPoints] = useState([]);
  const [lastTrackedPosition, setLastTrackedPosition] = useState({
    x: 100,
    y: 100,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerFocusIndex, setDrawerFocusIndex] = useState(null);
  const threshold = 50;

  // Each node works on a finite state maching:
  // 1. PENDING: The node is waiting for the parent to move
  // 2. MOVING: The node is moving towards the parent

  // A use effect that occationally updates the position of the nodes
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) return; // Skip the update if paused

      setNodes((prevNodes) => {
        return prevNodes.map((node) => {
          switch (node.state) {
            case PossibleStates.PENDING:
              // make sure the number of tracked points is greater than the seeking index
              if (trackedPoints.length <= 1) {
                node.state = PossibleStates.PENDING;
                break;
              }
              // make sure no one else is seeking node 0
              for (let i = 1; i < prevNodes.length; i++) {
                if (prevNodes[i].seekingIndex === 0) {
                  node.seekingIndex = null;
                  break;
                }
              }
              if (node.seekingIndex === null) {
                node.seekingIndex = 0;
                node.state = PossibleStates.SPAWNED;
                node.x = trackedPoints[0].x;
                node.y = trackedPoints[0].y;
              }
              break;

            case PossibleStates.SPAWNED:
              console.log(
                `Node ${node.name} spawned at (${node.x}, ${node.y})`,
              );
              node.state = PossibleStates.MOVING;
              break;
            case PossibleStates.MOVING:
              // move towards the next tracked point, assuming the node is not being sought by another node
              if (
                node.seekingIndex !== null &&
                trackedPoints[node.seekingIndex]
              ) {
                const target = trackedPoints[node.seekingIndex];
                const dx = target.x - node.x;
                const dy = target.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > ERROR_CONSTANT) {
                  const step = MOVEMENT_SPEED_OF_CHILDREN;
                  node.x += Math.round(dx / distance) * step;
                  node.y += Math.round(dy / distance) * step;
                } else {
                  // Update the target index
                  node.state = PossibleStates.ACHIEVED;
                }
              }
              break;
            case PossibleStates.ACHIEVED:
              // If the parent is null, then its the first node in the caravan
              console.log("Achieved");
              let parent = {
                x: null,
                y: null,
                seekingIndex: null,
                state: null,
                name: null,
              };
              if (node.parentIndex === null) {
                parent.x = trackedPoints[trackedPoints.length - 1].x;
                parent.y = trackedPoints[trackedPoints.length - 1].y;
                parent.seekingIndex = trackedPoints.length - 1;
                parent.name = "Master Node";
              } else {
                parent = prevNodes[node.parentIndex];
              }

              // See if there is going to be a conflict between my seeking index and the parent
              if (parent.seekingIndex <= node.seekingIndex + 1) {
                node.state = PossibleStates.WAITING_FOR_PARENT;
              } else {
                node.seekingIndex++;
                node.state = PossibleStates.MOVING;
              }
              break;
            case PossibleStates.WAITING_FOR_PARENT:
              // See if the parent is still seeking the same index
              console.log("waiting for parent");
              let parentIsSeeking = null;
              if (node.parentIndex === null) {
                parentIsSeeking = trackedPoints.length - 1;
              } else {
                parentIsSeeking = prevNodes[node.parentIndex].seekingIndex;
              }

              if (parentIsSeeking > node.seekingIndex + 1) {
                node.state = PossibleStates.MOVING;
              }
              break;

            default:
              break;
          }

          return node;
        });
      });
    }, 10);
    return () => clearInterval(interval);
  }, [trackedPoints, isPaused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(position.x, position.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();

      trackedPoints.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "green";
        ctx.fill();
      });

      if (trackedPoints.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trackedPoints[0].x, trackedPoints[0].y);
        for (let i = 1; i < trackedPoints.length - 1; i++) {
          const midX = (trackedPoints[i].x + trackedPoints[i + 1].x) / 2;
          const midY = (trackedPoints[i].y + trackedPoints[i + 1].y) / 2;
          ctx.quadraticCurveTo(
            trackedPoints[i].x,
            trackedPoints[i].y,
            midX,
            midY,
          );
        }
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    draw();
  }, [position, trackedPoints]);

  useEffect(() => {
    // Handle keyboard events for moving the parent

    if (window === undefined) return;

    const handleKeyDown = (event) => {
      setPosition((prev) => {
        const step = MOVEMENT_SPEED_OF_PARENT;
        const canvas = canvasRef.current;
        let { x, y } = prev;
        if (event.key === "ArrowUp" && y - step >= WINDOW_MARGIN) y -= step;
        if (
          event.key === "ArrowDown" &&
          y + step <= canvas.height - WINDOW_MARGIN
        )
          y += step;
        if (event.key === "ArrowLeft" && x - step >= WINDOW_MARGIN) x -= step;
        if (
          event.key === "ArrowRight" &&
          x + step <= canvas.width - WINDOW_MARGIN
        )
          x += step;
        return { x, y };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    // Handle mouse movement and track points
    const distance = Math.sqrt(
      Math.pow(position.x - lastTrackedPosition.x, 2) +
        Math.pow(position.y - lastTrackedPosition.y, 2),
    );
    if (distance > threshold) {
      setTrackedPoints((prevPoints) => [
        ...prevPoints,
        { x: position.x, y: position.y },
      ]);
      setLastTrackedPosition({ x: position.x, y: position.y });
    }
  }, [position]);

  const handleDrawerOpen = (index) => {
    setDrawerFocusIndex(index);
    setIsDrawerOpen(true);
  };

  const handleAddNode = () => {
    // limit the number of nodes to 10
    if (nodes.length >= 10) {
      alert("Maximum number of nodes reached");
      return;
    }

    setNodes((prevNodes) => {
      const newNode = {
        x: null,
        y: null,
        parentName:
          prevNodes.length > 0 ? prevNodes[prevNodes.length - 1].name : null,
        parentIndex: prevNodes.length > 0 ? prevNodes.length - 1 : null,
        seekingIndex: null,
        state: "PENDING",
        name: `Node ${prevNodes.length + 1}`,
      };
      return [...prevNodes, newNode];
    });
  };

  const handleReset = () => {
    setTrackedPoints([]);
    setLastTrackedPosition({ x: position.x, y: position.y });
    setNodes([]);
    setPosition({ x: 100, y: 150 });
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(position.x, position.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lastTrackedPosition.x, lastTrackedPosition.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
  };

  return (
    <WholeScreen>
      <Stack sx={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button variant="contained" onClick={handleAddNode}>
            Add Child Node
          </Button>
          <Button variant="contained" onClick={handleReset}>
            Reset
          </Button>
          {/* Latest point chip */}
          <Chip
            label={`Latest Point: (${lastTrackedPosition.x}, ${lastTrackedPosition.y})`}
          />
          {/* A popper from hte info icon  */}
          <Tooltip title="This is a tooltip" arrow>
            <InfoIcon
              style={{ cursor: "pointer" }}
              onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
            />
          </Tooltip>
          <Button onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
          </Button>
        </Stack>
        <Alert severity="info" sx={{ marginTop: 2 }}>
          Use the arrow keys to move the parent node. Click on the nodes to see
          their state information. Limit is 10 nodes
        </Alert>
      </Stack>
      {nodes.map((node, index) => {
        if (node.state === PossibleStates.PENDING) {
          return null;
        } else {
          return (
            <Tooltip key={index} title={JSON.stringify(node)} arrow>
              <Button
                style={{
                  position: "absolute",
                  left: node?.x,
                  top: node?.y,
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  minWidth: 0,
                  padding: 0,
                }}
                variant="contained"
                color="primary"
                onClick={() => handleDrawerOpen(index)}
              >
                {index + 1}
              </Button>
            </Tooltip>
          );
        }
      })}
      <canvas ref={canvasRef} style={{ display: "block" }} />

      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom"
        style={{ zIndex: 10 }}
      >
        <Stack
          sx={{ border: 1, p: 1, bgcolor: "background.paper", borderRadius: 2 }}
        >
          <Typography variant="h3">Info</Typography>
          {/* Tell me the state of every node */}
          {nodes.map((node, index) => (
            <Typography key={index} variant="body1">
              Node {index + 1}: {node?.state} Seeking Index {node?.seekingIndex}{" "}
              Position: ({node?.x}, {node?.y}) Seeking Position : (
              {trackedPoints[node?.seekingIndex]?.x},{" "}
              {trackedPoints[node?.seekingIndex]?.y})
            </Typography>
          ))}
          <Divider />
          {/* The tracked points */}
          <Typography variant="body1">Tracked Points:</Typography>
          <Stack sx={{ maxHeight: 200, overflowY: "auto" }}>
            {trackedPoints.map((point, index) => (
              <Typography key={index} variant="body2">
                Point {index}: ({point.x}, {point.y})
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Popper>
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        anchor={"bottom"}
      >
        <Stack
          sx={{ width: 300, padding: 2 }}
          role="presentation"
          onClick={() => setIsDrawerOpen(false)}
        >
          <Typography variant="h4">Node {drawerFocusIndex + 1}</Typography>
          <Divider />
          <Typography variant="body1">
            Parent: {nodes[drawerFocusIndex]?.parentName || "Master Node"}
          </Typography>
          {/* <Typography variant="body1">
                        State: {nodes[drawerFocusIndex]?.state}
                    </Typography> */}
          {/* <Typography variant="body1">
                        Seeking Index: {nodes[drawerFocusIndex]?.seekingIndex}
                    </Typography> */}
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center">
          {Object.values(PossibleStates).map((state) => (
            <PersistentPaper
              key={state}
              stateName={state}
              currentState={nodes[drawerFocusIndex]?.state}
            >
              {state}
            </PersistentPaper>
          ))}
        </Stack>
      </Drawer>
    </WholeScreen>
  );
};

const PersistentPaper = ({
  stateName,
  currentState,
  children,
  duration = 100,
}) => {
  const [persistBackground, setPersistBackground] = useState(false);
  const prevStateRef = useRef(currentState); // Ref to track previous state

  // Update the ref with the latest currentState
  useEffect(() => {
    prevStateRef.current = currentState;
  }, [currentState]);

  useEffect(() => {
    // Only trigger background persistence if currentState changes to match state
    if (currentState === stateName) {
      setPersistBackground(true);
      const timer = setTimeout(() => {
        setPersistBackground(false);
      }, duration); // Keeps the background active for the specified duration, in ms

      // Clear timeout on unmount
      return () => clearTimeout(timer);
    }
  }, [currentState, stateName, duration]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        textAlign: "center",
        backgroundColor: persistBackground ? "lightblue" : null,
        boxShadow: persistBackground
          ? "0 0 10px 2px rgba(0, 0, 255, 0.7)"
          : "none",
        transition: "box-shadow 0.2s ease, background-color 0.2s ease",
      }}
    >
      <Typography variant="body1">{children}</Typography>
    </Paper>
  );
};

// PersistentPaper

export default PlatooningSimPage;
