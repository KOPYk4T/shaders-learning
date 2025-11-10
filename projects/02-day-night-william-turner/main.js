import * as THREE from "three";

const fragmentShader = /* glsl */ `
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
`;

const vertexShader = /* glsl */ `void main() { gl_Position = vec4(position, 1.0); }`;

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
