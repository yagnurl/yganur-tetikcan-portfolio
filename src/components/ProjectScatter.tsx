import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ProjectScatterProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample projects data (can be moved to a separate data file later)
const projects = [
  { id: '1', title: 'Dinee App', category: 'Mobile App', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop', x: 20, y: 30, rotate: -5 },
  { id: '2', title: 'Finance Dash', category: 'Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop', x: 60, y: 20, rotate: 3 },
  { id: '3', title: 'E-Commerce', category: 'Web Design', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop', x: 30, y: 60, rotate: 6 },
  { id: '4', title: 'Portfolio v1', category: 'Personal', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop', x: 70, y: 70, rotate: -4 },
  { id: '5', title: 'Health Tracker', category: 'Mobile App', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=400&auto=format&fit=crop', x: 45, y: 45, rotate: 2 },
];

export default function ProjectScatter({ isOpen, onClose }: ProjectScatterProps) {
  const router = useRouter();

  // Added 6th dummy project to meet request
  const gridProjects = [
    ...projects,
    { id: '6', title: 'UX Research', category: 'Case Study', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop', x: 0, y: 0, rotate: 0 }
  ];

  const handleProjectClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); 
    router.push(`/projects/${id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            // Changed to a soft gray to make the white glass cards pop
            backgroundColor: '#f2f2f7', 
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            overflowY: 'auto'
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Close Button */}
            <div 
               onClick={onClose}
               style={{ 
                 position: 'absolute', 
                 top: 0, 
                 right: 0, 
                 zIndex: 100, 
                 cursor: 'pointer', 
                 color: '#1a1a1a',
                 width: '40px',
                 height: '40px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 borderRadius: '50%',
                 backgroundColor: '#ffffff', // White button on gray bg
                 boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
               }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            
            <h2 style={{ fontFamily: 'var(--font-hero)', fontSize: '2rem', marginBottom: '40px', color: '#1c1c1e' }}>Selected Works</h2>

            <div style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(3, 1fr)', // 3 Columns
               gap: '30px',
               width: '100%'
            }}>
              {gridProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Sub-component for individual card logic to handle drag state independently
function ProjectCard({ project, index }: { project: any, index: number }) {
  const router = useRouter();
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 150], [1, 0]); // Fade text as you drag
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    if (info.offset.x > 100) { // Threshold to trigger unlock
      router.push(`/projects/${project.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
      // Prevent click from bubbling to overlay (which closes modal)
      onClick={(e) => e.stopPropagation()}
      // Card Container
      style={{
        position: 'relative',
        height: '400px', // Taller for full image impact
        borderRadius: '32px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
        backgroundColor: '#000',
        cursor: 'default' // Cursor handled by slider
      }}
    >
        {/* 1. Full Background Image */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#1c1c1e' }}>
          <img 
            src={project.image} 
            alt={project.title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }} 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        
        {/* 2. Gradient Overlay for Text Readability */}
        <div 
          style={{ 
             position: 'absolute', 
             bottom: 0, 
             left: 0, 
             width: '100%', 
             height: '60%', 
             background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
             pointerEvents: 'none'
          }} 
        />

        {/* 3. Content: Title & Industry */}
        <div style={{ position: 'absolute', bottom: '100px', left: '24px', zIndex: 10, pointerEvents: 'none' }}>
           <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, fontFamily: 'var(--font-primary)' }}>
             {project.category}
           </p>
           <h3 style={{ margin: '4px 0 0', color: 'white', fontSize: '1.75rem', fontFamily: 'var(--font-hero)', fontWeight: 700 }}>
             {project.title}
           </h3>
        </div>

        {/* 4. iPhone Slider "See more" */}
        <div style={{ 
            position: 'absolute', 
            bottom: '20px', 
            left: '20px', 
            right: '20px', 
            height: '64px', 
            backgroundColor: 'rgba(255,255,255,0.15)', 
            backdropFilter: 'blur(10px)',
            borderRadius: '32px',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            {/* Slide Track Text */}
            <motion.div style={{ position: 'absolute', width: '100%', textAlign: 'center', opacity, pointerEvents: 'none' }}>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', fontWeight: 500, fontFamily: 'var(--font-primary)' }}>
                Slide to view
              </span>
            </motion.div>

            {/* Draggable Knob */}
            <motion.div
               drag="x"
               dragConstraints={{ left: 0, right: 180 }} // Constraints relative to container
               dragElastic={0.05}
               dragSnapToOrigin
               onDragStart={() => setIsDragging(true)}
               onDragEnd={handleDragEnd}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95, cursor: 'grabbing' }}
               style={{
                 width: '56px',
                 height: '56px',
                 backgroundColor: '#ffffff',
                 borderRadius: '50%',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 cursor: 'grab',
                 position: 'relative',
                 zIndex: 20,
                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
               }}
            >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
               </svg>
            </motion.div>
        </div>
    </motion.div>
  );
}
