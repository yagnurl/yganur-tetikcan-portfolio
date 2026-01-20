'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function ExperiencePage() {
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
        maxWidth: '800px', 
        margin: '0 auto',
        paddingTop: '100px'
      }}>
        <h1 style={{ 
          fontFamily: 'var(--font-hero)', 
          fontSize: '3rem', 
          marginBottom: '2rem',
          letterSpacing: '-0.02em'
        }}>
          Experience
        </h1>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2rem' 
        }}>
          {/* Experience Item 1 */}
          <div style={{ 
            padding: '2rem', 
            backgroundColor: '#fff', 
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '0.5rem',
              fontWeight: 600
            }}>
              Senior Frontend Developer
            </h3>
            <p style={{ 
              color: '#666', 
              marginBottom: '1rem',
              fontSize: '0.95rem'
            }}>
              Company Name • 2022 - Present
            </p>
            <p style={{ 
              lineHeight: '1.6',
              color: '#444'
            }}>
              Leading frontend development for modern web applications using Next.js, React, and TypeScript.
            </p>
          </div>

          {/* Experience Item 2 */}
          <div style={{ 
            padding: '2rem', 
            backgroundColor: '#fff', 
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '0.5rem',
              fontWeight: 600
            }}>
              Frontend Developer
            </h3>
            <p style={{ 
              color: '#666', 
              marginBottom: '1rem',
              fontSize: '0.95rem'
            }}>
              Previous Company • 2020 - 2022
            </p>
            <p style={{ 
              lineHeight: '1.6',
              color: '#444'
            }}>
              Developed responsive web applications and collaborated with design teams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
