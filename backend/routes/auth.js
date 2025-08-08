import express from 'express';
import axios from 'axios';
import db from '../db.js';

const router = express.Router();

router.get('/oauth/callback', async (req, res) => {
  const code = req.query.code;

  const response = await axios.post('https://slack.com/api/oauth.v2.access', null, {
    params: {
      code,
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      redirect_uri: process.env.SLACK_REDIRECT_URI,
    },
  });

  const { access_token } = response.data;
  db.data.tokens = [{ access_token }];
  await db.write();

  res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${access_token}`);
});

export default router;
