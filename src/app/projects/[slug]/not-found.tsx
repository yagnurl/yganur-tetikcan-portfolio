import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      backgroundColor: '#fdfdfd', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'var(--font-primary)',
      color: '#1a1a1a'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '500px', padding: '40px' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-hero)', 
          fontSize: '6rem', 
          marginBottom: '24px',
          color: '#ddd'
        }}>
          404
        </h1>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '16px',
          fontWeight: 500
        }}>
          Project Not Found
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#666',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          The project you're looking for doesn't exist or hasn't been published yet.
        </p>
        <Link 
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            borderRadius: '30px',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 500,
            transition: 'background-color 0.2s'
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
