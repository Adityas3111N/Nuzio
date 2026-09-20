import mongoose from 'mongoose';

const MorningBriefSchema = new mongoose.Schema({
  date: { type: String, required: true, index: true },
  userId: { type: String, default: 'default-user', index: true },
  greeting: { type: String, default: 'Good morning — 6 things.' },
  storyIds: [{ type: String }],
  totalDurationSec: { type: Number, default: 615 },
  createdAt: { type: Date, default: Date.now },
});

export const MorningBrief =
  mongoose.models.MorningBrief || mongoose.model('MorningBrief', MorningBriefSchema);
export default MorningBrief;
