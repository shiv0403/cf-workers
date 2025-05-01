# Codeforces Contest Analyzer Workers

This project uses BullMQ and Redis to process Codeforces contest analysis jobs.

## Prerequisites

- Node.js (v14 or higher)
- Redis server running locally or accessible via URL

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
REDIS_URL=redis://localhost:6379
```
Replace the Redis URL with your actual Redis server URL if different.

3. Start the worker:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Project Structure

- `src/index.js` - Main worker setup
- `src/workers/` - Directory for worker-specific logic

## Adding New Jobs

To add a new job to the queue, you can use the BullMQ Queue class:

```javascript
import { Queue } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config();

const queue = new Queue('cf-contest-analyzer', {
    connection: {
        host: process.env.REDIS_URL,
    }
});

// Add a job
await queue.add('analyze-contest', {
    contestId: '123',
    // other job data
});
```

## Error Handling

The worker automatically handles job failures and logs them to the console. Failed jobs can be retried using BullMQ's built-in retry mechanisms. 