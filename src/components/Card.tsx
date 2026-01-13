import React from 'react';
import { CardSize, CardCategory, CardColor } from '@/data/cardData';
import { CATEGORIES } from '@/data/categories';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  size: CardSize;
  category: CardCategory;
  color?: CardColor;
  image?: string;
  showArrow?: boolean;
  isHovering?: boolean;
  isDragging?: boolean;
}

export default function Card({ 
  title, 
  subtitle, 
  description, 
  size,
  category,
  color,
  image,
  showArrow,
  isHovering = false,
  isDragging = false
}: CardProps) {
  const cardClasses = [
    styles.card,
    styles[size],
    isHovering && styles.hovering,
    isDragging && styles.dragging,
    category && styles.categorized,
    (showArrow || image) && styles.clickable,
    image && styles.hasImage
  ].filter(Boolean).join(' ');

  const categoryColor = category ? CATEGORIES[category].color : undefined;

  return (
    <div 
      className={cardClasses}
      data-color={color}
      style={{
        '--category-color': categoryColor
      } as React.CSSProperties}
    >
      {image && (
        <>
          <img src={image} alt={title} className={styles.cardImage} />
          <div className={styles.imageOverlay} />
        </>
      )}
      
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {description && <p className={styles.description}>{description}</p>}
      
      {category && (
        <div className={styles.categoryBadge}>
          {CATEGORIES[category].label}
        </div>
      )}

      {showArrow && (
        <svg 
          className={styles.arrowIcon} 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      )}
    </div>
  );
}
