// import module --------------------------------------->
import RedisStore from 'rate-limit-redis';
import rateLimit from 'express-rate-limit';
import redisClient from '../config/config.redis.js';
import AppError from '../utils/constants/app.error.js';

// sign-up limit middleware ---------------------------->
const signUpLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    handler: (req, res, next) => {
        next(
            new AppError('Too many requests. Please try again later.', {
                status: 429,
                code: 'RATE_LIMIT',
            })
        );
    },
});

// sign-in limit middleware ---------------------------->
const signInLimitMiddleware = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    message: 'Too many requests. Please try again later.',
});

// otp limit middleware -------------------------------->
const otpLimitMiddleware = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3,
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    message: 'Too many requests. Please try again later.',
});

// reset password limit middleware --------------------->
const resetPwdLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    message: 'Too many requests. Please try again later.',
});
