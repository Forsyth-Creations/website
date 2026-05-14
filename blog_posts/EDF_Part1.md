> [!NOTE]
> This blog post is still a work in progress, but I'm sharing it now while I work!


# Understanding EDF

So EDF, Embedded Development Framework, is the replacement for PetaLinux. It's intention is to give you the ability to deploy onto an embedded architecture.

Before beginning, it would be useful to have a high-level understanding of deployment/what I'm trying to do.

I own a [Zybo Z7-20](https://digilent.com/reference/programmable-logic/zybo-z7/reference-manual?srsltid=AfmBOooj7Os0Line1PlxzMIGfUC497xVmNC3hLKUtyMpWrvWURj9_AcU). This has the following of interest to me:

- Zynq-7000, QSPI, Programmable logic equivalent to Artix-7 FPGA, 667 MHz dual-core Cortex-A9 processor

This means the following:

- PS, Processing System, is 667 MHz dual-core Cortex-A9 processor
- PL, Programmable Logic, is equivalent to Artix-7 FPGA

[EDF Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/3250586438/Downloads%2Band%2BRelease%2BNotes)

[Download EDF](https://www.xilinx.com/support/download/index.html/content/xilinx/en/downloadNav/embedded-design-tools.html)

[Configure Yocto for EDF](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/3268149250/Operating+System+Integration+and+Development+AMD+ZynqMP+device+portfolio#Yocto-Project%E2%84%A2-build-setup-instructions-for-EDF)


Terms Discovered While Working:

BSP: Contains the hardware design, and embedded software configuration
.tcl: 
