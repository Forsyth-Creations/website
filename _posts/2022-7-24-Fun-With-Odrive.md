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

[Hoverboard Docs](https://docs.odriverobotics.com/v/0.5.5/hoverboard.html#hoverboard-motor-wiring)

# Steps:

odrv0.axis1.motor.config.pole_pairs = 7

odrv0.axis1.motor.config.resistance_calib_max_voltage = 2

odrv0.axis1.motor.config.requested_current_range = 25

odrv0.save_configuration()

odrv0.reboot()

odrv0.axis1.encoder.config.mode = 1 # ENCODER_MODE_HALL

odrv0.axis1.encoder.config.cpr = 42

odrv0.axis1.encoder.config.bandwidth = 100

odrv0.axis1.motor.config.current_control_bandwidth = 100

odrv0.axis1.controller.config.pos_gain = 0

odrv0.axis1.controller.config.vel_gain = 0.02

odrv0.axis1.controller.config.vel_integrator_gain = 0.1

odrv0.axis1.controller.config.vel_limit = 1000

odrv0.axis1.controller.config.control_mode = 2 # Velocity Control Mode

odrv0.save_configuration()

odrv0.reboot()

odrv0.axis1.requested_state = AXIS_STATE_MOTOR_CALIBRATION

odrv0.axis1.motor

odrv0.axis1.motor.config.pre_calibrated = True

odrv0.axis1.requested_state = AXIS_STATE_ENCODER_OFFSET_CALIBRATION

odrv0.axis1.encoder


