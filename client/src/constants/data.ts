import type { Narrator, Story, UserPreferences } from '../types'

export const PROFESSIONS = [
  { id: 'finance', label: 'Finance & Trading', icon: 'TrendingUp' },
  { id: 'legal', label: 'Legal', icon: 'Scale' },
  { id: 'tech', label: 'Technology', icon: 'Cpu' },
  { id: 'health', label: 'Healthcare', icon: 'HeartPulse' },
  { id: 'consulting', label: 'Consulting', icon: 'Briefcase' },
  { id: 'marketing', label: 'Marketing & Media', icon: 'Megaphone' },
  { id: 'gov', label: 'Government & Policy', icon: 'Landmark' },
  { id: 'realestate', label: 'Real Estate', icon: 'Building2' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'founder', label: 'Founder / Builder', icon: 'Rocket' },
]

export const TOPICS = [
  { id: 'ai_tech', label: 'AI & Technology', icon: 'Bot' },
  { id: 'fin_markets', label: 'Financial Markets', icon: 'LineChart' },
  { id: 'indian_biz', label: 'Indian Business', icon: 'Building' },
  { id: 'global_pol', label: 'Global Politics', icon: 'Globe' },
  { id: 'startups', label: 'Startups', icon: 'Zap' },
  { id: 'science', label: 'Science', icon: 'Atom' },
  { id: 'geopolitics', label: 'Geopolitics', icon: 'Compass' },
  { id: 'wellness', label: 'Health & Wellness', icon: 'Activity' },
  { id: 'climate', label: 'Climate & Energy', icon: 'Leaf' },
  { id: 'sports', label: 'Sports', icon: 'Trophy' },
  { id: 'culture', label: 'Culture & Arts', icon: 'Palette' },
  { id: 'policy', label: 'Legal & Policy', icon: 'FileText' },
]

export const NARRATORS: Narrator[] = [
  {
    id: 'aria',
    name: 'Aria',
    accent: 'British, English',
    tags: 'Warm • Grounded • British, English',
    avatarLetter: 'A',
    previewText: 'Hello Aarav. Here is your morning briefing on AI and market movements.',
    color: '#8b5cf6',
  },
  {
    id: 'kai',
    name: 'Kai',
    accent: 'American, English',
    tags: 'Crisp • Focused • American, English',
    avatarLetter: 'K',
    previewText: 'Good morning. Starting with Anthropic’s Claude 4.5 release notes.',
    color: '#3b82f6',
  },
  {
    id: 'meera',
    name: 'Meera',
    accent: 'Indian, English',
    tags: 'Bright • Curious • Indian, English',
    avatarLetter: 'M',
    previewText: 'Namaste Aarav! Let us dive into today’s top business headlines from Mumbai.',
    color: '#10b981',
  },
]

export const SAMPLE_STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'Anthropic ships Claude 4.5 with 2M-token memory and native tools.',
    excerpt:
      'Anthropic’s new memory layer lets Claude remember context across workflows, bundled with 5 new enterprise code analysis tools.',
    category: 'AI & TECH',
    durationText: '4 min read • 02:15 audio',
    audioDurationSec: 135,
    source: 'TechCrunch',
    publishedAt: 'Today • 6:45 AM',
    bookmarked: true,
  },
  {
    id: 'story-2',
    title: 'Fed minutes hint at a September policy shift.',
    excerpt:
      'Officials express growing confidence that inflation is moving toward target while labor market cools gradually.',
    category: 'BUSINESS / ECONOMY',
    durationText: '3 min read • 01:45 audio',
    audioDurationSec: 105,
    source: 'Financial Times',
    publishedAt: 'Today • 6:15 AM',
    bookmarked: false,
  },
  {
    id: 'story-3',
    title: 'Indian SaaS startups surge 42% in Q2 funding rebound.',
    excerpt:
      'Bengaluru and Chennai clusters attract major sovereign wealth interest following AI agent product adoption.',
    category: 'STARTUPS',
    durationText: '5 min read • 02:40 audio',
    audioDurationSec: 160,
    source: 'Mint',
    publishedAt: 'Today • 5:50 AM',
    bookmarked: true,
  },
  {
    id: 'story-4',
    title: 'ISRO announces next-gen reusable launch vehicle orbital test.',
    excerpt:
      'The milestone mission prepares India for low-cost payload delivery and upcoming lunar infrastructure setup.',
    category: 'SCIENCE',
    durationText: '3 min read • 01:50 audio',
    audioDurationSec: 110,
    source: 'The Hindu',
    publishedAt: 'Today • 5:30 AM',
    bookmarked: false,
  },
]

export const DEFAULT_PREFERENCES: UserPreferences = {
  name: 'Aarav',
  language: 'en',
  locationEnabled: true,
  profession: 'Technology',
  topics: ['AI & Technology', 'Startups', 'Indian Business'],
  narratorId: 'aria',
  briefLengthMinutes: 10,
  scheduledTime: '7:00',
  scheduledPeriod: 'AM',
  notificationsEnabled: true,
  plan: 'free',
  settings: {
    theme: 'dark',
    offlineMode: false,
    autoAdvance: true,
    pushNotifications: true,
  },
}
