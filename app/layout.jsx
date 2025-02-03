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

    camera.position.z = 4;  // Plus éloigné
    camera.position.y = 1;  // Un peu plus haut

    const geometry = new THREE.BufferGeometry();
    const nb = 50;  // Garde le même nombre de points
    const positions = new Float32Array(nb * nb * 3);
    const colors = new Float32Array(nb * nb * 3);

    for (let i = 0; i < nb; i++) {
      for (let j = 0; j < nb; j++) {
        const k = i * nb + j;
        positions[k * 3] = (i / nb - 0.5) * 5;     // x (plus étalé)
        positions[k * 3 + 1] = 0;                   // y
        positions[k * 3 + 2] = (j / nb - 0.5) * 5;  // z (plus étalé)

        // Dégradé de rose à rouge à jaune
        colors[k * 3] = 1.0;                        // Rouge (max)
        colors[k * 3 + 1] = j / nb * 0.8;          // Vert (pour le jaune)
        colors[k * 3 + 2] = i / nb * 0.8;          // Bleu (pour le rose)
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.04,          // Points un peu plus gros
      vertexColors: true,
      transparent: true,
      opacity: 0.7,        // Un peu plus opaque
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const animate = () => {
      requestAnimationFrame(animate);
      const positions = geometry.attributes.position.array;
      const time = Date.now() * 0.0008;  // Animation plus lente

      for (let i = 0; i < nb; i++) {
        for (let j = 0; j < nb; j++) {
          const k = i * nb + j;
          positions[k * 3 + 1] = Math.sin(i * 0.5 + time) * 0.15 + 
                                Math.sin(j * 0.5 + time) * 0.15;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

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

