import Link from 'next/link';
import { urlForImage } from '@/sanity/image';

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: any;
    summary: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug.current}`} className="project-card">
      <div style={{ 
        border: '1px solid var(--border)', 
        borderRadius: '12px', 
        overflow: 'hidden',
        background: 'var(--surface)',
        transition: 'transform 0.3s ease'
      }}>
        {project.mainImage && (
          <div style={{ height: '240px', overflow: 'hidden' }}>
             {/* Note: In a real app we'd use next/image here */}
            <img 
              src={urlForImage(project.mainImage).url()} 
              alt={project.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{project.title}</h3>
          <p style={{ color: '#888', fontSize: '0.95rem' }}>{project.summary}</p>
        </div>
      </div>
    </Link>
  );
}
