---
layout: project_template
title: Writing Your Own Marlin Firmware
description: 3D Printing
date: 2022-6-26 22:16:00
# hero_image: /site/img/ProjectPhotos/MagicMirror
# image: /img/PostImages/tools-for-3d-printing.JPG
hero_height: is-small
hero_darken: true
tags: 3dprinting
series: 3dprinting
author: Henry Forsyth
show_sidebar: false
---

# Getting Started

As you start to mod your printer more and more, things will rapidly become highly custom. As such, you may hit a point in your 3D printing expereince where you need to write the firmware from scratch. In this blog post, we will cover the tools and steps needed to customize the Marlin firmware for your needs.

** WARNING: This tutorial is just a brain dump, and is intended for higher-level users. It will be updated to accomidate beginners when time is avalible **

# Download and Install VS Code
The download link is avalible below:
[https://code.visualstudio.com/](https://code.visualstudio.com/)

# Downloading all the software. Below is a Ubuntu Tutorial, most of it done in the CLI. The relivant repos are below:

[Marlin Firmware](https://github.com/MarlinFirmware/Marlin)
[Marlin Configurations](https://github.com/MarlinFirmware/Configurations)

Go to your home directory and run the following

```
mkdir MarlinFiles && cd MarlinFiles

git clone https://github.com/MarlinFirmware/Configurations.git
git clone https://github.com/MarlinFirmware/Marlin.git
```
It might be worth forking the Marlin repo so you can keep up to date with master. However, for a single-shot usage, this should work

Now here's the important part: the versions of Marlin coorespond to particular config files. They are linked to ensure that ** all configured settings reflect what is avalible in the source code ** . Do the following to make sure each of the repos exists on the same branch. For more information about branching, look into learning git. Some great git things to learn include: git clone, git branch, git checkout, git status, git log

```
cd Configurations
git branch
```

This will pop up a branch name. At the time of this article, the following is provided by default: ```import-2.1.x```

Now, let's check your Marlin branch:

```
cd ..
cd Marlin
git branch
```

At the time of this article, the following is provided by default: ```bugfix-2.1.x```. This matches with the configuration branch of ```import-2.1.x```

If you need a different branch, use the website for [Marlin](https://github.com/MarlinFirmware/Marlin) to see what branches are avalible. Then, checkout the appropriate branches from the Marlin and Configuration repos. That will not be covered in this tutorial.

Now, while in your Marlin repo (which you should be in right now), open Visual Code

```
code .
```

## Configuring Your Local Marlin repo with the Config Files 

