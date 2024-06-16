'use client';

import { useEffect, useRef } from "react";
import { JetBrains_Mono } from "next/font/google";
import * as THREE from "three";
import "./globals.css";

// components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export default function RootLayout({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialisation de la scène Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight);
    const pixelRatio = window.devicePixelRatio;
    const geometry = computeGeometry();
    const material = new THREE.PointsMaterial({ size: 0.015, vertexColors: true });
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
    camera.position.set(0, 1, 2);
    camera.lookAt(0, -0.5, 0);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const clock = new THREE.Clock();
    let t = 0;

    function loop() {
      t += clock.getDelta();
      animeGeometry(geometry, t);
      mesh.rotation.y = 0.1 * t;
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }

    function computeGeometry() {
      const space = 4, nb = 100, amp = 0.1, fre = 1, pi2 = Math.PI * 2;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(nb * nb * 3);
      const colors = new Float32Array(nb * nb * 3);
      let k = 0;
      for (let i = 0; i < nb; i++) {
        for (let j = 0; j < nb; j++) {
          const x = i * (space / nb) - space / 2;
          const z = j * (space / nb) - space / 2;
          const y = amp * (Math.cos(x * pi2 * fre) + Math.sin(z * pi2 * fre));
          positions[3 * k + 0] = x;
          positions[3 * k + 1] = y;
          positions[3 * k + 2] = z;
          const intensity = (y / amp) / 2 + 0.3;
          colors[3 * k + 0] = intensity; // Correction de l'index
          colors[3 * k + 1] = j / nb * intensity;
          colors[3 * k + 2] = i / nb * intensity;
          k++;
        }
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.computeBoundingBox();
      return geometry;
    }

    function animeGeometry(geometry, progress) {
      const space = 4, nb = 100, amp = 0.1, pi2 = Math.PI * 2;
      const phase = progress;
      const fre = 0.8 + Math.cos(progress) / 2;
      let k = 0;
      for (let i = 0; i < nb; i++) {
        for (let j = 0; j < nb; j++) {
          const x = i * (space / nb) - space / 2;
          const z = j * (space / nb) - space / 2;
          const y = amp * (Math.cos(x * pi2 * fre + phase) + Math.sin(z * pi2 * fre + phase));
          geometry.attributes.position.setY(k, y);
          const intensity = (y / amp) / 2 + 0.3;
          geometry.attributes.color.setX(k, intensity); // Correction de l'index
          geometry.attributes.color.setY(k, j / nb * intensity);
          geometry.attributes.color.setZ(k, i / nb * intensity);
          k++;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
    }

    // Démarrer la boucle d'animation
    loop();

    // Nettoyage à la fin de l'effet
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <canvas ref={canvasRef} />
        <Header />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}