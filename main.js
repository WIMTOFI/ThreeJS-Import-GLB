import * as THREE from 'three';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency for the background
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87ceeb);
document.body.appendChild(renderer.domElement);

// Adjust camera position
camera.position.set(0, 1, 5); // Adjust as needed

// Add lighting for better visibility
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Load the GLTF model
const loader = new GLTFLoader();
let mixer;
let model;

loader.load(
  './Test GLB Model.glb', // Path to your GLTF file
  function (gltf) {
    console.log('Model loaded:', gltf);  // Confirm model is loading
    model = gltf.scene;
    scene.add(model);  // Add the loaded model to the scene
    model.position.set(0, 0, 0);  // Adjust position if needed
    model.scale.set(1, 1, 1); // Scale the model if necessary

    // Animation setup
    if (gltf.animations && gltf.animations.length) {
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    }
  },
  undefined,
  function (error) {
    console.error('An error occurred while loading the model:', error);
  }
);

// OrbitControls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smoothly dampens the movement
controls.dampingFactor = 0.25; // Adjust damping factor as needed
controls.enableZoom = true; // Enable zooming with the scroll wheel

// Resize handling
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function animate() {
  requestAnimationFrame(animate);

  // Update model rotation if loaded
  if (model) {
    model.rotation.y += 0.01; // Rotate around the Y-axis
  }

  // Update the animation mixer if it exists
  if (mixer) {
    mixer.update(0.01);
  }

  controls.update(); // Update controls for each frame
  renderer.render(scene, camera); // Render the scene
}

// Call animate function
animate();

/*
import * as THREE from './three/build/three.module.js'; 
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';
const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
const renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
renderer.setAnimationLoop( animate ); 
document.body.appendChild( renderer.domElement ); 
const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( { color: 0x00ff0 } ); 
const cube = new THREE.Mesh( geometry, material );
scene.add( cube ); 


        camera.position.z = 5;

function animate() { 
    cube.rotation.x += 0.01; 
    cube.rotation.y += 0.01; 
    renderer.render( scene, camera ); 
}
 */
 




