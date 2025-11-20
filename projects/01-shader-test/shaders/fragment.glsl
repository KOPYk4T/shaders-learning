uniform float u_time;  // Time in seconds (updated every frame)

void main() {
  // Colors that oscillate with sine and cosine
  float r = sin(u_time) * 0.5 + 0.5;        // Red: 0 → 1 → 0
  float g = cos(u_time) * 0.5 + 0.5;        // Green: desynchronized
  float b = sin(u_time * 0.5) * 0.5 + 0.5;  // Blue: slower
  
  gl_FragColor = vec4(r, g, b, 1.0);  // Final pixel color (RGBA)
}

