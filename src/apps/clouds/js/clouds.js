import Detector from './detector'
import THREE from 'commonjs/three';
import vertex from './vertex'
import frag from './frag'
import clouda from 'assets/images/cloud-a.png'

if (!Detector.webgl) Detector.addGetWebGLMessage();

let camera, scene, renderer,
    mesh, geometry, material,
    windowHalfX, windowHalfY;    

let mouseX = 0, mouseY = 0;

let start_time = Date.now();

export default container => {

  windowHalfX = container.clientWidth / 2;
  windowHalfY = container.clientHeight / 2;

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.y = -12;
  camera.position.z = 6000;

  scene = new THREE.Scene();

  geometry = new THREE.Geometry();

  //let texture = Math.random() > 0.3 ?
  let texture = THREE.ImageUtils.loadTexture(clouda, null, animate)
  texture.magFilter = THREE.LinearMipMapLinearFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  let fog = new THREE.Fog(0x4584b4, - 100, 3000);

  material = new THREE.ShaderMaterial({
    uniforms: {
      "map": { type: "t", value: texture },
      "fogColor" : { type: "c", value: fog.color },
      "fogNear" : { type: "f", value: fog.near },
      "fogFar" : { type: "f", value: fog.far }
    },
    vertexShader: vertex,
    fragmentShader: frag,
    depthWrite: false,
    depthTest: false,
    transparent: true
  });

  let plane = new THREE.Mesh(new THREE.PlaneGeometry(64, 64));

  for (let i = 0; i < 8000; i++) {

    plane.position.x = Math.random() * 1000 - 500;
    plane.position.y = - Math.random() * Math.random() * 200 - 15;
    plane.position.z = i;
    plane.rotation.z = Math.random() * Math.PI;
    plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

    THREE.GeometryUtils.merge(geometry, plane);
  }

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = - 8000;
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);
  window.addEventListener('resize', onWindowResize, false);
}

function onDocumentMouseMove(event) {

  mouseX = (event.clientX - windowHalfX) * 0.25;
  mouseY = (event.clientY - windowHalfY) * 0.15;
}

function onDocumentTouchMove(event) {

  mouseX = (event.changedTouches[0].clientX - windowHalfX) * 1;
  mouseY = (event.changedTouches[0].clientY - windowHalfY) * 0.75;
}

function onWindowResize(event) {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {

  requestAnimationFrame(animate);

  const position = ((Date.now() - start_time) * 0.03) % 8000;
  
  const cameraposition = {
    x: camera.position.x + (mouseX - camera.position.x) * 0.01,
    y: Math.max(-25, camera.position.y + (- mouseY - camera.position.y) * 0.1),
    z: camera.position.z = - position + 8000
  }

  camera.position = cameraposition
  renderer.render(scene, camera);
}