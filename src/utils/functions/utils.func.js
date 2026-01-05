// import module --------------------------------------->
import chalk from 'chalk';
import bcrypt from 'bcrypt';

// compare function ------------------------------------>
export const comparePassword = async (inputPwd, hashedPwd) => {
    try {
        if (typeof inputPwd !== 'string' || typeof hashedPwd !== 'string') {
            throw new Error('Password must be a string format.');
        }

        const isMatch = await bcrypt.compare(inputPwd, hashedPwd);

        return isMatch;
    } catch (error) {
        console.log(
            chalk.red('Password cannot compare properly.'),
            error.message
        );
        throw error;
    }
};

// formatter function ---------------------------------->
export const nameFormatter = (name) => {
    if (typeof name !== 'string') {
        throw new Error('Name must be a string format.');
    }

    const nameFormat = name
        .toLowerCase()
        .split(' ')
        .filter((empty) => empty !== '')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return nameFormat;
};
