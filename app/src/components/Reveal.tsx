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
      initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
      whileInView={prefersReducedMotion ? {} : {opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.1, margin: "0px 0px -10% 0px"}}
      transition={{duration: 0.45, delay}}
    >
      {children}
    </motion.div>
  );
}
