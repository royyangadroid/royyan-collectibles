export type ContentBlock =
  | { type: 'h1'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'note'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'image'; src: string; caption: string };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  readingTime: string;
  publishedDate: string;
  author: string;
  content: ContentBlock[];
}

export const DUMMY_ARTICLES: Article[] = [
  {
    slug: 'tintin-history',
    title: 'The History of Tintin Around the World',
    excerpt: 'Discover the fascinating journey of Hergé\'s iconic creation, from its humble beginnings in a Belgian newspaper supplement to becoming a global phenomenon cherished by collectors.',
    coverImage: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1200&auto=format&fit=crop',
    category: 'History',
    readingTime: '5 Min Read',
    publishedDate: 'Oct 15, 2023',
    author: 'Royyan Master Curator',
    content: [
      { type: 'h1', text: 'The Genesis of an Icon' },
      { type: 'p', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
      { type: 'h2', text: 'Early Sketches and Development' },
      { type: 'p', text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' },
      { type: 'h3', text: 'The Influence of Clear Line' },
      {
        type: 'ul', items: [
          'Ligne Claire: The drawing style pioneered by Hergé.',
          'Attention to Detail: Meticulous research on vehicles, clothing, and architecture.',
          'Color Palette: Flat, continuous colors without hatching.'
        ]
      },
      {
        type: 'ol', items: [
          'First appearance in Le Petit Vingtième (1929).',
          'Transition to color in the 1940s.',
          'The establishment of Studios Hergé.'
        ]
      },
      { type: 'quote', text: 'The idea for the character of Tintin and the sort of adventures that would befall him came to me, I believe, in five minutes...', author: 'Hergé' },
      { type: 'h3', text: 'Global Expansion' },
      { type: 'p', text: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.' },
      { type: 'note', text: 'Early editions of Tintin in the Land of the Soviets are extremely rare and highly sought after by serious collectors.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=1200&auto=format&fit=crop', caption: 'Original sketch references' },
      { type: 'h2', text: 'The Golden Era of Publishing' },
      { type: 'p', text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?' },
      { type: 'h2', text: 'Conclusion' },
      { type: 'p', text: 'Id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.' }
    ]
  },
  {
    slug: 'vintage-comics-valuable',
    title: 'Why Vintage Comics Become Valuable',
    excerpt: 'An in-depth analysis of the factors driving the vintage comic book market, including scarcity, historical significance, grading standards, and the impact of modern cinema.',
    coverImage: 'https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?q=80&w=1200&auto=format&fit=crop',
    category: 'Market Insight',
    readingTime: '8 Min Read',
    publishedDate: 'Sep 28, 2023',
    author: 'Archival Expert',
    content: [
      { type: 'h1', text: 'Understanding the Comic Book Market' },
      { type: 'p', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
      { type: 'h2', text: 'The Factors of Valuation' },
      { type: 'p', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.' },
      { type: 'h3', text: 'Scarcity and Condition' },
      {
        type: 'ul', items: [
          'Print Runs: Lower print runs equal higher scarcity.',
          'Paper Quality: Newsprint deteriorates quickly without proper care.',
          'CGC Grading: The industry standard for assessing condition.'
        ]
      },
      { type: 'quote', text: 'Condition is paramount. A grade difference of 0.5 can mean a price difference of thousands of dollars.', author: 'Market Analyst' },
      { type: 'note', text: 'First appearances (key issues) always hold a premium over regular issues in the same run.' },
      { type: 'h2', text: 'Conclusion' },
      { type: 'p', text: 'Id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.' }
    ]
  },
  {
    slug: 'rare-hot-wheels',
    title: 'Collecting Rare Hot Wheels for Beginners',
    excerpt: 'A comprehensive guide for aspiring collectors looking to enter the world of die-cast models, highlighting what to look for and common pitfalls to avoid.',
    coverImage: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1200&auto=format&fit=crop',
    category: 'Guide',
    readingTime: '6 Min Read',
    publishedDate: 'Sep 12, 2023',
    author: 'Die-cast Specialist',
    content: [
      { type: 'h1', text: 'Starting Your Die-Cast Journey' },
      { type: 'p', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' },
      { type: 'h2', text: 'The Redline Era (1968-1977)' },
      { type: 'p', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.' },
      { type: 'h3', text: 'Identifying Redlines' },
      {
        type: 'ul', items: [
          'Red Striped Tires: The signature feature of early models.',
          'Spectraflame Paint: A translucent metallic finish.',
          'Custom Designs: Featuring California custom styling.'
        ]
      },
      {
        type: 'ol', items: [
          'The Original Sweet 16 (1968)',
          'The Spoiler Series (1970)',
          'The Heavyweights (1970)'
        ]
      },
      { type: 'quote', text: 'The Original 16 remain the holy grail for many collectors, especially in rare Spectraflame colors like Watermelon or Antifreeze.', author: 'Die-cast Historian' },
      { type: 'note', text: 'Pro Tip: Look for the hidden flame logo on the vehicle or the card behind the vehicle to identify modern Treasure Hunts.' },
      { type: 'h2', text: 'Conclusion' },
      { type: 'p', text: 'Id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.' }
    ]
  },
  {
    slug: 'paper-money-grading',
    title: 'Understanding Paper Money Grading',
    excerpt: 'Demystifying the complex world of numismatic grading systems. Learn how subtle imperfections can dramatically affect the premium of vintage banknotes.',
    coverImage: 'https://images.unsplash.com/photo-1621993202323-f438eec934ff?q=80&w=1200&auto=format&fit=crop',
    category: 'Knowledge',
    readingTime: '10 Min Read',
    publishedDate: 'Aug 30, 2023',
    author: 'Senior Numismatist',
    content: [
      { type: 'h1', text: 'The Art of Grading Banknotes' },
      { type: 'p', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' },
      { type: 'h2', text: 'The Sheldon Scale Adapted' },
      { type: 'h3', text: 'Key Grading Criteria' },
      {
        type: 'ul', items: [
          'Crispness: The firmness of the paper.',
          'Centering: How well the printing is centered on the paper.',
          'Folds and Creases: The most significant detractor from grade.'
        ]
      },
      { type: 'quote', text: 'A single fold, even a light center crease that breaks the paper fibers, immediately drops a note from Uncirculated to About Uncirculated.', author: 'Chief Grader' },
      { type: 'note', text: 'Notes that have been washed, pressed, or chemically treated lose their EPQ/PPQ designation and suffer in value.' },
      { type: 'h2', text: 'Conclusion' },
      { type: 'p', text: 'Id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.' }
    ]
  },
  {
    slug: 'preserve-vintage-collectibles',
    title: 'How to Preserve Vintage Collectibles',
    excerpt: 'Expert techniques on archiving and protecting your investments from environmental damage, UV light, and the relentless passage of time.',
    coverImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop',
    category: 'Care',
    readingTime: '7 Min Read',
    publishedDate: 'Aug 14, 2023',
    author: 'Conservation Director',
    content: [
      { type: 'h1', text: 'The Battle Against Time' },
      { type: 'p', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { type: 'h2', text: 'Environmental Controls' },
      { type: 'h3', text: 'Temperature and Humidity' },
      {
        type: 'ul', items: [
          'Ideal Temperature: 65°F to 70°F (18°C to 21°C).',
          'Ideal Humidity: 45% to 55% relative humidity.',
          'Consistency: Avoiding rapid fluctuations is more important than exact numbers.'
        ]
      },
      {
        type: 'ol', items: [
          'Use desiccant packs in enclosed spaces.',
          'Install UV-filtering film on windows.',
          'Keep items away from exterior walls and vents.'
        ]
      },
      { type: 'quote', text: 'Light, heat, and moisture are the trinity of destruction for organic collectibles like paper and cloth.', author: 'Archival Conservator' },
      { type: 'note', text: 'Caution: Always use clean, dry hands or archival cotton gloves when handling delicate items. Oils from the skin cause irreversible damage over time.' },
      { type: 'h2', text: 'Conclusion' },
      { type: 'p', text: 'Id est laborum et dolorum fuga.' }
    ]
  },
  {
    slug: 'evolution-indonesian-numismatics',
    title: 'The Evolution of Indonesian Numismatics',
    excerpt: 'Tracing the rich economic history of the archipelago through its currency, featuring extremely rare colonial era colonial prints and post-independence issues.',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Coins_of_the_Rupiah_%28as_of_2013%29.jpg/1920px-Coins_of_the_Rupiah_%28as_of_2013%29.jpg',
    category: 'History',
    readingTime: '12 Min Read',
    publishedDate: 'Jul 22, 2023',
    author: 'Royyan Master Curator',
    content: [
      { type: 'h1', text: 'A Currency Forged in History' },
      { type: 'p', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { type: 'h2', text: 'The VOC Era and Dutch East Indies' },
      { type: 'h3', text: 'The Gulden and the Rupiah' },
      {
        type: 'ul', items: [
          'De Javasche Bank: The central bank of the Dutch East Indies.',
          'Wayang Series: Highly sought after banknotes featuring traditional puppetry.',
          'Japanese Occupation Money: "Uang NICA" and invasion money.'
        ]
      },
      {
        type: 'ol', items: [
          'Pre-colonial coinage (Kepeng).',
          'Colonial Gulden.',
          'ORI (Oeang Republik Indonesia).'
        ]
      },
      { type: 'quote', text: 'The transition from colonial Gulden to ORI was not just an economic shift; it was a profound declaration of sovereignty.', author: 'Indonesian Historian' },
      { type: 'note', text: 'Highlight: The 1968 Sudirman series remains one of the most aesthetically celebrated issues in modern Indonesian numismatics.' },
      { type: 'h2', text: 'Conclusion' },
      { type: 'p', text: 'Id est laborum et dolorum fuga.' }
    ]
  }
];
