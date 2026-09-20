import dns from 'node:dns';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import preferenceRoutes from './routes/preferenceRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import briefRoutes from './routes/briefRoutes.js';
import audioRoutes from './routes/audioRoutes.js';
import { seedDatabase } from './seed/seedData.js';

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
    .then(async () => {
      console.log('Connected to MongoDB successfully.');
      await seedDatabase();
    })
    .catch((err) => console.error('MongoDB connection error:', err.message));
}

// Health check route
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.json({
    status: 'ok',
    message: 'Nuzio AI API server is running',
    database: {
      connected: dbState === 1,
      state: connectionStates[dbState] || 'unknown',
    },
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/preferences', preferenceRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/brief', briefRoutes);
app.use('/api/audio', audioRoutes);

app.listen(PORT, () => {
  console.log(`Nuzio Server listening on port ${PORT}`);
});