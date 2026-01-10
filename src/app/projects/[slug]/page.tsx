import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProject(slug: string) {
  return client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug });
}

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="container" style={{ padding: '4rem 2rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '2rem', color: '#888', textDecoration: 'none' }}>
          ← Back to projects
        </Link>
        
        <article className="animate-fade-in">
          <header style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.2' }}>{project.title}</h1>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#666' }}>
               {project.publishedAt && (
                 <time dateTime={project.publishedAt}>
                   {new Date(project.publishedAt).toLocaleDateString()}
                 </time>
               )}
            </div>
            {project.link && (
               <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
                 Visit Project
               </a>
            )}
          </header>

          {project.mainImage && (
            <div style={{ marginBottom: '3rem', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
              <img 
                src={urlForImage(project.mainImage).url()} 
                alt={project.title}
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>
          )}

          <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
            <PortableText 
              value={project.content} 
              components={{
                block: {
                  h2: ({children}) => <h2 style={{ fontSize: '1.8rem', margin: '2.5rem 0 1rem', fontWeight: 'bold' }}>{children}</h2>,
                  h3: ({children}) => <h3 style={{ fontSize: '1.4rem', margin: '2rem 0 1rem', fontWeight: 'bold' }}>{children}</h3>,
                  normal: ({children}) => <p style={{ marginBottom: '1.5rem' }}>{children}</p>,
                },
                list: {
                   bullet: ({children}) => <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem' }}>{children}</ul>,
                   number: ({children}) => <ol style={{ listStyleType: 'decimal', paddingLeft: '2rem', marginBottom: '1.5rem' }}>{children}</ol>,
                }
              }}
            />
          </div>
        </article>
      </main>
    </>
  );
}
