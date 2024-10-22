"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Stairs from './Stairs'; // Assurez-vous que ce composant existe
import { usePathname } from 'next/navigation';

const StairTransition = ({ children }) => {
  const pathname = usePathname();
  const stairRef = useRef(null);

  useLayoutEffect(() => {
    if (stairRef.current && stairRef.current.children) {
      const ctx = gsap.context(() => {
        gsap.to(stairRef.current.children, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'power3.out',
          duration: 0.5,
        });
      }, stairRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <div key={pathname}>
          <div ref={stairRef} className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40 flex">
            <Stairs />
          </div>

          <motion.div
            className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{
              opacity: 0,
              transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
            }}
          />
        </div>
      </AnimatePresence>
      {children}
    </>
  );
};

export default StairTransition;
