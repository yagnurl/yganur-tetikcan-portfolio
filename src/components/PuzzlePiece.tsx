import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { PuzzlePieceData } from '@/data/cardData';
import styles from './PuzzlePiece.module.css';
import DotGrid from './DotGrid';

// Dynamically import MapCard to avoid SSR issues with Mapbox
const MapCard = dynamic(() => import('./MapCard'), { 
  ssr: false,
  loading: () => (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#e5e7eb',
      borderRadius: '16px'
    }}>
      <span style={{ fontSize: '0.8rem', color: '#666' }}>Loading map...</span>
    </div>
  )
});

interface PuzzlePieceProps {
  data: PuzzlePieceData;
  size: number;
  index: number;
}

// Mapbox Access Token
const MAPBOX_TOKEN = 'pk.eyJ1IjoieWFnbnVyIiwiYSI6ImNtazg5ano0dDE4NjczZHF4cjFlaWVlM2QifQ.SD3HhTe9iw9cAv-bDo43yA';

export default function PuzzlePiece({
  data,
  size,
  index
}: PuzzlePieceProps) {
  const colors = {
    cream: '#ffffff',
    blue: '#f0f9ff',      
    pink: '#fff1f2',      
    mint: '#ecfdf5',      
    lavender: '#faf5ff',  
    empty: 'transparent'
  };

  const isSpotify = data.type === 'spotify';
  const isInstagram = data.type === 'instagram';
  const isHero = data.id === 'hero';
  const isEphesus = data.type === 'ephesus';

  let bgColor = '#ffffff'; 
  if (isSpotify) bgColor = colors[data.color] || '#ffffff';

  let borderStyle = '1px solid rgba(0,0,0,0.08)';
  if (isSpotify || isInstagram || isEphesus) borderStyle = 'none';

  const textColor = 'inherit';
  const fontFamily = isHero ? '"Proxima Nova", sans-serif' : 'inherit';
  const fontWeight = isHero ? 400 : 'inherit';

  const contentStyle = isHero ? { 
    justifyContent: 'flex-end', 
    alignItems: 'flex-start',
    textAlign: 'left' as const,
    paddingBottom: '24px',
    paddingLeft: '24px'
  } : (data.type === 'project-link' || data.type === 'contact' || isEphesus) ? {
    padding: 0
  } : {};

  return (
    <div 
      className={styles.container}
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative',
        color: textColor,
        fontFamily: fontFamily,
        fontWeight: fontWeight
      }}
    >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '16px', 
            backgroundColor: bgColor,
            border: borderStyle,
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1 
          }}
        >
            {(isSpotify || isInstagram) && (
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
            )}

            <div className={styles.content} style={contentStyle}>
                  {data.type === 'spotify' && data.spotifyData ? (
                    <div className={styles.spotifyContainer}>
                      <div className={styles.spotifyIcon}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                           <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                        </svg>
                      </div>
                      
                      <div>
                        <div className={styles.spotifyStatus}>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '12px', marginRight: '6px' }}>
                              <motion.div
                                animate={{ height: ['30%', '100%', '50%', '30%'] }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                style={{ width: '3px', backgroundColor: 'currentColor', borderRadius: '1px' }}
                              />
                              <motion.div
                                animate={{ height: ['50%', '100%', '30%', '80%', '50%'] }}
                                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }} 
                                style={{ width: '3px', backgroundColor: 'currentColor', borderRadius: '1px' }}
                              />
                              <motion.div
                                animate={{ height: ['20%', '80%', '40%', '90%', '20%'] }}
                                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                                style={{ width: '3px', backgroundColor: 'currentColor', borderRadius: '1px' }}
                              />
                            </div>
                            {data.spotifyData.status}
                        </div>
                        <div className={styles.spotifySong}>{data.spotifyData.song}</div>
                        <div className={styles.spotifyArtist}>{data.spotifyData.artist}</div>
                      </div>
                    </div>
                  ) : data.type === 'instagram' && data.instagramData ? (
                    <div 
                      className={styles.instagramContainer}
                      onClick={() => window.open(data.instagramData!.link, '_blank')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={styles.instagramIcon}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </div>
                      <div className={styles.instagramHandle}>
                         {data.instagramData.handle}
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                         </svg>
                      </div>
                    </div>
                  ) : data.type === 'vsco' && data.vscoData ? (
                    <div 
                      className={styles.vscoContainer}
                      onClick={() => window.open(data.vscoData!.link, '_blank')}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Arrow top right */}
                      <div className={styles.vscoArrow}>
                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                         </svg>
                      </div>
                      
                      {/* VSCO text bottom left - split into two lines */}
                      <div className={styles.vscoText}>
                        <span>VS</span>
                        <span>CO</span>
                      </div>
                    </div>
                  ) : isEphesus ? (
                     <MapCard accessToken={MAPBOX_TOKEN} />
                  ) : data.type === 'project-link' ? (
                     <div className={styles.projectLinkContainer}>
                         {/* Arrow in top right */}
                         <div className={styles.projectArrowContainer}>
                            <svg className={styles.projectArrow} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                               <line x1="7" y1="17" x2="17" y2="7"></line>
                               <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                         </div>
                         
                         {/* Large WORKS text at bottom left */}
                         <div className={styles.worksTitle}>
                           WORKS
                         </div>
                      </div>
                  ) : data.type === 'contact' ? (
                    <div 
                      className={styles.contactContainer}
                      onMouseMove={(e) => {
                        const bg = e.currentTarget.querySelector(`.${styles.contactBg}`) as HTMLElement;
                        if (!bg) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = ((y - centerY) / centerY) * -20;
                        const rotateY = ((x - centerX) / centerX) * 20;
                        bg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
                      }}
                      onMouseLeave={(e) => {
                        const bg = e.currentTarget.querySelector(`.${styles.contactBg}`) as HTMLElement;
                        if (bg) bg.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                      }}
                    >
                      <div className={styles.contactBg} style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        transition: 'transform 0.1s ease-out',
                        willChange: 'transform'
                      }}>
                        <DotGrid color="#c0c0c0" cellSize={32} radius={1} />
                      </div>
                      <div className={styles.contactHeader}>
                        <div className={styles.wavingHand}>👋</div>
                        <h3 className={styles.contactTitle}>{data.title}</h3>
                      </div>
                      
                      <div className={styles.contactBody}>
                        <p className={styles.contactDesc}>{data.description}</p>
                        
                        <div className={styles.contactLinksRow}>
                          <a 
                            href="mailto:yagnur7@gmail.com"
                            className={styles.contactCheckLinks}
                          >
                            Email Me
                          </a>
                          <span className={styles.contactDivider}>|</span>
                          <a 
                            href="https://www.linkedin.com/in/yagnurtetikcan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contactCheckLinks}
                          >
                            LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : isHero ? (
                    <>
                      <div style={{ 
                        position: 'absolute', 
                        top: '24px', 
                        left: '24px', 
                        fontSize: '3.5rem', 
                        fontWeight: 800, 
                        fontFamily: 'var(--font-hero)',
                        color: '#1a1a1a',
                        lineHeight: 1
                      }}>
                        Hello.
                      </div>
                      <div style={{ padding: '0' }}> 
                        <p style={{ margin: 0, fontSize: '1.2rem', lineHeight: '1.4' }}>
                          {data.title && data.title.includes('Yağnur') ? (
                            <>
                              {data.title.split('Yağnur')[0]}
                              Yağ<span className={styles.sketchyUnderline}>n</span>ur
                              {data.title.split('Yağnur')[1]}
                            </>
                          ) : (
                            data.title
                          )}
                        </p>
                      </div>
                    </>
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
