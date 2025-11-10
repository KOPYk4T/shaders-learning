# 01-shader-test

First shader playground in Three.js. It showcases a simple visual effect where colors oscillate using trigonometric functions.

## Run

```bash
npm run dev:01
```

## What it does

The shader creates a color animation where:

- **Red** oscillates with `sin(u_time)` — sweeps from 0 to 1 and back
- **Green** oscillates with `cos(u_time)` — phase-shifted relative to red
- **Blue** oscillates more slowly with `sin(u_time * 0.5)` — longer cycle

The result is a full-screen color wash with smooth transitions.

## Features

- Fragment shader animating RGB channels with `sin()` and `cos()`
- `u_time` uniform drives a time-based animation
- Minimal boilerplate: focus stays on the fragment shader
- Tuned for performance (pixelRatio capped, antialiasing off)

## Code structure

The code is organized as follows:

- The **fragment shader** sits at the top (the interesting part)
- Three.js boilerplate is condensed afterward
- To create new effects, tweak only the fragment shader

## Fragment Shader

```glsl
uniform float u_time;  // Time in seconds (updated each frame)

void main() {
  // Colors oscillating with sine and cosine
  float r = sin(u_time) * 0.5 + 0.5;        // Red: 0 → 1 → 0
  float g = cos(u_time) * 0.5 + 0.5;        // Green: phase-shifted
  float b = sin(u_time * 0.5) * 0.5 + 0.5;  // Blue: slower

  gl_FragColor = vec4(r, g, b, 1.0);  // Color final del píxel (RGBA)
}
```

## Key concepts

- **Fragment shader**: Runs per pixel, defines its color
- **Uniforms**: Values supplied from JavaScript (e.g. `u_time`)
- **sin() / cos()**: Trigonometric functions oscillating between -1 and 1
- **Normalization**: `* 0.5 + 0.5` maps the -1..1 range into 0..1 (valid color range)
