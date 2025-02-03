"use client";

import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import StairTransition from "@/components/StairTransition";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export default function RootLayout({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.BufferGeometry();
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      colors[i] = 0;
      colors[i + 1] = 1;  // Vert
      colors[i + 2] = 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 3;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

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

