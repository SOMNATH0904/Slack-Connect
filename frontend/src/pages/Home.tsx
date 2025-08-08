export default function Home() {
  const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${
    import.meta.env.VITE_SLACK_CLIENT_ID
  }&scope=chat:write,channels:read,channels:join&redirect_uri=${
    import.meta.env.VITE_SLACK_REDIRECT_URI
  }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-xl w-full bg-white shadow-2xl rounded-3xl p-10 border border-gray-200 text-center">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">👋 Welcome to Slack Connect</h1>
          <p className="text-gray-600 text-lg">
            Seamlessly send instant or scheduled messages directly to your Slack workspace.
          </p>
        </div>

        <div className="mt-6">
          <a
            href={slackAuthUrl}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
          >
            🔌 Connect to Slack
          </a>
        </div>

        <footer className="mt-10 text-sm text-gray-400">
          Made with ❤️ by Somnath
        </footer>
      </div>
    </div>
  );
}
