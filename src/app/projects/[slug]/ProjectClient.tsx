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
    <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh', color: '#1a1a1a', fontFamily: 'var(--font-primary)' }}>
      {/* Back Button */}
      <div 
        onClick={() => router.back()}
        style={{ 
            position: 'fixed', 
            top: 40, 
            left: 40, 
            zIndex: 100, 
            cursor: 'pointer',
            width: 44,
            height: 44,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s ease',
            border: '1px solid #f0f0f0'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 0 80px' }}>
        
        {/* Top Section: Split Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 5fr)', gap: '80px', marginBottom: '120px' }}>
            {/* Left Column: Title & Punchline */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
            >
                <h1 style={{ fontFamily: 'var(--font-hero)', fontSize: '4.5rem', marginBottom: '32px', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {data.title}
                </h1>
                <p style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', lineHeight: '1.4', fontWeight: 500, marginBottom: '40px', color: '#111' }}>
                    {data.punchline}
                </p>
                
                {/* Link */}
                {data.link && (
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <a 
                           href={data.link}
                           target="_blank"
                           rel="noopener noreferrer"
                           style={{ 
                               padding: '12px 24px', 
                               backgroundColor: '#f1f1f1', 
                               borderRadius: '30px', 
                               textDecoration: 'none', 
                               color: '#1a1a1a',
                               fontSize: '0.95rem',
                               fontWeight: 500,
                               display: 'inline-flex',
                               alignItems: 'center',
                               gap: '6px',
                               transition: 'background-color 0.2s'
                           }}
                           onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e5e5'}
                           onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
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
                style={{ paddingTop: '10px' }}
            >
                <div style={{ fontFamily: 'var(--font-primary)', fontSize: '1.1rem', lineHeight: '1.7', color: '#444' }}>
                    {data.content && (
                        <PortableText 
                            value={data.content}
                            components={{
                                block: {
                                    normal: ({children}) => <p style={{ marginBottom: '24px' }}>{children}</p>,
                                },
                            }}
                        />
                    )}
                </div>
            </motion.div>
        </div>

        {/* Images - Horizontal Scroll */}
        {data.images && data.images.length > 0 && (
            <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginTop: '40px', marginBottom: '40px' }}>
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
                                style={{ 
                                    display: 'block',
                                    maxWidth: 'none',
                                    maxHeight: '500px',
                                    width: 'auto',
                                    height: 'auto',
                                    objectFit: 'contain', 
                                    pointerEvents: 'none' 
                                }} 
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
