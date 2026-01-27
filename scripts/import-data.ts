import * as dotenv from 'dotenv';

import { createClient } from '@sanity/client';

// Load environment variables from .env file
dotenv.config();

// Sanity client configuration
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

// Card data to import
const cardsData = [
  {
    _type: 'card',
    id: 'hero',
    title: "I am Yağnur. I\'m a frontend developer with a keen eye for design and a strong interest in product design. I create visually stunning digital experiences using a variety of technologies and tools, specializing in Next.js and Nuxt.js.",
    category: 'null',
    color: 'cream',
    type: 'default',
    size: 'wide',
    order: 0
  },
  {
    _type: 'card',
    id: 'spotify-card',
    category: 'experiment',
    color: 'cream',
    type: 'spotify',
    size: 'small',
    order: 1,
    spotifyData: {
      status: 'Current Vibe',
      song: 'Feed the Machine',
      artist: 'Poor Man\'s Poison'
    }
  },
  {
    _type: 'card',
    id: 'case-reflection',
    title: "This worked. Until it didn\'t.",
    category: 'frontend',
    color: 'blue',
    type: 'default',
    size: 'small',
    order: 2
  },
  {
    _type: 'card',
    id: 'contact',
    title: 'Let\'s stay connected!',
    description: 'I\'m always open to sharing ideas and expanding my network.',
    category: 'null',
    color: 'cream',
    type: 'contact',
    size: 'tall',
    order: 3
  },
  {
    _type: 'card',
    id: 'case-craft',
    title: 'Experience',
    category: 'design',
    color: 'lavender',
    type: 'project-link',
    size: 'wide',
    order: 4
  },
  {
    _type: 'card',
    id: 'ephesus-card',
    category: 'null',
    color: 'cream',
    type: 'ephesus',
    size: 'small',
    order: 5
  },
  {
    _type: 'card',
    id: 'projects-link',
    title: 'Works',
    category: 'design',
    color: 'lavender',
    type: 'project-link',
    size: 'wide',
    order: 6
  },
  {
    _type: 'card',
    id: 'about',
    title: 'Context',
    description: 'Frontend developer.',
    category: 'frontend',
    color: 'cream',
    size: 'tall',
    order: 7
  },
  {
    _type: 'card',
    id: 'instagram',
    category: 'design',
    color: 'pink',
    type: 'instagram',
    size: 'small',
    order: 8,
    instagramData: {
      handle: '@yagnur.ui',
      link: 'https://instagram.com/yagnur.ui'
    }
  },
  {
    _type: 'card',
    id: 'vsco',
    category: 'design',
    color: 'cream',
    type: 'vsco',
    size: 'small',
    order: 9,
    vscoData: {
      handle: '@yagnurl',
      link: 'https://vsco.co/yagnurl'
    }
  },
  {
    _type: 'card',
    id: 'toolbox',
    title: 'Toolbox',
    category: 'frontend',
    color: 'mint',
    type: 'text-scroller',
    size: 'small',
    order: 10,
    technologies: [
      { name: 'Next.js', weight: 800, size: 3.5, opacity: 1, blur: false },
      { name: 'React', weight: 300, size: 2.2, opacity: 0.4, blur: true },
      { name: 'Nuxt.js', weight: 700, size: 3, opacity: 0.9, blur: false },
      { name: 'Vue', weight: 400, size: 2.5, opacity: 0.5, blur: true },
      { name: 'TypeScript', weight: 600, size: 2.8, opacity: 0.7, blur: false },
      { name: 'Tailwind', weight: 800, size: 3.2, opacity: 1, blur: false },
      { name: 'Framer', weight: 300, size: 2, opacity: 0.35, blur: true },
      { name: 'Three.js', weight: 700, size: 3.4, opacity: 0.85, blur: false },
      { name: 'JavaScript', weight: 500, size: 2.6, opacity: 0.6, blur: true },
      { name: 'Sanity', weight: 600, size: 2.4, opacity: 0.65, blur: false },
      { name: 'Styled', weight: 400, size: 2.3, opacity: 0.45, blur: true },
      { name: 'Motion', weight: 800, size: 3.6, opacity: 0.95, blur: false },
    ]
  }
];

// Project data to import
const projectsData = [
  {
    _type: 'project',
    title: 'Dinee App',
    slug: { _type: 'slug', current: 'dinee-app' },
    summary: 'A mobile food ordering and restaurant discovery application.',
    content: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Dinee is a comprehensive mobile application that revolutionizes the way users discover and order food from local restaurants.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Built with React Native and featuring a beautiful, intuitive interface, Dinee makes food ordering seamless and enjoyable.'
          }
        ]
      }
    ],
    link: 'https://example.com/dinee',
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'project',
    title: 'Recroot',
    slug: { _type: 'slug', current: 'recroot' },
    summary: 'A personality-focused, video-based hiring marketplace for the hospitality industry.',
    content: [
      {
        _type: 'block',
        _key: 'block3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'In customer-facing industries like hospitality, the personality and presentation of your hourly employees are typically more important than their past experience.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'block4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span4',
            text: 'Recroot reprioritises the hiring criteria for a successful jobseeker, placing an emphasis on personality and presentation through short-form video. Time-to-hire is reduced by up to 75%.'
          }
        ]
      }
    ],
    link: 'https://recroot.com',
    publishedAt: new Date().toISOString()
  }
];

async function importData() {
  console.log('🚀 Starting Sanity data import...\n');

  try {
    // Get existing cards to update instead of delete
    console.log('📋 Checking existing cards...');
    const existingCards = await client.fetch('*[_type == "card"]');
    const existingCardsMap = new Map(existingCards.map((card: any) => [card.id, card]));

    // Import/Update cards
    console.log('📦 Importing/Updating cards...');
    let created = 0;
    let updated = 0;
    
    for (const card of cardsData) {
      const existingCard = existingCardsMap.get(card.id);
      if (existingCard) {
        // Update existing card, preserve _id and _rev
        const updateData = { ...card, _id: existingCard._id, _rev: existingCard._rev };
        await client.createOrReplace(updateData);
        console.log(`🔄 Updated card: ${card.id} (${existingCard._id})`);
        updated++;
      } else {
        // Create new card
        const result = await client.create(card);
        console.log(`✅ Created card: ${card.id} (${result._id})`);
        created++;
      }
    }

    // Get existing projects to update instead of delete
    console.log('\n📋 Checking existing projects...');
    const existingProjects = await client.fetch('*[_type == "project"]');
    const existingProjectsMap = new Map(existingProjects.map((project: any) => [project.slug?.current, project]));

    // Import/Update projects
    console.log('📦 Importing/Updating projects...');
    let projectsCreated = 0;
    let projectsUpdated = 0;
    
    for (const project of projectsData) {
      const projectSlug = project.slug?.current;
      const existingProject = projectSlug ? existingProjectsMap.get(projectSlug) : null;
      
      if (existingProject) {
        // Update existing project, preserve _id and _rev
        const updateData = { ...project, _id: existingProject._id, _rev: existingProject._rev };
        await client.createOrReplace(updateData);
        console.log(`🔄 Updated project: ${project.title} (${existingProject._id})`);
        projectsUpdated++;
      } else {
        // Create new project
        const result = await client.create(project);
        console.log(`✅ Created project: ${project.title} (${result._id})`);
        projectsCreated++;
      }
    }

    console.log('\n🎉 Data import completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - Cards: ${created} created, ${updated} updated`);
    console.log(`   - Projects: ${projectsCreated} created, ${projectsUpdated} updated`);
    
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
}

// Run the import
importData();
