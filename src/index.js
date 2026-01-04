// import module --------------------------------------->
import 'dotenv/config';
import chalk from 'chalk';
import app from './app.js';
import mongoose from 'mongoose';
import dbConnection from './database/db.connection.js';

// server function ------------------------------------->
const startServer = async () => {
    try {
        await dbConnection();

        const port = Number(process.env.PORT) || 4000;

        const server = app.listen(port, () => {
            console.log(
                chalk.green(`Server running on http://localhost:${port}`)
            );
        });

        const gracefulShutdown = async (signal) => {
            console.log(
                chalk.yellow(
                    `Recevied signal ${signal}, Shutting down the server.`
                )
            );

            server.close(async () => {
                console.log(chalk.red('Server is closed.'));

                await mongoose.connection.close();
                console.log(chalk.red('Mongoose connection is closed.'));

                process.exit(0);
            });

            setTimeout(() => {
                console.log(
                    chalk.red(
                        'Could not close connections in time, forcefully shutting down the server...'
                    )
                );
            }, 20000);
        };

        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    } catch (error) {
        console.log(chalk.red('Server cannot start properly.', error.message));
        process.exit(1);
    }
};

// start ----------------------------------------------->
startServer();
