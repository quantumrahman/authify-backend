// import module --------------------------------------->
import mongoose from 'mongoose';

// schema ---------------------------------------------->
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required.'],
            minLength: [6, 'Name must be at least 6 characters.'],
            maxLength: [128, 'Name must not be more than 128 characters.'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            maxLength: [254, 'Email must not be more than 254 characters.'],
            match: [/^\S+@\S+\.\S+$/, 'Invalid email address.'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
            minlength: [8, 'Password must be at least 8 characters.'],
            maxlength: [64, 'Password must not be more than 64 characters.'],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationOtp: String,
        verificationOtpExpAt: Date,
        resetPasswordOtp: String,
        resetPasswordOtpExpAt: Date,
    },
    { timestamps: true }
);

// create model ---------------------------------------->
const user = mongoose.models.user || mongoose.model('user', userSchema);

// export module --------------------------------------->
export default user;
