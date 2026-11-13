import * as THREE from 'three';

export function createIllustrationScene(container: HTMLElement) {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    return null; // The decorative fallback remains visible without WebGL.
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  container.appendChild(renderer.domElement);
  container.dataset.sceneReady = 'true';

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, 0.1, 50);
  camera.position.set(0, 0, 12);
  const group = new THREE.Group();
  scene.add(group);
  scene.add(new THREE.HemisphereLight(0xf0f6ff, 0x7b8e9c, 2.4));
  const key = new THREE.DirectionalLight(0xffffff, 3.5);
  key.position.set(-4, 6, 8);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xb3d9ef, 2);
  rim.position.set(5, 1, -2);
  scene.add(rim);
  const render = () => renderer.render(scene, camera);
  const resize = () => {
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    const aspect = width / height;
    const halfHeight = Math.max(3.2, 3.2 / aspect);
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    render();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  return { scene, group, render, dispose: () => {
    observer.disconnect();
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
        geometries.add(object.geometry);
        (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => materials.add(material));
      }
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    renderer.dispose();
    renderer.domElement.remove();
    delete container.dataset.sceneReady;
  } };
}
