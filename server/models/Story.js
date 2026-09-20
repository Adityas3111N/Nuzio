import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  fullScript: { type: String },
  category: { type: String, required: true, index: true },
  source: { type: String, required: true },
  sourceUrl: { type: String },
  durationText: { type: String, default: '3 min read • 02:00 audio' },
  audioDurationSec: { type: Number, default: 120 },
  audioUrl: { type: String },
  audioUrls: {
    aria: { type: String },
    kai: { type: String },
    meera: { type: String },
  },
  publishedAt: { type: String, default: 'Today • 6:00 AM' },
  createdAt: { type: Date, default: Date.now, index: true },
});

export const Story =
  mongoose.models.Story || mongoose.model('Story', StorySchema);
export default Story;
