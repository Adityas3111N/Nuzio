import express from 'express';
import Story from '../models/Story.js';
import Preference from '../models/Preference.js';

const router = express.Router();

// GET /api/brief/today - returns the morning brief personalized to user preferences
router.get('/today', async (req, res) => {
  try {
    const pref = await Preference.findOne() || {
      name: 'Aarav',
      topics: ['AI & Technology', 'Startups', 'Business & Markets'],
      narratorId: 'aria',
      briefLengthMinutes: 10,
    };

    // Find stories that match the user's selected topics/categories
    const userTopics = pref.topics && pref.topics.length > 0
      ? pref.topics.map(t => t.replace(/ & .*/, '')) // Match broad keywords like 'AI', 'Startups', 'Business'
      : ['AI', 'Tech', 'Business'];

    const regexArray = userTopics.map(t => new RegExp(t, 'i'));

    let matchedStories = await Story.find({
      $or: [
        { category: { $in: regexArray } },
        { tags: { $in: regexArray } },
      ],
    })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(6);

    // Fallback if no specific topic stories found
    if (!matchedStories || matchedStories.length === 0) {
      matchedStories = await Story.find({})
        .sort({ publishedAt: -1, createdAt: -1 })
        .limit(6);
    }

    const todayDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    const totalDurationSeconds = matchedStories.reduce((acc, s) => {
      // Estimate duration from readTime or text length
      const mins = parseInt(s.readTime) || 2;
      return acc + mins * 60;
    }, 0);

    const brief = {
      id: `brief-${new Date().toISOString().slice(0, 10)}`,
      title: `Today's Executive Brief`,
      date: todayDate,
      greeting: `Good morning, ${pref.name || 'Aarav'}`,
      storyCount: matchedStories.length,
      estimatedDurationMinutes: Math.round(totalDurationSeconds / 60) || 8,
      narrator: pref.narratorId || 'aria',
      stories: matchedStories,
    };

    res.json({ success: true, brief });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
