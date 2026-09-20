import mongoose from 'mongoose';

const PreferenceSchema = new mongoose.Schema({
  userId: { type: String, default: 'default-user', index: true },
  name: { type: String, default: 'Aarav' },
  language: { type: String, enum: ['en', 'hi'], default: 'en' },
  locationEnabled: { type: Boolean, default: true },
  city: { type: String, default: 'Mumbai' },
  profession: { type: String, default: 'Technology' },
  topics: {
    type: [String],
    default: ['AI & Technology', 'Startups', 'Indian Business'],
  },
  narratorId: { type: String, enum: ['aria', 'kai', 'meera'], default: 'aria' },
  briefLengthMinutes: { type: Number, default: 10 },
  scheduledTime: { type: String, default: '7:00' },
  scheduledPeriod: { type: String, enum: ['AM', 'PM'], default: 'AM' },
  notificationsEnabled: { type: Boolean, default: true },
  plan: { type: String, enum: ['free', 'pro', 'pro_annual'], default: 'free' },
  settings: {
    theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
    offlineMode: { type: Boolean, default: false },
    autoAdvance: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
  },
  bookmarkedStoryIds: [{ type: String }],
  updatedAt: { type: Date, default: Date.now },
});

export const Preference =
  mongoose.models.Preference || mongoose.model('Preference', PreferenceSchema);
export default Preference;
