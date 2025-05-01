import redis from "ioredis";

const getRedisConnection = () => {
  if (process.env.NODE_ENV === "production") {
    return new redis(process.env.UPSTASH_REDIS_REST_URL || "", {
      maxRetriesPerRequest: null,
    });
  }

  return new redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
  });
};

export const redisConnection = getRedisConnection();
