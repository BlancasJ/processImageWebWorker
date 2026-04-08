# processImageWebWorker

Browser-based image manipulation tool using Web Workers for off-thread pixel processing.

## Context
- **Course:** Ksquare University Bootcamp
- **Date:** 2021

## Tech Stack
- Vanilla JavaScript
- Web Workers API
- Canvas API
- HTML

## What It Does
Lets users upload an image and adjust its blue channel intensity using a range slider. The pixel manipulation runs in a Web Worker to keep the main thread responsive (shown by a continuously spinning element). The worker iterates through every pixel, modifies the blue offset, and sends the processed ImageData back to the canvas.
