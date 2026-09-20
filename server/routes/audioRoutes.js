import express from 'express';
import { getVoiceSampleUrl, getStoryAudioUrl, getStoryAudioUrls } from '../services/ttsService.js';
import Story from '../models/Story.js';

const router = express.Router();

// GET /api/audio/sample/:voiceId - get preview audio URL for narrator
router.get('/sample/:voiceId', (req, res) => {
  const { voiceId } = req.params;
  const sampleUrl = getVoiceSampleUrl(voiceId);

  if (!sampleUrl) {
    return res.status(500).json({ success: false, error: 'Could not generate voice sample' });
  }

  res.json({ success: true, voiceId, sampleUrl });
});

// GET /api/audio/story/:id - get TTS audio stream for a story
router.get('/story/:id', async (req, res) => {
  try {
    const { voiceId = 'aria' } = req.query;
    const story = await Story.findOne({
      $or: [{ id: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }],
    });

    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    const script = `${story.title}. ${story.summary || story.content || ''}`;
    const audioUrl = getStoryAudioUrl(script, voiceId);
    const audioUrls = getStoryAudioUrls(script, voiceId);

    res.json({
      success: true,
      storyId: story.id,
      voiceId,
      audioUrl: audioUrl || story.audioUrl,
      chunks: audioUrls,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/audio/synthesize - synthesize custom text
router.post('/synthesize', (req, res) => {
  const { text, voiceId = 'aria' } = req.body;
  if (!text) {
    return res.status(400).json({ success: false, error: 'Text is required' });
  }

  const audioUrl = getStoryAudioUrl(text, voiceId);
  const audioUrls = getStoryAudioUrls(text, voiceId);

  res.json({
    success: true,
    audioUrl,
    chunks: audioUrls,
  });
});

export default router;
