'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from '@/components/PuzzleBoard.module.css';
import PuzzlePiece from '@/components/PuzzlePiece';
import { PuzzlePieceData } from '@/data/cardData';

interface WorksClientProps {
  worksData: PuzzlePieceData[];
}

export default function WorksClient({ worksData }: WorksClientProps) {
  const router = useRouter();

  return (
    <div className={styles.boardContainer} style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f3f0',
      paddingTop: '80px'
    }}>
      {/* Back Button */}
      <div 
        onClick={() => router.push('/')}
        style={{ 
          position: 'fixed', 
          top: 32, 
          left: 32, 
          zIndex: 100, 
          cursor: 'pointer',
          width: 48,
          height: 48,
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </div>

      <div className={styles.grid}>
        {worksData.map((item, index) => {
          const colSpan = item.size === 'wide' ? 'span 2' : 'span 1';
          const rowSpan = item.size === 'tall' ? 'span 2' : 'span 1';

          return (
            <motion.div
              key={item.id}
              className={styles.cell}
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
                width: '100%',
                height: '100%',
                cursor: 'pointer'
              }}
              onClick={() => router.push(`/projects/${item.slug || ''}`)}
              whileHover={{
                scale: 1.02,
                zIndex: 10
              }}
              whileTap={{
                scale: 0.98
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

