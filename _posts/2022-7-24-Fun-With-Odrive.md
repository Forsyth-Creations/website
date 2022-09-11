---
layout: project_template
title: Fun With ODrive
description: Robotics and 3D Printing
date: 2022-7-20 09:00:00
# hero_image: /site/img/ProjectPhotos/MagicMirror
image: /img/PostImages/odrive.jpg
hero_height: is-small
hero_darken: true
tags: 3dprinting
series: 3dprinting
author: Henry Forsyth
show_sidebar: false
---

# Great Links for Understanding how to configure the ODrive

[Handling the CPR Issue](https://discourse.odriverobotics.com/t/getting-started-motor-not-moving-after-calibration-and-cpr-polepairs-mismatch/8589)

[Reset the ODrive to default values](https://discourse.odriverobotics.com/t/how-to-reset-odrive3-6/3588)

[Odrive By Flipsky Docs](https://flipsky.net/blogs/vesc-tool/how-to-use-fsodrive-base-on-odrive-3-14)

ENCODER_MODE_HALL = 1

Always save configuration and reboot before trying to run the calibration

[Current Calucaltion](https://discourse.odriverobotics.com/t/motor-error-current-limit-violation-and-axis-error-failed/6433/6)

[Control Modes](https://gitlab.developers.cam.ac.uk/curobotics/rescue-major/rescue-major-main/-/blob/99635920af1bb557a255077fb6e2bd3e91c14c05/Simple%20ODrive%20Tests/odrive_enums.py)

[Flipsky Encoder Docs](https://docs.odriverobotics.com/v/0.5.5/hoverboard.html#hoverboard-motor-wiring)

[Hoverboard Docs](https://docs.odriverobotics.com/v/0.5.5/hoverboard.html)

[Update Odrive Firmware](https://discourse.odriverobotics.com/t/where-are-the-gpio-configs/7245)

[Description of Odrive Settings](https://www.youtube.com/watch?v=9UxTPxgvOAA&ab_channel=AustinTronics)

[API for v3.6](https://docs.odriverobotics.com/v/0.5.5/fibre_types/com_odriverobotics_ODrive.html)

# Steps:

# Modified Setup for a Flipsky Motor

[Pinout](https://docs.odriverobotics.com/v/0.5.5/pinout.html?highlight=pinout)

```python
odrv0.erase_configuration()
odrv0.reboot()

# axis0
odrv0.config.gpio9_mode = GPIO_MODE_DIGITAL
odrv0.config.gpio10_mode = GPIO_MODE_DIGITAL
odrv0.config.gpio11_mode = GPIO_MODE_DIGITAL

# axis1
odrv0.config.gpio12_mode = GPIO_MODE_DIGITAL
odrv0.config.gpio13_mode = GPIO_MODE_DIGITAL
odrv0.config.gpio14_mode = GPIO_MODE_DIGITAL

odrv0.axis0.motor.config.current_lim = 20
odrv0.axis0.controller.config.vel_limit = 2
odrv0.config.enable_brake_resistor = True
odrv0.axis0.motor.config.pole_pairs = 7
odrv0.axis0.motor.config.torque_constant = 0.04352631578
odrv0.axis0.motor.config.motor_type = MOTOR_TYPE_HIGH_CURRENT
odrv0.axis0.encoder.config.cpr = 42
odrv0.axis0.motor.config.resistance_calib_max_voltage = 2
odrv0.axis0.encoder.config.mode = ENCODER_MODE_HALL

# ------- Additional Needed Configs -----------
odrv0.axis0.encoder.config.bandwidth = 100
odrv0.axis0.controller.config.pos_gain = 1
odrv0.axis0.controller.config.vel_gain = 0.02 * odrv0.axis0.motor.config.torque_constant * odrv0.axis0.encoder.config.cpr
odrv0.axis0.controller.config.vel_integrator_gain = 0.1 * odrv0.axis0.motor.config.torque_constant * odrv0.axis0.encoder.config.cpr
odrv0.axis0.controller.config.vel_limit = 20

# ----------------------------------------------

odrv0.save_configuration()

odrv0.axis0.requested_state = AXIS_STATE_MOTOR_CALIBRATION
odrv0.axis0.requested_state = AXIS_STATE_FULL_CALIBRATION_SEQUENCE

odrv0.axis0.motor.config.pre_calibrated = True
odrv0.axis0.encoder.config.pre_calibrated = True
odrv0.axis0.config.startup_encoder_index_search=True


dump_errors(odrv0)

odrv0.save_configuration()

odrv0.reboot()

# Below are the steps to enter velocity control mode and run a quick test

odrv0.axis0.requested_state = AXIS_STATE_CLOSED_LOOP_CONTROL
odrv0.axis0.controller.config.control_mode = CONTROL_MODE_VELOCITY_CONTROL

odrv0.axis0.controller.input_vel = 5

```
# Ramped Velocity Control

```python

odrv0.axis0.controller.config.vel_ramp_rate = 0.5
odrv0.axis0.controller.config.input_mode = INPUT_MODE_VEL_RAMP

# Control Velocity with the below:
odrv0.axis0.controller.input_vel = 1
```


## Homing the Odrive Axis 
```

```

## Trajectory Control

```
odrv0.axis1.trap_traj.config.vel_limit
odrv0.axis1.trap_traj.config.accel_limit = <Float>
odrv0.axis1.trap_traj.config.decel_limit = <Float>
odrv0.axis1.controller.config.inertia = <Float>

odrv0.axis0.controller.config.input_mode = InputMode.TRAP_TRAJ
odrv0.axis0.controller.input_pos = <Float>

```

## Misc Useful Commands 

```python
odrv0.erase_configuration()
odrv0.clear_errors()
odrv0.axis0.encoder.config.ignore_illegal_hall_state = True
odrv0.axis0.encoder.config.hall_polarity_calibrated = True
odrv0.axis0.motor.config.current_control_bandwidth = 2000

odrv0.axis0.requested_state = AXIS_STATE_IDLE
```

## Some notes on current developmemt:

Alright so weird thing:

Here's some context:
Using Hall motors, A and B, without capacitors for noise (just because I was curious to see if it would work)
Motor A works on axis1, but motor B doesn't work on axis0 (ENCODER_ERROR_ILLEGAL_HALL_STATE). As a sanity check, I moved A to axis0 and configured it the same way I did for axis1. Now, for some reason, it also doesn't work (ENCODER_ERROR_ILLEGAL_HALL_STATE). This is an Odrive v3.6. Thoughts? Maybe a pinmode that needs to be set for axis0? Wiring of HALL wires is the same as the hoverboard tutorial, using GND, A, B, Z and voltage for axis0 

It could be multiple things, but here are the steps forward that I want to take:

Scope the output of the motor, although I don't know how that would help based on the testing above
Make sure pinouts and axis are configured the same
Check voltage on board to make sure encoder is being powered


