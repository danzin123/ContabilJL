import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Growth3DGraphic: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x4fa8ff, 2.5);
    dirLight.position.set(8, 10, 8);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x0b63ce, 2, 10);
    pointLight.position.set(-4, -4, 5);
    scene.add(pointLight);

    // Materials
    const blueGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0b63ce,
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.6,
      transparent: true,
      opacity: 0.9,
    });

    const lightBlueMat = new THREE.MeshStandardMaterial({
      color: 0x4fa8ff,
      metalness: 0.3,
      roughness: 0.2,
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.2,
    });

    // 3D Staircase Growth Pillars
    const pillarsGroup = new THREE.Group();
    mainGroup.add(pillarsGroup);

    const heights = [0.8, 1.5, 2.3, 3.2, 4.2];
    const pillarMeshes: THREE.Mesh[] = [];

    heights.forEach((h, i) => {
      const geo = new THREE.BoxGeometry(0.7, h, 0.7);
      const isTop = i === heights.length - 1;
      const mat = isTop ? lightBlueMat : (i % 2 === 0 ? blueGlassMat : whiteMat);
      const mesh = new THREE.Mesh(geo, mat);
      const x = -1.8 + i * 0.9;
      mesh.position.set(x, -2.0 + h / 2, 0);
      pillarsGroup.add(mesh);
      pillarMeshes.push(mesh);
    });

    // 3D Growth Trend Arrow
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.2, -1.8, 0.4),
      new THREE.Vector3(-1.3, -1.0, 0.4),
      new THREE.Vector3(-0.4, -0.4, 0.4),
      new THREE.Vector3(0.5, 0.5, 0.4),
      new THREE.Vector3(1.8, 2.2, 0.4),
    ]);

    const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.08, 12, false);
    const tubeMesh = new THREE.Mesh(tubeGeo, lightBlueMat);
    mainGroup.add(tubeMesh);

    // Arrowhead on top
    const coneGeo = new THREE.ConeGeometry(0.25, 0.6, 16);
    const coneMesh = new THREE.Mesh(coneGeo, lightBlueMat);
    coneMesh.position.set(1.8, 2.2, 0.4);
    coneMesh.rotation.z = -Math.PI / 4;
    mainGroup.add(coneMesh);

    // Floating Glow Spheres on graph points
    const pointsGroup = new THREE.Group();
    mainGroup.add(pointsGroup);

    curve.getPoints(5).forEach((p) => {
      const spGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const spMesh = new THREE.Mesh(spGeo, whiteMat);
      spMesh.position.copy(p);
      pointsGroup.add(spMesh);
    });

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.6;
      mouseY = -y * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    let clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Pulse growth pillars slightly
      pillarMeshes.forEach((mesh, idx) => {
        const baseH = heights[idx];
        const pulse = 1 + Math.sin(elapsedTime * 2 + idx * 0.6) * 0.04;
        mesh.scale.set(1, pulse, 1);
      });

      mainGroup.rotation.y += (mouseX - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (mouseY - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
