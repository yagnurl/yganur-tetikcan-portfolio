'use client';

import React, { useState } from 'react';
import PuzzleBoard from './PuzzleBoard';
import LockdownButton from './LockdownButton';
import styles from './Portfolio.module.css';

export default function Portfolio() {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className={styles.portfolio}>
      <LockdownButton 
        isLocked={isLocked} 
        onToggle={() => setIsLocked(!isLocked)} 
      />
      <PuzzleBoard />
    </div>
  );
}
