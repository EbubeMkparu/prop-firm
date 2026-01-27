"use client";

import { motion } from "framer-motion";

export const FadeIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 400 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, type: "tween", ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};
