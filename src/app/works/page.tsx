'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/components/PuzzleBoard.module.css';
import PuzzlePiece from '@/components/PuzzlePiece';
import { PuzzlePieceData } from '@/data/cardData';

const worksData: PuzzlePieceData[] = [
  {
    id: 'work-1',
    title: 'Dinee App',
    description: 'Food delivery reimagined.',
    category: 'design',
    color: 'cream',
    type: 'project-item',
    size: 'wide',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    slug: 'dinee-app',
  },
  {
    id: 'work-2',
    title: 'Finance Dash',
    description: 'Crypto dashboard UI kit.',
    category: 'frontend',
    color: 'lavender',
    type: 'project-item',
    size: 'wide',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    slug: 'finance-dash',
  },
  {
    id: 'work-3',
    title: 'E-Commerce',
    description: 'Shopify headless theme.',
    category: 'frontend',
    color: 'mint',
    type: 'project-item',
    size: 'wide',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    slug: 'ecommerce'
  },
  {
    id: 'work-4',
    title: 'Portfolio v1',
    description: 'Previous iteration.',
    category: 'design',
    color: 'pink',
    type: 'project-item',
    size: 'wide',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    slug: 'portfolio-v1'
  },
  {
    id: 'work-5',
    title: 'Health',
    category: 'design',
    color: 'blue',
    type: 'project-item',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=400&auto=format&fit=crop',
    slug: 'health-tracker'
  },
  {
    id: 'work-6',
    title: 'UX Case',
    category: 'experiment',
    color: 'cream',
    type: 'project-item',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop',
    slug: 'ux-case'
  },
  {
    id: 'work-7',
    title: 'Branding',
    category: 'design',
    color: 'cream',
    type: 'project-item',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=400&auto=format&fit=crop',
    slug: 'branding'
  },
  {
    id: 'work-8',
    title: 'Mobile',
    category: 'frontend',
    color: 'lavender',
    type: 'project-item',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa0db99b2?q=80&w=400&auto=format&fit=crop',
    slug: 'mobile-app'
  }
];

export default function WorksPage() {
  const router = useRouter();

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--page-bg, #f5f3f0)',
      padding: '40px 20px'
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

      <div style={{ 
        width: '100%', 
        maxWidth: '1200px', 
        margin: '0 auto',
        paddingTop: '60px'
      }}>
        <div className={styles.grid}>
          {worksData.map((item, index) => {
            const colSpan = item.size === 'wide' ? 'span 2' : 'span 1';
            const rowSpan = item.size === 'tall' ? 'span 2' : 'span 1';

            return (
              <div
                key={item.id}
                className={styles.cell}
                style={{
                  gridColumn: colSpan,
                  gridRow: rowSpan,
                  width: '100%',
                  height: '100%'
                }}
              >
                <div 
                  style={{ width: '100%', height: '100%', cursor: 'pointer' }} 
                  onClick={() => router.push(`/projects/${item.slug || ''}`)}
                >
                  <PuzzlePiece 
                    data={item} 
                    size={100} 
                    index={index} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
