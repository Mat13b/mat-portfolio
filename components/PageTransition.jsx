"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="fixed inset-0 bg-black pointer-events-none z-40"
        />
        <div className="relative z-20">
          {children}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
