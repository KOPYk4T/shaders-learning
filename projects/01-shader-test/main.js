import * as THREE from "three";

const fragmentShader = `
  uniform float u_time;  // Time in seconds (updated every frame)

  void main() {
    // Colors that oscillate with sine and cosine
    float r = sin(u_time) * 0.5 + 0.5;        // Red: 0 → 1 → 0
    float g = cos(u_time) * 0.5 + 0.5;        // Green: desynchronized
    float b = sin(u_time * 0.5) * 0.5 + 0.5;  // Blue: slower
    
    gl_FragColor = vec4(r, g, b, 1.0);  // Final pixel color (RGBA)
  }
`;

const vertexShader = `void main() { gl_Position = vec4(position, 1.0); }`;

let camera, scene, renderer, clock, uniforms;
let resizeTimeout;

init();
animate();

function init() {
  const container = document.getElementById("container");

  camera = new THREE.Camera();
  camera.position.z = 1;
  scene = new THREE.Scene();
  clock = new THREE.Clock();

  const geometry = new THREE.PlaneGeometry(2, 2);
  uniforms = { u_time: { value: 0.0 } };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({
    antialias: false,
    powerPreference: "high-performance",
  });

  const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 100);
  });
}

function animate() {
  requestAnimationFrame(animate);
  if (!document.hidden) {
    uniforms.u_time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  }
}
