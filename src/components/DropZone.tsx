'use client';

import React from 'react';
import { CATEGORIES, CategoryId } from '@/data/categories';
import styles from './DropZone.module.css';

interface DropZoneProps {
  category: CategoryId;
  label?: string;
  isActive: boolean;
  isDragOver: boolean;
  cardCount: number;
  onClick: () => void;
}

export default function DropZone({ 
  category, 
  label,
  isActive, 
  isDragOver,
  cardCount,
  onClick 
}: DropZoneProps) {
  const categoryData = CATEGORIES[category];
  const displayLabel = label || categoryData.label;
  
  const zoneClasses = [
    styles.dropZone,
    isDragOver && styles.dragOver,
    isActive && styles.active
  ].filter(Boolean).join(' ');

  return (
    <div
      className={zoneClasses}
      onClick={onClick}
      data-category={category}
      style={{
        '--category-color': categoryData.color,
        '--category-rgb': categoryData.colorRgb
      } as React.CSSProperties}
    >
      <span className={styles.label}>{displayLabel}</span>
      {isActive && cardCount > 0 && (
        <span className={styles.count}>{cardCount}</span>
      )}
    </div>
  );
}
