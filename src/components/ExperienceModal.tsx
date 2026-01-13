'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ExperienceModal.module.css';

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  year: string;
  project: string;
  tech: string[];
  color?: string;
}

const experiences: Experience[] = [
  {
    id: 'axa',
    company: 'AXA Sigorta',
    role: 'Frontend Developer',
    period: 'June 2025 - Present',
    year: '2025',
    project: 'Health Claim Project',
    tech: ['Vue.js', 'Sass', 'Pinia'],
    color: '#003399'
  },
  {
    id: 'brew',
    company: 'Brew Interactive',
    role: 'Frontend Developer',
    period: 'Jan 2022 - June 2025',
    year: '2022',
    project: 'Skoda Turkey Website',
    tech: ['Next.js', 'Styled Comp', 'Altın Örümcek Award'],
    color: '#1a1a1a'
  }
];

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExperienceModal({ isOpen, onClose }: ExperienceModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          layoutId="case-craft" // Same as card ID for growth effect
          initial={{ borderRadius: '16px' }}
          animate={{ borderRadius: 0 }}
          exit={{ opacity: 1, transition: { duration: 0 } }}
          className={styles.modalOverlay}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 120,
            mass: 1
          }}
        >
          {/* Close Button */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClose}
            className={styles.closeButton}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </motion.div>

          <div className={styles.timelineContainer}>
            <div className={styles.timelineLine} />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={styles.experienceItem}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className={styles.experienceYear}>{exp.year}</div>
                
                <div className={styles.experienceContent}>
                  <h3 className={styles.companyName}>{exp.company}</h3>
                  <p className={styles.role}>{exp.role}</p>
                  <span className={styles.dateRange}>{exp.period}</span>
                  
                  <div className={styles.projectSection}>
                    <span className={styles.projectTitle}>Selected Project</span>
                    <p className={styles.projectName}>{exp.project}</p>
                  </div>

                  <div className={styles.techStack}>
                    {exp.tech.map(t => (
                      <span key={t} className={styles.techChip}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Time Travel Visual Hint */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.timeTravelBg}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              zIndex: -1,
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.03) 100%)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
