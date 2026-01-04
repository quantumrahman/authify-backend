// import module --------------------------------------->
import 'dotenv/config';
import chalk from 'chalk';
import mongoose from 'mongoose';

// connection function --------------------------------->
const dbConnection = async () => {
    try {
        const dbUsername = String(process.env.DB_USERNAME);

        if (!dbUsername) {
            throw new Error(
                'Database user is missing in environment variables!'
            );
        }

        const dbPassword = String(process.env.DB_PASSWORD);

        if (!dbPassword) {
            throw new Error(
                'Database password is missing in environment variables!'
            );
        }

        const dbUri = String(process.env.DB_URI);

        if (!dbUri) {
            throw new Error(
                'Database uri is missing in environment variables!'
            );
        }

        const uri = String(
            dbUri
                .replace('<db_username>', dbUsername)
                .replace('<db_password>', dbPassword)
        );

        mongoose.connection.on('connected', () => {
            console.log(chalk.green('Mongoose connected successfully.'));
        });

        mongoose.connection.on('disconnected', () => {
            console.log(chalk.yellow('Mongoose disconnected!'));
        });

        mongoose.connection.on('error', (err) => {
            console.log(chalk.red('Mongoose connection error!!', err));
        });

        await mongoose.connect(uri, {
            autoIndex: process.env.NODE_ENV === 'production',
            serverSelectionTimeoutMS: 5000,
        });
    } catch (error) {
        console.log(chalk.red('Mongoose connection error.', error.message));
        process.exit(1);
    }
};

// export module --------------------------------------->
export default dbConnection;
