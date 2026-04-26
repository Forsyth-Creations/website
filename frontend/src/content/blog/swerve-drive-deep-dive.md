---
title: "Swerve Drive: A Deep Dive"
date: "2026-03-10"
description: "An overview of swerve drive kinematics, how each module works, and what it takes to build a simulation."
tags: ["robotics", "swerve", "simulation"]
---

# Swerve Drive: A Deep Dive

Swerve drive is one of the most capable (and complex) drivetrains used in competitive robotics. Every wheel can rotate independently in both speed and direction, giving the robot full holonomic control — it can translate in any direction while rotating simultaneously.

## How It Works

A swerve drivetrain has four modules, each with two motors:

1. **Drive motor** — controls the speed of the wheel
2. **Steer motor** — controls the angle the wheel points

To move the robot, you decompose the desired velocity vector into per-module steer angles and wheel speeds using inverse kinematics.

## Kinematics

Given a desired chassis velocity `(vx, vy, ω)`:

```
For each module at position (x, y) from center:
  module_vx = vx - ω * y
  module_vy = vy + ω * x
  speed = sqrt(module_vx² + module_vy²)
  angle = atan2(module_vy, module_vx)
```

Normalize speeds if any exceed the motor's maximum before sending commands.

## The Simulation

You can try the interactive swerve simulation on this site. It lets you drive the robot with a virtual joystick and visualize each module's state in real time.

The sim is built with React and Three.js and runs entirely in the browser.
