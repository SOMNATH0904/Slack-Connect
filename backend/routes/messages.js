import express from 'express';
import db from '../db.js';
import { sendSlackMessage } from '../services/slack.js';

const router = express.Router();

const getToken = () => db.data.tokens[0]?.access_token || null;

router.post('/send', async (req, res) => {
  const { channel, text } = req.body;
  const token = getToken();
  if (!token) return res.status(401).json({ error: 'No Slack token' });

  const result = await sendSlackMessage(token, channel, text);
  res.json(result.data);
});

router.post('/schedule', async (req, res) => {
  const { channel, text, time } = req.body;
  const token = getToken();
  if (!token) return res.status(401).json({ error: 'No Slack token' });

  db.data.messages.push({ id: Date.now(), token, channel, text, time });
  await db.write();
  res.send("Scheduled");
});

router.get('/scheduled', async (req, res) => {
  await db.read();
  res.json(db.data.messages);
});

router.delete('/scheduled/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  db.data.messages = db.data.messages.filter(msg => msg.id !== id);
  await db.write();
  res.send("Cancelled");
});

export default router;
