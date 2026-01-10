import React from 'react';
import { motion } from 'framer-motion';
import { PuzzlePieceData } from '@/data/cardData';
import styles from './PuzzlePiece.module.css';

interface PuzzlePieceProps {
  data: PuzzlePieceData;
  size: number;
  index: number;
  // Drag handling is now done by parent wrapper
}

export default function PuzzlePiece({
  data,
  size,
  index
}: PuzzlePieceProps) {
  // Standard square is size x size.
  // ViewBox logic removed as we are using standard divs now.
  
  // Colors - Ultra Light Pastels
  const colors = {
    cream: '#ffffff',
    blue: '#f0f9ff',      // Very light sky blue
    pink: '#fff1f2',      // Very light rose
    mint: '#ecfdf5',      // Very light emerald
    lavender: '#faf5ff',  // Very light purple
    empty: 'transparent'
  };

  const bgColor = colors[data.color] || '#ffffff';

  return (
    <div 
      className={styles.container}
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative'
        // zIndex handled by parent
      }}
    >
        {/* Phantom Card (Disabled for debugging constraint issues) */}
        {/* <div
           style={{
             position: 'absolute',
             top: 0,
             left: 0,
             width: '100%',
             height: '100%',
             borderRadius: '16px', 
             backgroundColor: 'rgba(0,0,0,0.1)',
             zIndex: -1, 
             pointerEvents: 'none',
             transform: 'translate(-25px, -25px)' // Static offset? Or managed by parent?
             // Since parent handles drag, this static offset inside might look weird if not animating.
             // Actually, the "Phantom" effect is harder to implement if the wrapper is dragging.
             // Let's keep it simple: No phantom for now, or just a shadow on wrapper.
           }}
        /> */}

        {/* Main Card Body (The Visible Card) */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '16px', // Matched Radius
            backgroundColor: bgColor,
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1 // Visible on top of ghost
          }}
        >
            {/* Unified Background */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop")',
                backgroundSize: '150% 150%',
                backgroundPosition: 'center', 
                opacity: 0.1,
                pointerEvents: 'none'
              }} 
            />

            <div className={styles.content}>
                  {data.type === 'spotify' && data.spotifyData ? (
                    <div className={styles.spotifyContainer}>
                      <div className={styles.spotifyIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S16.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                      </div>
                      
                      <div>
                        <div className={styles.spotifyStatus}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 20V10" />
                              <path d="M6 20V6" />
                              <path d="M18 20V14" />
                            </svg>
                            {data.spotifyData.status}
                        </div>
                        <div className={styles.spotifySong}>{data.spotifyData.song}</div>
                        <div className={styles.spotifyArtist}>{data.spotifyData.artist}</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className={styles.title}>{data.title}</h3>
                      {data.description && <p className={styles.desc}>{data.description}</p>}
                    </>
                  )}
            </div>
        </div>
    </div>
  );
}
