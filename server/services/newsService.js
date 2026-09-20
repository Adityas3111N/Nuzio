import Parser from 'rss-parser';
import Story from '../models/Story.js';
import { getStoryAudioUrl } from './ttsService.js';

const parser = new Parser({
  timeout: 8000,
});

const RSS_FEEDS = [
  {
    category: 'AI & TECH',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    source: 'TechCrunch',
  },
  {
    category: 'STARTUPS',
    url: 'https://techcrunch.com/category/startups/feed/',
    source: 'TechCrunch',
  },
  {
    category: 'BUSINESS / ECONOMY',
    url: 'https://www.livemint.com/rss/companies',
    source: 'Mint',
  },
];

/**
 * Fetch and sync latest RSS stories to MongoDB
 */
export async function syncRssFeeds() {
  const syncedStories = [];

  for (const feed of RSS_FEEDS) {
    try {
      const feedData = await parser.parseURL(feed.url);
      const items = (feedData.items || []).slice(0, 3); // Take top 3 articles per feed

      for (const item of items) {
        if (!item.title) continue;

        const id = 'rss-' + Buffer.from(item.title).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
        const existing = await Story.findOne({ id });

        if (!existing) {
          const rawExcerpt = (item.contentSnippet || item.summary || item.title).replace(/<[^>]*>?/gm, '').trim();
          const cleanExcerpt = rawExcerpt.slice(0, 160) + (rawExcerpt.length > 160 ? '...' : '');

          const ariaAudio = getStoryAudioUrl(cleanExcerpt, 'aria');
          const kaiAudio = getStoryAudioUrl(cleanExcerpt, 'kai');
          const meeraAudio = getStoryAudioUrl(cleanExcerpt, 'meera');

          const newStory = await Story.create({
            id,
            title: item.title,
            excerpt: cleanExcerpt,
            fullScript: item.title + '. ' + cleanExcerpt,
            category: feed.category,
            source: feed.source,
            sourceUrl: item.link || '',
            durationText: '3 min read • 01:45 audio',
            audioDurationSec: 105,
            audioUrl: ariaAudio,
            audioUrls: {
              aria: ariaAudio,
              kai: kaiAudio,
              meera: meeraAudio,
            },
            publishedAt: 'Today • Just now',
          });
          syncedStories.push(newStory);
        }
      }
    } catch (err) {
      console.warn(`Could not sync feed ${feed.source}:`, err.message);
    }
  }

  return syncedStories;
}
