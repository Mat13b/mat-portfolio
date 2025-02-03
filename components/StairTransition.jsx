"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';

const StairTransition = ({ children }) => {
  const pathname = usePathname();
  const stairRef = useRef(null);

  useEffect(() => {
    const stairs = stairRef.current;
    if (!stairs) return;

    const ctx = gsap.context(() => {
      // Reset initial state
      gsap.set(stairs.children, {
        y: 100,
        opacity: 0
      });

      // Animation sequence
      const tl = gsap.timeline();
      
      tl.to(stairs.children, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power4.out"
      })
      .to(stairs.children, {
        y: -100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power4.in",
        delay: 0.5
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div className="relative">
      <div className="fixed inset-0 pointer-events-none z-30">
        <div ref={stairRef} className="w-full h-full">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-[8.33vh] bg-white"
              style={{ opacity: 0, transform: 'translateY(100px)' }}
            />
          ))}
        </div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default StairTransition;
