'use client';

import { useEffect, useRef, useMemo } from "react";
import { JetBrains_Mono } from "next/font/google";
import * as THREE from "three";
import "./globals.css";

// composants
import Header from "@/components/Header";
import StairTransition from "@/components/StairTransition";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export default function RootLayout({ children }) {
  const canvasRef = useRef(null);

  const { scene, camera, geometry, material, light } = useMemo(() => {
    const scene = new THREE.Scene();
    let camera;
    if (typeof window !== 'undefined') {
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight);
      camera.position.set(0, 1, 2);
      camera.lookAt(0, -0.5, 0);
    }
    const geometry = computeGeometry();
    const material = new THREE.PointsMaterial({ size: 0.015, vertexColors: true });
    const light = new THREE.PointLight(0xffffff, 2.5, 100);
    light.position.set(0, 10, 10);
    
    return { scene, camera, geometry, material, light };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
    scene.add(light);

    const clock = new THREE.Clock();
    let animationFrameId;

    const loop = () => {
      const t = clock.getElapsedTime();
      animeGeometry(geometry, t);
      mesh.rotation.y = 0.05 * t;
      light.position.x = Math.sin(t) * 3;
      light.position.z = Math.cos(t) * 3;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [scene, camera, geometry, material, light]);

  return (
    <html lang="fr">
      <body className={jetbrainsMono.variable}>
        <canvas 
          ref={canvasRef} 
          className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
        <div className="relative z-10">
          <Header />
          <main className="relative z-20">
            <StairTransition>
              {children}
            </StairTransition>
          </main>
        </div>
      </body>
    </html>
  );
}
function computeGeometry() {
  const space = 4, nb = 80, amp = 0.08, fre = 0.8, pi2 = Math.PI * 2;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(nb * nb * 3);
  const colors = new Float32Array(nb * nb * 3);
  
  for (let i = 0, k = 0; i < nb; i++) {
    for (let j = 0; j < nb; j++, k++) {
      const x = i * (space / nb) - space / 2;
      const z = j * (space / nb) - space / 2;
      const y = amp * (Math.cos(x * pi2 * fre) + Math.sin(z * pi2 * fre));
      
      positions[3 * k] = x;
      positions[3 * k + 1] = y;
      positions[3 * k + 2] = z;
      
      const intensity = (y / amp) / 4 + 0.25;
      colors[3 * k] = intensity * 0.7;
      colors[3 * k + 1] = j / nb * intensity * 0.5;
      colors[3 * k + 2] = i / nb * intensity * 0.5;
    }
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.computeBoundingBox();
  
  return geometry;
}

function animeGeometry(geometry, progress) {
  const space = 4, nb = 80, amp = 0.08, pi2 = Math.PI * 2;
  const phase = progress * 0.5;
  const fre = 0.6 + Math.cos(progress * 0.5) / 4;
  const positions = geometry.attributes.position.array;
  const colors = geometry.attributes.color.array;
  
  for (let i = 0, k = 0; i < nb; i++) {
    for (let j = 0; j < nb; j++, k++) {
      const x = i * (space / nb) - space / 2;
      const z = j * (space / nb) - space / 2;
      const y = amp * (Math.cos(x * pi2 * fre + phase) + Math.sin(z * pi2 * fre + phase));
      
      positions[3 * k + 1] = y;
      
      const intensity = (y / amp) / 4 + 0.25;
      colors[3 * k] = intensity * 0.7;
      colors[3 * k + 1] = j / nb * intensity * 0.5;
      colors[3 * k + 2] = i / nb * intensity * 0.5;
    }
  }
  
  geometry.attributes.position.needsUpdate = true;
  geometry.attributes.color.needsUpdate = true;
}

