'use client';

import React, { useState } from 'react';
import PuzzleBoard from './PuzzleBoard';
import LockdownButton from './LockdownButton';
import styles from './Portfolio.module.css';
import { PuzzlePieceData } from '@/data/cardData';

interface PortfolioProps {
  initialData: PuzzlePieceData[];
}

export default function Portfolio({ initialData }: PortfolioProps) {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className={styles.portfolio}>
      <LockdownButton 
        isLocked={isLocked} 
        onToggle={() => setIsLocked(!isLocked)} 
      />
      <PuzzleBoard initialData={initialData} />
    </div>
  );
}
