import { CATEGORIES } from '../../lib/constants';

const content =
  'এখানে নাতের প্রথম লাইন থাকবে\nএখানে নাতের দ্বিতীয় লাইন থাকবে\n\nএখানে পরের স্তবকের লাইন থাকবে\nএখানে শেষ লাইন থাকবে';

export const NAATS = Array.from({ length: 24 }, (_, i) => ({
  id: String(i + 1),
  title: `নমুনা নাত ${i + 1}`,
  author: i % 2 ? 'নমুনা শিল্পী' : 'অজ্ঞাত',
  category: CATEGORIES[i % CATEGORIES.length].id,
  likes: (i * 7) % 40,
  content,
  youtubeUrl: i % 3 === 0 ? 'https://www.youtube.com' : '',
}));
