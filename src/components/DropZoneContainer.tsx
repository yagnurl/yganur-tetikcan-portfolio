'use client';

import React from 'react';
import DropZone from './DropZone';
import { CategoryId } from '@/data/categories';
import styles from './DropZoneContainer.module.css';

interface DropZoneContainerProps {
  activeFilter: CategoryId | null;
  dragOverZone: CategoryId | null;
  cardCounts: Record<CategoryId, number>;
  onZoneClick: (category: CategoryId) => void;
}

export default function DropZoneContainer({
  activeFilter,
  dragOverZone,
  cardCounts,
  onZoneClick
}: DropZoneContainerProps) {
  const categories: CategoryId[] = ['frontend', 'design', 'experiment'];

  return (
    <div className={styles.container}>
      {/* "All" Filter */}
      <DropZone
        category="frontend" // Using frontend as dummy type just for color handling
        label="All"
        isActive={activeFilter === null}
        isDragOver={false}
        cardCount={0}
        onClick={() => onZoneClick(null as any)}
      />
      
      {categories.map((category) => (
        <DropZone
          key={category}
          category={category}
          label={category.charAt(0).toUpperCase() + category.slice(1)}
          isActive={activeFilter === category}
          isDragOver={dragOverZone === category}
          cardCount={cardCounts[category]}
          onClick={() => onZoneClick(category)}
        />
      ))}
    </div>
  );
}
