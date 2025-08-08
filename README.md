# Slack Connect Platform

A full-stack application that allows users to authenticate using Slack OAuth, send direct messages to Slack channels, and schedule messages using a background job queue. Built with React, JavaScript (Vite), Node.js, and Express.

## 🚀 Features

### OAuth Authentication
- Slack OAuth 2.0 login integration
- Token handling and persistence
- Workspace management

### Direct Messaging
- Send instant messages to public or private channels

### Message Scheduling
- Schedule messages for future delivery
- View and delete scheduled messages
- Background delivery using a job queue

> ⚠️ **Note:** Make sure to invite the bot to the channel before sending or scheduling messages.

---

## 🏗️ Architecture Overview

### System Architecture

```
┌───────────────┐    ┌────────────────────┐    ┌───────────────┐
│   Frontend    │    │     Backend        │    │   Slack API   │
│ (React + Vite)│◄──►│ (Node.js + Express)│◄──►│ (OAuth + Chat)│
└───────────────┘    └────────────────────┘    └───────────────┘
       │                      │      |              
       │                      │      |               
       ▼                      ▼      └---------------┐
┌───────────────┐    ┌────────────────────┐          │
│ LocalStorage  │    │     In-Memory DB   │          │
│ (User State)  │    │ (Token Store/Jobs) │          │
└───────────────┘    └────────────────────┘          │
                                                     │
                           ┌────────────────────┐    │
                           │  Scheduler/Worker  │◄───┘
                           └────────────────────┘
```

### Data Flow

1. **Authentication**
   ```
   User → Frontend → Backend → Slack OAuth → Backend → Frontend Dashboard
   ```

2. **Direct Message**
   ```
   User Input → Backend → Slack API → Channel
   ```

3. **Scheduled Message**
   ```
   User Input → Backend → Job Store → Worker → Slack API → Channel
   ```

---

## 📦 Tech Stack

### Backend
- Node.js + Express: RESTful API and Slack integration
- dotenv: Configuration
- node-schedule: Scheduled job handling

### Frontend
- React (Vite)
- Tailwind CSS
- React Router

---

## 🔧 Prerequisites

- Node.js (v18+)
- npm or pnpm
- Git
- ngrok (for development Slack OAuth callback)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/SOMNATH0904/Slack-Connect.git
cd slack-connect
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
SLACK_CLIENT_ID=your_client_id
SLACK_CLIENT_SECRET=your_client_secret
SLACK_REDIRECT_URI=https://your-ngrok-url.ngrok.app/slack/oauth/callback
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

Expose the backend locally using ngrok (for Slack OAuth):

```bash
ngrok http 3000
```

Update `SLACK_REDIRECT_URI` with the ngrok HTTPS URL.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_SLACK_CLIENT_ID=your_client_id
VITE_SLACK_REDIRECT_URI=https://your-ngrok-url.ngrok.app/slack/oauth/callback
VITE_BACKEND_URL=https://your-backend-url.ngrok.app
```

Start the frontend:

```bash
npm run dev
```

Frontend will be running at: `http://localhost:5173`

---

## 🧠 Challenges & Learnings

### 1. Slack OAuth Handling
Configuring Slack OAuth requires precise `redirect_uri` setup. We faced issues due to mismatches in localhost vs ngrok URLs. This was fixed by automating environment variable management.

### 2. Scheduled Job Handling
Message scheduling needed reliable execution. We used `node-schedule`, and ensured edge cases like expired tokens or Slack API failures were gracefully handled.

### 3. Bot Permissions
Initially messages failed to send to private channels. The issue was resolved by ensuring the bot is invited to each channel before sending.

---

## 🔐 Slack Configuration

- Go to https://api.slack.com/apps → Create App
- Add OAuth scopes:
  - `channels:read`
  - `chat:write`
  - `users:read`
  - `groups:read`
- Add redirect URI:
  - Example: `https://abc123.ngrok.app/slack/oauth/callback`
- Install to Workspace and get your Client ID and Secret

---

## 🔁 OAuth Flow

1. User clicks login → Redirects to Slack OAuth URL
2. Slack returns a `code` to backend
3. Backend exchanges code for token
4. Token is stored (in memory)
5. Frontend is redirected to dashboard

---

## 🧪 Testing

- Authenticate via Slack and verify token storage
- Send messages to public/private channels
- Schedule messages and confirm delayed execution
- Refresh access token and verify continued operation

---

## 📤 Deployment Notes

- Use hosted domain (e.g., Vercel for frontend, Render for backend)
- Update all `.env` variables with hosted URLs
- Update Slack App's redirect URI to match production backend

---

