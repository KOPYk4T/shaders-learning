import * as THREE from "three";
import fragmentShader from "./shaders/fragment.glsl?raw";
import vertexShader from "./shaders/vertex.glsl?raw";

let camera;
let scene;
let renderer;
let clock;
let uniforms;
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

  uniforms = {
    u_time: { value: 0.0 },
    u_resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
  };

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
  setRendererSize();
  container.appendChild(renderer.domElement);

  updateResolutionUniform();

  window.addEventListener("resize", handleResize);
  window.addEventListener("pointermove", handlePointerMove);
}

function animate() {
  requestAnimationFrame(animate);
  if (!document.hidden) {
    uniforms.u_time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  }
}

function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(pixelRatio);
    setRendererSize();
    updateResolutionUniform();
  }, 100);
}

function handlePointerMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  const x = (event.clientX - rect.left) * renderer.getPixelRatio();
  const y = (rect.bottom - event.clientY) * renderer.getPixelRatio();
  uniforms.u_mouse.value.set(x, y);
}

function setRendererSize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateResolutionUniform() {
  const canvas = renderer.domElement;
  uniforms.u_resolution.value.set(canvas.width, canvas.height);
}
