import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Group to hold all 3D financial items and handle mouse rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x4fa8ff, 2.5);
    dirLight1.position.set(10, 15, 10);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0b63ce, 1.8);
    dirLight2.position.set(-10, -10, 8);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x4fa8ff, 3, 20);
    pointLight.position.set(0, 2, 5);
    scene.add(pointLight);

    // Materials
    const blueGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0b63ce,
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.6,
      opacity: 0.95,
      transparent: true,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const lightBlueMat = new THREE.MeshStandardMaterial({
      color: 0x4fa8ff,
      metalness: 0.3,
      roughness: 0.3,
    });

    const whiteCardMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.15,
    });

    const goldCoinMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.2,
    });

    const darkScreenMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.5,
      roughness: 0.2,
    });

    // 1. Dashboard Base Glass Panel
    const boardGeo = new THREE.BoxGeometry(6.5, 4.2, 0.2);
    const boardMesh = new THREE.Mesh(boardGeo, whiteCardMat);
    boardMesh.position.set(0, 0, 0);
    boardMesh.castShadow = true;
    boardMesh.receiveShadow = true;
    mainGroup.add(boardMesh);

    // Add subtle border on dashboard
    const borderGeo = new THREE.EdgesGeometry(boardGeo);
    const borderMat = new THREE.LineBasicMaterial({ color: 0x0b63ce, linewidth: 2 });
    const borderLine = new THREE.LineSegments(borderGeo, borderMat);
    boardMesh.add(borderLine);

    // 2. Financial Bar Chart on Dashboard
    const barsGroup = new THREE.Group();
    boardMesh.add(barsGroup);

    const barHeights = [1.2, 2.0, 1.5, 2.8, 2.3, 3.4];
    const barMeshes: THREE.Mesh[] = [];

    barHeights.forEach((h, i) => {
      const barGeo = new THREE.BoxGeometry(0.5, h, 0.3);
      const isLast = i === barHeights.length - 1;
      const mat = isLast ? lightBlueMat : blueGlassMat;
      const bar = new THREE.Mesh(barGeo, mat);
      const x = -2.2 + i * 0.9;
      bar.position.set(x, -1.8 + h / 2 + 0.3, 0.25);
      bar.castShadow = true;
      barsGroup.add(bar);
      barMeshes.push(bar);
    });

    // 3. Floating 3D Calculator
    const calcGroup = new THREE.Group();
    const calcBodyGeo = new THREE.BoxGeometry(1.8, 2.4, 0.3);
    const calcBody = new THREE.Mesh(calcBodyGeo, whiteCardMat);
    calcBody.castShadow = true;
    calcGroup.add(calcBody);

    // Calc screen
    const calcScreenGeo = new THREE.BoxGeometry(1.4, 0.5, 0.05);
    const calcScreen = new THREE.Mesh(calcScreenGeo, darkScreenMat);
    calcScreen.position.set(0, 0.7, 0.18);
    calcGroup.add(calcScreen);

    // Calc buttons
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const btnGeo = new THREE.BoxGeometry(0.35, 0.3, 0.08);
        const btnMat = (r === 0 && c === 2) ? lightBlueMat : blueGlassMat;
        const btn = new THREE.Mesh(btnGeo, btnMat);
        btn.position.set(-0.45 + c * 0.45, 0.1 - r * 0.45, 0.18);
        calcGroup.add(btn);
      }
    }

    calcGroup.position.set(3.2, 1.2, 1.5);
    calcGroup.rotation.set(0.2, -0.4, 0.1);
    mainGroup.add(calcGroup);

    // 4. Floating Document Card (Contrato / Relatório Fiscal)
    const docGroup = new THREE.Group();
    const docGeo = new THREE.BoxGeometry(2.0, 2.6, 0.08);
    const docMesh = new THREE.Mesh(docGeo, whiteCardMat);
    docMesh.castShadow = true;
    docGroup.add(docMesh);

    // Text line indicators on document
    for (let i = 0; i < 5; i++) {
      const lineGeo = new THREE.BoxGeometry(1.4 - (i % 2) * 0.4, 0.08, 0.02);
      const lineMat = new THREE.MeshBasicMaterial({ color: i === 0 ? 0x0b63ce : 0xcbd5e1 });
      const lineMesh = new THREE.Mesh(lineGeo, lineMat);
      lineMesh.position.set(-0.1, 0.8 - i * 0.35, 0.05);
      docGroup.add(lineMesh);
    }

    docGroup.position.set(-3.2, -1.0, 1.2);
    docGroup.rotation.set(-0.15, 0.35, -0.1);
    mainGroup.add(docGroup);

    // 5. Floating Coins & Spheres
    const coinsGroup = new THREE.Group();
    mainGroup.add(coinsGroup);

    const coinGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32);
    
    const coin1 = new THREE.Mesh(coinGeo, goldCoinMat);
    coin1.position.set(-2.8, 2.2, 2.0);
    coin1.rotation.set(Math.PI / 3, 0.2, 0.5);
    coinsGroup.add(coin1);

    const coin2 = new THREE.Mesh(coinGeo, goldCoinMat);
    coin2.position.set(2.8, -2.0, 1.8);
    coin2.rotation.set(Math.PI / 4, 0.8, -0.2);
    coinsGroup.add(coin2);

    const coin3 = new THREE.Mesh(coinGeo, lightBlueMat);
    coin3.position.set(1.5, 2.8, 0.8);
    coin3.rotation.set(0.5, 0.5, 0.5);
    coinsGroup.add(coin3);

    // 6. Ambient Particle Sphere Network
    const particlesGeo = new THREE.BufferGeometry();
    const count = 70;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x4fa8ff,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
    });
    const particlePoints = new THREE.Points(particlesGeo, particleMat);
    scene.add(particlePoints);

    // Mouse Interaction setup
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = -y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Group smooth rotation and float
      mainGroup.rotation.y = mouseX * 0.4 + Math.sin(elapsedTime * 0.5) * 0.05;
      mainGroup.rotation.x = mouseY * 0.3 + Math.cos(elapsedTime * 0.4) * 0.03;

      // Float individual components subtly
      calcGroup.position.y = 1.2 + Math.sin(elapsedTime * 1.2) * 0.15;
      calcGroup.rotation.y = -0.4 + Math.cos(elapsedTime * 0.8) * 0.1;

      docGroup.position.y = -1.0 + Math.cos(elapsedTime * 1.1) * 0.15;
      docGroup.rotation.z = -0.1 + Math.sin(elapsedTime * 0.9) * 0.08;

      coin1.rotation.y += 0.02;
      coin2.rotation.x += 0.015;
      coin3.rotation.z += 0.02;

      // Animate bar chart pulsing height
      barMeshes.forEach((bar, idx) => {
        const baseH = barHeights[idx];
        const scale = 1 + Math.sin(elapsedTime * 1.5 + idx * 0.8) * 0.05;
        bar.scale.set(1, scale, 1);
      });

      // Slowly rotate particle network
      particlePoints.rotation.y = elapsedTime * 0.03;

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
    <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[580px] flex items-center justify-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#0B63CE]/10 rounded-full blur-3xl pointer-events-none" />
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
