import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter an appropriate Email"],
            unique: true,
            minlength: 3,
            maxlength: 140,
        },
        phoneNo: {
            type: String,
            required: [true, "Please enter a valid phone Number"],
            unique: true,
            minlength: 10,
            maxlength: 10,
            match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
        },
        password: {
            type: String,
            required: [true, "Please Enter A Password"],
        },
        role: {
            type: String,
            enum: ['customer', 'business'],
            default: 'customer'
        },
        verificationToken: {
            type: String,
            default: null
        },
        VerificationExpiry: {
            type: Date
        },
        Expiry: {
            type: Date
        },
        isverified: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export const CustomerModel = mongoose.model("Customer", userSchema);
