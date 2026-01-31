'use client';

import React, { useState } from 'react';

import LockdownButton from './LockdownButton';
import PuzzleBoard from './PuzzleBoard';
import { PuzzlePieceData } from '@/data/cardData';
import styles from './Portfolio.module.css';

interface PortfolioProps {
  initialData: PuzzlePieceData[];
}

export default function Portfolio({ initialData }: PortfolioProps) {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className={styles.portfolio}>
      
      <PuzzleBoard initialData={initialData} />
    </div>
  );
}
