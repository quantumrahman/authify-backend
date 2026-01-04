// import module --------------------------------------->
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/global.error.middleware.js';

// express app ----------------------------------------->
const app = express();

// app set --------------------------------------------->
app.set('trust proxy', 1);

// express middleware ---------------------------------->
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware ----------------------------------->
app.use(express.static('public'));

// security middleware --------------------------------->
app.use(cors({ origin: String(process.env.CORS_ORIGIN), credentials: true }));
app.use(cookieParser());

// route middleware ------------------------------------>

// check route ----------------------------------------->
app.get('/', (req, res) => {
    res.send('Api ready for work.');
});

// error middleware ------------------------------------>
app.use(errorMiddleware);

// export module --------------------------------------->
export default app;
