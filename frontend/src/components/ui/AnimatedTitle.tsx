"use client";

import type { ElementType } from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedTitleProps {
  text1: string;
  text2: string;
  className?: string;
  as?: "div" | "h1" | "h2" | "h3";
  tag1?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  tag2?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
}

export const AnimatedTitle = ({ 
  text1, 
  text2, 
  className = "", 
  as = "div",
  tag1 = "span",
  tag2 = "span"
}: AnimatedTitleProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const letters1 = text1.split(" ");
  const letters2 = text2.split(" ");

  const MotionWrapper = motion[as] as ElementType;
  const Tag1 = tag1 as ElementType;
  const Tag2 = tag2 as ElementType;

  return (
    <MotionWrapper 
      className={`font-heading font-bold leading-[1.1] tracking-tight flex flex-col items-start ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Tag1 className="inline-block overflow-hidden m-0 p-0 font-inherit text-[0.6em] md:text-[0.7em] opacity-90 pb-2">
        {letters1.map((word, i) => (
          <motion.span key={`w1-${i}`} className="inline-block mr-[0.25em]" variants={itemVariants}>
            {word}
          </motion.span>
        ))}
      </Tag1>
      <Tag2 className="inline-block overflow-hidden m-0 p-0 font-inherit">
        {letters2.map((word, i) => (
          <motion.span 
            key={`w2-${i}`} 
            className="inline-block mr-[0.25em] text-glow text-[hsl(var(--primary))]" 
            variants={itemVariants}
          >
            {word}
          </motion.span>
        ))}
      </Tag2>
    </MotionWrapper>
  );
};
