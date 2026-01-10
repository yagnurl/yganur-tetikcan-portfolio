'use client';

import React, { useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Card from './Card';
import { CardData, CardCategory } from '@/data/cardData';
import { CategoryId } from '@/data/categories';

interface DraggableCardProps {
  card: CardData;
  viewportWidth: number;
  viewportHeight: number;
  activeFilter: CategoryId | null;
  onDragOverZone: (zone: CategoryId | null) => void;
  onDropInZone: (cardId: string, category: CategoryId) => void;
  isLocked: boolean;
}

export default function DraggableCard({ 
  card, 
  viewportWidth, 
  viewportHeight,
  activeFilter,
  onDragOverZone,
  onDropInZone,
  isLocked
}: DraggableCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const x = useMotionValue(card.initialPosition.x);
  const y = useMotionValue(card.initialPosition.y);

  // Card dimensions matching CSS
  const getCardDimensions = () => {
    switch (card.size) {
      case 'large':
        return { width: 420, height: 280 };
      case 'medium':
        return { width: 280, height: 280 };
      case 'small':
        return { width: 200, height: 200 };
      default:
        return { width: 200, height: 200 };
    }
  };

  const { width, height } = getCardDimensions();
  
  const dragConstraints = {
    left: -card.initialPosition.x,
    right: viewportWidth - card.initialPosition.x - width,
    top: -card.initialPosition.y,
    bottom: viewportHeight - card.initialPosition.y - height
  };

  // Check if card should be visible based on filter
  const isVisible = !activeFilter || card.category === null || card.category === activeFilter;

  // Detect drop zone proximity
  const handleDrag = (_event: any, info: any) => {
    if (isLocked) return;
    
    const cardCenterX = card.initialPosition.x + info.offset.x + width / 2;
    // Drop zones are at top center now
    const dropZoneY = 80; 
    const dropZoneCenterX = viewportWidth / 2;
    
    // Check if near drop zones (top of screen)
    if (info.point.y < 150) {
      const offsetX = cardCenterX - dropZoneCenterX;
      // Simple logic: if near top center, highlight filter based on X
      // This logic needs to match the visual pill structure if we want meaningful drag-to-filter
      // For now, let's keep it simple or disable drag-to-filter if using top pills
      // But let's keep the existing logic adapted for top if desired.
      // Actually, standard drag-to-filter might be weird with top-pills.
      // Let's just highlight if dragged over, but maybe rely on clicks for pills.
      // I'll leave the zone detection but effectively it works best with bottom zones.
      // Since we moved to top pills, drag-to-filter is less intuitive. 
      // I will disable the zone highlighting for now to avoid confusion, or map it to top.
      onDragOverZone(null); 
    } else {
      onDragOverZone(null);
    }
  };

  const handleDragEnd = (_event: any, info: any) => {
    setIsDragging(false);
    onDragOverZone(null);
  };

  return (
    <motion.div
      drag={!isLocked}
      dragElastic={0.1}
      dragConstraints={dragConstraints}
      dragTransition={{
        power: 0.2,
        timeConstant: 200,
        modifyTarget: (target) => Math.round(target)
      }}
      initial={{ 
        x: card.initialPosition.x, 
        y: card.initialPosition.y,
        opacity: 0,
        scale: 0.9
      }}
      animate={{ 
        opacity: isVisible ? 1 : 0.3,
        scale: isVisible ? 1 : 0.95,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{
        opacity: { duration: 0.4, delay: 0.1 },
        scale: { 
          type: 'spring',
          damping: 20,
          stiffness: 200,
          delay: 0.1
        }
      }}
      whileHover={isVisible && !isLocked ? {
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      whileDrag={{
        scale: 1.05,
        transition: { duration: 0.15 }
      }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      onDragStart={() => setIsDragging(true)}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: isDragging ? 100 : 1,
        x,
        y
      }}
    >
      <Card
        title={card.title}
        subtitle={card.subtitle}
        description={card.description}
        size={card.size}
        category={card.category}
        color={card.color}
        isHovering={isHovering}
        isDragging={isDragging}
      />
    </motion.div>
  );
}
