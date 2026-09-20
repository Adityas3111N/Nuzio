import express from 'express';
import Preference from '../models/Preference.js';

const router = express.Router();

// GET user preferences
router.get('/', async (req, res) => {
  try {
    let pref = await Preference.findOne({ userId: 'default-user' });
    if (!pref) {
      pref = await Preference.create({ userId: 'default-user' });
    }
    res.json(pref);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE / SAVE user preferences
router.post('/', async (req, res) => {
  try {
    const pref = await Preference.findOneAndUpdate(
      { userId: 'default-user' },
      { ...req.body, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: pref });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TOGGLE story bookmark
router.post('/bookmark', async (req, res) => {
  try {
    const { storyId } = req.body;
    if (!storyId) {
      return res.status(400).json({ error: 'storyId is required' });
    }

    let pref = await Preference.findOne({ userId: 'default-user' });
    if (!pref) {
      pref = await Preference.create({ userId: 'default-user' });
    }

    const currentBookmarks = pref.bookmarkedStoryIds || [];
    const isBookmarked = currentBookmarks.includes(storyId);

    const updatedBookmarks = isBookmarked
      ? currentBookmarks.filter((id) => id !== storyId)
      : [...currentBookmarks, storyId];

    pref.bookmarkedStoryIds = updatedBookmarks;
    pref.updatedAt = new Date();
    await pref.save();

    res.json({
      success: true,
      storyId,
      bookmarked: !isBookmarked,
      bookmarks: updatedBookmarks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
