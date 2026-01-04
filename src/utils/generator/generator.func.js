// import module --------------------------------------->
import chalk from 'chalk';
import crypto from 'crypto';
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

// hash otp generator ---------------------------------->
export const generateHashOtp = (otp) => {
    if (typeof otp !== 'string') {
        throw new Error('OTP must be a string format');
    }

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    return hashedOtp;
};

// otp generator --------------------------------------->
export const generateOtp = (length = 6) => {
    if (length <= 0) {
        throw new Error('OTP length must be greater than 0.');
    }

    const min = 10 ** (length - 1);
    const max = 10 ** length;

    const otp = crypto.randomInt(min, max);

    return otp.toString();
};