export type CardCategory = 'frontend' | 'design' | 'experiment' | null;
export type CardColor = 'cream' | 'blue' | 'pink' | 'mint' | 'lavender' | 'empty';

export interface PuzzlePieceData {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  category: CardCategory;
  color: CardColor;
  isEmpty?: boolean;
  type?: 'default' | 'spotify';
  size: 'small' | 'wide' | 'tall'; // small=1x1, wide=2x1, tall=1x2
  spotifyData?: {
    song: string;
    artist: string;
    status: string;
  };
}

// 10 items for 4x4 Bento Grid (16 units total)
// 4x Small (1), 4x Wide (2), 2x Tall (2) = 4 + 8 + 4 = 16
export const puzzleData: PuzzlePieceData[] = [
  // 1. Hero (Wide 2x1)
  {
    id: 'hero',
    title: 'I design interfaces that think back.',
    description: 'Frontend developer focused on motion.',
    category: null,
    color: 'cream',
    type: 'default',
    size: 'wide'
  },
  // 2. Spotify (Wide 2x1)
  {
    id: 'spotify-card',
    category: 'experiment',
    color: 'cream',
    type: 'spotify',
    size: 'wide', 
    spotifyData: {
      status: 'Offline. Last played',
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
    size: 'small'
  },
  // 4. Contact (Tall 1x2)
  {
    id: 'contact',
    title: 'Say hi',
    description: 'hello@yourmail.com',
    category: null,
    color: 'cream',
    size: 'tall'
  },
  // 5. Case Craft (Wide 2x1)
  {
    id: 'case-craft',
    title: 'Still not finished.',
    category: 'design',
    color: 'pink',
    size: 'wide'
  },
  // 6. Experiment (Small 1x1)
  {
    id: 'experiment',
    title: 'Motion is a language.',
    category: 'design',
    color: 'lavender',
    size: 'small'
  },
  // 7. Thought (Wide 2x1)
  {
    id: 'thought',
    title: 'Drag is not a gimmick.',
    category: 'experiment',
    color: 'mint',
    size: 'wide'
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
  // 9. Extra 1 (Small 1x1)
  {
    id: 'extra-1',
    title: 'Future Project',
    category: 'experiment',
    color: 'lavender',
    size: 'small'
  },
  // 10. Extra 2 (Small 1x1)
  {
    id: 'extra-2',
    title: 'More to come',
    category: 'design',
    color: 'pink',
    size: 'small'
  }
];
