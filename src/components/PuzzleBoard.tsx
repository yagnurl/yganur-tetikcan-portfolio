import React, { useState } from 'react';
import PuzzlePiece from './PuzzlePiece';
import { puzzleData, PuzzlePieceData } from '@/data/cardData';
import styles from './PuzzleBoard.module.css';
import { motion, Reorder } from 'framer-motion'; 

// Using a simpler swapping logic for Bento is tricky because of variable sizes.
// Framer Motion's Reorder is great for 1D lists, but this is a 2D grid with spans.
// We'll stick to basic index-based swapping for now.

export default function PuzzleBoard() {
  const [items, setItems] = useState<PuzzlePieceData[]>(puzzleData);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const boardRef = React.useRef<HTMLDivElement>(null);

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
          const colSpan = isWide ? 'span 2' : 'span 1';
          const rowSpan = isTall ? 'span 2' : 'span 1';
          const isDragged = draggedId === item.id;

          return (
            <motion.div 
               key={item.id} 
               layoutId={item.id}
               className={styles.cell}
               
               // Data attributes for drag detection passed via spread props
               data-item-id={item.id}
               
               style={{
                  gridColumn: colSpan,
                  gridRow: rowSpan,
                  zIndex: isDragged ? 100 : 1,
                  height: '100%',
                  width: '100%'
               }}
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
               whileHover={{
                 scale: 1, 
                 zIndex: 10
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
