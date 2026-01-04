// import module --------------------------------------->
import 'dotenv/config';
import redis from 'redis';

// create client --------------------------------------->
const redisClient = redis.createClient({
    url: String(process.env.UPSTASH_REDIS_REST_URL),
    token: String(process.env.UPSTASH_REDIS_REST_TOKEN),
});

redisClient.connect();

// export module --------------------------------------->
export default redisClient;
