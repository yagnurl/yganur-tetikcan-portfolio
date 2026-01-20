'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './TextScroller.module.css';

const technologies = [
  { name: 'Next.js', weight: 800, size: 3.5, opacity: 1, blur: false },
  { name: 'React', weight: 300, size: 2.2, opacity: 0.4, blur: true },
  { name: 'Nuxt.js', weight: 700, size: 3, opacity: 0.9, blur: false },
  { name: 'Vue', weight: 400, size: 2.5, opacity: 0.5, blur: true },
  { name: 'TypeScript', weight: 600, size: 2.8, opacity: 0.7, blur: false },
  { name: 'Tailwind', weight: 800, size: 3.2, opacity: 1, blur: false },
  { name: 'Framer', weight: 300, size: 2, opacity: 0.35, blur: true },
  { name: 'Three.js', weight: 700, size: 3.4, opacity: 0.85, blur: false },
  { name: 'JavaScript', weight: 500, size: 2.6, opacity: 0.6, blur: true },
  { name: 'Sanity', weight: 600, size: 2.4, opacity: 0.65, blur: false },
  { name: 'Styled', weight: 400, size: 2.3, opacity: 0.45, blur: true },
  { name: 'Motion', weight: 800, size: 3.6, opacity: 0.95, blur: false },
];

export default function TextScroller() {
  // Duplicate the array for seamless loop
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <div className={styles.scrollerContainer}>
      <motion.div
        className={styles.scrollerContent}
        animate={{
          y: [0, -50 + '%'], // Move up by half the content height
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {duplicatedTechs.map((tech, index) => (
          <div
            key={index}
            className={`${styles.techItem} ${tech.blur ? styles.blurred : ''}`}
            style={{
              fontWeight: tech.weight,
              fontSize: `${tech.size}rem`,
              opacity: tech.opacity,
            }}
          >
            {tech.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
