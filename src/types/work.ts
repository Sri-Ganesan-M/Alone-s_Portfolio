// TypeScript type for a portfolio work item
// Update this if you add more fields to works.json
export type Work = {
  id: string | number;
  title: string;
  description: string;
  orientation: 'vertical' | 'horizontal';
  thumbnail: string; // Path to thumbnail image
  media: string;     // Path to video or image
  externalLink: string; // Placeholder for external URL (YouTube, Instagram, etc.)
  contentType?: string;
  subjectMatter?: string;
  editingStyle?: string;
  software?: {
    name: string;
    logo: string;
  }[];
};
