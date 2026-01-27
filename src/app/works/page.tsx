import React from 'react';
import { notFound } from 'next/navigation';
import { getProjects } from '@/lib/sanity';
import { urlForImage } from '@/sanity/image';
import styles from '@/components/PuzzleBoard.module.css';
import PuzzlePiece from '@/components/PuzzlePiece';
import { PuzzlePieceData } from '@/data/cardData';
import WorksClient from './WorksClient';

// Revalidate every 10 seconds
export const revalidate = 10;

export default async function WorksPage() {
  const projects = await getProjects();
  
  if (!projects || projects.length === 0) {
    return <div>No projects found</div>;
  }

  // Transform Sanity projects to PuzzlePieceData format
  const worksData: PuzzlePieceData[] = projects.map((project: any, index: number) => {
    // Card sizes: small (280x280), wide (560x280), tall (280x560)
    // Request images at 2x resolution for retina displays
    let imageUrl;
    if (project.mainImage) {
      const size = project.size || 'small';
      if (size === 'wide') {
        // Wide cards: 2x1 ratio, 560x280px → request 1120x560px
        imageUrl = urlForImage(project.mainImage).width(1120).height(560).url();
      } else if (size === 'tall') {
        // Tall cards: 1x2 ratio, 280x560px → request 560x1120px
        imageUrl = urlForImage(project.mainImage).width(560).height(1120).url();
      } else {
        // Small cards: 1x1 ratio, 280x280px → request 560x560px
        imageUrl = urlForImage(project.mainImage).width(560).height(560).url();
      }
    }

    return {
      id: project._id || `work-${index + 1}`,
      title: project.title || '',
      description: project.summary || '',
      category: project.category || 'null',
      color: project.color || 'cream',
      type: 'project-item',
      size: project.size || 'small',
      image: imageUrl,
      slug: project.slug?.current || '',
    };
  });

  return <WorksClient worksData={worksData} />;
}
