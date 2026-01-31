'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, PanInfo } from 'framer-motion';
import styles from '@/components/PuzzleBoard.module.css';
import PuzzlePiece from '@/components/PuzzlePiece';
import { PuzzlePieceData } from '@/data/cardData';

interface WorksClientProps {
  worksData: PuzzlePieceData[];
}

export default function WorksClient({ worksData }: WorksClientProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [items, setItems] = useState<PuzzlePieceData[]>(worksData);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItems(worksData);
  }, [worksData]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
                            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDrag = (event: any, info: any, currentItem: PuzzlePieceData) => {
    // Live Reordering Logic
    const point = info.point;
    
    // 1. Direct Hit Check
    const elements = document.elementsFromPoint(point.x, point.y);
    const itemTarget = elements.find(el => {
       const cell = el.closest('[data-item-id]');
       if (cell) {
         const id = cell.getAttribute('data-item-id');
         return id !== currentItem.id;
       }
       return false;
    });

    let targetIndex = -1;

    if (itemTarget) {
      const targetElement = itemTarget.closest('[data-item-id]');
      const id = targetElement?.getAttribute('data-item-id');
      targetIndex = items.findIndex(i => i.id === id);
    } else {
       // 2. Proximity Fallback
       const allCells = Array.from(document.querySelectorAll('[data-item-id]'));
       let closestIndex = -1;
       let minDistance = Infinity;

       allCells.forEach(cell => {
          const rect = cell.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dist = Math.hypot(point.x - centerX, point.y - centerY);
          
          if (dist < minDistance) {
            minDistance = dist;
            closestIndex = items.findIndex(i => i.id === cell.getAttribute('data-item-id'));
          }
       });

       if (minDistance < 150) { 
          targetIndex = closestIndex;
       }
    }

    if (targetIndex !== -1) {
       const currentIndex = items.findIndex(i => i.id === currentItem.id);
       if (targetIndex !== currentIndex && currentIndex !== -1) {
          // Perform Swap/Move
          const newItems = [...items];
          const [movedItem] = newItems.splice(currentIndex, 1);
          newItems.splice(targetIndex, 0, movedItem);
          setItems(newItems);
       }
    }
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  return (
    <div className={styles.boardContainer}>
      {/* Back Button */}
      <div 
        onClick={() => router.push('/')}
        className={styles.backButton}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </div>

      <div className={styles.grid} ref={boardRef}>
        {items.map((item, index) => {
          const isWide = item.size === 'wide';
          const isTall = item.size === 'tall';
          const colSpan = isWide ? 'span 2' : 'span 1';
          const rowSpan = isTall ? 'span 2' : 'span 1';
          const isDragged = draggedId === item.id;

          return (
            <motion.div
              key={item.id}
              layoutId={item.id}
              className={styles.cell}
              data-item-id={item.id}
              data-is-soon={item.isSoon ? 'true' : 'false'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.04,
                duration: 0.4,
                ease: "easeOut"
              }}
              style={{
                gridColumn: colSpan,
                gridRow: rowSpan,
                zIndex: isDragged ? 100 : 1,
                width: '100%',
                height: '100%',
                cursor: item.isSoon ? 'default' : 'pointer',
                pointerEvents: item.isSoon ? 'none' : 'auto',
                touchAction: isMobile ? 'pan-y' : 'auto'
              } as React.CSSProperties}
              onClick={() => {
                // Don't navigate if project is coming soon
                if (item.isSoon) {
                  return;
                }
                if (item.hasDetailPage !== false && item.slug) {
                  router.push(`/projects/${item.slug}`);
                } else if (item.externalLink) {
                  window.open(item.externalLink, '_blank', 'noopener,noreferrer');
                }
              }}
              {...(isMobile ? {} : {
                drag: true,
                dragConstraints: boardRef,
                dragSnapToOrigin: true,
                dragElastic: 0,
                dragMomentum: false,
                dragTransition: { bounceStiffness: 600, bounceDamping: 20 },
                onDragStart: () => handleDragStart(item.id),
                onDrag: (e: any, info: any) => handleDrag(e, info, item),
                onDragEnd: handleDragEnd,
                whileDrag: { 
                  scale: 1.05,
                  zIndex: 1000,
                  cursor: "grabbing"
                },
                whileHover: {
                  scale: 1.02,
                  zIndex: 10
                },
                whileTap: {
                  scale: 0.98,
                  zIndex: 1000
                }
              })}
            >
              <PuzzlePiece 
                data={item} 
                size={100} 
                index={index} 
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

