import express from 'express';
import Story from '../models/Story.js';
import { syncRssFeeds } from '../services/newsService.js';

const router = express.Router();

// GET /api/stories - get stories with optional filtering by category, search query, or bookmarked IDs
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 20, page = 1 } = req.query;
    const filter = {};

    if (category && category !== 'All' && category !== 'all') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Story.countDocuments(filter);
    const stories = await Story.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      stories,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/stories/:id - get single story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findOne({
      $or: [{ id: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }],
    });

    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    res.json({ success: true, story });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/stories/sync - manually trigger RSS sync
router.post('/sync', async (req, res) => {
  try {
    const syncedStories = await syncRssFeeds();
    res.json({
      success: true,
      message: `Successfully fetched and synced ${syncedStories.length} stories from live feeds`,
      count: syncedStories.length,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
