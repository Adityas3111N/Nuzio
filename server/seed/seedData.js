import Story from '../models/Story.js';
import Preference from '../models/Preference.js';
import { getStoryAudioUrl } from '../services/ttsService.js';

export const INITIAL_STORIES = [
  {
    id: 'story-1',
    title: 'Anthropic ships Claude 4.5 with 2M-token memory and native tools.',
    excerpt:
      'Anthropic’s new memory layer lets Claude remember context across workflows, bundled with 5 new enterprise code analysis tools.',
    fullScript:
      'Good morning. Anthropic has released Claude 4.5 featuring a revolutionary two-million-token memory layer and five native enterprise developer tools, significantly advancing multi-file reasoning capabilities.',
    category: 'AI & TECH',
    durationText: '4 min read • 02:15 audio',
    audioDurationSec: 135,
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com',
    publishedAt: 'Today • 6:45 AM',
  },
  {
    id: 'story-2',
    title: 'Fed minutes hint at a September policy shift.',
    excerpt:
      'Officials express growing confidence that inflation is moving toward target while labor market cools gradually.',
    fullScript:
      'The Federal Reserve minutes released early this morning show policymakers signaling a potential interest rate cut in September as inflation metrics approach their two percent target.',
    category: 'BUSINESS / ECONOMY',
    durationText: '3 min read • 01:45 audio',
    audioDurationSec: 105,
    source: 'Financial Times',
    sourceUrl: 'https://ft.com',
    publishedAt: 'Today • 6:15 AM',
  },
  {
    id: 'story-3',
    title: 'Indian SaaS startups surge 42% in Q2 funding rebound.',
    excerpt:
      'Bengaluru and Chennai clusters attract major sovereign wealth interest following AI agent product adoption.',
    fullScript:
      'Indian enterprise SaaS companies attracted over one point two billion dollars in venture capital during the second quarter, driven by accelerated adoption of vertical AI agents across Southeast Asia.',
    category: 'STARTUPS',
    durationText: '5 min read • 02:40 audio',
    audioDurationSec: 160,
    source: 'Mint',
    sourceUrl: 'https://livemint.com',
    publishedAt: 'Today • 5:50 AM',
  },
  {
    id: 'story-4',
    title: 'ISRO announces next-gen reusable launch vehicle orbital test.',
    excerpt:
      'The milestone mission prepares India for low-cost payload delivery and upcoming lunar infrastructure setup.',
    fullScript:
      'The Indian Space Research Organisation has scheduled the first orbital return test of its Pushpak reusable launch vehicle, aiming to slash commercial satellite launch costs by sixty percent.',
    category: 'SCIENCE',
    durationText: '3 min read • 01:50 audio',
    audioDurationSec: 110,
    source: 'The Hindu',
    sourceUrl: 'https://thehindu.com',
    publishedAt: 'Today • 5:30 AM',
  },
  {
    id: 'story-5',
    title: 'Nvidia introduces Blackwell Ultra architecture for frontier model training.',
    excerpt:
      'New liquid-cooled rack clusters deliver 30x inference throughput for trillion-parameter foundation models.',
    fullScript:
      'Nvidia unveiled its Blackwell Ultra superchip line today, designed specifically for hyperscale datacenters training autonomous agents with unprecedented compute density.',
    category: 'AI & TECH',
    durationText: '3 min read • 01:40 audio',
    audioDurationSec: 100,
    source: 'The Verge',
    sourceUrl: 'https://theverge.com',
    publishedAt: 'Today • 5:15 AM',
  },
  {
    id: 'story-6',
    title: 'Reserve Bank of India expands cross-border UPI payments to 12 new nations.',
    excerpt:
      'Global real-time settlement agreements empower cross-border remittances and merchant payments across Europe and Asia.',
    fullScript:
      'The Reserve Bank of India has inked bilateral settlements enabling real-time UPI merchant payments in twelve additional countries, expanding digital rupee footprint across Europe and Southeast Asia.',
    category: 'MARKETS',
    durationText: '4 min read • 02:00 audio',
    audioDurationSec: 120,
    source: 'Economic Times',
    sourceUrl: 'https://economictimes.indiatimes.com',
    publishedAt: 'Today • 4:55 AM',
  },
];

export async function seedDatabase() {
  try {
    const count = await Story.countDocuments();
    if (count === 0) {
      console.log('Seeding initial Nuzio news stories...');
      for (const item of INITIAL_STORIES) {
        const ariaAudio = getStoryAudioUrl(item.fullScript || item.excerpt, 'aria');
        const kaiAudio = getStoryAudioUrl(item.fullScript || item.excerpt, 'kai');
        const meeraAudio = getStoryAudioUrl(item.fullScript || item.excerpt, 'meera');

        await Story.create({
          ...item,
          audioUrl: ariaAudio,
          audioUrls: {
            aria: ariaAudio,
            kai: kaiAudio,
            meera: meeraAudio,
          },
        });
      }
      console.log(`Seeded ${INITIAL_STORIES.length} stories successfully.`);
    }

    const prefCount = await Preference.countDocuments();
    if (prefCount === 0) {
      await Preference.create({
        userId: 'default-user',
        name: 'Aarav',
        profession: 'Technology',
        topics: ['AI & Technology', 'Startups', 'Indian Business'],
        narratorId: 'aria',
        briefLengthMinutes: 10,
        bookmarkedStoryIds: ['story-1', 'story-3'],
      });
      console.log('Seeded default user preferences.');
    }
  } catch (err) {
    console.error('Error during database seed:', err.message);
  }
}
