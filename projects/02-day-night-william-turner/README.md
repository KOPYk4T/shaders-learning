# 02-day-night-william-turner

Animated gradient inspired by J. M. W. Turner’s _The Fighting Temeraire_ (1839), recreating the warm-to-cool sunset transition in GLSL.

## Run

```bash
npm run dev:02
```

## What it does

- Interpolates between warm and cool palettes (day-to-night) using a normalized sine signal.
- Modulates the mix by pixel height to evoke Turner-style horizons.
- Draws per-channel RGB diagnostic lines with the `plot` function.
- Exposes `u_mouse` for future compositional interactions.

## Uniforms

- `u_time`: animates palette progression over time.
- `u_resolution`: keeps the gradient and lines proportional to the canvas.
- `u_mouse`: reserved for future interactivity (updated with pointer position).

## Visual reference

![The Fighting Temeraire, 1839 - J. M. W. Turner](https://upload.wikimedia.org/wikipedia/commons/4/45/Joseph_Mallord_William_Turner%2C_The_Fighting_Temeraire%2C_1839.jpg)

> Source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_The_Fighting_Temeraire,_1839.jpg). The shader aims to approximate the painting’s warm sunset gradients and cool upper sky.

## Fragment Shader

```glsl
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.218,0.324,0.912);
vec3 colorB = vec3(1.000,0.474,0.079);
vec3 colorANight = vec3(0.032,0.048,0.135);
vec3 colorBNight = vec3(0.085,0.040,0.007);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec3 pct = vec3(st.x);

    float normalizedSinTime = (sin(u_time * 0.5) + 1.0) * 0.5;
    float timeOfDay = normalizedSinTime;

    vec3 skyA = mix(colorA, colorANight, timeOfDay);
    vec3 skyB = mix(colorB, colorBNight, timeOfDay);

    float lowerBoost = smoothstep(0.3, 0.0, st.y);

    pct.r = smoothstep(0.4,0.7, st.x) + lowerBoost;
    pct.g = st.x + lowerBoost;
    pct.b = st.x + lowerBoost;

    color = mix(skyA, skyB, pct);

    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));
    gl_FragColor = vec4(color,1.0);
}
```
