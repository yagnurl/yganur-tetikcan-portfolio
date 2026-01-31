'use client';
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import styles from './ProjectClient.module.css';

interface ProjectClientProps {
  data: {
    title: string;
    punchline: string;
    content: any;
    link?: string;
    mainImage: string | null;
    images?: string[];
  };
}

export default function ProjectClient({ data }: ProjectClientProps) {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let ticking = false;

    const handleWheel = (e: WheelEvent) => {
      if (ticking) return;

      const rect = container.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isInViewport) return;

      const containerTop = rect.top;
      const containerBottom = rect.bottom;
      const viewportHeight = window.innerHeight;
      
      // Only convert scroll if container is significantly visible (middle 60% of viewport)
      if (containerTop < viewportHeight * 0.7 && containerBottom > viewportHeight * 0.3) {
        ticking = true;
        
        if (rafId) cancelAnimationFrame(rafId);
        
        rafId = requestAnimationFrame(() => {
          e.preventDefault();
          container.scrollLeft += e.deltaY * 1.2;
          ticking = false;
        });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Back Button */}
      <div 
        onClick={() => router.back()}
        className={styles.backButton}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </div>

      <div className={styles.contentContainer}>
        
        {/* Top Section: Split Layout */}
        <div className={styles.topSection}>
            {/* Left Column: Title & Punchline */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className={styles.leftColumn}
            >
                <h1 className={styles.title}>
                    {data.title}
                </h1>
                <p className={styles.punchline}>
                    {data.punchline}
                </p>
                
                {/* Link */}
                {data.link && (
                    <div className={styles.linkContainer}>
                        <a 
                           href={data.link}
                           target="_blank"
                           rel="noopener noreferrer"
                           className={styles.projectLink}
                        >
                            View Project
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </a>
                    </div>
                )}
            </motion.div>

            {/* Right Column: Detailed Description */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={styles.rightColumn}
            >
                <div className={styles.description}>
                    {data.content && (
                        <PortableText 
                            value={data.content}
                            components={{
                                block: {
                                    normal: ({children}) => <p className={styles.paragraph}>{children}</p>,
                                },
                            }}
                        />
                    )}
                </div>
            </motion.div>
        </div>

        {/* Images - Horizontal Scroll */}
        {data.images && data.images.length > 0 && (
            <div className={styles.imagesWrapper}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={styles.horizontalScroll}
                    ref={scrollContainerRef}
                >
                <div className={styles.horizontalScrollContent}>
                    {data.images.map((imageUrl, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ 
                                duration: 0.6, 
                                delay: index * 0.15,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                            className={styles.scrollImage}
                            whileHover={{ scale: 1.02 }}
                        >
                            <img 
                                src={imageUrl} 
                                alt={`${data.title} - Image ${index + 1}`} 
                                loading="lazy"
                                className={styles.scrollImageImg}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            </div>
        )}

      </div>
    </div>
  );
}
