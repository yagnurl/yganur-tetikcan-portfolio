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
  isHovering = false,
  isDragging = false
}: CardProps) {
  const cardClasses = [
    styles.card,
    styles[size],
    isHovering && styles.hovering,
    isDragging && styles.dragging,
    category && styles.categorized
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
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {description && <p className={styles.description}>{description}</p>}
      {category && (
        <div className={styles.categoryBadge}>
          {CATEGORIES[category].label}
        </div>
      )}
    </div>
  );
}
