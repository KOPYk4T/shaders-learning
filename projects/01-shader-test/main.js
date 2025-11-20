import * as THREE from "three";
import fragmentShader from "./shaders/fragment.glsl?raw";
import vertexShader from "./shaders/vertex.glsl?raw";

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
