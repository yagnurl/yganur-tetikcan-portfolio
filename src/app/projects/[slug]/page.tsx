'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Mock Data (matches the user's requested "Recroot" design)
const projectData: Record<string, any> = {
  'recroot': {
    title: 'Recroot',
    punchline: 'A personality-focused, video-based hiring marketplace for the hospitality industry.',
    description: [
      "In customer-facing industries like hospitality, the personality and presentation of your hourly employees are typically more important than their past experience. Nevertheless, hiring managers waste hours reviewing CVs and arranging interviews, often to realise post-interview that a candidate wasn't the right fit.",
      "Recroot reprioritises the hiring criteria for a successful jobseeker, placing an emphasis on personality and presentation through short-form video. In doing so, time-to-hire is reduced by up to 75%, resulting in considerable cost-savings for large groups and chains.",
      "Recroot is the primary hiring tool for Starbucks, TGI Fridays, and Hard Rock Café in Ireland. 1000+ people have been hired through Recroot within the last 12 months."
    ],
    stack: ['React Native', 'Node.js', 'AWS', 'Redux'],
    links: [
        { label: 'Web', url: '#' },
        { label: 'iOS', url: '#' },
        { label: 'Android', url: '#' }
    ],
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523206485973-27977b98362b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1481487484168-9b930d5b7d9d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=800&auto=format&fit=crop'
    ]
  },
  // Fallback for ID '1' or others
  'default': {
    title: 'Recroot',
    punchline: 'A personality-focused, video-based hiring marketplace for the hospitality industry.',
    description: [
      "In customer-facing industries like hospitality, the personality and presentation of your hourly employees are typically more important than their past experience. Nevertheless, hiring managers waste hours reviewing CVs and arranging interviews, often to realise post-interview that a candidate wasn't the right fit.",
      "Recroot reprioritises the hiring criteria for a successful jobseeker, placing an emphasis on personality and presentation through short-form video. In doing so, time-to-hire is reduced by up to 75%, resulting in considerable cost-savings for large groups and chains."
    ],
    stack: ['React Native', 'Node.js', 'AWS', 'Redux'],
    links: [
        { label: 'View Project', url: '#' }
    ],
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c'
    ]
  }
};

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  // Use mock data found by slug, or default. 
  // In a real app we would fetch data here.
  const data = projectData[slug] || projectData['default'];

  return (
    <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh', color: '#1a1a1a', fontFamily: 'var(--font-primary)' }}>
      {/* Back Button */}
      <div 
        onClick={() => router.back()}
        style={{ 
            position: 'fixed', 
            top: 40, 
            left: 40, 
            zIndex: 100, 
            cursor: 'pointer',
            width: 44,
            height: 44,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s ease',
            border: '1px solid #f0f0f0'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 40px 80px' }}>
        
        {/* Top Section: Split Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 5fr)', gap: '80px', marginBottom: '120px' }}>
            {/* Left Column: Title & Punchline */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
            >
                <h1 style={{ fontFamily: 'var(--font-hero)', fontSize: '4.5rem', marginBottom: '32px', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {data.title}
                </h1>
                <p style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', lineHeight: '1.4', fontWeight: 500, marginBottom: '40px', color: '#111' }}>
                    {data.punchline}
                </p>
                
                {/* Links */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    {data.links.map((link: any, i: number) => (
                        <a 
                           key={i} 
                           href={link.url}
                           style={{ 
                               padding: '12px 24px', 
                               backgroundColor: '#f1f1f1', 
                               borderRadius: '30px', 
                               textDecoration: 'none', 
                               color: '#1a1a1a',
                               fontSize: '0.95rem',
                               fontWeight: 500,
                               display: 'inline-flex',
                               alignItems: 'center',
                               gap: '6px',
                               transition: 'background-color 0.2s'
                           }}
                           onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e5e5'}
                           onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                        >
                            {link.label}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </a>
                    ))}
                </div>
            </motion.div>

            {/* Right Column: Detailed Description */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ paddingTop: '10px' }}
            >
                <div style={{ fontFamily: 'var(--font-primary)', fontSize: '1.1rem', lineHeight: '1.7', color: '#444' }}>
                    {data.description.map((p: string, i: number) => (
                        <p key={i} style={{ marginBottom: '24px' }}>{p}</p>
                    ))}
                </div>

                {/* Tech Stack */}
                {data.stack && (
                    <div style={{ marginTop: '40px' }}>
                        <h4 style={{ fontFamily: 'var(--font-hero)', fontSize: '1rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888' }}>Tech Stack</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {data.stack.map((tech: string, i: number) => (
                                <span key={i} style={{ padding: '6px 16px', border: '1px solid #e0e0e0', borderRadius: '20px', fontSize: '0.9rem', color: '#444', backgroundColor: 'transparent' }}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>

        {/* Bottom Section: Image Grid */}
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '40px' 
        }}>
            {data.images.map((img: string, i: number) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    style={{ 
                        width: '100%', 
                        height: '500px', // Fixed height for elegance
                        borderRadius: '24px', 
                        overflow: 'hidden', 
                        backgroundColor: '#eee' 
                    }}
                >
                    <img src={img} alt={`Project Detail ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
}
