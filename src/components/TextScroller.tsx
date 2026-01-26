'use client';

import React, { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import styles from './TextScroller.module.css';

interface Technology {
  name: string;
  weight?: number;
  size?: number;
  opacity?: number;
  blur?: boolean;
}

interface TextScrollerProps {
  technologies?: Technology[];
}

const defaultTechnologies: Technology[] = [
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

// Configuration
const ITEM_SPACING = 50; // Vertical spacing between items
const STEP_DURATION = 2000; // Duration for each step (2 seconds)

export default function TextScroller({ technologies }: TextScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Use provided technologies or fallback to default
  const techs = technologies && technologies.length > 0 
    ? technologies.map(tech => ({
        name: tech.name,
        weight: tech.weight ?? 400,
        size: tech.size ?? 2.5,
        opacity: tech.opacity ?? 0.7,
        blur: tech.blur ?? false,
      }))
    : defaultTechnologies;
  
  // Duplicate for seamless loop
  const duplicatedTechs = [...techs, ...techs, ...techs];
  
  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      setContainerHeight(height);
      // Center the first item: centerY = 0 + scrollOffset, so scrollOffset = centerY
      // But we want to start from the first set of items (not duplicated ones)
      const centerY = height / 2;
      setScrollOffset(centerY);
    }
  }, []);

  // Step-by-step scroll animation (moving up, next item becomes active)
  useEffect(() => {
    if (containerHeight === 0) return; // Wait for container height to be set
    
    const centerY = containerHeight / 2;
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = (prev + 1) % techs.length;
        // Scroll up by one item spacing, keeping center position
        // Center the active item: centerY = itemY + scrollOffset
        // itemY = nextStep * ITEM_SPACING (for first set of items)
        // For infinite scroll, we use duplicatedTechs, so we can use items from any set
        let newOffset = centerY - nextStep * ITEM_SPACING;
        
        // Seamless infinite scroll: when we complete one cycle, continue with duplicated items
        // No reset needed because duplicatedTechs provides seamless continuation
        setScrollOffset(newOffset);
        return nextStep;
      });
    }, STEP_DURATION);
    
    return () => clearInterval(interval);
  }, [techs.length, containerHeight]);

  // Calculate item position and visual properties based on distance from center
  const getItemProperties = (itemY: number, scrollY: number) => {
    if (containerHeight === 0) {
      return { scale: 1, opacity: 0.3, blur: 4, isActive: false, zIndex: 1 };
    }
    
    const centerY = containerHeight / 2;
    const absoluteY = itemY + scrollY;
    const distanceFromCenter = Math.abs(absoluteY - centerY);
    
    // Active item is the one closest to center (within half item spacing)
    const isActive = distanceFromCenter < ITEM_SPACING / 2;
    
    // Calculate visual properties based on distance from center
    const maxDistance = ITEM_SPACING * 2.5; // Maximum distance for full fade
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
    
    // Scale: active item is full size, others scale down slightly
    const scale = isActive ? 1 : Math.max(0.85, 1 - normalizedDistance * 0.15);
    
    // Opacity: active item is fully opaque (white), others fade based on distance
    const opacity = isActive ? 1 : Math.max(0.25, 1 - normalizedDistance * 0.75);
    
    // Blur: active item has no blur, others have minimal blur
    const blur = isActive ? 0 : Math.min(2, normalizedDistance * 2);
    
    // Z-index: active item on top
    const zIndex = isActive ? 10 : Math.max(1, Math.round(5 - normalizedDistance * 4));
    
    return { scale, opacity, blur, isActive, zIndex };
  };

  // Find active item's Y position for arrow alignment
  const getActiveItemY = () => {
    if (containerHeight === 0) return containerHeight / 2;
    const centerY = containerHeight / 2;
    // Active item is at center, so its absolute Y is centerY
    return centerY;
  };

  const activeItemY = getActiveItemY();

  return (
    <div ref={containerRef} className={styles.scrollerContainer}>
      {/* Arrow pointing to center item */}
      <motion.div 
        className={styles.arrowIndicator}
        animate={{
          top: activeItemY + 20,
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          position: 'absolute',
          left: '20px',
          transform: 'translateY(-50%)',
          zIndex: 100,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </motion.div>
      
      <motion.div
        className={styles.scrollerContent}
        animate={{
          y: scrollOffset,
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          height: `${duplicatedTechs.length * ITEM_SPACING}px`,
        }}
      >
        {duplicatedTechs.map((tech, index) => {
          const itemY = index * ITEM_SPACING;
          const props = getItemProperties(itemY, scrollOffset);
          const centerY = containerHeight / 2;
          
          // Only render items that are visible (within viewport) - more lenient check
          const absoluteY = itemY + scrollOffset;
          const isVisible = containerHeight === 0 || Math.abs(absoluteY - centerY) < containerHeight / 2 + ITEM_SPACING * 5;
          
          if (!isVisible) return null;
          
          return (
            <motion.div
              key={index}
              className={`${styles.techItem} ${props.isActive ? styles.activeItem : ''}`}
              animate={{
                scale: props.scale,
                opacity: props.opacity,
                filter: `blur(${props.blur}px)`,
              }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                fontWeight: props.isActive ? 700 : 400,
                fontSize: '2rem', // Fixed size for all items
                position: 'absolute',
                left: '20%',
                top: `${itemY}px`,
                color: props.isActive ? '#000000' : 'rgba(0, 0, 0, 0.4)',
                zIndex: props.zIndex,
                transformOrigin: 'center center',
                textAlign: 'center',
              }}
            >
              {tech.name}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
