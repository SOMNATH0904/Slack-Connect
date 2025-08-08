import React, { useEffect, useState } from 'react';
import { getScheduledMessages, cancelScheduledMessage } from '../api/slackApi';

interface ScheduledMessage {
  id: number;
  channel: string;
  text: string;
  time: string;
}

interface ScheduledListProps {
  refreshFlag: boolean;
}

const ScheduledList: React.FC<ScheduledListProps> = ({ refreshFlag }) => {
  const [messages, setMessages] = useState<ScheduledMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getScheduledMessages();
      if (response.ok && Array.isArray(response.data)) {
        console.log("✅ Fetched scheduled messages:", response.data);
        setMessages(response.data);
      } else {
        console.warn("⚠️ Unexpected response format", response);
        setError("Failed to load scheduled messages.");
        setMessages([]);
      }
    } catch (err) {
      console.error("❌ Error fetching messages:", err);
      setError("Something went wrong while fetching messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [refreshFlag]);

  const handleCancel = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to cancel this message?");
    if (!confirm) return;

    try {
      await cancelScheduledMessage(id);
      fetchMessages();
    } catch (err) {
      alert(`❌ Failed to cancel the message.${err}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-14 bg-white/70 border border-gray-200 backdrop-blur-md shadow-xl rounded-3xl p-8">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
        📅 Your Scheduled Messages
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 italic">⏳ Loading scheduled messages...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-medium">{error}</p>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-500 italic">
          <p>🕊️ No messages scheduled.</p>
          <p className="text-sm mt-1">Schedule something to stay ahead!</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/80 rounded-xl px-6 py-5 border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex-1 mb-3 sm:mb-0">
                <p className="text-gray-800 font-semibold text-lg truncate">{msg.text}</p>
                <div className="text-sm text-gray-600 mt-1 space-x-2">
                  <span>
                    📍 <strong>Channel:</strong> {msg.channel}
                  </span>
                  <span>
                    🕒 <strong>Time:</strong>{' '}
                    {msg.time ? new Date(msg.time).toLocaleString() : 'N/A'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCancel(msg.id)}
                className="text-red-600 font-semibold hover:text-red-700 hover:underline mt-2 sm:mt-0 sm:ml-4 transition"
              >
                ❌ Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScheduledList;
