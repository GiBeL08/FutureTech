export type BlogPost = {
  slug: string;
  title: string;
  heroImage: string;
  category: string;
  publishedDate: string;
  readingTime: string;
  authorName: string;
  likes: string;
  views: string;
  shares: string;
  introduction: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedTopics: string[];
};

export const defaultBlogSlug = 'the-rise-of-artificial-intelligence-in-healthcare';

export const blogPosts: Record<string, BlogPost> = {
  [defaultBlogSlug]: {
    slug: defaultBlogSlug,
    title: 'The Rise of Artificial Intelligence in Healthcare',
    heroImage:
      'https://images.unsplash.com/photo-1576091160399-217dba89f1d8?auto=format&fit=crop&w=1600&h=900&q=80',
    category: 'Healthcare',
    publishedDate: 'October 10, 2023',
    readingTime: '12 Min',
    authorName: 'Dr. Emily Walker',
    likes: '24.5k',
    views: '50.2k',
    shares: '17.4k',
    introduction:
      'Artificial Intelligence (AI) has permeated various aspects of our lives, revolutionizing industries and reshaping the way we work. In healthcare, AI is making significant strides, offering innovative solutions to complex challenges and transforming patient care.',
    sections: [
      {
        heading: 'Artificial Intelligence (AI)',
        paragraphs: [
          'Artificial Intelligence (AI) has permeated various aspects of our lives, revolutionizing industries and reshaping the way we work. In healthcare, AI is making significant strides, offering innovative solutions to complex challenges and transforming patient care.',
          'From diagnostics to treatment planning, AI-powered tools are enhancing precision, efficiency, and accessibility in medical services, paving the way for a healthier future.',
        ],
      },
      {
        heading: 'Predictive Analytics and Disease Prevention',
        paragraphs: [
          'One of the most promising applications of AI in healthcare is predictive analytics. By analyzing vast amounts of patient data, AI algorithms can identify patterns and predict potential health risks before they become critical.',
          'This proactive approach enables healthcare providers to intervene early, personalize treatment plans, and ultimately save lives while reducing healthcare costs.',
        ],
      },
    ],
    relatedTopics: [
      'AI in Healthcare',
      'AI Diagnostic Imaging',
      'Predictive Analytics and Disease Prevention',
      'Personalized Treatment Plans',
      'Drug Discovery and Research',
      'AI in Telemedicine',
      'Ethical Considerations',
      'The Future of AI in Healthcare',
      'Conclusion',
    ],
  },
};

/** Footer blog labels → slug */
export const footerBlogSlugs: Record<string, string> = {
  'Quantum Computing': 'quantum-computing',
  'AI Ethics': 'ai-ethics',
  'Space Exploration': 'space-exploration',
  Biotechnology: 'biotechnology',
  'Renewable Energy': 'renewable-energy',
  Biohacking: 'biohacking',
  Blogs: defaultBlogSlug,
};

export function getBlogPost(slug: string): BlogPost {
  if (blogPosts[slug]) return blogPosts[slug];
  return blogPosts[defaultBlogSlug];
}

export function getBlogHref(label: string): string {
  const slug = footerBlogSlugs[label] ?? defaultBlogSlug;
  return `/blogs/${slug}`;
}
