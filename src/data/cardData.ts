export type CardCategory = 'frontend' | 'design' | 'experiment' | null;
export type CardColor = 'cream' | 'blue' | 'pink' | 'mint' | 'lavender' | 'empty';
export type CardSize = 'small' | 'wide' | 'tall';

export interface PuzzlePieceData {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  category: CardCategory;
  color: CardColor;
  isEmpty?: boolean;
  type?: 'default' | 'spotify' | 'instagram' | 'project-link' | 'ephesus' | 'vsco' | 'contact' | 'project-item';
  size: CardSize; 
  spotifyData?: {
    song: string;
    artist: string;
    status: string;
  };
  instagramData?: {
    handle: string;
    link: string;
  };
  vscoData?: {
    handle: string;
    link: string;
  };
  hoverImages?: string[];
  showArrow?: boolean;
  slug?: string;
  image?: string;
}

export type CardData = PuzzlePieceData;

// 10 items for 4x4 Bento Grid (16 units total)
// 4x Small (1), 4x Wide (2), 2x Tall (2) = 4 + 8 + 4 = 16
export const puzzleData: PuzzlePieceData[] = [
  // 1. Hero (Wide 2x1)
  {
    id: 'hero',
    title: "I am Yağnur. I’m a frontend developer with a keen eye for design and a strong interest in product design. I create visually stunning digital experiences using a variety of technologies and tools, specializing in Next.js and Nuxt.js.",
    // Description removed as per request
    category: null,
    color: 'cream',
    type: 'default',
    size: 'wide'
  },
  // 2. Spotify (Small 1x1)
  {
    id: 'spotify-card',
    category: 'experiment',
    color: 'cream',
    type: 'spotify',
    size: 'small', // Changed to 1x1
    spotifyData: {
      status: 'Current Vibe',
      song: "I Don't Belong",
      artist: 'Fontaines D.C.'
    }
  },
  // 3. Case Reflection (Small 1x1)
  {
    id: 'case-reflection',
    title: "This worked. Until it didn't.",
    category: 'frontend',
    color: 'blue',
    type: 'default',
    size: 'small',

  },
  // 4. Contact (Tall 1x2)
  {
    id: 'contact',
    title: 'Let’s stay connected!',
    description: 'I’m always open to sharing ideas and expanding my network.',
    category: null,
    color: 'cream',
    type: 'contact',
    size: 'tall'
  },
  // 5. Experience (Wide 2x1)
  {
    id: 'case-craft',
    title: 'Experience',
    category: 'design',
    color: 'lavender',
    type: 'project-link',
    size: 'wide'
  },
  // 6. Ephesus Card (Small 1x1)
  {
    id: 'ephesus-card',
    category: null,
    color: 'cream', 
    type: 'ephesus',
    size: 'small'
  },
  // 7. Projects Link (Wide 2x1)
  {
    id: 'projects-link',
    title: 'Works',
    category: 'design',
    color: 'lavender', // Will be overridden by custom styling
    type: 'project-link',
    size: 'wide',
    // Description removed
  },
  // 8. About (Tall 1x2)
  {
    id: 'about',
    title: 'Context',
    description: 'Frontend developer.',
    category: 'frontend',
    color: 'cream',
    size: 'tall'
  },
  // 9. Instagram (Small 1x1)
  {
    id: 'instagram',
    category: 'design',
    color: 'pink', // Placeholder, will override with custom or white
    type: 'instagram',
    size: 'small',
    instagramData: {
      handle: '@yagnur.ui',
      link: 'https://instagram.com/yagnur.ui'
    }
  },
  // 10. VSCO (Small 1x1) - Photography
  {
    id: 'vsco',
    category: 'design',
    color: 'cream',
    type: 'vsco',
    size: 'small',
    vscoData: {
      handle: '@yagnurl',
      link: 'https://vsco.co/yagnurl'
    }
  },
  // 11. Toolbox (Small 1x1)
  {
    id: 'toolbox',
    title: 'Toolbox',
    category: 'frontend',
    color: 'mint',
    size: 'small'
  }
];
