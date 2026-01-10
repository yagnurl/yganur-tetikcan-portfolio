export const CATEGORIES = {
  frontend: {
    id: 'frontend',
    label: 'Frontend',
    color: '#4D7CFF',
    colorRgb: '77, 124, 255'
  },
  design: {
    id: 'design',
    label: 'Design',
    color: '#FF6B9D',
    colorRgb: '255, 107, 157'
  },
  experiment: {
    id: 'experiment',
    label: 'Experiment',
    color: '#FFB84D',
    colorRgb: '255, 184, 77'
  }
} as const;

export type CategoryId = keyof typeof CATEGORIES;
