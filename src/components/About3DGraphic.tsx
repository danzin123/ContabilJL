import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ShieldCheck } from 'lucide-react';
import { animateScene } from '../utils/sceneMotion';
import { createIllustrationScene } from '../utils/illustrationScene';

export default function About3DGraphic() {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const illustration = createIllustrationScene(container);
    if (!illustration) return;
    const { group, render } = illustration;
    const blue = new THREE.MeshStandardMaterial({ color: 0x356581, metalness: 0.35, roughness: 0.3 });
    const gold = new THREE.MeshStandardMaterial({ color: 0xc3ac85, metalness: 0.45, roughness: 0.32 });
    const pearl = new THREE.MeshStandardMaterial({ color: 0xc9dde3, metalness: 0.25, roughness: 0.26 });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.82, 48, 32), pearl);
    group.add(core);

    // Fixed orbital planes; each satellite stays exactly on its own ring.
    const orbitA = new THREE.Group();
    orbitA.rotation.set(0.85, 0.35, -0.3);
    group.add(orbitA);
    const orbitB = new THREE.Group();
    orbitB.rotation.set(-0.65, -0.45, 0.65);
    group.add(orbitB);
    orbitA.add(new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.035, 12, 128), blue));
    orbitB.add(new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.025, 12, 128), gold));
    const satelliteA = new THREE.Mesh(new THREE.SphereGeometry(0.13, 24, 16), blue);
    const satelliteB = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 16), gold);
    orbitA.add(satelliteA);
    orbitB.add(satelliteB);

    // A fine equatorial accent gives the central sphere a finished appearance.
    const equator = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.015, 8, 96), gold);
    equator.rotation.x = Math.PI / 2.5;
    group.add(equator);
    const stop = animateScene(container, ({ elapsed, pointerX, pointerY, reducedMotion }) => {
      const time = reducedMotion ? 0 : elapsed;
      group.rotation.set(pointerY * 0.055, pointerX * 0.08, 0);
      group.position.y = Math.sin(time * 0.45) * 0.035;
      const angleA = 0.5 + time * 0.16;
      const angleB = 2.6 - time * 0.12;
      satelliteA.position.set(Math.cos(angleA) * 2.05, Math.sin(angleA) * 2.05, 0);
      satelliteB.position.set(Math.cos(angleB) * 1.65, Math.sin(angleB) * 1.65, 0);
      render();
    });
    return () => { stop(); illustration.dispose(); };
  }, []);

  return (
    <div className="scene-graphic scene-about" aria-hidden="true">
      <div ref={mountRef} className="scene-canvas" />
      <ShieldCheck className="scene-fallback" strokeWidth={0.8} />
    </div>
  );
}
