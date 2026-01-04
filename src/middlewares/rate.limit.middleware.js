// import module --------------------------------------->
import RedisStore from 'rate-limit-redis';
import rateLimit from 'express-rate-limit';
import redisClient from '../config/config.redis.js';

// sign-up limit middleware ---------------------------->
const signUpLimitMiddleware = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    message: 'Too many requests. Please try again later.',
});
