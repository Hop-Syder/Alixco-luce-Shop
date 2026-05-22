"use client";

import { motion } from "framer-motion";

interface AnimatedTitleProps {
  text1: string;
  text2: string;
  className?: string;
}

export const AnimatedTitle = ({ text1, text2, className = "" }: AnimatedTitleProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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

  return (
    <motion.h1 
      className={`font-heading font-bold leading-[1.1] tracking-tight ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="inline-block overflow-hidden">
        {letters1.map((word, i) => (
          <motion.span key={`w1-${i}`} className="inline-block mr-[0.25em]" variants={itemVariants}>
            {word}
          </motion.span>
        ))}
      </div>
      <br className="hidden md:block" />
      <div className="inline-block overflow-hidden">
        {letters2.map((word, i) => (
          <motion.span 
            key={`w2-${i}`} 
            className="inline-block mr-[0.25em] text-glow text-[hsl(var(--primary))]" 
            variants={itemVariants}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.h1>
  );
};
