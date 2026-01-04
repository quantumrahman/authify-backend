// import module --------------------------------------->
import chalk from 'chalk';
import bcrypt from 'bcrypt';

// hash password generator ----------------------------->
export const generateHashPassword = async (pwd) => {
    try {
        if (typeof pwd !== 'string') {
            throw new Error('Password must be a string format.');
        }

        let saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

        if (!saltRounds) {
            throw new Error(
                'Bcrypt salt round missing in environment variables.'
            );
        }

        if (!Number.isInteger(saltRounds) || saltRounds < 1) {
            saltRounds = 10;
        }

        const hashedPwd = await bcrypt.hash(pwd, saltRounds);

        return hashedPwd;
    } catch (error) {
        console.log(chalk.red('Password cannot be hashing.'), error.message);
        throw error;
    }
};
