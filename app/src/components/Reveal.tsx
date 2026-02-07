"use client";

import {motion, useReducedMotion} from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function Reveal({children, delay = 0, className}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
      whileInView={prefersReducedMotion ? {} : {opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.2}}
      transition={{duration: 0.6, delay}}
    >
      {children}
    </motion.div>
  );
}
