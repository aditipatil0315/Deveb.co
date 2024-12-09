import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';




gsap.registerPlugin(ScrollTrigger);

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector("canvas") , alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.setSize(window.innerWidth, window.innerHeight);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;  
// controls.dampingFactor = 0.05; 

// Geometry and Shader Material
const geometry = new THREE.IcosahedronGeometry(1.5, 50,50); 

const material = new THREE.ShaderMaterial({
  // wireframe:true,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0.0 },  
    uColorChange: { value: 0.0},
  },
 
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.y = -1.8;

const clock = new THREE.Clock();

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".landing_page", 
    start: "top top",
    end: "bottom center",
    scrub: 2, 
    invalidateOnRefresh: true, 
    // markers: true, 
  },
});

tl.to(mesh.position, {
  y: 0, 
  z: -1, 
  ease: "power2.inOut",

}, "a").to(material.uniforms.uColorChange, {
  value: 1.,
  ease: "power2.inOut",
}, "a").to(".landing_page h1", {
  opacity: 0,
}, "a").to(".landing_page p" ,{
  opacity: 1,
})

let page = document.querySelector(".third_page");
let banner = document.querySelector(".banner");
let main = document.querySelector(".main");
let cursor = document.querySelector(".cursor");



page.addEventListener("mousemove", function (e) {
  let rect = main.getBoundingClientRect(); 
  let x = (e.clientX - rect.width / 2) * 0.05; 
  let y = (e.clientY - rect.height / 2) * 0.05; 
  banner.style.transform = `translate(${x}px, ${y}px) rotateY(30deg)`; 
});

main.addEventListener("mousemove", function(e) {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.7,
    ease: 'power3.out'
  });
})




function animate() {
  requestAnimationFrame(animate);
  material.uniforms.uTime.value = clock.getElapsedTime(); 
  // controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
