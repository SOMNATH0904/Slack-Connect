import axios from 'axios';

export async function sendSlackMessage(token, channel, text) {
  return await axios.post(
    'https://slack.com/api/chat.postMessage',
    { channel, text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
}
