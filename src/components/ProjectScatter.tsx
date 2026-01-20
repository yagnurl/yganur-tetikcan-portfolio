import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import styles from './PuzzleBoard.module.css'; // Reuse existing grid styles
import PuzzlePiece from './PuzzlePiece';
import { PuzzlePieceData } from '@/data/cardData';

interface ProjectScatterProps {
  isOpen: boolean;
  onClose: () => void;
}

// 8 Items: 4 Wide (2x1), 4 Small (1x1)
// Total Grid Units: (2*4) + (1*4) = 8 + 4 = 12 units? 
// Wait, a 4-column grid. 
// Row 1: Wide, Wide (4 units)
// Row 2: Wide, Wide (4 units)
// Row 3: Small, Small, Small, Small (4 units)
// Total 12 units coverage. Perfect.

const worksData: PuzzlePieceData[] = [
  // Row 1
  {
    id: 'work-1',
    title: 'Dinee App',
    description: 'Food delivery reimagined.',
    category: 'design',
    color: 'cream',
    type: 'project-item', // Use project-item type for image support
    size: 'wide',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    slug: 'dinee-app',
    hoverImages: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=400&auto=format&fit=crop'
    ]
  },
  {
    id: 'work-2',
    title: 'Finance Dash',
    description: 'Crypto dashboard UI kit.',
    category: 'frontend',
    color: 'lavender',
    type: 'project-item',
    size: 'wide',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    slug: 'finance-dash',
    hoverImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop'
    ]
  },
  // Row 2
  {
    id: 'work-3',
    title: 'E-Commerce',
    description: 'Shopify headless theme.',
    category: 'frontend',
    color: 'mint',
    type: 'project-item',
    size: 'wide',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    slug: 'ecommerce'
  },
  {
    id: 'work-4',
    title: 'Portfolio v1',
    description: 'Previous iteration.',
    category: 'design',
    color: 'pink',
    type: 'project-item',
    size: 'wide',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    slug: 'portfolio-v1'
  },
  // Row 3 (Smalls)
  {
    id: 'work-5',
    title: 'Health',
    category: 'design',
    color: 'blue',
    type: 'project-item',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=400&auto=format&fit=crop',
    slug: 'health-tracker'
  },
  {
    id: 'work-6',
    title: 'UX Case',
    category: 'experiment',
    color: 'cream',
    type: 'project-item',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop',
    slug: 'ux-case'
  },
  {
    id: 'work-7',
    title: 'Branding',
    category: 'design',
    color: 'cream', 
    type: 'project-item',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=400&auto=format&fit=crop',
    slug: 'branding'
  },
  {
    id: 'work-8',
    title: 'Mobile',
    category: 'frontend',
    color: 'lavender',
    type: 'project-item',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa0db99b2?q=80&w=400&auto=format&fit=crop',
    slug: 'mobile-app'
  }
];

export default function ProjectScatter({ isOpen, onClose }: ProjectScatterProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
            layoutId="projects-link"
            initial={{ opacity: 0, borderRadius: '16px' }}
            animate={{ opacity: 1, borderRadius: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className={styles.modalOverlay}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: 'rgba(245, 243, 240, 0.98)',
                zIndex: 10000,
                overflowY: 'auto',
                padding: '40px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                backdropFilter: 'blur(20px)'
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200,
              mass: 0.8,
              opacity: { duration: 0.3 }
            }}
        >
            {/* Close Button */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               onClick={onClose}
               style={{ 
                 position: 'fixed', 
                 top: '32px', 
                 right: '32px', 
                 zIndex: 10001, 
                 cursor: 'pointer', 
                 width: '48px',
                 height: '48px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 borderRadius: '50%',
                 backgroundColor: '#ffffff',
                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
               }}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.div>

            <div style={{ 
                width: '100%', 
                maxWidth: '1200px', 
                marginTop: '60px' // Space for close button
            }}>
               

                <div className={styles.grid}>
                    {worksData.map((item, index) => {
                         const colSpan = item.size === 'wide' ? 'span 2' : 'span 1';
                         const rowSpan = item.size === 'tall' ? 'span 2' : 'span 1';

                         return (
                             <motion.div
                                 key={item.id}
                                 className={styles.cell}
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ 
                                   delay: 0.2 + (index * 0.04),
                                   duration: 0.4,
                                   ease: "easeOut"
                                 }}
                                 style={{
                                    gridColumn: colSpan,
                                    gridRow: rowSpan,
                                    width: '100%',
                                    height: '100%'
                                 }}
                             >
                                 <div style={{ width: '100%', height: '100%', cursor: 'pointer', overflow: 'visible' }} onClick={() => router.push(`/projects/${item.slug || ''}`)}>
                                     <PuzzlePiece 
                                        data={item} 
                                        size={100} 
                                        index={index} 
                                     />
                                 </div>
                             </motion.div>
                         );
                    })}
                </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
