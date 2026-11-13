import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { TrendingUp } from 'lucide-react';
import { animateScene } from '../utils/sceneMotion';
import { createIllustrationScene } from '../utils/illustrationScene';

export default function Growth3DGraphic() {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const illustration = createIllustrationScene(container);
    if (!illustration) return;
    const { group, render } = illustration;
    const blue = new THREE.MeshStandardMaterial({ color: 0x356581, metalness: 0.3, roughness: 0.32 });
    const pale = new THREE.MeshStandardMaterial({ color: 0x9fbac7, metalness: 0.25, roughness: 0.35 });
    const gold = new THREE.MeshStandardMaterial({ color: 0xc4ac82, metalness: 0.4, roughness: 0.32 });
    const lineMaterial = new THREE.MeshStandardMaterial({ color: 0x254e6b, metalness: 0.2, roughness: 0.4 });
    const heights = [0.75, 1.35, 2, 2.7, 3.5];
    const base = -1.85;
    const points: THREE.Vector3[] = [];
    heights.forEach((height, index) => {
      const bar = new THREE.Mesh(new RoundedBoxGeometry(0.64, height, 0.64, 3, 0.055), index === 4 ? gold : index % 2 ? pale : blue);
      const x = -1.8 + index * 0.9;
      bar.position.set(x, base + height / 2, 0);
      group.add(bar);
      points.push(new THREE.Vector3(x, base + height + 0.24, 0.4));
    });
    const pedestal = new THREE.Mesh(new RoundedBoxGeometry(5.1, 0.12, 1.7, 3, 0.05), pale);
    pedestal.position.set(0, base - 0.07, 0);
    group.add(pedestal);

    // Stable heights and a single continuous curve; no independently pulsing bars.
    const curve = new THREE.CatmullRomCurve3(points);
    const line = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.025, 8, false), lineMaterial);
    group.add(line);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.26, 24), lineMaterial);
    const tangent = curve.getTangent(1).normalize();
    tip.position.copy(points[4]).addScaledVector(tangent, 0.08);
    tip.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
    group.add(tip);
    const lightMaterial = new THREE.MeshStandardMaterial({ color: 0xe9d8b5, emissive: 0xc3a979, emissiveIntensity: 0.4, transparent: true });
    const light = new THREE.Mesh(new THREE.SphereGeometry(0.065, 20, 12), lightMaterial);
    group.add(light);

    const stop = animateScene(container, ({ elapsed, pointerX, pointerY, reducedMotion }) => {
      group.rotation.set(0.12 + pointerY * 0.045, -0.3 + pointerX * 0.08, 0);
      // The only repeating motion follows the line, fading gently at its ends.
      const progress = (elapsed % 9) / 9;
      light.position.copy(curve.getPointAt(progress));
      lightMaterial.opacity = reducedMotion ? 0 : Math.pow(Math.sin(Math.PI * progress), 0.7);
      render();
    });
    return () => { stop(); illustration.dispose(); };
  }, []);

  return (
    <div className="scene-graphic scene-growth" aria-hidden="true">
      <div ref={mountRef} className="scene-canvas" />
      <TrendingUp className="scene-fallback" strokeWidth={0.8} />
    </div>
  );
}
