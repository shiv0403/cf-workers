import redis from "ioredis";

const getRedisConnection = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.UPSTASH_REDIS_REST_URL;
    // return new redis(process.env.UPSTASH_REDIS_REST_URL || "", {
    //   maxRetriesPerRequest: null,
    // });
  }
  return process.env.REDIS_URL;
  // return new redis(process.env.REDIS_URL, {
  //   maxRetriesPerRequest: null,
  // });
};

export const redisConnection = getRedisConnection();
