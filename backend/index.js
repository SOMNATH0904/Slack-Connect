import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messages.js';
import { sendSlackMessage } from './services/slack.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/slack', authRoutes);
app.use('/api', messageRoutes);

// Root health check route
app.get('/', (req, res) => {
  res.send('Backend connected successfully');
});

app.get('/', (req, res) => res.send("Slack Connect Backend Running"));

setInterval(async () => {
  await db.read();
  const now = Date.now();
  const due = db.data.messages.filter(msg => new Date(msg.time).getTime() <= now);
  for (const msg of due) {
    await sendSlackMessage(msg.token, msg.channel, msg.text);
    db.data.messages = db.data.messages.filter(m => m.id !== msg.id);
    await db.write();
  }
}, 1000);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
