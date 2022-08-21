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

# Steps:

## Trial Number 1
``` python

odrv0.erase_configuration()
odrv0.reboot()

odrv0.config.enable_brake_resistor = True
odrv0.axis1.motor.config.pole_pairs = 7
odrv0.axis1.motor.config.resistance_calib_max_voltage = 4
odrv0.axis1.motor.config.requested_current_range = 60

odrv0.save_configuration()
odrv0.reboot()

odrv0.axis1.motor.config.current_control_bandwidth = 100
odrv0.axis1.motor.config.torque_constant = 0.04352631578
odrv0.axis1.encoder.config.mode = ENCODER_MODE_HALL
odrv0.axis1.encoder.config.cpr = 42
odrv0.axis1.encoder.config.calib_scan_distance = 150
odrv0.config.gpio9_mode = GPIO_MODE_DIGITAL
odrv0.config.gpio10_mode = GPIO_MODE_DIGITAL
odrv0.config.gpio11_mode = GPIO_MODE_DIGITAL
odrv0.axis1.controller.config.pos_gain = 1
odrv0.axis1.controller.config.vel_gain = 0.02 * odrv0.axis1.motor.config.torque_constant * odrv0.axis1.encoder.config.cpr
odrv0.axis1.controller.config.vel_integrator_gain = 0.1 * odrv0.axis1.motor.config.torque_constant * odrv0.axis1.encoder.config.cpr
odrv0.axis1.controller.config.vel_limit = 10
odrv0.axis1.controller.config.control_mode = CONTROL_MODE_VELOCITY_CONTROL

odrv0.save_configuration()
odrv0.reboot()

odrv0.axis1.requested_state = AXIS_STATE_MOTOR_CALIBRATION

dump_errors(odrv0)

odrv0.axis1.motor

```


## Trial Number 2
```python

odrv0.erase_configuration()
odrv0.reboot()

odrv0.axis1.motor.config.pole_pairs = 7
odrv0.axis1.motor.config.motor_type = MOTOR_TYPE_HIGH_CURRENT
odrv0.axis1.encoder.config.cpr = 42
odrv0.axis1.encoder.config.mode = ENCODER_MODE_HALL
odrv0.axis1.controller.config.control_mode = CONTROL_MODE_POSITION_CONTROL
odrv0.axis1.motor.config.torque_constant = 0.04352631578
odrv0.config.enable_brake_resistor = True
odrv0.axis1.motor.config.resistance_calib_max_voltage = 10
odrv0.axis1.motor.config.calibration_current  = 3

odrv0.axis1.motor.config.current_control_bandwidth    = 100
odrv0.axis1.controller.config.vel_limit = 5
odrv0.axis1.encoder.config.bandwidth = 100
odrv0.axis1.controller.config.pos_gain = 1
odrv0.axis1.controller.config.vel_gain = 0.02 * odrv0.axis1.motor.config.torque_constant * odrv0.axis1.encoder.config.cpr
odrv0.axis1.controller.config.vel_integrator_gain = 0.1 * odrv0.axis1.motor.config.torque_constant * odrv0.axis1.encoder.config.cpr
odrv0.axis1.controller.config.vel_limit = 10

odrv0.save_configuration()
odrv0.reboot()

odrv0.axis1.requested_state = AXIS_STATE_MOTOR_CALIBRATION

```


## Trial Number 3 (From Flipsky Website)

```python

odrv0.erase_configuration()
odrv0.reboot()

odrv0.axis1.motor.config.pole_pairs = 7
odrv0.axis1.motor.config.resistance_calib_max_voltage = 4
odrv0.axis1.motor.config.requested_current_range = 25
odrv0.axis1.encoder.config.cpr = 42

odrv0.save_configuration()

 odrv0.reboot()

odrv0.axis1.encoder.config.mode = ENCODER_MODE_HALL

odrv0.axis1.encoder.config.bandwidth = 100
odrv0.axis1.motor.config.current_control_bandwidth = 100
odrv0.axis1.controller.config.pos_gain = 0
odrv0.axis1.controller.config.vel_gain = 0.02
odrv0.axis1.controller.config.vel_integrator_gain = 0.1
odrv0.axis1.controller.config.vel_limit = 1000
odrv0.axis1.controller.config.control_mode = CONTROL_MODE_VELOCITY_CONTROL

odrv0.save_configuration()
odrv0.reboot()

odrv0.axis1.requested_state = AXIS_STATE_MOTOR_CALIBRATION


```

# Trial 4: Direct from ODrive, Successful
```python

odrv0.erase_configuration()
odrv0.reboot()

odrv0.axis1.motor.config.current_lim = 10
odrv0.axis1.controller.config.vel_limit = 2
odrv0.config.enable_brake_resistor = True
odrv0.axis1.motor.config.pole_pairs = 7
odrv0.axis1.motor.config.torque_constant = 0.04352631578
odrv0.axis1.motor.config.motor_type = MOTOR_TYPE_HIGH_CURRENT
odrv0.axis1.encoder.config.cpr = 42
odrv0.axis1.motor.config.resistance_calib_max_voltage = 2
odrv0.axis1.encoder.config.mode = ENCODER_MODE_HALL

odrv0.save_configuration()
odrv0.reboot()

odrv0.axis1.requested_state = AXIS_STATE_MOTOR_CALIBRATION
odrv0.axis1.requested_state = AXIS_STATE_FULL_CALIBRATION_SEQUENCE

dump_errors(odrv0)

odrv0.axis1.controller.config.vel_limit = 20

odrv0.save_configuration()
odrv0.reboot()

# Below are the steps to enter velocity control mode and run a quick test

odrv0.axis1.requested_state = AXIS_STATE_CLOSED_LOOP_CONTROL
odrv0.axis1.controller.config.control_mode = CONTROL_MODE_VELOCITY_CONTROL

odrv0.axis1.controller.input_vel = 5

```

# Trial 5: Axis 1
```python

odrv0.erase_configuration()
odrv0.reboot()

odrv0.axis0.motor.config.current_lim = 10
odrv0.axis0.controller.config.vel_limit = 2
odrv0.config.enable_brake_resistor = True
odrv0.axis0.motor.config.pole_pairs = 7
odrv0.axis0.motor.config.torque_constant = 0.04352631578
odrv0.axis0.motor.config.motor_type = MOTOR_TYPE_HIGH_CURRENT
odrv0.axis0.encoder.config.cpr = 42
odrv0.axis0.motor.config.resistance_calib_max_voltage = 2
odrv0.axis0.encoder.config.mode = ENCODER_MODE_HALL

odrv0.save_configuration()
odrv0.reboot()

odrv0.axis0.requested_state = AXIS_STATE_MOTOR_CALIBRATION
odrv0.axis0.requested_state = AXIS_STATE_FULL_CALIBRATION_SEQUENCE

dump_errors(odrv0)

odrv0.axis0.controller.config.vel_limit = 20

odrv0.save_configuration()
odrv0.reboot()

# Below are the steps to enter velocity control mode and run a quick test

odrv0.axis0.requested_state = AXIS_STATE_CLOSED_LOOP_CONTROL
odrv0.axis0.controller.config.control_mode = CONTROL_MODE_VELOCITY_CONTROL

odrv0.axis0.controller.input_vel = 5


```




