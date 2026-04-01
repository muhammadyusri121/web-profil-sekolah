"use client";

import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

interface AnimatedHeadingProps extends HTMLMotionProps<"h2"> {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedHeading({ children, className, ...props }: AnimatedHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={className}
      {...props}
    >
      {children}
    </motion.h2>
  );
}
