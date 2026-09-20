import dns from 'node:dns';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

// Force DNS resolver to public DNS to avoid querySrv ECONNREFUSED on local network
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectionStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];

if (!MONGO_URI) {
  console.warn('Warning: MONGO_URI is not defined in environment variables.');
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully.'))
    .catch((err) => console.error('MongoDB connection error:', err.message));
}

// Preference Schema & Model
const PreferenceSchema = new mongoose.Schema({
  name: { type: String, default: 'Aarav' },
  language: { type: String, default: 'en' },
  locationEnabled: { type: Boolean, default: true },
  profession: { type: String, default: 'Technology' },
  topics: { type: [String], default: ['AI & Technology', 'Startups'] },
  narratorId: { type: String, default: 'aria' },
  briefLengthMinutes: { type: Number, default: 10 },
  scheduledTime: { type: String, default: '7:00' },
  scheduledPeriod: { type: String, default: 'AM' },
  notificationsEnabled: { type: Boolean, default: true },
  plan: { type: String, default: 'free' },
  updatedAt: { type: Date, default: Date.now },
});

const Preference = mongoose.models.Preference || mongoose.model('Preference', PreferenceSchema);

// Health check route
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.json({
    status: 'ok',
    message: 'Nuzio API server is running',
    database: {
      connected: dbState === 1,
      state: connectionStates[dbState] || 'unknown',
    },
    timestamp: new Date().toISOString(),
  });
});

// Preferences routes
app.get('/api/preferences', async (req, res) => {
  try {
    let pref = await Preference.findOne();
    if (!pref) {
      pref = await Preference.create({});
    }
    res.json(pref);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/preferences', async (req, res) => {
  try {
    const pref = await Preference.findOneAndUpdate(
      {},
      { ...req.body, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: pref });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});