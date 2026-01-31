import { PanInfo, motion } from 'framer-motion';
import React, { useState } from 'react';

import PuzzlePiece from './PuzzlePiece';
import { PuzzlePieceData } from '@/data/cardData';
import styles from './PuzzleBoard.module.css';
import { useRouter } from 'next/navigation';

interface PuzzleBoardProps {
  initialData: PuzzlePieceData[];
}

export default function PuzzleBoard({ initialData }: PuzzleBoardProps) {
  const [items, setItems] = useState<PuzzlePieceData[]>(initialData);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Sync state with prop data when it changes
  React.useEffect(() => {
    setItems(initialData);
  }, [initialData]);
  
  // Router for navigation
  const router = useRouter();
  const boardRef = React.useRef<HTMLDivElement>(null);

  const handleCardClick = (id: string) => {
    if (id === 'projects-link') {
      router.push('/works');
    } else if (id === 'case-craft') {
      router.push('/experience');
    }
  };

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
      <div className={styles.grid} ref={boardRef}>
        {items.map((item, index) => {
          const isWide = item.size === 'wide';
          const isTall = item.size === 'tall';
          const isDragged = draggedId === item.id;

          // Responsive grid spans
          // On mobile (single column), all cards span 1 column
          // On tablet (2 columns), wide cards span 2, others span 1
          // On desktop (3-4 columns), wide cards span 2, tall cards span 2 rows, others span 1
          const colSpan = isWide ? 'span 2' : 'span 1';
          const rowSpan = isTall ? 'span 2' : 'span 1';

          return (
            <motion.div 
               key={item.id} 
               layoutId={item.id}
               className={styles.cell}
               
               // Data attributes for drag detection passed via spread props
               data-item-id={item.id}
               onClick={() => handleCardClick(item.id)} // Add click handler
               
               style={{
                  gridColumn: colSpan,
                  gridRow: rowSpan,
                  zIndex: isDragged ? 100 : 1,
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer'
               }}
               initial={false}
               drag
               dragConstraints={boardRef}
               dragSnapToOrigin
               dragElastic={0}
               dragMomentum={false}
               dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
               onDragStart={() => handleDragStart(item.id)}
               onDrag={(e: any, info: any) => handleDrag(e, info, item)}
               onDragEnd={handleDragEnd}
               whileDrag={{ 
                 scale: 1.05,
                 zIndex: 1000,
                 cursor: "grabbing"
               }}
               whileTap={{ 
                 scale: 0.98,
                 zIndex: 1000
               }}
               whileHover={{
                 scale: 1, 
                 zIndex: 10
               }}
               transition={{
                 type: 'spring',
                 damping: 20,
                 stiffness: 120,
                 mass: 1
               }}
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
