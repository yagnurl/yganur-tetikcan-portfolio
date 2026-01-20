import React from 'react';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/sanity';
import { urlForImage } from '@/sanity/image';
import { PortableText } from '@portabletext/react';
import ProjectClient from './ProjectClient';

// Revalidate every 10 seconds
export const revalidate = 10;

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    notFound();
  }

  // Transform Sanity data to match the component's expected format
  const data = {
    title: project.title,
    punchline: project.summary || '',
    content: project.content,
    link: project.link,
    mainImage: project.mainImage ? urlForImage(project.mainImage).width(1200).height(800).url() : null,
  };

  return <ProjectClient data={data} />;
}

