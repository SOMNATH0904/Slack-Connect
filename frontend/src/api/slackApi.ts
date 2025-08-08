const BASE_URL = 'http://localhost:3000/api';

export const sendMessage = async (channel: string, text: string) =>
  fetch(`${BASE_URL}/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ channel, text }),
  });

export const scheduleMessage = async (channel: string, text: string, time: string) =>
  fetch(`${BASE_URL}/schedule`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ channel, text, time }),
  });

export const getScheduledMessages = async () => {
  const res = await fetch(`${BASE_URL}/scheduled`);
  const data = await res.json();

  return {
    ok: res.ok,
    data
  };
};


export const cancelScheduledMessage = async (id: number) =>
  fetch(`${BASE_URL}/scheduled/${id}`, { method: 'DELETE' });
