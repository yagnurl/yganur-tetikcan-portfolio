'use client';

import React from 'react';
import styles from './LockdownButton.module.css';

interface LockdownButtonProps {
  isLocked: boolean;
  onToggle: () => void;
}

export default function LockdownButton({ isLocked, onToggle }: LockdownButtonProps) {
  return (
    <button 
      className={`${styles.button} ${isLocked ? styles.locked : ''}`}
      onClick={onToggle}
    >
      <span className={styles.icon}>
        {isLocked ? '🔒' : '🔓'}
      </span>
      <span className={styles.label}>
        {isLocked ? 'Unlock Layout' : 'Lock Layout'}
      </span>
    </button>
  );
}
