import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.contactMessage.deleteMany(),
    prisma.newsletterSubscriber.deleteMany(),
    prisma.similarNewsItem.deleteMany(),
    prisma.faq.deleteMany(),
    prisma.testimonial.deleteMany(),
    prisma.resource.deleteMany(),
    prisma.resourceHighlight.deleteMany(),
    prisma.podcastEpisode.deleteMany(),
    prisma.podcastShow.deleteMany(),
    prisma.video.deleteMany(),
    prisma.newsArticle.deleteMany(),
    prisma.blogPost.deleteMany(),
    prisma.siteStat.deleteMany(),
  ]);

  await prisma.siteStat.createMany({
    data: [
      { value: '300+', label: 'Resources available', page: 'home', sort: 0 },
      { value: '12k+', label: 'Total Downloads', page: 'home', sort: 1 },
      { value: '10k+', label: 'Active Users', page: 'home', sort: 2 },
      { value: '300+', label: 'Resources Available', page: 'resources', sort: 0 },
      { value: '12k+', label: 'Total Downloads', page: 'resources', sort: 1 },
      { value: '10k+', label: 'Active Users', page: 'resources', sort: 2 },
      { value: '100+', label: 'Exclusive Resources', page: 'resources', sort: 3 },
    ],
  });

  const defaultSections = [
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
  ];

  const relatedTopics = [
    'AI in Healthcare',
    'AI Diagnostic Imaging',
    'Predictive Analytics and Disease Prevention',
    'Personalized Treatment Plans',
    'Drug Discovery and Research',
    'AI in Telemedicine',
    'Ethical Considerations',
    'The Future of AI in Healthcare',
    'Conclusion',
  ];

  const blogBase = {
    heroImage:
      'https://images.unsplash.com/photo-1576091160399-217dba89f1d8?auto=format&fit=crop&w=1600&h=900&q=80',
    category: 'Healthcare',
    publishedDate: 'October 10, 2023',
    readingTime: '12 Min',
    authorName: 'Dr. Emily Walker',
    authorRole: 'Healthcare Editor',
    authorAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
    likes: '24.5k',
    views: '50.2k',
    shares: '17.4k',
    introduction:
      'Artificial Intelligence (AI) has permeated various aspects of our lives, revolutionizing industries and reshaping the way we work. In healthcare, AI is making significant strides, offering innovative solutions to complex challenges and transforming patient care.',
    sections: JSON.stringify(defaultSections),
    relatedTopics: JSON.stringify(relatedTopics),
  };

  await prisma.blogPost.createMany({
    data: [
      {
        slug: 'the-rise-of-artificial-intelligence-in-healthcare',
        title: 'The Rise of Artificial Intelligence in Healthcare',
        ...blogBase,
        sort: 0,
      },
      {
        slug: 'quantum-computing',
        title: 'Quantum Computing Breakthroughs',
        category: 'Quantum Computing',
        ...blogBase,
        sort: 1,
      },
      {
        slug: 'ai-ethics',
        title: 'AI Ethics in Modern Society',
        category: 'AI Ethics',
        ...blogBase,
        sort: 2,
      },
      {
        slug: 'space-exploration',
        title: 'Space Exploration in the AI Era',
        category: 'Space Exploration',
        ...blogBase,
        sort: 3,
      },
      {
        slug: 'biotechnology',
        title: 'Biotechnology and AI Convergence',
        category: 'Biotechnology',
        ...blogBase,
        sort: 4,
      },
      {
        slug: 'renewable-energy',
        title: 'Renewable Energy Powered by AI',
        category: 'Renewable Energy',
        ...blogBase,
        sort: 5,
      },
      {
        slug: 'biohacking',
        title: 'Biohacking with Smart Diagnostics',
        category: 'Biohacking',
        ...blogBase,
        sort: 6,
      },
      {
        ...blogBase,
        slug: 'a-deep-dive-into-neural-networks',
        title: 'A Deep Dive into Neural Networks',
        category: 'Artificial Intelligence',
        desc: 'Explore how artificial neural networks learn, adapt, and process complex information to mimic the human brain.',
        listImage:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=260&q=80',
        tags: JSON.stringify(['AI', 'Deep Learning']),
        likes: '1.2k',
        views: '10k',
        sort: 10,
      },
      {
        ...blogBase,
        slug: 'the-rise-of-autonomous-robotics',
        title: 'The Rise of Autonomous Robotics',
        category: 'Robotics',
        desc: 'How self-driving systems and collaborative robots are redefining warehousing, manufacturing, and household chores.',
        listImage:
          'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&h=260&q=80',
        tags: JSON.stringify(['Robotics', 'Automation']),
        likes: '850',
        views: '6.2k',
        sort: 11,
      },
      {
        ...blogBase,
        slug: 'ai-ethics-navigating-the-future',
        title: 'AI Ethics: Navigating the Future',
        category: 'Tech & Society',
        desc: 'Understanding the ethical implications of artificial intelligence, from biased algorithms to job displacement concerns.',
        listImage:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=260&q=80',
        tags: JSON.stringify(['Ethics', 'Society']),
        likes: '1.5k',
        views: '12.4k',
        sort: 12,
      },
    ],
  });

  await prisma.newsArticle.createMany({
    data: [
      {
        title: 'Global Climate Summit Addresses Urgent Need for Action',
        desc: 'World leaders gathered at the Global Climate Summit to discuss and pledge commitment to ambitious targets for reducing greenhouse gas emissions.',
        category: 'Climate Change',
        image:
          'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=900&h=600&q=80',
        date: 'October 15, 2023',
        readTime: '5 Min Read',
        authorName: 'Sarah Thompson',
        authorAvatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
        featured: true,
        headline: false,
        sort: 0,
      },
      {
        title: 'A Decisive Victory for Progressive Policies',
        desc: 'Political analysts weigh in on the latest reforms and their impact on the national agenda.',
        category: 'Politics',
        image:
          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&h=260&q=80',
        date: 'October 8, 2023',
        authorName: 'John Techson',
        authorAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
        headline: true,
        sort: 1,
      },
      {
        title: 'Artificial Intelligence & Healthcare Partnership',
        desc: 'Hospitals and startups collaborate on AI tools for faster diagnosis and better outcomes.',
        category: 'AI & Healthcare',
        image:
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=260&q=80',
        date: 'October 9, 2023',
        authorName: 'Sarah Ethicist',
        headline: false,
        sort: 2,
      },
      {
        title: 'Scientific Breakthroughs in Cancer Treatment',
        desc: 'Researchers announce promising results from new targeted therapy trials.',
        category: 'Science',
        image:
          'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=400&h=260&q=80',
        date: 'October 11, 2023',
        authorName: 'Mark Rodriguez',
        headline: false,
        sort: 3,
      },
      {
        title: 'Top AI Innovations: Transforming Industries',
        desc: 'An in-depth look at the AI innovations that are reshaping industries across the globe, from healthcare to finance and beyond.',
        category: 'Technology',
        date: 'October 10, 2023',
        authorName: 'John Techson',
        authorAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
        headline: true,
        sort: 4,
      },
      {
        title: 'The Ethical AI: Navigating Challenges in Machine Learning',
        desc: 'A critical exploration of the ethical considerations in AI development, addressing issues of bias, transparency, and responsible use.',
        category: 'AI Ethics',
        date: 'October 12, 2023',
        authorName: 'Sarah Ethicist',
        authorAvatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
        headline: true,
        sort: 5,
      },
      {
        title: "Starship Launches: SpaceX's Bold Journey to Mars",
        desc: "Exploring the groundbreaking space missions that have caught the world's attention and marked a new era of interplanetary ambition.",
        category: 'Space',
        date: 'October 15, 2023',
        authorName: 'Mark Rodriguez',
        authorAvatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
        headline: true,
        sort: 6,
      },
    ],
  });

  await prisma.video.createMany({
    data: [
      {
        title: 'Exploring the Future of AI',
        category: 'Technology',
        image:
          'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?auto=format&fit=crop&w=900&h=600&q=80',
        duration: '04:32',
        sort: 0,
      },
      {
        title: 'Robotics in Modern Industry',
        category: 'Innovation',
        image:
          'https://images.unsplash.com/photo-1520975693411-b0d1d8d2bdb4?auto=format&fit=crop&w=900&h=600&q=80',
        duration: '06:10',
        sort: 1,
      },
      {
        title: 'AI Ethics & Responsible Systems',
        category: 'AI Ethics',
        image:
          'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=900&h=600&q=80',
        duration: '05:04',
        sort: 2,
      },
      {
        title: 'Data-Driven Breakthroughs',
        category: 'Research',
        image:
          'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&h=600&q=80',
        duration: '03:58',
        sort: 3,
      },
    ],
  });

  await prisma.podcastShow.createMany({
    data: [
      {
        title: 'AI Revolution',
        subtitle: 'Tech Talk',
        rating: 5,
        episodes: '12k+ Episodes',
        followers: '12k+ Followers',
        icon: 'pencil',
        sort: 0,
      },
      {
        title: 'AI Conversations',
        subtitle: 'Deep Dives',
        rating: 5,
        episodes: '1.4k+ Episodes',
        followers: '8k+ Followers',
        icon: 'trophy',
        sort: 1,
      },
    ],
  });

  await prisma.podcastEpisode.createMany({
    data: [
      {
        showName: 'AI Revolution',
        title: 'Revolutionize your understanding of AI',
        desc: 'Dive into breakthrough ideas and practical insights that shape modern artificial intelligence.',
        image:
          'https://images.unsplash.com/photo-1611095785056-57069a6d3784?auto=format&fit=crop&w=1400&h=800&q=80',
        duration: '28 Min',
        date: 'Oct 2023',
        featured: true,
        tags: JSON.stringify([
          { label: 'Episode', value: 'S1 · E12' },
          { label: 'Duration', value: '28 Min' },
          { label: 'Release Date', value: 'Oct 2023' },
        ]),
        sort: 0,
      },
      {
        showName: 'AI Conversations',
        title: 'Engage in thought-provoking conversations with leading experts',
        desc: 'Explore real perspectives on how AI is transforming creativity, work, and everyday decisions.',
        image:
          'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1400&h=800&q=80',
        duration: '34 Min',
        date: 'Nov 2023',
        featured: true,
        tags: JSON.stringify([
          { label: 'Episode', value: 'S2 · E03' },
          { label: 'Duration', value: '34 Min' },
          { label: 'Release Date', value: 'Nov 2023' },
        ]),
        sort: 1,
      },
      {
        showName: 'AI Revolution',
        title: 'AI in Healthcare',
        category: 'AI Revolution',
        image:
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&h=600&q=80',
        duration: '26 Min',
        date: '2023',
        rating: 4.8,
        sort: 10,
      },
      {
        showName: 'AI Revolution',
        title: 'AI Ethics',
        category: 'AI Revolution',
        image:
          'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=900&h=600&q=80',
        duration: '21 Min',
        date: '2023',
        rating: 4.8,
        sort: 11,
      },
      {
        showName: 'AI Revolution',
        title: 'Machine Learning Explained',
        category: 'AI Revolution',
        image:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&h=600&q=80',
        duration: '28 Min',
        date: '2023',
        rating: 4.8,
        sort: 12,
      },
      {
        showName: 'AI Conversations',
        title: 'The Rise of AI',
        category: 'AI Conversations',
        image:
          'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&h=600&q=80',
        duration: '16 Min',
        date: '2023',
        rating: 4.8,
        sort: 13,
      },
      {
        showName: 'AI Conversations',
        title: 'AI in Finance',
        category: 'AI Conversations',
        image:
          'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&h=600&q=80',
        duration: '24 Min',
        date: '2023',
        rating: 4.8,
        sort: 14,
      },
      {
        showName: 'AI Conversations',
        title: 'AI & Society',
        category: 'AI Conversations',
        image:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&h=600&q=80',
        duration: '19 Min',
        date: '2023',
        rating: 4.8,
        sort: 15,
      },
    ],
  });

  await prisma.resourceHighlight.createMany({
    data: [
      {
        title: 'Quantum Computing',
        subtitle: 'Whitepaper',
        desc: 'A deep exploration of next-gen computation and real-world applications.',
        sort: 0,
      },
      {
        title: 'Space Exploration',
        subtitle: 'Whitepaper',
        desc: 'From propulsion to missions: a structured guide to modern exploration.',
        sort: 1,
      },
    ],
  });

  await prisma.resource.createMany({
    data: [
      {
        tab: 'Whitepapers',
        title: 'Quantum Computing Whitepaper',
        subtitle: 'Breakthrough Concepts & Practical Pathways',
        image:
          'https://images.unsplash.com/photo-1526406915894-6c228685bfa7?auto=format&fit=crop&w=1400&h=900&q=80',
        meta: JSON.stringify([
          { label: 'Format', value: 'PDF' },
          { label: 'Pages', value: '42' },
          { label: 'Year', value: '2023' },
        ]),
        featured: true,
        sort: 0,
      },
      {
        tab: 'Whitepapers',
        title: 'Space Exploration Whitepaper',
        subtitle: 'Missions, Systems, and the Future Frontier',
        image:
          'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1400&h=900&q=80',
        meta: JSON.stringify([
          { label: 'Format', value: 'PDF' },
          { label: 'Pages', value: '38' },
          { label: 'Year', value: '2023' },
        ]),
        featured: true,
        sort: 1,
      },
      {
        tab: 'Reports',
        title: 'AI Trends 2024',
        subtitle: 'Signals, Momentum & What to Watch',
        image:
          'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1200&h=800&q=80',
        meta: JSON.stringify([
          { label: 'Format', value: 'PDF' },
          { label: 'Pages', value: '28' },
          { label: 'Year', value: '2024' },
        ]),
        sort: 10,
      },
      {
        tab: 'Reports',
        title: 'Space Science: Brief',
        subtitle: 'Recent Discoveries and Research Notes',
        image:
          'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&h=800&q=80',
        meta: JSON.stringify([
          { label: 'Format', value: 'PDF' },
          { label: 'Pages', value: '19' },
          { label: 'Year', value: '2023' },
        ]),
        sort: 11,
      },
      {
        tab: 'Ebooks',
        title: 'Data: The New Oil',
        subtitle: 'From Raw Data to Real Decisions',
        image:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=800&q=80',
        meta: JSON.stringify([
          { label: 'Format', value: 'PDF' },
          { label: 'Pages', value: '64' },
          { label: 'Year', value: '2023' },
        ]),
        sort: 12,
      },
    ],
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Sarah Johnson',
        role: 'Tech Enthusiast',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
        rating: 5,
        text: 'FutureTech has completely transformed how I stay updated with AI trends. The content is insightful and always relevant.',
        sort: 0,
      },
      {
        name: 'Michael Chen',
        role: 'Software Engineer',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
        rating: 5,
        text: 'The podcasts and resources are top-notch. I recommend FutureTech to everyone in my team.',
        sort: 1,
      },
      {
        name: 'Emily Davis',
        role: 'Product Manager',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
        rating: 5,
        text: 'A must-read for anyone interested in the future of technology. Brilliant articles and expert contributors.',
        sort: 2,
      },
    ],
  });

  await prisma.faq.createMany({
    data: [
      {
        q: 'What is AI?',
        a: 'AI (Artificial Intelligence) refers to systems that can perform tasks that typically require human intelligence.',
        sort: 0,
      },
      {
        q: 'How can I subscribe to updates?',
        a: 'You can subscribe via our newsletter and stay updated with the latest podcasts, blogs and resources.',
        sort: 1,
      },
      {
        q: 'Can I download resources from the website?',
        a: 'Yes, our resources section offers downloadable ebooks, reports and whitepapers.',
        sort: 2,
      },
      {
        q: 'How do I reach the support team?',
        a: 'Use the form on this page or contact us through the support card at the top of the page.',
        sort: 3,
      },
    ],
  });

  await prisma.similarNewsItem.createMany({
    data: [
      {
        title: 'A Decisive Victory for Progressive Policies',
        category: 'Politics',
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&h=400&q=80',
        likes: '12.5k',
        views: '80k',
        sort: 0,
      },
      {
        title: 'Tech Giants Unveil Cutting-Edge AI-Generated Content Creation Tools',
        category: 'Technology',
        image:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&h=400&q=80',
        likes: '6.2k',
        views: '92k',
        sort: 1,
      },
      {
        title: 'COVID-19 Variants',
        category: 'Health',
        image:
          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=400&q=80',
        likes: '10.6k',
        views: '68k',
        sort: 2,
      },
    ],
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
