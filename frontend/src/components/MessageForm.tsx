import { useState } from 'react';
import { sendMessage, scheduleMessage } from '../api/slackApi';

interface Props {
  onScheduleSuccess: () => void;
}

export default function MessageForm({ onScheduleSuccess }: Props) {
  const [channel, setChannel] = useState('');
  const [text, setText] = useState('');
  const [time, setTime] = useState('');

  const handleSend = async () => {
    if (!channel || !text) {
      alert("❌ Please enter both channel ID and message.");
      return;
    }

    try {
      const res = await sendMessage(channel, text);
      alert(res.ok ? "✅ Message sent!" : "❌ Failed to send message.");
    } catch (error) {
      alert(`❌ Error sending message. ${error}`);
    }
  };

  const handleSchedule = async () => {
    if (!channel || !text || !time) {
      alert("❌ Please fill all fields before scheduling.");
      return;
    }

    try {
      const res = await scheduleMessage(channel, text, time);
      if (res.ok) {
        alert("📅 Message scheduled!");
        onScheduleSuccess();
        setText('');
        setTime('');
      } else {
        alert("❌ Failed to schedule message.");
      }
    } catch (error) {
      alert(`❌ Error scheduling message. ${error}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/70 border border-gray-200 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-10 space-y-8 transition-all">
      <h2 className="text-4xl font-bold text-blue-800 text-center mb-6">
        💬 Schedule or Send a Slack Message
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-700 font-semibold mb-1">
            🔗 Enter Channel ID
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Use channel ID, not name. Format: <code className="bg-gray-100 px-2 py-1 rounded">C1234567890</code>
          </p>
          <input
            type="text"
            placeholder="C1234567890"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/90 border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-inner placeholder-gray-600 text-gray-800 transition"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 font-semibold mb-1">
            📝 Message Content
          </label>
          <p className="text-xs text-gray-500 mb-2">Type the message you want to send or schedule.</p>
          <textarea
            placeholder="✍️ Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className="w-full px-5 py-3 rounded-xl bg-white/90 border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-inner placeholder-gray-600 text-gray-800 transition"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 font-semibold mb-1">
            ⏰ Schedule Time (Optional)
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Use this only if you want to schedule. Must be a future time.
          </p>
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/90 border border-gray-300 focus:ring-2 focus:ring-green-400 text-gray-800 shadow-inner"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-3 rounded-xl shadow-md transition-transform"
          >
            📤 Send Now
          </button>

          <button
            onClick={handleSchedule}
            className="bg-green-600 hover:bg-green-700 active:scale-95 text-white font-semibold py-3 rounded-xl shadow-md transition-transform"
          >
            ⏰ Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
