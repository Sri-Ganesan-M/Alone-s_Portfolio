// TypeScript type for a portfolio work item
// Update this if you add more fields to works.json
export type Work = {
  id: number;
  title: string;
  description: string;
  orientation: 'vertical' | 'horizontal';
  thumbnail: string; // Path to thumbnail image
  media: string;     // Path to video or image
  externalLink: string; // Placeholder for external URL (YouTube, Instagram, etc.)
  // Optionally add: category, tags, etc.
};
