import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a appropriate Name"],
            unique: true,
            minlength: 3,
            maxlength: 140,
        },
        email: {
            type: String,
            required: [true, "Please enter a appropriate Email"],
            unique: true,
            minlength: 3,
            maxlength: 140,
        },
        phoneNo: {
            type: Number,
            required: [true, "Please enter a valid phone Number"],
            unique: true,
            minlength: 10,
            maxlength: 10,
        },
        password: {
            type: String,
            required: [true, "Please Enter A Password"],
        },
        role: {
            type: String,
            enum: ['customer', 'business'],
            default: 'customer'
        }
    },
    { timestamps: true }

)
export const CustomerModel = mongoose.model("Customer", userSchema);
