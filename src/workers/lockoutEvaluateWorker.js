import { Worker } from "bullmq";

import { redisConnection } from "../../redis.js";

const redisUrl = new URL(redisConnection);
const worker = new Worker(
  "lockout-jobs",
  async (job) => {
    if (job.name === "evaluateWinner") {
      const { lockoutId } = job.data;
      try {
        console.log(`Evaluating winner for lockoutId: ${lockoutId}`);
        const response = await fetch(
          `${process.env.SERVICE_BASE_URL}/api/lockout/evaluateWinner`,
          {
            method: "POST",
            body: JSON.stringify({ lockoutId }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.SERVICE_TOKEN}`,
              "x-service-name": process.env.SERVICE_NAME,
            },
          }
        );
        if (!response.ok) {
          throw new Error({
            message: `Failed to evaluate winner: ${response.statusText}`,
          });
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(
          `Error evaluating winner for lockoutId: ${lockoutId}`,
          error.message
        );
      }
    }
  },
  {
    connection: {
      family: 0,
      host: redisUrl.hostname,
      port: redisUrl.port,
      username: redisUrl.username,
      password: redisUrl.password,
    },
  }
);

console.log({ worker });

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed with error:`, err);
});
