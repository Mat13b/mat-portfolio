"use client";

import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  const { scene, camera, geometry, material, light } = useMemo(() => {
    const scene = new THREE.Scene();
    let camera;
    if (typeof window !== 'undefined') {
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight);
      camera.position.set(0, 1, 2);
      camera.lookAt(0, -0.5, 0);
    }
    
    // Géométrie simplifiée sans animation de volet
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(80 * 80 * 3);
    const colors = new Float32Array(80 * 80 * 3);
    
    // ... remplissage des positions et couleurs ...
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({ size: 0.015, vertexColors: true });
    const light = new THREE.PointLight(0xffffff, 2.5, 100);
    light.position.set(0, 10, 10);
    
    return { scene, camera, geometry, material, light };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
    scene.add(light);

    const animate = () => {
      mesh.rotation.y += 0.001;
      light.position.x = Math.sin(Date.now() * 0.001) * 3;
      light.position.z = Math.cos(Date.now() * 0.001) * 3;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
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
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [scene, camera, geometry, material, light]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
} 