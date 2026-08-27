import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const About3DGraphic: React.FC = () => {
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
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x0b63ce, 2, 10);
    pointLight.position.set(-3, -2, 4);
    scene.add(pointLight);

    // Materials
    const blueGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0b63ce,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.9,
      clearcoat: 1.0,
    });

    const lightBlueMat = new THREE.MeshStandardMaterial({
      color: 0x4fa8ff,
      metalness: 0.4,
      roughness: 0.2,
    });

    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.8,
      roughness: 0.2,
    });

    // Outer Torus Ring (Representing Protection & Continuity)
    const torusGeo = new THREE.TorusGeometry(2.4, 0.15, 16, 100);
    const torusMesh = new THREE.Mesh(torusGeo, blueGlassMat);
    mainGroup.add(torusMesh);

    // Inner Torus Ring (Tilted)
    const torus2Geo = new THREE.TorusGeometry(1.8, 0.1, 16, 100);
    const torus2Mesh = new THREE.Mesh(torus2Geo, lightBlueMat);
    torus2Mesh.rotation.x = Math.PI / 3;
    mainGroup.add(torus2Mesh);

    // Central Core Shield Block (Representing Security & Trust)
    const coreGeo = new THREE.OctahedronGeometry(1.0, 2);
    const coreMesh = new THREE.Mesh(coreGeo, silverMat);
    mainGroup.add(coreMesh);

    // Orbiting Satellite Nodes (Representing Compromisso, Ética, Tecnologia, Transparência)
    const nodesGroup = new THREE.Group();
    mainGroup.add(nodesGroup);

    const nodePositions = [
      [2.4, 0, 0],
      [-2.4, 0, 0],
      [0, 2.4, 0],
      [0, -2.4, 0],
    ];

    nodePositions.forEach((pos) => {
      const nodeGeo = new THREE.SphereGeometry(0.25, 16, 16);
      const nodeMesh = new THREE.Mesh(nodeGeo, lightBlueMat);
      nodeMesh.position.set(pos[0], pos[1], pos[2]);
      nodesGroup.add(nodeMesh);

      // Line connecting node to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(pos[0], pos[1], pos[2]),
      ]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x4fa8ff, transparent: true, opacity: 0.5 });
      const line = new THREE.Line(lineGeo, lineMat);
      nodesGroup.add(line);
    });

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.5;
      mouseY = -y * 0.5;
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

      torusMesh.rotation.z = elapsedTime * 0.2;
      torusMesh.rotation.y = elapsedTime * 0.1;

      torus2Mesh.rotation.z = -elapsedTime * 0.3;
      torus2Mesh.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.2;

      coreMesh.rotation.y = elapsedTime * 0.4;
      coreMesh.rotation.x = Math.sin(elapsedTime * 0.6) * 0.2;

      nodesGroup.rotation.z = elapsedTime * 0.2;

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
    <div className="relative w-full h-[260px] xs:h-[300px] sm:h-[380px] lg:h-[420px] flex items-center justify-center select-none touch-pan-y">
      <div className="absolute inset-0 bg-radial from-[#0B63CE]/5 to-transparent rounded-3xl pointer-events-none" />
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y" />
    </div>
  );
};
