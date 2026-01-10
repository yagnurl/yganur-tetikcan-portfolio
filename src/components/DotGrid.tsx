'use client';

import React, { useEffect, useRef } from 'react';

interface DotGridProps {
  color?: string;
  cellSize?: number;
  radius?: number;
}

export default function DotGrid({ 
  color = '#cbd5e1', 
  cellSize = 30, 
  radius = 2 
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw static dots once
    const draw = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      
      const width = rect.width;
      const height = rect.height;
      
      // Handle High DPI
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const cols = Math.floor(width / cellSize) + 1;
      const rows = Math.floor(height / cellSize) + 1;
      
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellSize + (cellSize / 2);
          const y = j * cellSize + (cellSize / 2);
          
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    draw();
    window.addEventListener('resize', draw);
    
    return () => {
      window.removeEventListener('resize', draw);
    };
  }, [color, cellSize, radius]);

  return (
    <div 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        overflow: 'hidden',
        zIndex: 0
      }} 
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block'
        }} 
      />
    </div>
  );
}
